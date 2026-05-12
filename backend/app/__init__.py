from flask import Flask

from app.config import Config
from app.extensions import cors, init_mongo, jwt
from app.routes.health import health_bp


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

    app.register_blueprint(health_bp, url_prefix="/api")

    return app
