from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import get_jwt_identity

from app.services.cache_service import public_cache_get_json
from app.services.locale_content import normalize_lang
from app.services.site_settings_service import (
    build_admin_settings_response,
    build_public_settings_response,
    merge_settings_payload,
)
from app.utils.auth import admin_required

settings_bp = Blueprint("settings", __name__)


@settings_bp.get("/settings/public")
def public_settings():
    lang = normalize_lang(request.args.get("lang"))
    ttl = int(current_app.config.get("CACHE_TTL_PUBLIC_SEC", 120))
    frag = f"settings:public:{lang}"
    payload = public_cache_get_json(frag, ttl, lambda: build_public_settings_response(lang))
    return jsonify(payload)


@settings_bp.get("/admin/settings")
@admin_required
def admin_get_settings():
    return jsonify(build_admin_settings_response())


@settings_bp.put("/admin/settings")
@admin_required
def admin_put_settings():
    payload = request.get_json(silent=True) or {}
    try:
        merge_settings_payload(payload, get_jwt_identity())
    except RuntimeError as exc:
        return jsonify({"message": str(exc)}), 503
    return jsonify(build_admin_settings_response())
