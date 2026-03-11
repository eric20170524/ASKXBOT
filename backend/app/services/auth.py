from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
import os
from typing import Optional, Dict, Any
from fastapi import HTTPException, status
from app.db.database import get_db_connection

# Security settings
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here-please-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT u.*, e.email 
            FROM users u
            JOIN user_emails e ON u.id = e.user_id
            WHERE e.email = ?
        """, (email,))
        row = cursor.fetchone()
        return dict(row) if row else None

def authenticate_user(email: str, password: str) -> Optional[Dict[str, Any]]:
    user = get_user_by_email(email)
    if not user:
        return None
    if not user.get("password_hash"):
        return None
    if not verify_password(password, user["password_hash"]):
        return None
    return user

def register_user(first_name: str, last_name: str, email: str, password: str) -> Dict[str, Any]:
    # Check if email exists
    existing_user = get_user_by_email(email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = get_password_hash(password)
    
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        # Insert user
        cursor.execute("""
            INSERT INTO users (first_name, last_name, password_hash)
            VALUES (?, ?, ?)
        """, (first_name, last_name, hashed_password))
        
        user_id = cursor.lastrowid
        
        # Insert email
        cursor.execute("""
            INSERT INTO user_emails (user_id, email, is_primary, is_verified)
            VALUES (?, ?, 1, 0)
        """, (user_id, email))
        
        conn.commit()
        
        return {
            "id": user_id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "avatar_url": None
        }
