import pytest

from app import create_app
from app.config import Config


class TestConfig(Config):
    TESTING = True
    MONGO_URI = ""
    RATE_LIMITING_ENABLED = False
    RATELIMIT_ENABLED = False
    PROPAGATE_EXCEPTIONS = True


@pytest.fixture
def app():
    return create_app(TestConfig)


@pytest.fixture
def client(app):
    return app.test_client()
