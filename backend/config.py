# backend/config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Database
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://pandey:ayush123@localhost/zettabyte_db")
    
    # JWT
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 60
    
    # File paths
    QR_CODE_DIR = os.getenv("QR_CODE_DIR", "qr_codes")
    
    # CORS
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:3001").split(",")

settings = Settings()

# .env file (create this in your backend directory)
"""
DATABASE_URL=postgresql://pandey:ayush123@localhost/zettabyte_db
SECRET_KEY=your-super-secret-key-change-this-in-production
QR_CODE_DIR=qr_codes
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
"""