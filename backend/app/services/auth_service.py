from datetime import datetime, timezone

from bson import ObjectId
from pymongo import ASCENDING

from app.extensions import get_mongo_db
from app.utils.security import hash_password, verify_password


def ensure_auth_indexes():
    db = get_mongo_db()
    if db is None:
        return

    db.admins.create_index([("email", ASCENDING)], unique=True)
    db.users.create_index([("email", ASCENDING)], unique=True)


def normalize_email(email):
    return email.strip().lower()


def serialize_admin(admin):
    return {
        "_id": str(admin["_id"]),
        "name": admin.get("name", ""),
        "email": admin.get("email", ""),
        "role": admin.get("role", "admin"),
    }


def serialize_user(user):
    return {
        "_id": str(user["_id"]),
        "fullName": user.get("fullName", ""),
        "email": user.get("email", ""),
        "country": user.get("country", ""),
        "interests": user.get("interests", []),
    }


def find_admin_by_email(email):
    return get_mongo_db().admins.find_one({"email": normalize_email(email)})


def find_user_by_email(email):
    return get_mongo_db().users.find_one({"email": normalize_email(email)})


def find_admin_by_id(admin_id):
    return get_mongo_db().admins.find_one({"_id": ObjectId(admin_id)})


def find_user_by_id(user_id):
    return get_mongo_db().users.find_one({"_id": ObjectId(user_id)})


def authenticate_admin(email, password):
    admin = find_admin_by_email(email)
    if not admin or not verify_password(password, admin["passwordHash"]):
        return None
    return admin


def authenticate_user(email, password):
    user = find_user_by_email(email)
    if not user or not verify_password(password, user["passwordHash"]):
        return None
    return user


def create_user(data):
    now = datetime.now(timezone.utc)
    user = {
        "fullName": data["fullName"].strip(),
        "email": normalize_email(data["email"]),
        "passwordHash": hash_password(data["password"]),
        "country": data.get("country", "").strip(),
        "interests": data.get("interests", []),
        "role": "user",
        "createdAt": now,
        "updatedAt": now,
    }

    result = get_mongo_db().users.insert_one(user)
    user["_id"] = result.inserted_id
    return user


def upsert_admin(name, email, password):
    now = datetime.now(timezone.utc)
    admin = {
        "name": name.strip(),
        "email": normalize_email(email),
        "passwordHash": hash_password(password),
        "role": "admin",
        "updatedAt": now,
    }

    result = get_mongo_db().admins.update_one(
        {"email": admin["email"]},
        {
            "$set": admin,
            "$setOnInsert": {"createdAt": now},
        },
        upsert=True,
    )

    if result.upserted_id:
        admin["_id"] = result.upserted_id
        return admin

    return find_admin_by_email(email)
