from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity

from app.extensions import limiter
from app.services.request_service import (
    PUBLIC_PATH_TO_TYPE,
    REQUEST_CONFIG,
    REQUEST_STATUSES,
    add_request_note,
    create_request,
    delete_request,
    get_config_by_public_path,
    get_request,
    get_request_config,
    is_honeypot_triggered,
    list_request_notes,
    list_requests,
    normalize_request_payload,
    update_request,
    validate_request_payload,
)
from app.utils.auth import admin_required


requests_bp = Blueprint("requests", __name__)


@requests_bp.post("/<public_path>")
@limiter.limit("30 per minute")
def submit_request(public_path):
    config = get_config_by_public_path(public_path)
    if not config:
        return jsonify({"message": "Request endpoint not found"}), 404

    raw = request.get_json(silent=True) or {}
    if is_honeypot_triggered(raw):
        return jsonify({"message": "Unable to submit request."}), 400

    payload = normalize_request_payload(config, raw)
    errors = validate_request_payload(config, payload)
    if errors:
        return jsonify({"message": "Validation failed", "errors": errors}), 400

    request_type_key = PUBLIC_PATH_TO_TYPE.get(public_path)
    item = create_request(config, payload, request_type_key=request_type_key)
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


@requests_bp.get("/admin/requests/<request_type>/<item_id>/notes")
@admin_required
def admin_list_request_notes(request_type, item_id):
    config = get_request_config(request_type)
    if not config:
        return jsonify({"message": "Request type not found"}), 404

    if not get_request(config, item_id):
        return jsonify({"message": "Request not found"}), 404

    return jsonify({"items": list_request_notes(request_type, item_id)})


@requests_bp.post("/admin/requests/<request_type>/<item_id>/notes")
@admin_required
def admin_add_request_note(request_type, item_id):
    config = get_request_config(request_type)
    if not config:
        return jsonify({"message": "Request type not found"}), 404

    body = (request.get_json(silent=True) or {}).get("body")
    note = add_request_note(request_type, item_id, body, get_jwt_identity())
    if not note:
        return jsonify({"message": "Unable to add note (empty or request not found)"}), 400

    return jsonify({"note": note}), 201


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
