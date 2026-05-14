from flask import Blueprint, jsonify, request

from app.services.request_service import (
    REQUEST_CONFIG,
    REQUEST_STATUSES,
    create_request,
    delete_request,
    get_config_by_public_path,
    get_request,
    get_request_config,
    list_requests,
    normalize_request_payload,
    update_request,
    validate_request_payload,
)
from app.utils.auth import admin_required


requests_bp = Blueprint("requests", __name__)


@requests_bp.post("/<public_path>")
def submit_request(public_path):
    config = get_config_by_public_path(public_path)
    if not config:
        return jsonify({"message": "Request endpoint not found"}), 404

    payload = normalize_request_payload(config, request.get_json(silent=True) or {})
    errors = validate_request_payload(config, payload)
    if errors:
        return jsonify({"message": "Validation failed", "errors": errors}), 400

    item = create_request(config, payload)
    return jsonify({"message": "Request submitted successfully", "request": item}), 201


@requests_bp.get("/admin/requests")
@admin_required
def admin_request_summary():
    summary = {}
    for request_type, config in REQUEST_CONFIG.items():
        result = list_requests(config, {"limit": 1})
        summary[request_type] = {
            "label": config["type"],
            "total": result["pagination"]["total"],
        }
    return jsonify({"items": summary})


@requests_bp.get("/admin/requests/<request_type>")
@admin_required
def admin_list_requests(request_type):
    config = get_request_config(request_type)
    if not config:
        return jsonify({"message": "Request type not found"}), 404

    return jsonify(list_requests(config, request.args))


@requests_bp.get("/admin/requests/<request_type>/<item_id>")
@admin_required
def admin_get_request(request_type, item_id):
    config = get_request_config(request_type)
    if not config:
        return jsonify({"message": "Request type not found"}), 404

    item = get_request(config, item_id)
    if not item:
        return jsonify({"message": "Request not found"}), 404

    return jsonify({"request": item})


@requests_bp.patch("/admin/requests/<request_type>/<item_id>")
@admin_required
def admin_update_request(request_type, item_id):
    config = get_request_config(request_type)
    if not config:
        return jsonify({"message": "Request type not found"}), 404

    payload = request.get_json(silent=True) or {}
    status = payload.get("status")
    if status and status not in REQUEST_STATUSES:
        return jsonify({"message": "Validation failed", "errors": {"status": ["Invalid request status."]}}), 400

    item = update_request(config, item_id, payload)
    if not item:
        return jsonify({"message": "Request not found"}), 404

    return jsonify({"request": item})


@requests_bp.delete("/admin/requests/<request_type>/<item_id>")
@admin_required
def admin_delete_request(request_type, item_id):
    config = get_request_config(request_type)
    if not config:
        return jsonify({"message": "Request type not found"}), 404

    if not delete_request(config, item_id):
        return jsonify({"message": "Request not found"}), 404

    return jsonify({"message": "Request deleted successfully"})
