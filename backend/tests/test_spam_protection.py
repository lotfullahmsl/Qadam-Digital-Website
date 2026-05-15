def test_contact_submit_rejects_honeypot(client):
    res = client.post(
        "/api/contact-requests",
        json={
            "fullName": "Test User",
            "email": "test@example.com",
            "message": "Hello",
            "_gotcha": "http://spam.example",
        },
    )
    assert res.status_code == 400
