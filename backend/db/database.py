"""Database module for GoGoG Python backend."""

import os
import logging
from typing import Optional, AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Configure logging
logger = logging.getLogger("gogog.db")

# Create SQLAlchemy base class
Base = declarative_base()


class Database:
    """Database connection and operations."""
    
    def __init__(self, engine=None, session_factory=None):
        self.engine = engine
        self.session_factory = session_factory
    
    @classmethod
    async def create(cls) -> 'Database':
        """Create a new database connection."""
        # Get database connection details from environment variables
        host = os.getenv("DB_HOST", "localhost")
        port = os.getenv("DB_PORT", "5432")
        user = os.getenv("DB_USER", "postgres")
        password = os.getenv("DB_PASSWORD", "postgres")
        dbname = os.getenv("DB_NAME", "gogog")
        sslmode = os.getenv("DB_SSLMODE", "disable")
        
        # Create connection URL
        db_url = f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{dbname}"
        
        # Create engine
        engine = create_async_engine(
            db_url,
            echo=False,
            pool_size=5,
            max_overflow=10,
            pool_timeout=30,
            pool_recycle=1800,
        )
        
        # Create session factory
        session_factory = async_sessionmaker(
            engine,
            expire_on_commit=False,
            class_=AsyncSession,
        )
        
        return cls(engine=engine, session_factory=session_factory)
    
    async def get_session(self) -> AsyncSession:
        """Get a new database session."""
        if self.session_factory is None:
            raise RuntimeError("Database not initialized")
        
        return self.session_factory()
    
    async def close(self) -> None:
        """Close the database connection."""
        if self.engine is not None:
            await self.engine.dispose()
    
    def is_mock_db(self) -> bool:
        """Check if this is a mock database (no actual connection)."""
        return self.engine is None


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """Get a database session from the app state."""
    from fastapi import Request, Depends
    
    async def _get_session(request: Request) -> AsyncGenerator[AsyncSession, None]:
        database: Database = request.app.state.database
        async with database.get_session() as session:
            yield session
    
    return _get_session