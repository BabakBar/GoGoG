\"""Authentication module for GoGoG Python backend."""

import os
import logging
from datetime import datetime, timedelta
from typing import Optional, Dict, Any

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from python_backend.db.database import Database
from python_backend.models.models import User

# Configure logging
logger = logging.getLogger("gogog.auth")

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
JWT_SECRET = os.getenv("JWT_SECRET", "change_this_to_a_secure_random_string")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_MINUTES = 60 * 24  # 24 hours


def get_password_hash(password: str) -> str:
    """Generate a password hash."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash."""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Create a new JWT access token."""
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=JWT_EXPIRATION_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    
    return encoded_jwt


async def get_user_by_username(username: str, session: AsyncSession) -> Optional[User]:
    """Get a user by username."""
    result = await session.execute(select(User).where(User.username == username))
    return result.scalars().first()


async def get_user_by_email(email: str, session: AsyncSession) -> Optional[User]:
    """Get a user by email."""
    result = await session.execute(select(User).where(User.email == email))
    return result.scalars().first()


async def get_user_by_id(user_id: str, session: AsyncSession) -> Optional[User]:
    """Get a user by ID."""
    result = await session.execute(select(User).where(User.id == user_id))
    return result.scalars().first()


async def authenticate_user(username: str, password: str, session: AsyncSession) -> Optional[User]:
    """Authenticate a user with username and password."""
    user = await get_user_by_username(username, session)
    
    if not user:
        return None
    
    if not verify_password(password, user.password_hash):
        return None
    
    return user


class JWTBearer(HTTPBearer):
    """JWT Bearer token authentication."""
    
    def __init__(self, auto_error: bool = True):
        super().__init__(auto_error=auto_error)
    
    async def __call__(self, request: Request) -> str:
        """Validate the JWT token and return the user ID."""
        # Get database from app state
        database: Database = request.app.state.database
        
        # If we're using a mock database in development, return a mock user ID
        if database.is_mock_db():
            logger.info("Using mock authentication")
            return "00000000-0000-0000-0000-000000000000"  # Mock user ID
        
        # Get credentials from request
        credentials: HTTPAuthorizationCredentials = await super().__call__(request)
        
        # Validate token
        try:
            payload = jwt.decode(
                credentials.credentials,
                JWT_SECRET,
                algorithms=[JWT_ALGORITHM]
            )
            user_id: str = payload.get("sub")
            if user_id is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            return user_id
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )