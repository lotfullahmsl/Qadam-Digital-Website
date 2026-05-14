from datetime import datetime, timezone
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app import create_app
from app.extensions import get_mongo_db
from app.services.content_service import ensure_content_indexes


NOW = datetime.now(timezone.utc)


SCHOLARSHIPS = [
    {
        "title": "DAAD Scholarship Germany",
        "country": "Germany",
        "university": "Various German Universities",
        "degree": "MS/PhD",
        "deadline": "October 2026",
        "fundingType": "Fully Funded",
        "description": "German Academic Exchange Service scholarships for graduate students.",
        "eligibility": {"en": ["Bachelor's degree with good GPA", "English or German language proficiency"]},
        "documents": {"en": ["Academic transcripts", "Motivation letter", "CV/Resume", "Language certificate"]},
        "benefits": {"en": ["Full tuition coverage", "Monthly stipend", "Health insurance", "Travel allowance"]},
        "steps": {"en": ["Choose your program", "Prepare documents", "Submit online application"]},
        "officialLink": "https://www.daad.de",
        "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
        "status": "Published",
        "order": 1,
    },
    {
        "title": "Chevening Scholarship UK",
        "country": "United Kingdom",
        "university": "UK Universities",
        "degree": "MS",
        "deadline": "November 2026",
        "fundingType": "Fully Funded",
        "description": "UK government scholarship for outstanding emerging leaders.",
        "eligibility": {"en": ["Bachelor's degree", "At least 2 years of work experience"]},
        "documents": {"en": ["Academic transcripts", "Personal statement", "Two references"]},
        "benefits": {"en": ["Full tuition fees", "Monthly living allowance", "Return flights"]},
        "steps": {"en": ["Register online", "Complete application", "Attend interview if shortlisted"]},
        "officialLink": "https://www.chevening.org",
        "image": "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&q=80",
        "status": "Published",
        "order": 2,
    },
    {
        "title": "Turkish Government Scholarship",
        "country": "Turkey",
        "university": "Turkish Universities",
        "degree": "BS/MS/PhD",
        "deadline": "February 2027",
        "fundingType": "Fully Funded",
        "description": "Government scholarship for international students at Turkish universities.",
        "eligibility": {"en": ["Strong academic record", "Meets program age requirements"]},
        "documents": {"en": ["Transcripts", "Passport", "Statement of purpose"]},
        "benefits": {"en": ["Tuition", "Accommodation", "Monthly stipend"]},
        "steps": {"en": ["Create account", "Select programs", "Submit documents"]},
        "officialLink": "https://www.turkiyeburslari.gov.tr",
        "image": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
        "status": "Published",
        "order": 3,
    },
]


BLOGS = [
    {
        "title": "Top Scholarships for Afghan Students in 2026",
        "slug": "top-scholarships-2026",
        "excerpt": "A practical list of strong scholarship options for Afghan and Pakistani students.",
        "category": "Scholarships",
        "author": "QADAM Team",
        "createdAt": "2026-01-15",
        "content": [
            {"type": "p", "text": "Finding the right scholarship can be life-changing."},
            {"type": "h", "text": "Start With Fully Funded Programs"},
            {"type": "p", "text": "DAAD, Chevening, Erasmus Mundus, and Turkiye Scholarships are strong starting points."},
        ],
        "image": "",
        "status": "Published",
        "order": 1,
    },
    {
        "title": "How to Write a Winning Motivation Letter",
        "slug": "how-to-write-motivation-letter",
        "excerpt": "Simple structure and tips for writing a clear scholarship motivation letter.",
        "category": "Education",
        "author": "QADAM Team",
        "createdAt": "2026-02-10",
        "content": [
            {"type": "p", "text": "A strong motivation letter connects your past, your goals, and the program."},
            {"type": "h", "text": "Be Specific"},
            {"type": "p", "text": "Use examples from your academic, volunteer, or work experience."},
        ],
        "image": "",
        "status": "Published",
        "order": 2,
    },
]


SERVICES = [
    {"icon": "school", "title": "Scholarship Guidance", "description": "Scholarship search, document review, and application support.", "to": "/scholarships", "categoryKey": "education", "status": "Published", "order": 1},
    {"icon": "web", "title": "Website Development", "description": "Modern business websites with responsive design and backend APIs.", "to": "/solutions", "categoryKey": "technology", "status": "Published", "order": 2},
    {"icon": "smart_toy", "title": "Digital Tools Subscriptions", "description": "Guidance and setup for AI and learning platform subscriptions.", "to": "/digital-tools", "categoryKey": "technology", "status": "Published", "order": 3},
]


PRICING_PACKAGES = [
    {"category": "ai", "name": "ChatGPT Plus", "price": "10", "badge": "Shared", "features": ["GPT-4 access", "Image tools", "Data analysis"], "status": "Published", "order": 1},
    {"category": "scholarship", "name": "Standard Scholarship Support", "price": "120", "popular": True, "features": ["Full application support", "Document review", "WhatsApp support"], "status": "Published", "order": 2},
    {"category": "web", "name": "Business Website", "price": "400", "popular": True, "features": ["5-page website", "CMS-ready structure", "SEO basics"], "status": "Published", "order": 3},
]


PORTFOLIO_PROJECTS = [
    {"title": "Clinic Management System", "description": "Patient records, appointments, billing, and reporting dashboard.", "category": "Database", "technologies": ["React", "Flask", "MongoDB"], "image": "", "status": "Published", "order": 1},
    {"title": "Business Website", "description": "Responsive website for a professional service business.", "category": "Website", "technologies": ["React", "Tailwind", "Flask"], "image": "", "status": "Published", "order": 2},
    {"title": "Social Media Campaign", "description": "Content planning and ad campaign management for a local brand.", "category": "Marketing", "technologies": ["Facebook Ads", "Instagram", "Analytics"], "image": "", "status": "Published", "order": 3},
]


TESTIMONIALS = [
    {"name": "Ahmad Karimi", "country": "Afghanistan", "text": "QADAM Digital helped me prepare a strong scholarship application.", "avatar": "AK", "rating": 5, "status": "Published", "order": 1},
    {"name": "Sara Mohammadi", "country": "Afghanistan", "text": "The CV writing service was professional and fast.", "avatar": "SM", "rating": 5, "status": "Published", "order": 2},
    {"name": "Bilal Yousafzai", "country": "Afghanistan", "text": "Their team built our business website cleanly and on time.", "avatar": "BY", "rating": 5, "status": "Published", "order": 3},
]


SEEDS = {
    "scholarships": ("title", SCHOLARSHIPS),
    "blogs": ("slug", BLOGS),
    "services": ("title", SERVICES),
    "pricing_packages": ("name", PRICING_PACKAGES),
    "portfolio_projects": ("title", PORTFOLIO_PROJECTS),
    "testimonials": ("name", TESTIMONIALS),
}


def upsert_seed(collection, unique_field, records):
    db = get_mongo_db()
    count = 0
    for record in records:
        payload = {**record, "updatedAt": NOW}
        update = {"$set": payload}
        if "createdAt" not in payload:
            update["$setOnInsert"] = {"createdAt": NOW}

        db[collection].update_one(
            {unique_field: record[unique_field]},
            update,
            upsert=True,
        )
        count += 1
    return count


def main():
    app = create_app()
    with app.app_context():
        ensure_content_indexes()
        for collection, (unique_field, records) in SEEDS.items():
            count = upsert_seed(collection, unique_field, records)
            print(f"Seeded {count} records into {collection}")


if __name__ == "__main__":
    main()
