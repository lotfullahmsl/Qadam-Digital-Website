from datetime import datetime, timezone

from flask import Blueprint, current_app, jsonify
from pymongo.errors import PyMongoError

from app.extensions import get_mongo_client


health_bp = Blueprint("health", __name__)


@health_bp.get("/health")
def health_check():
    mongo_status = "not_configured"
    mongo_error = None

    client = get_mongo_client()
    if client is not None:
        try:
            client.admin.command("ping")
            mongo_status = "connected"
        except PyMongoError as exc:
            mongo_status = "error"
            mongo_error = str(exc)

    response = {
        "success": mongo_status == "connected",
        "service": "qadam-digital-backend",
        "environment": current_app.config["FLASK_ENV"],
        "database": {
            "name": current_app.config["MONGO_DB_NAME"],
            "status": mongo_status,
        },
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

    if mongo_error:
        response["database"]["error"] = mongo_error

    status_code = 200 if mongo_status == "connected" else 503
    return jsonify(response), status_code
