"""Public API response cache: Redis when available, else MongoDB, else no server cache.

Avoids requiring Redis when DNS/network blocks hosted Redis (e.g. Upstash).
"""

from __future__ import annotations

import hashlib
import json
import logging
from datetime import datetime, timedelta, timezone
from typing import Any, Callable

from flask import Request

from pymongo import ASCENDING

from app.extensions import get_mongo_db, get_redis

logger = logging.getLogger(__name__)

VERSION_KEY = "qadam:pub:cachever"

MONGO_META_COLL = "http_cache_meta"
MONGO_ENTRIES_COLL = "http_response_cache"
META_DOC_ID = "public"


def ensure_http_cache_indexes() -> None:
    db = get_mongo_db()
    if db is None:
        return
    try:
        db[MONGO_ENTRIES_COLL].create_index([("expiresAt", ASCENDING)], expireAfterSeconds=0)
    except Exception as exc:
        logger.warning("Mongo HTTP cache TTL index: %s", exc)


def bump_public_cache() -> None:
    """Invalidate public response caches after CMS / settings / ads changes."""
    r = get_redis()
    if r:
        try:
            r.incr(VERSION_KEY)
            return
        except Exception as exc:
            logger.warning("Redis cache bump failed: %s", exc)
    db = get_mongo_db()
    if db is None:
        return
    try:
        db[MONGO_META_COLL].update_one(
            {"_id": META_DOC_ID},
            {"$inc": {"v": 1}, "$setOnInsert": {"_id": META_DOC_ID, "v": 0}},
            upsert=True,
        )
    except Exception as exc:
        logger.warning("Mongo cache bump failed: %s", exc)


def _mongo_cache_version(db) -> int:
    doc = db[MONGO_META_COLL].find_one({"_id": META_DOC_ID})
    if not doc or doc.get("v") is None:
        return 0
    try:
        return int(doc["v"])
    except (TypeError, ValueError):
        return 0


def request_query_fragment(request: Request, prefix: str) -> str:
    q = request.query_string.decode("utf-8") if request.query_string else ""
    digest = hashlib.md5(q.encode("utf-8")).hexdigest()
    return f"{prefix}:{digest}"


def _try_redis_json(cache_fragment: str, ttl_seconds: int, compute: Callable[[], Any]) -> Any | None:
    r = get_redis()
    if not r:
        return None
    try:
        v_raw = r.get(VERSION_KEY)
        ver = int(v_raw) if v_raw is not None else 0
        key = f"qadam:pub:{ver}:{cache_fragment}"
        cached = r.get(key)
        if cached is not None:
            return json.loads(cached)
        data = compute()
        r.setex(key, ttl_seconds, json.dumps(data, default=str))
        return data
    except Exception as exc:
        logger.warning("Redis cache read/write failed: %s", exc)
        return None


def _try_mongo_json(cache_fragment: str, ttl_seconds: int, compute: Callable[[], Any]) -> Any | None:
    db = get_mongo_db()
    if db is None:
        return None
    try:
        ver = _mongo_cache_version(db)
        key = f"qadam:pub:{ver}:{cache_fragment}"
        coll = db[MONGO_ENTRIES_COLL]
        now = datetime.now(timezone.utc)
        doc = coll.find_one({"_id": key})
        if doc and doc.get("expiresAt") and doc["expiresAt"] > now and doc.get("body") is not None:
            return json.loads(doc["body"])
        data = compute()
        exp = now + timedelta(seconds=ttl_seconds)
        coll.replace_one(
            {"_id": key},
            {
                "_id": key,
                "body": json.dumps(data, default=str),
                "expiresAt": exp,
                "updatedAt": now,
            },
            upsert=True,
        )
        return data
    except Exception as exc:
        logger.warning("Mongo cache read/write failed: %s", exc)
        return None


def public_cache_get_json(cache_fragment: str, ttl_seconds: int, compute: Callable[[], Any]) -> Any:
    out = _try_redis_json(cache_fragment, ttl_seconds, compute)
    if out is not None:
        return out
    out = _try_mongo_json(cache_fragment, ttl_seconds, compute)
    if out is not None:
        return out
    return compute()


def _try_redis_text(cache_fragment: str, ttl_seconds: int, compute: Callable[[], str]) -> str | None:
    r = get_redis()
    if not r:
        return None
    try:
        v_raw = r.get(VERSION_KEY)
        ver = int(v_raw) if v_raw is not None else 0
        key = f"qadam:pub:{ver}:{cache_fragment}"
        cached = r.get(key)
        if cached is not None:
            return cached
        data = compute()
        r.setex(key, ttl_seconds, data)
        return data
    except Exception as exc:
        logger.warning("Redis text cache failed: %s", exc)
        return None


def _try_mongo_text(cache_fragment: str, ttl_seconds: int, compute: Callable[[], str]) -> str | None:
    db = get_mongo_db()
    if db is None:
        return None
    try:
        ver = _mongo_cache_version(db)
        key = f"qadam:pub:{ver}:{cache_fragment}"
        coll = db[MONGO_ENTRIES_COLL]
        now = datetime.now(timezone.utc)
        doc = coll.find_one({"_id": key})
        if doc and doc.get("expiresAt") and doc["expiresAt"] > now and doc.get("body") is not None:
            return str(doc["body"])
        data = compute()
        exp = now + timedelta(seconds=ttl_seconds)
        coll.replace_one(
            {"_id": key},
            {
                "_id": key,
                "body": data,
                "expiresAt": exp,
                "updatedAt": now,
            },
            upsert=True,
        )
        return data
    except Exception as exc:
        logger.warning("Mongo text cache failed: %s", exc)
        return None


def public_cache_get_text(cache_fragment: str, ttl_seconds: int, compute: Callable[[], str]) -> str:
    out = _try_redis_text(cache_fragment, ttl_seconds, compute)
    if out is not None:
        return out
    out = _try_mongo_text(cache_fragment, ttl_seconds, compute)
    if out is not None:
        return out
    return compute()
