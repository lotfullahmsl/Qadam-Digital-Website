from datetime import datetime, timezone

from bson import ObjectId
from bson.errors import InvalidId
from pymongo import ASCENDING, DESCENDING

from app.extensions import get_mongo_db
from app.services.content_service import parse_pagination, serialize_document, text_or_regex_query


REQUEST_CONFIG = {
    "contact": {
        "collection": "contact_requests",
        "public_path": "contact-requests",
        "type": "Contact",
        "required": ["fullName", "email", "message"],
        "search": ["fullName", "name", "email", "phone", "service", "message"],
    },
    "scholarship-applications": {
        "collection": "scholarship_applications",
        "public_path": "scholarship-applications",
        "type": "Scholarship App",
        "required": ["fullName", "email", "message"],
        "search": ["fullName", "name", "email", "phone", "subject", "message", "university", "country"],
    },
    "subscription": {
        "collection": "subscription_requests",
        "public_path": "subscription-requests",
        "type": "Subscription",
        "required": ["fullName", "email", "plan"],
        "search": ["fullName", "name", "email", "phone", "plan", "message"],
    },
    "student-registrations": {
        "collection": "student_registrations",
        "public_path": "student-registrations",
        "type": "Student Registration",
        "required": ["fullName", "email"],
        "search": ["fullName", "name", "email", "phone", "country", "message"],
    },
    "website-projects": {
        "collection": "website_project_requests",
        "public_path": "website-project-requests",
        "type": "Website Project",
        "required": ["fullName", "email", "message"],
        "search": ["fullName", "name", "email", "phone", "projectType", "budget", "message"],
    },
    "database-projects": {
        "collection": "database_project_requests",
        "public_path": "database-project-requests",
        "type": "Database Project",
        "required": ["fullName", "email", "message"],
        "search": ["fullName", "name", "email", "phone", "dbType", "projectSize", "message"],
    },
    "social-media": {
        "collection": "social_media_requests",
        "public_path": "social-media-requests",
        "type": "Social Media",
        "required": ["fullName", "email", "message"],
        "search": ["fullName", "name", "email", "phone", "platforms", "budget", "message"],
    },
}

PUBLIC_PATH_TO_TYPE = {config["public_path"]: key for key, config in REQUEST_CONFIG.items()}
REQUEST_STATUSES = {"New", "In Review", "Contacted", "In Progress", "Completed", "Rejected"}


def ensure_request_indexes():
    db = get_mongo_db()
    if db is None:
        return

    for config in REQUEST_CONFIG.values():
        collection = db[config["collection"]]
        collection.create_index([("status", ASCENDING), ("createdAt", DESCENDING)])
        collection.create_index([("email", ASCENDING)])


def get_request_config(request_type):
    return REQUEST_CONFIG.get(request_type)


def get_config_by_public_path(public_path):
    return get_request_config(PUBLIC_PATH_TO_TYPE.get(public_path))


def normalize_request_payload(config, payload):
    data = dict(payload or {})
    full_name = data.get("fullName") or data.get("name") or ""
    subject = data.get("subject") or data.get("service") or data.get("plan") or config["type"]

    data["fullName"] = str(full_name).strip()
    data["name"] = data["fullName"]
    data["email"] = str(data.get("email", "")).strip().lower()
    data["subject"] = str(subject).strip()
    data["type"] = config["type"]

    return data


def validate_request_payload(config, payload):
    errors = {}
    for field in config["required"]:
        if not str(payload.get(field, "")).strip():
            errors.setdefault(field, []).append("This field is required.")

    if payload.get("email") and "@" not in payload["email"]:
        errors.setdefault("email", []).append("Enter a valid email address.")

    status = payload.get("status")
    if status and status not in REQUEST_STATUSES:
        errors.setdefault("status", []).append("Invalid request status.")

    return errors


def create_request(config, payload):
    now = datetime.now(timezone.utc)
    document = {
        **payload,
        "status": "New",
        "createdAt": now,
        "updatedAt": now,
    }

    result = get_mongo_db()[config["collection"]].insert_one(document)
    document["_id"] = result.inserted_id
    return serialize_document(document)


def list_requests(config, args):
    query = {}
    status = args.get("status", "").strip()
    search = args.get("search", "").strip()

    if status and status.lower() != "all":
        query["status"] = status

    query.update(text_or_regex_query(search, config["search"]))

    page, limit, skip = parse_pagination(args, default_limit=20, max_limit=100)
    collection = get_mongo_db()[config["collection"]]
    total = collection.count_documents(query)
    cursor = collection.find(query).sort("createdAt", DESCENDING).skip(skip).limit(limit)

    return {
        "items": [serialize_document(item) for item in cursor],
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": (total + limit - 1) // limit if total else 0,
        },
    }


def get_request(config, item_id):
    try:
        object_id = ObjectId(item_id)
    except InvalidId:
        return None

    return serialize_document(get_mongo_db()[config["collection"]].find_one({"_id": object_id}))


def update_request(config, item_id, payload):
    try:
        object_id = ObjectId(item_id)
    except InvalidId:
        return None

    update = {**payload, "updatedAt": datetime.now(timezone.utc)}
    get_mongo_db()[config["collection"]].update_one({"_id": object_id}, {"$set": update})
    return get_request(config, item_id)


def delete_request(config, item_id):
    try:
        object_id = ObjectId(item_id)
    except InvalidId:
        return False

    result = get_mongo_db()[config["collection"]].delete_one({"_id": object_id})
    return result.deleted_count == 1
