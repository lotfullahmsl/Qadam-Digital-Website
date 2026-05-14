from flask import Blueprint, jsonify, request

from app.extensions import get_mongo_db
from app.services.content_service import (
    find_public_by_id,
    paginated_public_query,
    public_filter,
    serialize_document,
    text_or_regex_query,
)


content_bp = Blueprint("content", __name__)


def _not_found(resource):
    return jsonify({"message": f"{resource} not found"}), 404


@content_bp.get("/scholarships")
def list_scholarships():
    filters = {}
    search = request.args.get("search", "").strip()
    country = request.args.get("country", "").strip()
    degree = request.args.get("degree", "").strip()
    deadline = request.args.get("deadline", "").strip()

    if country and country.lower() != "all":
        filters["country"] = country
    if degree and degree.lower() != "all":
        filters["degree"] = {"$regex": degree, "$options": "i"}
    if deadline:
        filters["deadline"] = {"$regex": deadline, "$options": "i"}

    query = public_filter(filters)
    query.update(text_or_regex_query(search, ["title", "university", "country", "degree"]))
    return jsonify(paginated_public_query("scholarships", query, request.args))


@content_bp.get("/scholarships/<scholarship_id>")
def get_scholarship(scholarship_id):
    scholarship = find_public_by_id("scholarships", scholarship_id)
    if not scholarship:
        return _not_found("Scholarship")
    return jsonify({"scholarship": scholarship})


@content_bp.get("/blogs")
def list_blogs():
    filters = {}
    search = request.args.get("search", "").strip()
    category = request.args.get("category", "").strip()

    if category and category.lower() != "all":
        filters["category"] = category

    query = public_filter(filters)
    query.update(text_or_regex_query(search, ["title", "excerpt", "content", "category"]))
    return jsonify(paginated_public_query("blogs", query, request.args))


@content_bp.get("/blogs/<slug>")
def get_blog(slug):
    blog = get_mongo_db().blogs.find_one(public_filter({"slug": slug}))
    if not blog:
        return _not_found("Blog")
    return jsonify({"blog": serialize_document(blog)})


@content_bp.get("/services")
def list_services():
    filters = {}
    category = request.args.get("category", "").strip()
    if category and category.lower() != "all":
        filters["categoryKey"] = category

    services = get_mongo_db().services.find(public_filter(filters)).sort("order", 1)
    return jsonify({"items": [serialize_document(service) for service in services]})


@content_bp.get("/pricing-packages")
def list_pricing_packages():
    filters = {}
    category = request.args.get("category", "").strip()
    if category and category.lower() != "all":
        filters["category"] = category

    packages = get_mongo_db().pricing_packages.find(public_filter(filters)).sort("order", 1)
    return jsonify({"items": [serialize_document(package) for package in packages]})


@content_bp.get("/portfolio-projects")
def list_portfolio_projects():
    filters = {}
    category = request.args.get("category", "").strip()
    if category and category.lower() != "all":
        filters["category"] = category

    projects = get_mongo_db().portfolio_projects.find(public_filter(filters)).sort("order", 1)
    return jsonify({"items": [serialize_document(project) for project in projects]})


@content_bp.get("/testimonials")
def list_testimonials():
    testimonials = get_mongo_db().testimonials.find(public_filter()).sort("order", 1)
    return jsonify({"items": [serialize_document(testimonial) for testimonial in testimonials]})
