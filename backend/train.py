"""
train.py — Portfolio RAG Training Script
=========================================
Run this ONCE (locally or on the server) to index your portfolio data
into ChromaDB so the AI agent can retrieve it.

Usage:
    python train.py

What it does:
    1. Reads data/portfolio_data.json
    2. Converts each section (about, skills, projects, etc.) to Documents
    3. Splits large sections into smaller chunks
    4. Embeds each chunk using all-MiniLM-L6-v2 (free, local, ~90 MB)
    5. Stores embeddings + text in ./chroma_db/

After running: commit chroma_db/ to Git OR let Render rebuild it on deploy.
"""

import json
import os
import sys
import shutil
import logging

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(level=logging.INFO, format="%(asctime)s — %(levelname)s — %(message)s")
logger = logging.getLogger(__name__)

CHROMA_PATH     = os.getenv("CHROMA_PATH",     "./chroma_db")
DATA_FILE       = "./data/portfolio_data.json"
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")


# ── Document builders ─────────────────────────────────────────────────────────

def _build_documents(data: dict) -> list[Document]:
    """Convert each section of the portfolio JSON into a LangChain Document."""
    docs: list[Document] = []

    # — About —
    if about := data.get("about"):
        docs.append(Document(
            page_content=f"About Mustafiz Khan:\n{about}",
            metadata={"source": "about"},
        ))

    # — Skills —
    for category, skills in data.get("skills", {}).items():
        docs.append(Document(
            page_content=f"{category}: {', '.join(skills)}",
            metadata={"source": "skills", "category": category},
        ))

    # — Projects —
    for project in data.get("projects", []):
        highlights = "; ".join(project.get("highlights", []))
        tech       = ", ".join(project.get("tech_stack", []))
        text = (
            f"Project: {project['name']}\n"
            f"Description: {project['description']}\n"
            f"Tech stack: {tech}\n"
            f"Status: {project.get('status', 'Completed')}\n"
            f"GitHub: {project.get('github', 'N/A')}\n"
            f"Demo: {project.get('demo', 'N/A')}\n"
            f"Highlights: {highlights}"
        )
        docs.append(Document(
            page_content=text,
            metadata={"source": "projects", "name": project["name"]},
        ))

    # — Education —
    for edu in data.get("education", []):
        courses = ", ".join(edu.get("courses", []))
        text = (
            f"Education: {edu['degree']} in {edu['field']}\n"
            f"Institution: {edu['institution']}\n"
            f"Duration: {edu['duration']}\n"
            f"Grade / CGPA: {edu.get('grade', 'N/A')}\n"
            f"Key courses: {courses}"
        )
        docs.append(Document(
            page_content=text,
            metadata={"source": "education"},
        ))

    # — Experience —
    for exp in data.get("experience", []):
        contributions = "; ".join(exp.get("contributions", []))
        text = (
            f"Experience: {exp['role']} at {exp['company']}\n"
            f"Duration: {exp['duration']}\n"
            f"Description: {exp['description']}\n"
            f"Key contributions: {contributions}"
        )
        docs.append(Document(
            page_content=text,
            metadata={"source": "experience"},
        ))

    # — Achievements —
    if achievements := data.get("achievements"):
        text = "Achievements and certifications:\n" + "\n".join(f"- {a}" for a in achievements)
        docs.append(Document(
            page_content=text,
            metadata={"source": "achievements"},
        ))

    # — Interests —
    if interests := data.get("interests"):
        text = "Interests and passions:\n" + "\n".join(f"- {i}" for i in interests)
        docs.append(Document(
            page_content=text,
            metadata={"source": "interests"},
        ))

    # — Contact —
    if contact := data.get("contact"):
        text = (
            f"Contact Mustafiz Khan:\n"
            f"Email: {contact.get('email', 'N/A')}\n"
            f"GitHub: {contact.get('github', 'N/A')}\n"
            f"LinkedIn: {contact.get('linkedin', 'N/A')}\n"
            f"Location: {contact.get('location', 'N/A')}\n"
            f"Availability: {contact.get('availability', 'N/A')}"
        )
        docs.append(Document(
            page_content=text,
            metadata={"source": "contact"},
        ))

    return docs


# ── Main ──────────────────────────────────────────────────────────────────────

def train() -> None:
    logger.info("=" * 55)
    logger.info("  Mustafiz Portfolio — RAG Training Script")
    logger.info("=" * 55)

    # 1. Load JSON
    if not os.path.exists(DATA_FILE):
        logger.error(f"❌  Data file not found: {DATA_FILE}")
        logger.error("    Fill in data/portfolio_data.json with YOUR info first!")
        sys.exit(1)

    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    logger.info(f"✅  Loaded {DATA_FILE}")

    # 2. Build documents
    documents = _build_documents(data)
    logger.info(f"📄  Built {len(documents)} document sections")

    # 3. Split into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=400,
        chunk_overlap=50,
    )
    chunks = splitter.split_documents(documents)
    logger.info(f"✂️   Split into {len(chunks)} chunks")

    # 4. Load embedding model
    logger.info(f"🔢  Loading embedding model: {EMBEDDING_MODEL}")
    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL,
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": True},
    )
    logger.info("✅  Embedding model ready")

    # 5. Clear old vector store and rebuild
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)
        logger.info(f"🗑️   Cleared old vector store at {CHROMA_PATH}")

    logger.info("💾  Indexing chunks into ChromaDB...")
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=CHROMA_PATH,
        collection_name="portfolio",
    )

    count = vectorstore._collection.count()
    logger.info(f"\n🎉  Training complete! {count} chunks stored in {CHROMA_PATH}/")
    logger.info("\nNext steps:")
    logger.info("  1. Start server:  uvicorn main:app --reload --port 8000")
    logger.info("  2. Test chat:     curl -X POST http://localhost:8000/api/v1/chat \\")
    logger.info('                         -H "Content-Type: application/json" \\')
    logger.info('                         -d \'{"message": "What are your skills?"}\'')
    logger.info("  3. View API docs: http://localhost:8000/docs\n")


if __name__ == "__main__":
    train()
