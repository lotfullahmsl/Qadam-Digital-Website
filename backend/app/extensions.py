from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from pymongo import MongoClient


cors = CORS()
jwt = JWTManager()
limiter = Limiter(key_func=get_remote_address, default_limits=[])
mongo_client = None
mongo_db = None
redis_client = None


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


def init_redis(app):
    global redis_client

    url = app.config.get("REDIS_URL")
    if not url:
        redis_client = None
        app.logger.info("REDIS_URL not set; using in-process fallbacks for cache and rate limits.")
        return

    import redis as redis_lib

    redis_client = redis_lib.from_url(url, decode_responses=True)
    try:
        redis_client.ping()
        app.logger.info("Redis connected for public cache / rate limits.")
    except Exception as exc:
        app.logger.warning("Redis ping failed (%s); using MongoDB for HTTP cache and memory for rate limits.", exc)
        redis_client = None


def get_redis():
    return redis_client
