import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


def _csv_env(name, default=""):
    return [value.strip() for value in os.getenv(name, default).split(",") if value.strip()]


class Config:
    BASE_DIR = BASE_DIR
    FLASK_ENV = os.getenv("FLASK_ENV", "development")
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-before-production")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret-change-before-production")

    MONGO_URI = os.getenv("MONGO_URI", "")
    MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "qadam_digital_website")
    MONGO_SERVER_SELECTION_TIMEOUT_MS = int(os.getenv("MONGO_SERVER_SELECTION_TIMEOUT_MS", "5000"))
    PORT = int(os.getenv("PORT", "5001"))

    CORS_ORIGINS = _csv_env(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000",
    )

    # On Vercel Functions only /tmp is writable; override with UPLOAD_FOLDER if needed.
    _upload_default = "/tmp/qadam_uploads" if os.getenv("VERCEL") else str(BASE_DIR / "uploads")
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", _upload_default)
    MAX_UPLOAD_MB = int(os.getenv("MAX_UPLOAD_MB", "10"))
    MAX_CONTENT_LENGTH = MAX_UPLOAD_MB * 1024 * 1024

    # Optional: public origin for absolute file URLs (e.g. http://127.0.0.1:5001 for Vite + separate API host)
    SERVER_PUBLIC_BASE_URL = os.getenv("SERVER_PUBLIC_BASE_URL", "").rstrip("/")

    # Optional: Redis (e.g. Upstash rediss://). Used for public API response cache and rate-limit storage.
    REDIS_URL = (os.getenv("REDIS_URL") or "").strip()
    CACHE_TTL_PUBLIC_SEC = int(os.getenv("CACHE_TTL_PUBLIC_SEC", "120"))
    CACHE_TTL_STATIC_SEC = int(os.getenv("CACHE_TTL_STATIC_SEC", "300"))
    RATELIMIT_STORAGE_URI = REDIS_URL or "memory://"

    # Browser / CDN Cache-Control for public JSON & SEO GET responses (Redis still shields Mongo).
    BROWSER_CACHE_PUBLIC_SEC = int(os.getenv("BROWSER_CACHE_PUBLIC_SEC", "120"))
    BROWSER_CACHE_STATIC_SEC = int(os.getenv("BROWSER_CACHE_STATIC_SEC", "600"))

    JSON_SORT_KEYS = False
    FRONTEND_PUBLIC_URL = os.getenv("FRONTEND_PUBLIC_URL", "").rstrip("/")
    ROBOTS_ALLOW_ALL = (os.getenv("ROBOTS_ALLOW_ALL", "true") or "true").lower() in ("1", "true", "yes")
    RATE_LIMITING_ENABLED = (os.getenv("RATE_LIMITING_ENABLED", "true") or "true").lower() in ("1", "true", "yes")
    PROPAGATE_EXCEPTIONS = (os.getenv("PROPAGATE_EXCEPTIONS", "false") or "false").lower() in ("1", "true", "yes")
