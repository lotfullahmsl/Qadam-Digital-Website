from bson import ObjectId
from bson.errors import InvalidId
from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import get_jwt_identity

from app.services.ads_service import (
    PLACEMENTS,
    create_ad,
    delete_ad,
    list_admin_ads,
    list_public_ads,
    update_ad,
    update_ad_status,
    validate_ad_payload,
)
from app.services.cache_service import public_cache_get_json
from app.services.locale_content import normalize_lang
from app.utils.auth import admin_required

ads_bp = Blueprint("ads_meta", __name__)


@ads_bp.get("/ads")
def public_ads():
    placement = request.args.get("placement", "Home").strip()
    if placement not in PLACEMENTS:
        return jsonify({"message": "Invalid placement"}), 400
    lang = normalize_lang(request.args.get("lang"))
    ttl = int(current_app.config.get("CACHE_TTL_PUBLIC_SEC", 120))
    frag = f"ads:{placement}:{lang}"
    data = public_cache_get_json(frag, ttl, lambda: {"items": list_public_ads(placement, lang)})
    return jsonify(data)


@ads_bp.get("/admin/ads")
@admin_required
def admin_list_ads():
    return jsonify(list_admin_ads(request.args.to_dict()))


@ads_bp.post("/admin/ads")
@admin_required
def admin_create_ad():
    payload = request.get_json(silent=True) or {}
    errors = validate_ad_payload(payload)
    if errors:
        return jsonify({"message": "Validation failed", "errors": errors}), 400
    item = create_ad(payload, get_jwt_identity())
    return jsonify({"item": item}), 201


@ads_bp.put("/admin/ads/<item_id>")
@admin_required
def admin_put_ad(item_id):
    try:
        ObjectId(item_id)
    except (InvalidId, TypeError):
        return jsonify({"message": "Invalid id"}), 400

    payload = request.get_json(silent=True) or {}
    errors = validate_ad_payload(payload, partial=True)
    if errors:
        return jsonify({"message": "Validation failed", "errors": errors}), 400
    item = update_ad(item_id, payload, get_jwt_identity())
    if not item:
        return jsonify({"message": "Not found"}), 404
    return jsonify({"item": item})


@ads_bp.patch("/admin/ads/<item_id>/status")
@admin_required
def admin_patch_ad_status(item_id):
    try:
        ObjectId(item_id)
    except (InvalidId, TypeError):
        return jsonify({"message": "Invalid id"}), 400

    status = (request.get_json(silent=True) or {}).get("status")
    item = update_ad_status(item_id, status, get_jwt_identity())
    if not item:
        return jsonify({"message": "Not found or invalid status"}), 404
    return jsonify({"item": item})


@ads_bp.delete("/admin/ads/<item_id>")
@admin_required
def admin_delete_ad(item_id):
    try:
        ObjectId(item_id)
    except (InvalidId, TypeError):
        return jsonify({"message": "Invalid id"}), 400

    if not delete_ad(item_id):
        return jsonify({"message": "Not found"}), 404
    return jsonify({"message": "Deleted successfully"})
