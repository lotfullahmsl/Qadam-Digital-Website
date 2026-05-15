from datetime import datetime, timezone

from bson import ObjectId
from bson.errors import InvalidId
from pymongo import ASCENDING, DESCENDING

from app.extensions import get_mongo_db
from app.services.content_service import parse_pagination, serialize_document, text_or_regex_query
from app.services.locale_content import is_i18n_dict, pick_i18n


ALLOWED_STATUSES = {"Draft", "Published", "Archived", "Active", "Inactive"}

RESOURCE_CONFIG = {
    "scholarships": {
        "collection": "scholarships",
        "required": ["title", "country", "university", "degree"],
        "search": ["title", "country", "university", "degree"],
    },
    "blogs": {
        "collection": "blogs",
        "required": ["title", "slug", "category"],
        "search": ["title", "slug", "category", "author", "excerpt"],
    },
    "services": {
        "collection": "services",
        "required": ["title", "description"],
        "search": ["title", "category", "categoryKey", "description"],
    },
    "pricing-packages": {
        "collection": "pricing_packages",
        "required": ["name", "category", "price"],
        "search": ["name", "category", "price"],
    },
    "portfolio-projects": {
        "collection": "portfolio_projects",
        "required": ["title", "category", "description"],
        "search": ["title", "category", "description", "clientType"],
    },
}


def get_resource_config(resource):
    return RESOURCE_CONFIG.get(resource)


def normalize_resource_payload(resource, payload):
    data = dict(payload or {})
    data.pop("_id", None)
    data.pop("id", None)

    if resource == "services":
        if "ctaLink" in data and "to" not in data:
            data["to"] = data["ctaLink"]
        if "to" in data and "ctaLink" not in data:
            data["ctaLink"] = data["to"]
        if "category" in data and "categoryKey" not in data:
            cat = data["category"]
            if isinstance(cat, dict) and is_i18n_dict(cat):
                label = pick_i18n(cat, "en") or "general"
            else:
                label = str(cat).strip() or "general"
            data["categoryKey"] = label.lower().replace(" ", "_")
        if "features" in data and isinstance(data["features"], str):
            data["features"] = [item.strip() for item in data["features"].splitlines() if item.strip()]

    if resource == "pricing-packages" and "features" in data and isinstance(data["features"], str):
        data["features"] = [item.strip() for item in data["features"].splitlines() if item.strip()]

    if resource == "portfolio-projects":
        if "imageUrl" in data and "image" not in data:
            data["image"] = data["imageUrl"]
        if "image" in data and "imageUrl" not in data:
            data["imageUrl"] = data["image"]
        if "technologies" in data and isinstance(data["technologies"], str):
            data["technologies"] = [item.strip() for item in data["technologies"].split(",") if item.strip()]

    if "order" in data:
        try:
            data["order"] = int(data["order"])
        except (TypeError, ValueError):
            data["order"] = 0

    return data


def _required_non_empty(val) -> bool:
    if val is None:
        return False
    if isinstance(val, dict):
        if is_i18n_dict(val):
            return any(str(val.get(k, "") or "").strip() for k in ("en", "ps", "fa"))
        return any(str(v or "").strip() for v in val.values())
    if isinstance(val, list):
        return len(val) > 0
    return bool(str(val).strip())


def validate_resource_payload(config, payload, partial=False):
    errors = {}

    if not partial:
        for field in config["required"]:
            if not _required_non_empty(payload.get(field)):
                errors.setdefault(field, []).append("This field is required.")
    else:
        for field in config["required"]:
            if field in payload and not _required_non_empty(payload.get(field)):
                errors.setdefault(field, []).append("This field cannot be empty.")

    status = payload.get("status")
    if status and status not in ALLOWED_STATUSES:
        errors.setdefault("status", []).append(
            "Status must be one of: Active, Archived, Draft, Inactive, Published."
        )

    return errors


def list_admin_resources(config, args):
    query = {}
    search = args.get("search", "").strip()
    status = args.get("status", "").strip()
    category = args.get("category", "").strip()

    if status and status.lower() != "all":
        query["status"] = status
    if category and category.lower() != "all":
        query["category"] = category

    query.update(text_or_regex_query(search, config["search"]))

    page, limit, skip = parse_pagination(args, default_limit=20, max_limit=100)
    collection = get_mongo_db()[config["collection"]]
    total = collection.count_documents(query)
    cursor = collection.find(query).sort([("order", ASCENDING), ("updatedAt", DESCENDING)]).skip(skip).limit(limit)

    return {
        "items": [serialize_document(item) for item in cursor],
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": (total + limit - 1) // limit if total else 0,
        },
    }


def get_admin_resource(config, item_id):
    try:
        object_id = ObjectId(item_id)
    except InvalidId:
        return None

    return serialize_document(get_mongo_db()[config["collection"]].find_one({"_id": object_id}))


def create_admin_resource(config, payload, admin_id):
    now = datetime.now(timezone.utc)
    document = {
        **payload,
        "status": payload.get("status") or "Draft",
        "createdAt": now,
        "updatedAt": now,
        "createdBy": admin_id,
        "updatedBy": admin_id,
    }

    result = get_mongo_db()[config["collection"]].insert_one(document)
    document["_id"] = result.inserted_id
    return serialize_document(document)


def update_admin_resource(config, item_id, payload, admin_id):
    try:
        object_id = ObjectId(item_id)
    except InvalidId:
        return None

    update = {
        **payload,
        "updatedAt": datetime.now(timezone.utc),
        "updatedBy": admin_id,
    }
    get_mongo_db()[config["collection"]].update_one({"_id": object_id}, {"$set": update})
    return get_admin_resource(config, item_id)


def delete_admin_resource(config, item_id):
    try:
        object_id = ObjectId(item_id)
    except InvalidId:
        return False

    result = get_mongo_db()[config["collection"]].delete_one({"_id": object_id})
    return result.deleted_count == 1
