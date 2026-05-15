"""Admin dashboard aggregates (Phase 7)."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone

from pymongo import DESCENDING

from app.extensions import get_mongo_db
from app.services.content_service import serialize_document
from app.services.request_service import REQUEST_CONFIG


def _utc_day_start(when: datetime | None = None) -> datetime:
    now = when or datetime.now(timezone.utc)
    if now.tzinfo is None:
        now = now.replace(tzinfo=timezone.utc)
    return datetime(now.year, now.month, now.day, tzinfo=timezone.utc)


def _count(collection_name: str, query: dict | None = None) -> int:
    db = get_mongo_db()
    if db is None:
        return 0
    return db[collection_name].count_documents(query or {})


def get_dashboard_stats() -> dict:
    db = get_mongo_db()
    if db is None:
        return {
            "scholarships": 0,
            "blogs": 0,
            "services": 0,
            "portfolio": 0,
            "pricing": 0,
            "users": 0,
            "ads": 0,
            "requestsNew": 0,
            "requestsToday": 0,
        }

    today_start = _utc_day_start()
    yesterday_start = today_start - timedelta(days=1)

    requests_new = 0
    requests_today = 0
    requests_yesterday = 0

    for cfg in REQUEST_CONFIG.values():
        coll = cfg["collection"]
        requests_new += db[coll].count_documents({"status": "New"})
        requests_today += db[coll].count_documents({"createdAt": {"$gte": today_start}})
        requests_yesterday += db[coll].count_documents(
            {"createdAt": {"$gte": yesterday_start, "$lt": today_start}}
        )

    return {
        "scholarships": _count("scholarships"),
        "blogs": _count("blogs"),
        "services": _count("services"),
        "portfolio": _count("portfolio_projects"),
        "pricing": _count("pricing_packages"),
        "users": _count("users"),
        "ads": _count("ads"),
        "requestsNew": requests_new,
        "requestsToday": requests_today,
        "requestsYesterday": requests_yesterday,
    }


def get_recent_activity(limit: int = 12) -> list[dict]:
    db = get_mongo_db()
    if db is None:
        return []

    rows: list[tuple[datetime, dict]] = []
    for key, cfg in REQUEST_CONFIG.items():
        coll = cfg["collection"]
        cursor = (
            db[coll]
            .find({})
            .sort("createdAt", DESCENDING)
            .limit(min(limit, 25))
        )
        for doc in cursor:
            created = doc.get("createdAt") or datetime.min.replace(tzinfo=timezone.utc)
            if created.tzinfo is None:
                created = created.replace(tzinfo=timezone.utc)
            ser = serialize_document(doc)
            rows.append(
                (
                    created,
                    {
                        "_id": ser.get("_id"),
                        "requestTypeKey": key,
                        "type": cfg["type"],
                        "name": ser.get("name") or ser.get("fullName") or "",
                        "email": ser.get("email") or "",
                        "subject": ser.get("subject") or "",
                        "status": ser.get("status") or "New",
                        "createdAt": ser.get("createdAt"),
                    },
                )
            )

    rows.sort(key=lambda x: x[0], reverse=True)
    out = []
    for _, item in rows[:limit]:
        date_str = ""
        if item.get("createdAt"):
            raw = item["createdAt"]
            if isinstance(raw, str):
                date_str = raw[:10]
            else:
                date_str = str(raw)[:10]
        out.append(
            {
                **item,
                "date": date_str,
            }
        )
    return out


def get_recent_posts(limit: int = 6) -> list[dict]:
    db = get_mongo_db()
    if db is None:
        return []

    cursor = db["blogs"].find({}).sort([("updatedAt", DESCENDING), ("createdAt", DESCENDING)]).limit(limit)
    posts = []
    for doc in cursor:
        ser = serialize_document(doc)
        dt = ser.get("updatedAt") or ser.get("createdAt") or ""
        date_str = dt[:10] if isinstance(dt, str) else ""
        posts.append(
            {
                "_id": ser.get("_id"),
                "title": ser.get("title") or "",
                "category": ser.get("category") or "",
                "status": ser.get("status") or "Draft",
                "date": date_str,
                "slug": ser.get("slug") or "",
            }
        )
    return posts
