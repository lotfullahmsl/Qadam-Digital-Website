def test_robots_returns_plain_text(client):
    res = client.get("/api/robots")
    assert res.status_code == 200
    assert b"User-agent" in res.data
    assert b"Sitemap:" in res.data


def test_sitemap_returns_xml(client):
    res = client.get("/api/sitemap")
    assert res.status_code == 200
    assert b"urlset" in res.data


def test_seo_page_home_json(client):
    res = client.get("/api/seo/page/home")
    assert res.status_code == 200
    payload = res.get_json()
    assert "meta" in payload
    assert payload["meta"].get("title")
