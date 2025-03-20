\"""Authentication routes for GoGoG Python backend."""

import logging
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from python_backend.auth.auth import authenticate_user, create_access_token, get_password_hash
from python_backend.db.database import get_session
from python_backend.models.models import User
from python_backend.schemas.auth import LoginRequest, RegisterRequest, UserResponse

# Configure logging
logger = logging.getLogger("gogog.auth.routes")

# Create router
router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(request: RegisterRequest, session: AsyncSession = Depends(get_session)):
    """Register a new user."""
    # Check if username already exists
    existing_user = await session.execute(f"SELECT username FROM users WHERE username = '{request.username}'")
    if existing_user.scalar_one_or_none() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already exists")
    
    # Check if email already exists
    existing_email = await session.execute(f"SELECT email FROM users WHERE email = '{request.email}'")
    if existing_email.scalar_one_or_none() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already exists")
    
    # Hash password
    hashed_password = get_password_hash(request.password)
    
    # Create user
    now = datetime.utcnow()
    new_user = User(
        username=request.username,
        email=request.email,
        password_hash=hashed_password,
        points=0,
        level=1,
        streak=0,
        last_streak_day=now,
        created_at=now,
        last_login_at=now
    )
    
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    
    # Return user without password
    return UserResponse.from_orm(new_user)


@router.post("/login", response_model=UserResponse)
async def login_user(request: LoginRequest, session: AsyncSession = Depends(get_session)):
    """Authenticate a user and return a JWT token."""
    user = await authenticate_user(request.username, request.password, session)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Update last login time
    now = datetime.utcnow()
    user.last_login_at = now
    await session.commit()
    
    # Generate token
    access_token = create_access_token(data={"sub": str(user.id)})
    
    # Return user with token
    response = UserResponse.from_orm(user)
    response.token = access_token
    
    return response