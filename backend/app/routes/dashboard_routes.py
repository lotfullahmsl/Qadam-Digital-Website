from flask import Blueprint, jsonify, request

from app.services.dashboard_service import get_dashboard_stats, get_recent_activity, get_recent_posts
from app.utils.auth import admin_required

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.get("/admin/dashboard/stats")
@admin_required
def dashboard_stats():
    return jsonify(get_dashboard_stats())


@dashboard_bp.get("/admin/dashboard/recent-activity")
@admin_required
def dashboard_recent_activity():
    try:
        limit = min(max(int(request.args.get("limit", 12) or 12), 1), 50)
    except (TypeError, ValueError):
        limit = 12
    return jsonify({"items": get_recent_activity(limit)})


@dashboard_bp.get("/admin/dashboard/recent-posts")
@admin_required
def dashboard_recent_posts():
    try:
        limit = min(max(int(request.args.get("limit", 6) or 6), 1), 25)
    except (TypeError, ValueError):
        limit = 6
    return jsonify({"items": get_recent_posts(limit)})
