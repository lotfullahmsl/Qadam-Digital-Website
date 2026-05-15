from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from pymongo import MongoClient


cors = CORS()
jwt = JWTManager()
limiter = Limiter(key_func=get_remote_address, default_limits=[], storage_uri="memory://")
mongo_client = None
mongo_db = None


def init_mongo(app):
    global mongo_client, mongo_db

    mongo_uri = app.config.get("MONGO_URI")
    if not mongo_uri:
        app.logger.warning("MONGO_URI is not configured.")
        return None

    mongo_client = MongoClient(
        mongo_uri,
        serverSelectionTimeoutMS=app.config["MONGO_SERVER_SELECTION_TIMEOUT_MS"],
    )
    mongo_db = mongo_client[app.config["MONGO_DB_NAME"]]
    return mongo_db


def get_mongo_client():
    return mongo_client


def get_mongo_db():
    return mongo_db
