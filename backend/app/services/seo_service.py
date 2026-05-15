"""SEO metadata, sitemap, and robots (Phase 9)."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any
from xml.sax.saxutils import escape

from bson import ObjectId
from bson.errors import InvalidId

from app.extensions import get_mongo_db
from app.services.content_service import public_filter, serialize_document
from app.services.locale_content import is_i18n_dict, normalize_lang, pick_i18n
from app.services.site_settings_service import get_site_settings_document

_STATIC_PATHS: dict[str, str] = {
    "home": "/",
    "about": "/about",
    "contact": "/contact",
    "services": "/services",
    "scholarships": "/scholarships",
    "blog": "/blog",
    "pricing": "/pricing",
    "portfolio": "/portfolio",
    "solutions": "/solutions",
    "cv-translation": "/cv-translation",
    "digital-tools": "/digital-tools",
    "social-media-marketing": "/social-media-marketing",
}


def _absolute(base: str, path: str) -> str:
    b = (base or "").rstrip("/")
    p = path if path.startswith("/") else f"/{path}"
    return f"{b}{p}" if b else p


def _field_text(value: Any, lang: str) -> str:
    if value is None:
        return ""
    if isinstance(value, dict) and is_i18n_dict(value):
        return pick_i18n(value, lang)
    return str(value).strip()


def _first_line(text: str, max_len: int = 320) -> str:
    t = " ".join((text or "").split())
    if len(t) <= max_len:
        return t
    return t[: max_len - 1].rsplit(" ", 1)[0] + "…"


def _doc_excerpt_fallback(doc: dict, lang: str) -> str:
    for key in ("excerpt", "description", "summary"):
        v = _field_text(doc.get(key), lang)
        if v:
            return _first_line(v, 300)
    content = doc.get("content")
    if isinstance(content, str) and content.strip():
        return _first_line(content, 300)
    if isinstance(content, list):
        parts = []
        for block in content[:3]:
            if isinstance(block, dict) and block.get("text"):
                parts.append(str(block["text"]))
            elif isinstance(block, str):
                parts.append(block)
        return _first_line("\n".join(parts), 300)
    return ""


def build_document_seo(doc: dict | None, lang: str | None, canonical_path: str, site_name: str) -> dict[str, Any]:
    """Resolve SEO fields from a content document with i18n-aware strings."""
    lang = normalize_lang(lang)
    if not doc:
        title = site_name
        desc = ""
        return {
            "title": title,
            "description": desc,
            "canonicalUrl": canonical_path,
            "ogTitle": title,
            "ogDescription": desc,
            "ogImage": "",
        }

    title = _field_text(doc.get("seoTitle"), lang) or _field_text(doc.get("title"), lang) or site_name
    desc = (
        _field_text(doc.get("seoDescription"), lang)
        or _doc_excerpt_fallback(doc, lang)
        or title
    )
    canonical_override = _field_text(doc.get("canonicalUrl"), lang)
    canonical = canonical_override or canonical_path

    og_title = _field_text(doc.get("ogTitle"), lang) or title
    og_desc = _field_text(doc.get("ogDescription"), lang) or desc
    og_image = _field_text(doc.get("ogImage"), lang) or _field_text(doc.get("featuredImage"), lang) or ""

    return {
        "title": title,
        "description": desc,
        "canonicalUrl": canonical,
        "ogTitle": og_title,
        "ogDescription": og_desc,
        "ogImage": og_image,
    }


def get_site_name_and_defaults(lang: str) -> tuple[str, str]:
    doc = get_site_settings_document()
    general = doc.get("general") or {}
    raw_name = general.get("siteName") or "QADAM Digital"
    site_name = _field_text(raw_name, lang) if isinstance(raw_name, dict) else str(raw_name)
    raw_tag = general.get("tagline") or ""
    tag = _field_text(raw_tag, lang) if isinstance(raw_tag, dict) else str(raw_tag)
    return site_name, tag


def resolve_seo_page(page_ref: str, lang: str | None, frontend_base: str) -> dict[str, Any] | None:
    lang = normalize_lang(lang)
    page_ref = (page_ref or "").strip().strip("/")
    if not page_ref:
        return None

    site_name, tagline = get_site_name_and_defaults(lang)
    base = frontend_base.rstrip("/")

    parts = page_ref.split("/", 1)
    head = parts[0].lower()
    rest = parts[1] if len(parts) > 1 else None

    db = get_mongo_db()

    if head == "blog" and rest:
        if db is None:
            return None
        blog = db.blogs.find_one(public_filter({"slug": rest}))
        if not blog:
            return None
        ser = serialize_document(blog)
        path = f"/blog/{rest}"
        meta = build_document_seo(ser, lang, path, site_name)
        return {**meta, "path": path, "absoluteUrl": _absolute(base, path)}

    if head == "scholarship" and rest:
        if db is None:
            return None
        try:
            oid = ObjectId(rest)
        except InvalidId:
            return None
        sch = db.scholarships.find_one(public_filter({"_id": oid}))
        if not sch:
            return None
        ser = serialize_document(sch)
        path = f"/scholarships/{rest}"
        meta = build_document_seo(ser, lang, path, site_name)
        img = meta.get("ogImage") or _field_text(ser.get("image"), lang) or ""
        meta["ogImage"] = img
        return {**meta, "path": path, "absoluteUrl": _absolute(base, path)}

    static_path = _STATIC_PATHS.get(head) or _STATIC_PATHS.get(page_ref.lower())
    if not static_path:
        static_path = _STATIC_PATHS.get(page_ref.lower())

    if static_path:
        title = site_name if static_path == "/" else f"{site_name} — {head.replace('-', ' ').title()}"
        desc = tagline or title
        if static_path == "/" and tagline:
            desc = tagline
        return {
            "title": title,
            "description": desc,
            "canonicalUrl": static_path,
            "ogTitle": title,
            "ogDescription": desc,
            "ogImage": "",
            "path": static_path,
            "absoluteUrl": _absolute(base, static_path),
        }

    return None


def _w3c_date(value: Any) -> str:
    if isinstance(value, datetime):
        dt = value if value.tzinfo else value.replace(tzinfo=timezone.utc)
        return dt.date().isoformat()
    if isinstance(value, str) and value:
        return value[:10]
    return datetime.now(timezone.utc).date().isoformat()


def _iter_content_urls(db, frontend_base: str) -> list[dict[str, str]]:
    out: list[dict[str, str]] = []
    base = frontend_base.rstrip("/")

    for doc in db.blogs.find(public_filter({})).sort("updatedAt", -1):
        slug = doc.get("slug")
        if not slug:
            continue
        path = f"/blog/{slug}"
        out.append({"loc": _absolute(base, path), "lastmod": _w3c_date(doc.get("updatedAt") or doc.get("createdAt"))})

    for doc in db.scholarships.find(public_filter({})).sort("updatedAt", -1):
        oid = doc.get("_id")
        if oid is None:
            continue
        path = f"/scholarships/{oid}"
        out.append({"loc": _absolute(base, path), "lastmod": _w3c_date(doc.get("updatedAt") or doc.get("createdAt"))})

    return out


def build_sitemap_xml(frontend_base: str) -> str:
    base = frontend_base.rstrip("/") or "http://localhost:5173"
    db = get_mongo_db()
    urls: list[dict[str, str]] = []

    for path in sorted(set(_STATIC_PATHS.values())):
        urls.append({"loc": _absolute(base, path), "lastmod": datetime.now(timezone.utc).date().isoformat()})

    if db is not None:
        urls.extend(_iter_content_urls(db, base))

    seen = set()
    uniq: list[dict[str, str]] = []
    for u in urls:
        if u["loc"] in seen:
            continue
        seen.add(u["loc"])
        uniq.append(u)

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for u in uniq:
        lines.append("  <url>")
        lines.append(f"    <loc>{escape(u['loc'])}</loc>")
        if u.get("lastmod"):
            lines.append(f"    <lastmod>{escape(u['lastmod'])}</lastmod>")
        lines.append("  </url>")
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def build_robots_txt(frontend_base: str, api_base: str, allow_all: bool) -> str:
    front = frontend_base.rstrip("/") or "http://localhost:5173"
    api = api_base.rstrip("/") if api_base else ""
    if api.endswith("/api"):
        api_root = api
    elif api:
        api_root = f"{api}/api"
    else:
        api_root = f"{front}/api"

    sitemap_url = f"{api_root}/sitemap"
    lines = ["User-agent: *"]
    if allow_all:
        lines.append("Disallow:")
    else:
        lines.append("Disallow: /admin/")
        lines.append("Disallow: /api/admin/")
    lines.append(f"Sitemap: {sitemap_url}")
    return "\n".join(lines) + "\n"
