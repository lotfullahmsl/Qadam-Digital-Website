from bson.errors import InvalidId
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from marshmallow import ValidationError
from pymongo.errors import DuplicateKeyError

from app.schemas.auth import LoginSchema, UserSignupSchema
from app.services.auth_service import (
    authenticate_admin,
    authenticate_user,
    create_user,
    find_admin_by_id,
    find_user_by_email,
    find_user_by_id,
    serialize_admin,
    serialize_user,
)
from app.utils.auth import admin_required, user_required


auth_bp = Blueprint("auth", __name__)
login_schema = LoginSchema()
user_signup_schema = UserSignupSchema()


def _validation_error(error):
    return jsonify({"message": "Validation failed", "errors": error.messages}), 400


def _access_token(identity, role):
    return create_access_token(identity=str(identity), additional_claims={"role": role})


@auth_bp.post("/auth/login")
def admin_login():
    try:
        data = login_schema.load(request.get_json(silent=True) or {})
    except ValidationError as error:
        return _validation_error(error)

    admin = authenticate_admin(data["email"], data["password"])
    if not admin:
        return jsonify({"message": "Invalid email or password"}), 401

    return jsonify(
        {
            "token": _access_token(admin["_id"], "admin"),
            "admin": serialize_admin(admin),
        }
    )


@auth_bp.get("/auth/me")
@admin_required
def admin_me():
    try:
        admin = find_admin_by_id(get_jwt_identity())
    except InvalidId:
        admin = None

    if not admin:
        return jsonify({"message": "Admin not found"}), 401

    return jsonify({"admin": serialize_admin(admin)})


@auth_bp.post("/auth/refresh")
@admin_required
def admin_refresh():
    admin_id = get_jwt_identity()
    return jsonify({"token": _access_token(admin_id, "admin")})


@auth_bp.post("/auth/logout")
@jwt_required(optional=True)
def admin_logout():
    return jsonify({"message": "Logged out successfully"})


@auth_bp.post("/auth/user/signup")
def user_signup():
    try:
        data = user_signup_schema.load(request.get_json(silent=True) or {})
    except ValidationError as error:
        return _validation_error(error)

    if find_user_by_email(data["email"]):
        return jsonify({"message": "Email is already registered"}), 409

    try:
        user = create_user(data)
    except DuplicateKeyError:
        return jsonify({"message": "Email is already registered"}), 409

    return jsonify(
        {
            "token": _access_token(user["_id"], "user"),
            "user": serialize_user(user),
        }
    ), 201


@auth_bp.post("/auth/user/login")
def user_login():
    try:
        data = login_schema.load(request.get_json(silent=True) or {})
    except ValidationError as error:
        return _validation_error(error)

    user = authenticate_user(data["email"], data["password"])
    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    return jsonify(
        {
            "token": _access_token(user["_id"], "user"),
            "user": serialize_user(user),
        }
    )


@auth_bp.get("/auth/user/me")
@user_required
def user_me():
    try:
        user = find_user_by_id(get_jwt_identity())
    except InvalidId:
        user = None

    if not user:
        return jsonify({"message": "User not found"}), 401

    return jsonify({"user": serialize_user(user)})


@auth_bp.post("/auth/user/logout")
@jwt_required(optional=True)
def user_logout():
    return jsonify({"message": "Logged out successfully"})
