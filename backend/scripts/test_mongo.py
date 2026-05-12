import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app import create_app
from app.extensions import get_mongo_client, get_mongo_db


def main():
    app = create_app()

    with app.app_context():
        client = get_mongo_client()
        db = get_mongo_db()

        if client is None or db is None:
            raise RuntimeError("MongoDB is not configured. Set MONGO_URI in backend/.env.")

        client.admin.command("ping")
        print(f"MongoDB connection OK: database={db.name}")


if __name__ == "__main__":
    main()
