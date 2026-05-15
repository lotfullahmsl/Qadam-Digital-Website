from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity

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
    return jsonify(build_public_settings_response(lang))


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
