"""Local file storage + MongoDB metadata for Phase 5 uploads."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone
from pathlib import Path

from bson import ObjectId
from bson.errors import InvalidId
from pymongo import ASCENDING
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

from app.extensions import get_mongo_db

COLLECTION = "uploaded_files"

ALLOWED_EXTENSIONS = {".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".webp"}

EXT_TO_MIMES = {
    ".pdf": {"application/pdf"},
    ".doc": {"application/msword"},
    ".docx": {"application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
    ".jpg": {"image/jpeg"},
    ".jpeg": {"image/jpeg"},
    ".png": {"image/png"},
    ".webp": {"image/webp"},
}

def ensure_upload_indexes():
    db = get_mongo_db()
    if db is None:
        return
    db[COLLECTION].create_index([("createdAt", ASCENDING)])


def resolve_upload_dir(app_config) -> Path:
    raw = Path(app_config["UPLOAD_FOLDER"])
    if not raw.is_absolute():
        raw = Path(app_config["BASE_DIR"]) / raw
    return raw.resolve()


def _ext_canonical(ext: str) -> str:
    e = ext.lower()
    return ".jpeg" if e == ".jpg" else e


def _magic_matches_ext(sample: bytes, ext: str) -> bool:
    ext = _ext_canonical(ext)
    if ext not in ALLOWED_EXTENSIONS:
        return False
    if len(sample) < 12:
        return False
    if ext == ".pdf":
        return sample[:4] == b"%PDF"
    if ext == ".png":
        return sample[:8] == b"\x89PNG\r\n\x1a\n"
    if ext in (".jpg", ".jpeg"):
        return sample[:3] == b"\xff\xd8\xff"
    if ext == ".webp":
        return sample[:4] == b"RIFF" and sample[8:12] == b"WEBP"
    if ext == ".doc":
        return sample[:4] == b"\xd0\xcf\x11\xe0"
    if ext == ".docx":
        return sample[:2] == b"PK"
    return False


def _validate_mime_for_ext(ext: str, content_type: str | None) -> str | None:
    ext = _ext_canonical(ext)
    if not content_type:
        return None
    ct = content_type.split(";")[0].strip().lower()
    if ct == "application/octet-stream":
        return None
    allowed = EXT_TO_MIMES.get(ext, set())
    if ct not in allowed:
        return f"MIME type {content_type!r} is not allowed for {ext} files."
    return None


def _visibility_for_role(role: str | None) -> str:
    if role == "admin":
        return "public"
    return "restricted"


def store_upload(
    file_storage: FileStorage,
    *,
    visibility: str,
    uploaded_by_role: str | None,
    uploaded_by_id: str | None,
    max_bytes: int,
    upload_dir: Path,
) -> dict:
    if not file_storage or not file_storage.filename:
        raise ValueError("No file provided.")

    orig_name = secure_filename(file_storage.filename) or "file"
    suffix = Path(orig_name).suffix.lower()
    if suffix == ".jpg":
        suffix = ".jpeg"
    if suffix not in ALLOWED_EXTENSIONS:
        raise ValueError(
            f"File type not allowed. Allowed: {', '.join(sorted(ALLOWED_EXTENSIONS))}"
        )

    mime_error = _validate_mime_for_ext(suffix, file_storage.content_type)
    if mime_error:
        raise ValueError(mime_error)

    head = file_storage.stream.read(8192)
    file_storage.stream.seek(0)
    if not _magic_matches_ext(head, suffix):
        raise ValueError("File content does not match the declared file type.")

    stored_name = f"{uuid.uuid4().hex}{suffix}"
    dest = upload_dir / stored_name

    written = 0
    with open(dest, "wb") as out:
        while True:
            chunk = file_storage.stream.read(1024 * 1024)
            if not chunk:
                break
            written += len(chunk)
            if written > max_bytes:
                out.close()
                dest.unlink(missing_ok=True)
                raise ValueError(f"File exceeds maximum size of {max_bytes // (1024 * 1024)} MB.")
            out.write(chunk)

    mime_type = file_storage.content_type or ""
    if mime_type:
        mime_type = mime_type.split(";")[0].strip()
    if not mime_type:
        mime_type = next(iter(EXT_TO_MIMES[suffix]))

    db = get_mongo_db()
    if db is None:
        dest.unlink(missing_ok=True)
        raise RuntimeError("Database is not configured.")

    now = datetime.now(timezone.utc)
    doc = {
        "originalFilename": orig_name,
        "storedFilename": stored_name,
        "mimeType": mime_type,
        "size": written,
        "visibility": visibility,
        "uploadedByRole": uploaded_by_role,
        "uploadedBy": uploaded_by_id,
        "createdAt": now,
        "updatedAt": now,
    }
    result = db[COLLECTION].insert_one(doc)
    doc["_id"] = result.inserted_id
    return doc


def get_upload_doc(file_id: str) -> dict | None:
    try:
        oid = ObjectId(file_id)
    except InvalidId:
        return None
    db = get_mongo_db()
    if db is None:
        return None
    return db[COLLECTION].find_one({"_id": oid})


def serialize_upload(doc: dict) -> dict:
    oid = doc.get("_id")
    return {
        "fileId": str(oid) if oid is not None else None,
        "originalFilename": doc.get("originalFilename"),
        "mimeType": doc.get("mimeType"),
        "size": doc.get("size"),
        "visibility": doc.get("visibility"),
        "url": None,
    }


def build_file_urls(file_id: str, app_config, request_base_url: str) -> tuple[str, str]:
    rel_path = f"/api/uploads/{file_id}"
    public = (app_config.get("SERVER_PUBLIC_BASE_URL") or "").strip()
    if public:
        absolute = f"{public}{rel_path}"
    else:
        base = request_base_url.rstrip("/")
        absolute = f"{base}{rel_path}"
    return rel_path, absolute


def delete_upload(file_id: str, upload_dir: Path) -> bool:
    doc = get_upload_doc(file_id)
    if not doc:
        return False
    db = get_mongo_db()
    if db is None:
        return False
    stored = doc.get("storedFilename")
    if stored:
        path = upload_dir / Path(stored).name
        if path.exists():
            path.unlink()
    db[COLLECTION].delete_one({"_id": doc["_id"]})
    return True
