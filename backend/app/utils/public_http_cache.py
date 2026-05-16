"""Which public GET /api/* responses may be cached by browsers and CDNs."""


def is_browser_cacheable_public_path(path: str) -> bool:
    """True for read-only CMS + SEO endpoints (not admin, auth, uploads)."""
    if not path.startswith("/api/"):
        return False
    if path.startswith("/api/admin") or path.startswith("/api/auth") or path.startswith("/api/upload"):
        return False

    prefixes = (
        "/api/settings/public",
        "/api/scholarships",
        "/api/blogs",
        "/api/services",
        "/api/pricing-packages",
        "/api/portfolio-projects",
        "/api/testimonials",
        "/api/ads",
        "/api/seo/",
        "/api/sitemap",
        "/api/robots",
    )
    for p in prefixes:
        if path == p or path.startswith(p + "/"):
            return True
    return False
