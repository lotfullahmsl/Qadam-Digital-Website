from flask import Blueprint, Response, current_app, jsonify, request

from app.services.cache_service import public_cache_get_json, public_cache_get_text
from app.services.locale_content import normalize_lang
from app.services.seo_service import build_robots_txt, build_sitemap_xml, resolve_seo_page

seo_bp = Blueprint("seo", __name__)


@seo_bp.get("/seo/page/<path:page_key>")
def seo_page(page_key):
    lang = normalize_lang(request.args.get("lang"))
    base = current_app.config.get("FRONTEND_PUBLIC_URL") or ""
    ttl = int(current_app.config.get("CACHE_TTL_PUBLIC_SEC", 120))
    frag = f"seo:page:{page_key}:{lang}"

    def compute():
        return resolve_seo_page(page_key, lang, base)

    meta = public_cache_get_json(frag, ttl, compute)
    if not meta:
        return jsonify({"message": "Page not found"}), 404
    return jsonify({"meta": meta})


@seo_bp.get("/sitemap")
def sitemap():
    base = current_app.config.get("FRONTEND_PUBLIC_URL") or "http://localhost:5173"
    ttl = int(current_app.config.get("CACHE_TTL_STATIC_SEC", 300))

    def compute():
        return build_sitemap_xml(base)

    xml = public_cache_get_text(f"sitemap:xml:{base}", ttl, compute)
    return Response(xml, mimetype="application/xml")


@seo_bp.get("/robots")
def robots():
    front = current_app.config.get("FRONTEND_PUBLIC_URL") or "http://localhost:5173"
    api = current_app.config.get("SERVER_PUBLIC_BASE_URL") or ""
    allow = bool(current_app.config.get("ROBOTS_ALLOW_ALL", True))
    ttl = int(current_app.config.get("CACHE_TTL_STATIC_SEC", 300))
    frag = f"robots:txt:{front}:{api}:{int(allow)}"

    def compute():
        return build_robots_txt(front, api, allow)

    text = public_cache_get_text(frag, ttl, compute)
    return Response(text, mimetype="text/plain; charset=utf-8")
