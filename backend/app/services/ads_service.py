"""Placement-based ads (Phase 6)."""

from __future__ import annotations

from datetime import datetime, timezone

from bson import ObjectId
from bson.errors import InvalidId
from pymongo import ASCENDING, DESCENDING

from app.extensions import get_mongo_db
from app.services.content_service import serialize_document
from app.services.locale_content import localize_structure, normalize_lang

COLLECTION = "ads"

PLACEMENTS = frozenset({"Home", "Scholarships", "Blog", "Services", "All Pages"})
STATUSES = frozenset({"Active", "Inactive"})


def ensure_ads_indexes():
    db = get_mongo_db()
    if db is None:
        return
    db[COLLECTION].create_index([("placement", ASCENDING), ("status", ASCENDING)])
    db[COLLECTION].create_index([("updatedAt", DESCENDING)])


def _content_mode(doc: dict) -> str:
    if str(doc.get("imageUrl") or "").strip():
        return "image"
    if str(doc.get("htmlContent") or "").strip():
        return "html"
    return "empty"


def serialize_ad_public(doc: dict) -> dict:
    d = serialize_document(doc)
    mode = _content_mode(doc)
    out = {
        "_id": d.get("_id"),
        "name": d.get("name"),
        "placement": d.get("placement"),
        "adType": d.get("adType"),
        "contentMode": mode,
    }
    if mode == "image":
        out["imageUrl"] = d.get("imageUrl")
        out["href"] = d.get("href") or d.get("linkUrl")
        out["imageAlt"] = d.get("imageAlt") or d.get("alt") or ""
    elif mode == "html":
        out["htmlContent"] = d.get("htmlContent") or d.get("adCode") or ""
    return out


def list_public_ads(placement: str, lang: str = "en") -> list[dict]:
    db = get_mongo_db()
    if db is None:
        return []
    q = {
        "status": "Active",
        "$or": [{"placement": placement}, {"placement": "All Pages"}],
    }
    cursor = db[COLLECTION].find(q).sort([("order", ASCENDING), ("updatedAt", DESCENDING)])
    ln = normalize_lang(lang)
    return [localize_structure(serialize_ad_public(doc), ln) for doc in cursor]


def list_admin_ads(args: dict) -> dict:
    db = get_mongo_db()
    if db is None:
        return {"items": [], "pagination": {"page": 1, "limit": 50, "total": 0, "pages": 0}}

    page = max(int(args.get("page", 1) or 1), 1)
    limit = min(max(int(args.get("limit", 50) or 50), 1), 100)
    skip = (page - 1) * limit

    query = {}
    st = (args.get("status") or "").strip()
    if st and st.lower() != "all" and st in STATUSES:
        query["status"] = st
    pl = (args.get("placement") or "").strip()
    if pl and pl.lower() != "all" and pl in PLACEMENTS:
        query["placement"] = pl

    collection = db[COLLECTION]
    total = collection.count_documents(query)
    cursor = collection.find(query).sort([("updatedAt", DESCENDING)]).skip(skip).limit(limit)
    items = [serialize_document(doc) for doc in cursor]
    return {
        "items": items,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": (total + limit - 1) // limit if total else 0,
        },
    }


def get_admin_ad(item_id: str) -> dict | None:
    try:
        oid = ObjectId(item_id)
    except InvalidId:
        return None
    db = get_mongo_db()
    if db is None:
        return None
    doc = db[COLLECTION].find_one({"_id": oid})
    return serialize_document(doc) if doc else None


def _normalize_ad_payload(data: dict) -> dict:
    out = dict(data or {})
    out.pop("_id", None)
    if "htmlContent" not in out and "adCode" in out:
        out["htmlContent"] = out.get("adCode")
    out.pop("adCode", None)
    if "href" not in out and "linkUrl" in out:
        out["href"] = out.get("linkUrl")
    out.pop("linkUrl", None)
    for k in ("order",):
        if k in out and out[k] is not None:
            try:
                out[k] = int(out[k])
            except (TypeError, ValueError):
                out[k] = 0
    return out


def validate_ad_payload(payload: dict, partial: bool = False) -> dict[str, list[str]]:
    errors: dict[str, list[str]] = {}
    if not partial:
        if not str(payload.get("name") or "").strip():
            errors.setdefault("name", []).append("Required.")
        pl = str(payload.get("placement") or "").strip()
        if pl not in PLACEMENTS:
            errors.setdefault("placement", []).append("Invalid placement.")
    else:
        if "name" in payload and not str(payload.get("name") or "").strip():
            errors.setdefault("name", []).append("Cannot be empty.")
        pl = str(payload.get("placement") or "").strip()
        if pl and pl not in PLACEMENTS:
            errors.setdefault("placement", []).append("Invalid placement.")

    st = str(payload.get("status") or "").strip()
    if st and st not in STATUSES:
        errors.setdefault("status", []).append("Must be Active or Inactive.")
    return errors


def create_ad(payload: dict, admin_id: str) -> dict:
    db = get_mongo_db()
    if db is None:
        raise RuntimeError("Database is not configured.")
    now = datetime.now(timezone.utc)
    body = _normalize_ad_payload(payload)
    doc = {
        **body,
        "status": body.get("status") or "Active",
        "createdAt": now,
        "updatedAt": now,
        "createdBy": admin_id,
        "updatedBy": admin_id,
    }
    result = db[COLLECTION].insert_one(doc)
    doc["_id"] = result.inserted_id
    return serialize_document(doc)


def update_ad(item_id: str, payload: dict, admin_id: str) -> dict | None:
    try:
        oid = ObjectId(item_id)
    except InvalidId:
        return None
    db = get_mongo_db()
    if db is None:
        return None
    body = _normalize_ad_payload(payload)
    body["updatedAt"] = datetime.now(timezone.utc)
    body["updatedBy"] = admin_id
    body.pop("createdAt", None)
    body.pop("createdBy", None)
    res = db[COLLECTION].update_one({"_id": oid}, {"$set": body})
    if res.matched_count == 0:
        return None
    return get_admin_ad(item_id)


def update_ad_status(item_id: str, status: str, admin_id: str) -> dict | None:
    if status not in STATUSES:
        return None
    try:
        oid = ObjectId(item_id)
    except InvalidId:
        return None
    db = get_mongo_db()
    if db is None:
        return None
    db[COLLECTION].update_one(
        {"_id": oid},
        {"$set": {"status": status, "updatedAt": datetime.now(timezone.utc), "updatedBy": admin_id}},
    )
    return get_admin_ad(item_id)


def delete_ad(item_id: str) -> bool:
    try:
        oid = ObjectId(item_id)
    except InvalidId:
        return False
    db = get_mongo_db()
    if db is None:
        return False
    return db[COLLECTION].delete_one({"_id": oid}).deleted_count == 1
