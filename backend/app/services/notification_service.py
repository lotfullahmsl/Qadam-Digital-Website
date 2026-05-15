"""Admin notifications for inbound requests (Phase 10)."""

from __future__ import annotations

import os
import smtplib
from datetime import datetime, timezone
from email.mime.text import MIMEText
from typing import Any

from bson import ObjectId
from bson.errors import InvalidId
from pymongo import ASCENDING, DESCENDING

from app.extensions import get_mongo_db

COLLECTION = "notifications"


def ensure_notification_indexes():
    db = get_mongo_db()
    if db is None:
        return
    db[COLLECTION].create_index([("read", ASCENDING), ("createdAt", DESCENDING)])
    db[COLLECTION].create_index([("requestType", ASCENDING), ("createdAt", DESCENDING)])


def create_request_notification(
    request_type_key: str,
    label: str,
    title: str,
    summary: str,
    related_id: str | None = None,
) -> dict[str, Any]:
    db = get_mongo_db()
    if db is None:
        return {}
    now = datetime.now(timezone.utc)
    doc = {
        "requestType": request_type_key,
        "type": "request",
        "label": label,
        "title": title,
        "summary": summary,
        "relatedId": related_id,
        "read": False,
        "createdAt": now,
    }
    res = db[COLLECTION].insert_one(doc)
    doc["_id"] = res.inserted_id
    out = _serialize(doc)
    _try_send_email(out)
    return out


def _serialize(doc: dict) -> dict:
    out = dict(doc)
    if out.get("_id") is not None:
        out["_id"] = str(out["_id"])
    for k in ("createdAt", "readAt"):
        if out.get(k) is not None and hasattr(out[k], "isoformat"):
            out[k] = out[k].isoformat()
    return out


def list_notifications(args: dict) -> dict:
    db = get_mongo_db()
    if db is None:
        return {"items": [], "unreadCount": 0}

    q: dict = {}
    rd = (args.get("read") or "").strip().lower()
    if rd == "true":
        q["read"] = True
    elif rd == "false":
        q["read"] = False

    page = max(int(args.get("page", 1) or 1), 1)
    limit = min(max(int(args.get("limit", 30) or 30), 1), 100)
    skip = (page - 1) * limit

    coll = db[COLLECTION]
    total_unread = coll.count_documents({"read": False})
    cursor = coll.find(q).sort("createdAt", DESCENDING).skip(skip).limit(limit)
    return {
        "items": [_serialize(d) for d in cursor],
        "unreadCount": total_unread,
        "pagination": {"page": page, "limit": limit},
    }


def mark_notification_read(item_id: str) -> dict | None:
    try:
        oid = ObjectId(item_id)
    except InvalidId:
        return None
    db = get_mongo_db()
    if db is None:
        return None
    coll = db[COLLECTION]
    now = datetime.now(timezone.utc)
    res = coll.update_one({"_id": oid}, {"$set": {"read": True, "readAt": now}})
    if res.matched_count == 0:
        return None
    doc = coll.find_one({"_id": oid})
    return _serialize(doc) if doc else None


def _try_send_email(notification: dict) -> None:
    host = (os.getenv("SMTP_HOST") or "").strip()
    if not host:
        return
    port = int(os.getenv("SMTP_PORT", "587") or 587)
    user = (os.getenv("SMTP_USER") or "").strip()
    password = (os.getenv("SMTP_PASSWORD") or "").strip()
    mail_from = (os.getenv("SMTP_FROM") or user or "").strip()
    mail_to = (os.getenv("NOTIFY_EMAIL_TO") or "").strip()
    if not mail_from or not mail_to:
        return
    subject = f"[QADAM] {notification.get('title') or 'New request'}"
    body = notification.get("summary") or ""
    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = subject
    msg["From"] = mail_from
    msg["To"] = mail_to
    try:
        use_tls = (os.getenv("SMTP_USE_TLS", "true") or "true").lower() in ("1", "true", "yes")
        with smtplib.SMTP(host, port, timeout=30) as smtp:
            if use_tls:
                smtp.starttls()
            if user and password:
                smtp.login(user, password)
            smtp.sendmail(mail_from, [mail_to], msg.as_string())
    except OSError:
        pass

