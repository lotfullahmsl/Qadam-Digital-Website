from flask import Blueprint, Response, current_app, jsonify, request

from app.services.locale_content import normalize_lang
from app.services.seo_service import build_robots_txt, build_sitemap_xml, resolve_seo_page

seo_bp = Blueprint("seo", __name__)


@seo_bp.get("/seo/page/<path:page_key>")
def seo_page(page_key):
    lang = normalize_lang(request.args.get("lang"))
    base = current_app.config.get("FRONTEND_PUBLIC_URL") or ""
    meta = resolve_seo_page(page_key, lang, base)
    if not meta:
        return jsonify({"message": "Page not found"}), 404
    return jsonify({"meta": meta})


@seo_bp.get("/sitemap")
def sitemap():
    base = current_app.config.get("FRONTEND_PUBLIC_URL") or "http://localhost:5173"
    xml = build_sitemap_xml(base)
    return Response(xml, mimetype="application/xml")


@seo_bp.get("/robots")
def robots():
    front = current_app.config.get("FRONTEND_PUBLIC_URL") or "http://localhost:5173"
    api = current_app.config.get("SERVER_PUBLIC_BASE_URL") or ""
    allow = bool(current_app.config.get("ROBOTS_ALLOW_ALL", True))
    text = build_robots_txt(front, api, allow)
    return Response(text, mimetype="text/plain; charset=utf-8")
