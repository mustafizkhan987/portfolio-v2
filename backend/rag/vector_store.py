"""
ChromaDB vector store — loaded once at startup, reused for all requests.
Run train.py first to populate it with your portfolio data.
"""

import os
import logging
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma

logger = logging.getLogger(__name__)

CHROMA_PATH     = os.getenv("CHROMA_PATH",     "./chroma_db")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")  # ~90 MB, CPU-friendly

_embeddings  = None
_vectorstore = None


def get_embeddings() -> HuggingFaceEmbeddings:
    """Lazy-load the embedding model (downloaded once, cached by HuggingFace)."""
    global _embeddings
    if _embeddings is None:
        logger.info(f"📦 Loading embedding model: {EMBEDDING_MODEL}")
        _embeddings = HuggingFaceEmbeddings(
            model_name=EMBEDDING_MODEL,
            model_kwargs={"device": "cpu"},
            encode_kwargs={"normalize_embeddings": True},
        )
        logger.info("✅ Embedding model loaded")
    return _embeddings


def get_vectorstore() -> Chroma:
    """Return the singleton ChromaDB vector store."""
    global _vectorstore
    if _vectorstore is None:
        _vectorstore = Chroma(
            persist_directory=CHROMA_PATH,
            embedding_function=get_embeddings(),
            collection_name="portfolio",
        )
    return _vectorstore


def init_vector_store() -> None:
    """Called at startup — warns if the store is empty (train.py not run yet)."""
    try:
        vs    = get_vectorstore()
        count = vs._collection.count()
        if count == 0:
            logger.warning("⚠️  Vector store is EMPTY — run:  python train.py")
        else:
            logger.info(f"✅ Vector store ready — {count} chunks indexed")
    except Exception as exc:
        logger.error(f"Vector store init error: {exc}")
