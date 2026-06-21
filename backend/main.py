"""
Mustafiz Khan — Portfolio Backend API
--------------------------------------
FastAPI app with:
  - /api/v1/contact  → contact form (stores in SQLite, optional email notification)
  - /api/v1/chat     → RAG AI agent (answers questions about the portfolio)
"""

import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from db.database import init_db
from routes.contact import router as contact_router
from routes.chat import router as chat_router

load_dotenv()
logging.basicConfig(level=logging.INFO, format="%(asctime)s — %(levelname)s — %(message)s")
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup / shutdown lifecycle"""
    logger.info("🚀 Starting Portfolio API...")

    # 1. Create DB tables if they don't exist
    await init_db()
    logger.info("✅ Database ready")

    # Vector store initialization removed (using direct prompt injection instead)

    logger.info("🎉 API is live!\n")
    yield
    logger.info("Shutting down...")


app = FastAPI(
    title="Mustafiz Khan Portfolio API",
    description="Backend for contact form + RAG AI agent",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS ──────────────────────────────────────────────────────────────────────
FRONTEND_URL = os.getenv("FRONTEND_URL", "*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ────────────────────────────────────────────────────────────────────
app.include_router(contact_router, prefix="/api/v1", tags=["Contact"])
app.include_router(chat_router,    prefix="/api/v1", tags=["AI Chat"])


@app.get("/", tags=["Health"])
async def root():
    return {
        "message": "Mustafiz Khan Portfolio API",
        "status": "running",
        "version": "1.0.0",
        "endpoints": {
            "contact": "POST /api/v1/contact",
            "chat":    "POST /api/v1/chat",
            "health":  "GET  /health",
            "docs":    "GET  /docs",
        },
    }


@app.get("/health", tags=["Health"])
async def health():
    return {"status": "healthy"}
