from flask import Blueprint, jsonify, request

from app.extensions import get_mongo_db
from app.services.content_service import (
    find_public_by_id,
    paginated_public_query,
    public_filter,
    serialize_document,
    text_or_regex_query,
)
from app.services.locale_content import localize_structure, match_regex_or_i18n, match_scalar_or_i18n, normalize_lang

content_bp = Blueprint("content", __name__)


def _public_lang():
    return normalize_lang(request.args.get("lang"))


def _not_found(resource):
    return jsonify({"message": f"{resource} not found"}), 404


@content_bp.get("/scholarships")
def list_scholarships():
    lang = _public_lang()
    search = request.args.get("search", "").strip()
    country = request.args.get("country", "").strip()
    degree = request.args.get("degree", "").strip()
    deadline = request.args.get("deadline", "").strip()

    status_q = public_filter({})
    parts = []
    if country and country.lower() != "all":
        parts.append(match_scalar_or_i18n("country", country))
    if degree and degree.lower() != "all":
        pat = {"$regex": degree, "$options": "i"}
        parts.append(match_regex_or_i18n("degree", pat))
    if deadline:
        parts.append({"deadline": {"$regex": deadline, "$options": "i"}})
    tq = text_or_regex_query(search, ["title", "university", "country", "degree"])
    if tq:
        parts.append(tq)
    query = {"$and": [status_q, *parts]} if parts else status_q
    return jsonify(paginated_public_query("scholarships", query, request.args, lang=lang))


@content_bp.get("/scholarships/<scholarship_id>")
def get_scholarship(scholarship_id):
    lang = _public_lang()
    scholarship = find_public_by_id("scholarships", scholarship_id, lang=lang)
    if not scholarship:
        return _not_found("Scholarship")
    return jsonify({"scholarship": scholarship})


@content_bp.get("/blogs")
def list_blogs():
    lang = _public_lang()
    search = request.args.get("search", "").strip()
    category = request.args.get("category", "").strip()

    parts = []
    if category and category.lower() != "all":
        parts.append(match_scalar_or_i18n("category", category))
    tq = text_or_regex_query(search, ["title", "excerpt", "content", "category"])
    if tq:
        parts.append(tq)
    query = {"$and": [public_filter({}), *parts]} if parts else public_filter({})
    return jsonify(paginated_public_query("blogs", query, request.args, lang=lang))


@content_bp.get("/blogs/<slug>")
def get_blog(slug):
    lang = _public_lang()
    blog = get_mongo_db().blogs.find_one(public_filter({"slug": slug}))
    if not blog:
        return _not_found("Blog")
    return jsonify({"blog": localize_structure(serialize_document(blog), lang)})


@content_bp.get("/services")
def list_services():
    lang = _public_lang()
    filters = {}
    category = request.args.get("category", "").strip()
    if category and category.lower() != "all":
        filters["categoryKey"] = category

    services = get_mongo_db().services.find(public_filter(filters)).sort("order", 1)
    return jsonify({"items": [localize_structure(serialize_document(service), lang) for service in services]})


@content_bp.get("/pricing-packages")
def list_pricing_packages():
    lang = _public_lang()
    filters = {}
    category = request.args.get("category", "").strip()
    if category and category.lower() != "all":
        filters["category"] = category

    packages = get_mongo_db().pricing_packages.find(public_filter(filters)).sort("order", 1)
    return jsonify({"items": [localize_structure(serialize_document(package), lang) for package in packages]})


@content_bp.get("/portfolio-projects")
def list_portfolio_projects():
    lang = _public_lang()
    filters = {}
    category = request.args.get("category", "").strip()
    if category and category.lower() != "all":
        filters["category"] = category

    projects = get_mongo_db().portfolio_projects.find(public_filter(filters)).sort("order", 1)
    return jsonify({"items": [localize_structure(serialize_document(project), lang) for project in projects]})


@content_bp.get("/testimonials")
def list_testimonials():
    lang = _public_lang()
    testimonials = get_mongo_db().testimonials.find(public_filter()).sort("order", 1)
    return jsonify({"items": [localize_structure(serialize_document(testimonial), lang) for testimonial in testimonials]})
