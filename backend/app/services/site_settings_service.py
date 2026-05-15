"""Singleton site configuration (Phase 6)."""

from __future__ import annotations

import re
from datetime import datetime, timezone
from typing import Any

from app.extensions import get_mongo_db
from app.services.locale_content import localize_structure, normalize_lang

SETTINGS_ID = "default"
COLLECTION = "site_settings"
# General must not duplicate contact fields (WhatsApp, email, office location live only under contact).
GENERAL_ALLOWED_KEYS = frozenset({"siteName", "tagline", "maintenanceMode"})


def _default_document():
    now = datetime.now(timezone.utc)
    return {
        "_id": SETTINGS_ID,
        "contact": {
            "whatsapp": "+92 303 939 3438",
            "phone": "+92 777 241 173",
            "email": "Qadamdigital.official@gmail.com",
            "location": "Kabul, Afghanistan",
            "facebook": "#",
            "instagram": "#",
            "linkedin": "#",
            "youtube": "#",
            "tiktok": "",
        },
        "general": {
            "siteName": "QADAM Digital",
            "tagline": "Your Gateway to Global Opportunities",
            "maintenanceMode": False,
        },
        "analytics": {
            "googleAnalyticsId": "",
            "adsensePublisherId": "",
            "metaPixelId": "",
        },
        "security": {
            "sessionTimeoutMinutes": 60,
        },
        "createdAt": now,
        "updatedAt": now,
    }


def _whatsapp_link(number: str) -> str:
    digits = re.sub(r"\D", "", number or "")
    return f"https://wa.me/{digits}" if digits else ""


def normalize_contact(contact: dict) -> dict:
    c = dict(contact or {})
    if c.get("whatsapp"):
        c["whatsappLink"] = _whatsapp_link(str(c["whatsapp"]))
    return c


def _merge_legacy_general_into_contact(contact: dict, general: dict) -> dict:
    """Fill contact from legacy general.* keys if contact omits them (single source: contact)."""
    c = dict(contact or {})
    g = dict(general or {})
    if not (c.get("whatsapp") or "").strip() and (g.get("whatsapp") or "").strip():
        c["whatsapp"] = str(g["whatsapp"]).strip()
    if not (c.get("email") or "").strip() and (g.get("contactEmail") or "").strip():
        c["email"] = str(g["contactEmail"]).strip()
    if not (c.get("location") or "").strip() and (g.get("officeLocation") or "").strip():
        c["location"] = str(g["officeLocation"]).strip()
    return c


def ensure_site_settings_indexes():
    db = get_mongo_db()
    if db is None:
        return


def ensure_default_site_settings():
    db = get_mongo_db()
    if db is None:
        return
    if db[COLLECTION].count_documents({"_id": SETTINGS_ID}) == 0:
        doc = _default_document()
        doc["contact"] = normalize_contact(doc["contact"])
        db[COLLECTION].insert_one(doc)


def _get_raw() -> dict[str, Any] | None:
    db = get_mongo_db()
    if db is None:
        return None
    return db[COLLECTION].find_one({"_id": SETTINGS_ID})


def get_site_settings_document() -> dict[str, Any]:
    doc = _get_raw()
    if not doc:
        doc = _default_document()
        doc["contact"] = normalize_contact(doc["contact"])
    else:
        doc = dict(doc)
        merged_contact = _merge_legacy_general_into_contact(
            doc.get("contact") or {},
            doc.get("general") or {},
        )
        doc["contact"] = normalize_contact(merged_contact)
    return doc


def build_public_settings_response(lang: str | None = None) -> dict[str, Any]:
    doc = get_site_settings_document()
    contact = dict(doc.get("contact") or {})
    contact = normalize_contact(contact)
    general = doc.get("general") or {}
    payload = {
        "contact": contact,
        "general": {
            "siteName": general.get("siteName"),
            "tagline": general.get("tagline"),
            "maintenanceMode": bool(general.get("maintenanceMode")),
        },
    }
    return localize_structure(payload, normalize_lang(lang))


def build_admin_settings_response() -> dict[str, Any]:
    doc = get_site_settings_document()
    raw_general = doc.get("general") or {}
    general = {k: v for k, v in raw_general.items() if k in GENERAL_ALLOWED_KEYS}
    return {
        "contact": doc.get("contact") or {},
        "general": general,
        "analytics": doc.get("analytics") or {},
        "security": doc.get("security") or {},
        "updatedAt": doc.get("updatedAt"),
    }


def merge_settings_payload(payload: dict[str, Any], admin_id: str | None) -> None:
    db = get_mongo_db()
    if db is None:
        raise RuntimeError("Database is not configured.")

    if not payload:
        return

    existing = _get_raw()
    if not existing:
        ensure_default_site_settings()
        existing = _get_raw() or {}

    now = datetime.now(timezone.utc)
    update_doc: dict[str, Any] = {"updatedAt": now}
    if admin_id:
        update_doc["updatedBy"] = admin_id

    for key in ("contact", "general", "analytics", "security"):
        if key not in payload or not isinstance(payload[key], dict):
            continue
        if key == "general":
            inc = {k: v for k, v in payload[key].items() if k in GENERAL_ALLOWED_KEYS}
            merged = {**(existing.get(key) or {}), **inc}
            merged = {k: v for k, v in merged.items() if k in GENERAL_ALLOWED_KEYS}
        else:
            merged = {**(existing.get(key) or {}), **payload[key]}
        if key == "contact":
            merged = normalize_contact(merged)
        update_doc[key] = merged

    db[COLLECTION].update_one(
        {"_id": SETTINGS_ID},
        {"$set": update_doc, "$setOnInsert": {"_id": SETTINGS_ID, "createdAt": now}},
        upsert=True,
    )
