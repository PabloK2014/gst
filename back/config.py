from pathlib import Path
import os

BASE_STORAGE_DIR = "/data" if os.getenv("RAILWAY_ENVIRONMENT") else "./data"

PRODUCTS_DIR = Path(BASE_STORAGE_DIR) / "products"
AVATARS_DIR = Path(BASE_STORAGE_DIR) / "avatars"

PRODUCTS_DIR.mkdir(parents=True, exist_ok=True)
AVATARS_DIR.mkdir(parents=True, exist_ok=True)