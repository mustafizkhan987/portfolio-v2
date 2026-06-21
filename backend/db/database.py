"""
Async SQLite database using SQLAlchemy 2.0
No external DB needed — SQLite file lives alongside the app.
"""

import os
from datetime import datetime
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Text, DateTime, Integer, Boolean

# SQLite file path (overridable via env for Postgres on paid plans)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./portfolio.db")

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


class ContactSubmission(Base):
    """Every contact form submission is stored here."""
    __tablename__ = "contacts"

    id:         Mapped[int]      = mapped_column(Integer,     primary_key=True, autoincrement=True)
    name:       Mapped[str]      = mapped_column(String(100))
    email:      Mapped[str]      = mapped_column(String(200))
    subject:    Mapped[str|None] = mapped_column(String(200), nullable=True)
    message:    Mapped[str]      = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime,    default=datetime.utcnow)
    is_read:    Mapped[bool]     = mapped_column(Boolean,     default=False)

    def __repr__(self) -> str:
        return f"<Contact #{self.id} from {self.name} ({self.email})>"


async def init_db():
    """Create tables on first startup."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_db():
    """Dependency injection — yields an async DB session."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
