from flask import Flask

from app.config import Config
from app.extensions import cors, init_mongo, jwt
from app.routes.admin_content import admin_content_bp
from app.routes.auth import auth_bp
from app.routes.content import content_bp
from app.routes.health import health_bp
from app.routes.requests import requests_bp
from app.services.auth_service import ensure_auth_indexes
from app.services.content_service import ensure_content_indexes
from app.services.request_service import ensure_request_indexes


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    cors.init_app(
        app,
        resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}},
        supports_credentials=True,
    )
    jwt.init_app(app)
    init_mongo(app)
    ensure_auth_indexes()
    ensure_content_indexes()
    ensure_request_indexes()

    app.register_blueprint(admin_content_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(content_bp, url_prefix="/api")
    app.register_blueprint(requests_bp, url_prefix="/api")
    app.register_blueprint(health_bp, url_prefix="/api")

    return app
