\"""Models for GoGoG Python backend."""

import uuid
from datetime import datetime
from typing import List, Optional

from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, DateTime, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from python_backend.db.database import Base


class User(Base):
    """User model representing a user account."""
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    points = Column(Integer, nullable=False, default=0)
    level = Column(Integer, nullable=False, default=1)
    streak = Column(Integer, nullable=False, default=0)
    last_streak_day = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False)
    last_login_at = Column(DateTime(timezone=True), nullable=False)

    # Relationships
    progress = relationship("UserProgress", back_populates="user")
    challenges = relationship("UserChallenge", back_populates="user")
    achievements = relationship("UserAchievement", back_populates="user")
    points_history = relationship("PointsHistory", back_populates="user")


class Module(Base):
    """Module model representing a learning module."""
    __tablename__ = "modules"

    id = Column(String(50), primary_key=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    objectives = Column(JSON, nullable=False)
    prerequisites = Column(JSON, nullable=False)
    order = Column(Integer, nullable=False)
    visualization = Column(String(100), nullable=False)

    # Relationships
    challenges = relationship("Challenge", back_populates="module")
    user_progress = relationship("UserProgress", back_populates="module")


class Challenge(Base):
    """Challenge model representing a single challenge within a module."""
    __tablename__ = "challenges"

    id = Column(String(50), primary_key=True)
    module_id = Column(String(50), ForeignKey("modules.id"), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    instructions = Column(Text, nullable=False)
    starter_code = Column(Text, nullable=False)
    test_cases = Column(JSON, nullable=False)
    visualization_params = Column(JSON, nullable=False)
    difficulty = Column(String(20), nullable=False)
    points = Column(Integer, nullable=False)
    order = Column(Integer, nullable=False)

    # Relationships
    module = relationship("Module", back_populates="challenges")
    user_challenges = relationship("UserChallenge", back_populates="challenge")


class UserProgress(Base):
    """UserProgress model tracking a user's progress through modules."""
    __tablename__ = "user_progress"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    module_id = Column(String(50), ForeignKey("modules.id"), nullable=False)
    progress = Column(Float, nullable=False, default=0)
    completed_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    user = relationship("User", back_populates="progress")
    module = relationship("Module", back_populates="user_progress")


class UserChallenge(Base):
    """UserChallenge model tracking a user's attempts and completions of challenges."""
    __tablename__ = "user_challenges"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    challenge_id = Column(String(50), ForeignKey("challenges.id"), nullable=False)
    completed = Column(Boolean, nullable=False, default=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    attempts = Column(Integer, nullable=False, default=0)
    solution = Column(Text, nullable=True)

    # Relationships
    user = relationship("User", back_populates="challenges")
    challenge = relationship("Challenge", back_populates="user_challenges")


class Achievement(Base):
    """Achievement model representing an accomplishment that users can unlock."""
    __tablename__ = "achievements"

    id = Column(String(50), primary_key=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    icon_path = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)
    condition = Column(Text, nullable=True)
    points = Column(Integer, nullable=False)

    # Relationships
    user_achievements = relationship("UserAchievement", back_populates="achievement")


class UserAchievement(Base):
    """UserAchievement model tracking which achievements a user has unlocked."""
    __tablename__ = "user_achievements"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    achievement_id = Column(String(50), ForeignKey("achievements.id"), nullable=False)
    unlocked_at = Column(DateTime(timezone=True), nullable=False)

    # Relationships
    user = relationship("User", back_populates="achievements")
    achievement = relationship("Achievement", back_populates="user_achievements")


class PointsHistory(Base):
    """PointsHistory model tracking point transactions for users."""
    __tablename__ = "points_history"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    reason = Column(String(100), nullable=False)
    challenge_id = Column(String(50), ForeignKey("challenges.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False)

    # Relationships
    user = relationship("User", back_populates="points_history")