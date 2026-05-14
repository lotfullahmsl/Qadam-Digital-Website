import argparse
import getpass
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app import create_app
from app.services.auth_service import ensure_auth_indexes, serialize_admin, upsert_admin


def main():
    parser = argparse.ArgumentParser(description="Create or update an admin account.")
    parser.add_argument("--name", required=True)
    parser.add_argument("--email", required=True)
    parser.add_argument("--password")
    args = parser.parse_args()

    password = args.password or getpass.getpass("Password: ")

    app = create_app()
    with app.app_context():
        ensure_auth_indexes()
        admin = upsert_admin(args.name, args.email, password)
        print(f"Admin ready: {serialize_admin(admin)}")


if __name__ == "__main__":
    main()
