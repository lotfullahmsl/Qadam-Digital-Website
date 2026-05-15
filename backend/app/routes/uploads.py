from pathlib import Path

from bson import ObjectId
from bson.errors import InvalidId
from flask import Blueprint, current_app, jsonify, request, send_from_directory
from flask_jwt_extended import get_jwt, get_jwt_identity, verify_jwt_in_request
from werkzeug.utils import secure_filename

from app.services.file_upload_service import (
    build_file_urls,
    delete_upload,
    get_upload_doc,
    resolve_upload_dir,
    serialize_upload,
    store_upload,
    _visibility_for_role,
)
from app.utils.auth import admin_required

upload_bp = Blueprint("uploads", __name__)


def _optional_jwt_identity():
    verify_jwt_in_request(optional=True)
    claims = get_jwt()
    role = claims.get("role") if claims else None
    uid = get_jwt_identity()
    return role, str(uid) if uid is not None else None


def _send_stored_file(doc, upload_dir: Path, *, cache_public: bool):
    stored = doc.get("storedFilename")
    if not stored or not (upload_dir / stored).is_file():
        return jsonify({"message": "File missing on disk"}), 404
    download_name = secure_filename(doc.get("originalFilename") or stored)
    is_public = doc.get("visibility") == "public"
    as_attachment = not is_public and (doc.get("mimeType") or "").lower().startswith("application/")
    return send_from_directory(
        upload_dir,
        stored,
        mimetype=doc.get("mimeType") or None,
        as_attachment=as_attachment,
        download_name=download_name if as_attachment else None,
        max_age=60 * 60 * 24 if cache_public and is_public else 0,
    )


@upload_bp.post("/upload")
def upload_file():
    role, uid = _optional_jwt_identity()
    visibility = _visibility_for_role(role)

    if "file" not in request.files:
        return jsonify({"message": "No file part named 'file'"}), 400

    f = request.files["file"]
    upload_dir = resolve_upload_dir(current_app.config)
    upload_dir.mkdir(parents=True, exist_ok=True)

    try:
        doc = store_upload(
            f,
            visibility=visibility,
            uploaded_by_role=role,
            uploaded_by_id=uid,
            max_bytes=current_app.config["MAX_CONTENT_LENGTH"],
            upload_dir=upload_dir,
        )
    except ValueError as exc:
        return jsonify({"message": str(exc)}), 400
    except RuntimeError as exc:
        return jsonify({"message": str(exc)}), 503

    file_id = str(doc["_id"])
    rel, absolute = build_file_urls(file_id, current_app.config, request.host_url)
    body = serialize_upload(doc)
    body["url"] = absolute
    body["path"] = rel
    return jsonify(body), 201


@upload_bp.get("/uploads/<file_id>")
def serve_upload(file_id):
    doc = get_upload_doc(file_id)
    if not doc:
        return jsonify({"message": "File not found"}), 404

    if doc.get("visibility") != "public":
        try:
            verify_jwt_in_request()
        except Exception:
            return jsonify({"message": "Unauthorized"}), 401
        if get_jwt().get("role") != "admin":
            return jsonify({"message": "Unauthorized"}), 401

    upload_dir = resolve_upload_dir(current_app.config)
    return _send_stored_file(doc, upload_dir, cache_public=True)


@upload_bp.get("/admin/uploads/<file_id>")
@admin_required
def admin_serve_upload(file_id):
    doc = get_upload_doc(file_id)
    if not doc:
        return jsonify({"message": "File not found"}), 404
    upload_dir = resolve_upload_dir(current_app.config)
    return _send_stored_file(doc, upload_dir, cache_public=False)


@upload_bp.delete("/admin/uploads/<file_id>")
@admin_required
def admin_delete_upload(file_id):
    try:
        ObjectId(file_id)
    except (InvalidId, TypeError):
        return jsonify({"message": "Invalid file id"}), 400

    upload_dir = resolve_upload_dir(current_app.config)
    if not delete_upload(file_id, upload_dir):
        return jsonify({"message": "File not found"}), 404
    return jsonify({"message": "File deleted successfully"})
