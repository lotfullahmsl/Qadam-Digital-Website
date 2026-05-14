from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity
from pymongo.errors import DuplicateKeyError

from app.services.admin_content_service import (
    create_admin_resource,
    delete_admin_resource,
    get_admin_resource,
    get_resource_config,
    list_admin_resources,
    normalize_resource_payload,
    update_admin_resource,
    validate_resource_payload,
)
from app.utils.auth import admin_required


admin_content_bp = Blueprint("admin_content", __name__)


def _resource_or_404(resource):
    config = get_resource_config(resource)
    if not config:
        return None, (jsonify({"message": "Admin resource not found"}), 404)
    return config, None


def _json_payload():
    return request.get_json(silent=True) or {}


@admin_content_bp.get("/admin/<resource>")
@admin_required
def admin_list_resources(resource):
    config, error = _resource_or_404(resource)
    if error:
        return error

    return jsonify(list_admin_resources(config, request.args))


@admin_content_bp.get("/admin/<resource>/<item_id>")
@admin_required
def admin_get_resource(resource, item_id):
    config, error = _resource_or_404(resource)
    if error:
        return error

    item = get_admin_resource(config, item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404

    return jsonify({"item": item})


@admin_content_bp.post("/admin/<resource>")
@admin_required
def admin_create_resource(resource):
    config, error = _resource_or_404(resource)
    if error:
        return error

    payload = normalize_resource_payload(resource, _json_payload())
    errors = validate_resource_payload(config, payload)
    if errors:
        return jsonify({"message": "Validation failed", "errors": errors}), 400

    try:
        item = create_admin_resource(config, payload, get_jwt_identity())
    except DuplicateKeyError:
        return jsonify({"message": "Duplicate value for a unique field"}), 409

    return jsonify({"item": item}), 201


@admin_content_bp.put("/admin/<resource>/<item_id>")
@admin_required
def admin_update_resource(resource, item_id):
    config, error = _resource_or_404(resource)
    if error:
        return error

    if not get_admin_resource(config, item_id):
        return jsonify({"message": "Item not found"}), 404

    payload = normalize_resource_payload(resource, _json_payload())
    errors = validate_resource_payload(config, payload)
    if errors:
        return jsonify({"message": "Validation failed", "errors": errors}), 400

    try:
        item = update_admin_resource(config, item_id, payload, get_jwt_identity())
    except DuplicateKeyError:
        return jsonify({"message": "Duplicate value for a unique field"}), 409

    return jsonify({"item": item})


@admin_content_bp.patch("/admin/<resource>/<item_id>/status")
@admin_required
def admin_update_resource_status(resource, item_id):
    config, error = _resource_or_404(resource)
    if error:
        return error

    if not get_admin_resource(config, item_id):
        return jsonify({"message": "Item not found"}), 404

    payload = normalize_resource_payload(resource, {"status": _json_payload().get("status")})
    errors = validate_resource_payload(config, payload, partial=True)
    if errors:
        return jsonify({"message": "Validation failed", "errors": errors}), 400

    item = update_admin_resource(config, item_id, payload, get_jwt_identity())
    return jsonify({"item": item})


@admin_content_bp.delete("/admin/<resource>/<item_id>")
@admin_required
def admin_delete_resource(resource, item_id):
    config, error = _resource_or_404(resource)
    if error:
        return error

    if not delete_admin_resource(config, item_id):
        return jsonify({"message": "Item not found"}), 404

    return jsonify({"message": "Item deleted successfully"})
