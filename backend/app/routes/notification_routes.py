from flask import Blueprint, jsonify, request

from app.services.notification_service import list_notifications, mark_notification_read
from app.utils.auth import admin_required

notifications_bp = Blueprint("notifications", __name__)


@notifications_bp.get("/admin/notifications")
@admin_required
def admin_list_notifications():
    return jsonify(list_notifications(request.args.to_dict()))


@notifications_bp.patch("/admin/notifications/<item_id>/read")
@admin_required
def admin_mark_notification_read(item_id):
    item = mark_notification_read(item_id)
    if not item:
        return jsonify({"message": "Not found"}), 404
    return jsonify({"item": item})
