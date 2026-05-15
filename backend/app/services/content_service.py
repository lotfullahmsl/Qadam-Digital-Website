from datetime import date, datetime

from bson import ObjectId
from bson.errors import InvalidId
from pymongo import ASCENDING, DESCENDING, TEXT

from app.extensions import get_mongo_db
from app.services.locale_content import localize_structure, normalize_lang


PUBLIC_STATUSES = ["Published", "published", "Active", "active"]


def ensure_content_indexes():
    db = get_mongo_db()
    if db is None:
        return

    db.scholarships.create_index([("title", TEXT), ("university", TEXT), ("country", TEXT)])
    db.scholarships.create_index([("country", ASCENDING), ("degree", ASCENDING), ("status", ASCENDING)])

    db.blogs.create_index([("title", TEXT), ("excerpt", TEXT), ("content", TEXT)])
    db.blogs.create_index([("slug", ASCENDING)], unique=True)
    db.blogs.create_index([("category", ASCENDING), ("status", ASCENDING)])

    db.services.create_index([("category", ASCENDING), ("status", ASCENDING), ("order", ASCENDING)])
    db.pricing_packages.create_index([("category", ASCENDING), ("status", ASCENDING), ("order", ASCENDING)])
    db.portfolio_projects.create_index([("category", ASCENDING), ("status", ASCENDING), ("order", ASCENDING)])
    db.testimonials.create_index([("status", ASCENDING), ("order", ASCENDING)])


def public_filter(extra=None):
    query = {"status": {"$in": PUBLIC_STATUSES}}
    if extra:
        query.update(extra)
    return query


def parse_pagination(args, default_limit=12, max_limit=50):
    page = max(int(args.get("page", 1) or 1), 1)
    limit = min(max(int(args.get("limit", default_limit) or default_limit), 1), max_limit)
    skip = (page - 1) * limit
    return page, limit, skip


def serialize_value(value):
    if isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, (datetime, date)):
        return value.isoformat()
    if isinstance(value, list):
        return [serialize_value(item) for item in value]
    if isinstance(value, dict):
        return {key: serialize_value(item) for key, item in value.items()}
    return value


def serialize_document(document):
    if not document:
        return None
    return {key: serialize_value(value) for key, value in document.items() if key != "passwordHash"}


def find_public_by_id(collection_name, item_id, lang="en"):
    try:
        object_id = ObjectId(item_id)
    except InvalidId:
        return None

    document = get_mongo_db()[collection_name].find_one(public_filter({"_id": object_id}))
    ser = serialize_document(document)
    if not ser:
        return None
    return localize_structure(ser, normalize_lang(lang))


def paginated_public_query(collection_name, query, args, default_limit=12, lang="en"):
    db = get_mongo_db()
    page, limit, skip = parse_pagination(args, default_limit=default_limit)
    collection = db[collection_name]
    total = collection.count_documents(query)
    cursor = collection.find(query).sort([("order", ASCENDING), ("createdAt", DESCENDING)]).skip(skip).limit(limit)
    lang_n = normalize_lang(lang)
    items = [localize_structure(serialize_document(item), lang_n) for item in cursor]
    return {
        "items": items,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": (total + limit - 1) // limit if total else 0,
        },
    }


def text_or_regex_query(search, fields):
    if not search:
        return {}

    pattern = {"$regex": search.strip(), "$options": "i"}
    clauses = []
    for field in fields:
        clauses.append({field: pattern})
        for suffix in ("en", "ps", "fa"):
            clauses.append({f"{field}.{suffix}": pattern})
    return {"$or": clauses}
