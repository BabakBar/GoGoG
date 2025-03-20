\"""Authentication schemas for GoGoG Python backend."""

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    """Schema for user registration request."""
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)


class LoginRequest(BaseModel):
    """Schema for user login request."""
    username: str
    password: str


class UserResponse(BaseModel):
    """Schema for user response."""
    id: UUID
    username: str
    email: str
    points: int
    level: int
    streak: int
    last_streak_day: datetime
    created_at: datetime
    last_login_at: datetime
    token: Optional[str] = None

    class Config:
        from_attributes = True
        from_orm = True