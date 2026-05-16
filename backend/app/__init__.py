from flask import Flask, jsonify, request
from werkzeug.exceptions import HTTPException

from app.config import Config
from app.utils.public_http_cache import is_browser_cacheable_public_path
from app.extensions import cors, get_redis, init_mongo, init_redis, jwt, limiter
from app.routes.admin_content import admin_content_bp
from app.routes.ads_routes import ads_bp
from app.routes.auth import auth_bp
from app.routes.content import content_bp
from app.routes.dashboard_routes import dashboard_bp
from app.routes.health import health_bp
from app.routes.notification_routes import notifications_bp
from app.routes.requests import requests_bp
from app.routes.seo_routes import seo_bp
from app.routes.settings_routes import settings_bp
from app.routes.uploads import upload_bp
from app.services.ads_service import ensure_ads_indexes
from app.services.auth_service import ensure_auth_indexes
from app.services.content_service import ensure_content_indexes
from app.services.file_upload_service import ensure_upload_indexes, resolve_upload_dir
from app.services.notification_service import ensure_notification_indexes
from app.services.request_service import ensure_request_indexes
from app.services.cache_service import ensure_http_cache_indexes
from app.services.site_settings_service import ensure_default_site_settings, ensure_site_settings_indexes
def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    cors.init_app(
        app,
        resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}},
        supports_credentials=True,
    )
    jwt.init_app(app)
    app.config["RATELIMIT_ENABLED"] = app.config.get("RATE_LIMITING_ENABLED", True)
    init_redis(app)
    init_mongo(app)
    if get_redis() is None:
        app.config["RATELIMIT_STORAGE_URI"] = "memory://"
    limiter.init_app(app)
    ensure_http_cache_indexes()
    ensure_auth_indexes()
    ensure_content_indexes()
    ensure_request_indexes()
    ensure_upload_indexes()
    ensure_site_settings_indexes()
    ensure_ads_indexes()
    ensure_notification_indexes()
    ensure_default_site_settings()

    upload_root = resolve_upload_dir(app.config)
    upload_root.mkdir(parents=True, exist_ok=True)

    app.register_blueprint(admin_content_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(content_bp, url_prefix="/api")
    app.register_blueprint(requests_bp, url_prefix="/api")
    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(upload_bp, url_prefix="/api")
    app.register_blueprint(settings_bp, url_prefix="/api")
    app.register_blueprint(ads_bp, url_prefix="/api")
    app.register_blueprint(dashboard_bp, url_prefix="/api")
    app.register_blueprint(seo_bp, url_prefix="/api")
    app.register_blueprint(notifications_bp, url_prefix="/api")

    @app.after_request
    def _public_browser_cache_headers(response):
        if request.method != "GET" or response.status_code != 200:
            return response
        path = request.path or ""
        if not is_browser_cacheable_public_path(path):
            return response
        if path in ("/api/sitemap", "/api/robots"):
            max_age = app.config.get("BROWSER_CACHE_STATIC_SEC", 600)
        else:
            max_age = app.config.get("BROWSER_CACHE_PUBLIC_SEC", 120)
        swr = min(max_age * 2, 3600)
        response.headers["Cache-Control"] = f"public, max-age={max_age}, stale-while-revalidate={swr}"
        return response

    @app.errorhandler(429)
    def too_many_requests(_err):
        return jsonify({"message": "Too many requests. Please try again later."}), 429

    if not app.debug:
        @app.errorhandler(Exception)
        def handle_unexpected(exc):
            if app.config.get("PROPAGATE_EXCEPTIONS"):
                raise exc
            if isinstance(exc, (KeyboardInterrupt, SystemExit)):
                raise exc
            if isinstance(exc, HTTPException):
                return jsonify({"message": exc.description or str(exc)}), exc.code
            app.logger.exception("Unhandled error: %s", exc)
            return jsonify({"message": "Something went wrong on the server."}), 500

    return app
