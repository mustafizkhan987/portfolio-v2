"""
POST /api/v1/chat
-----------------
Visitor asks a question → RAG agent answers using portfolio knowledge.
"""

import uuid
import logging
from fastapi import APIRouter, HTTPException
from models.schemas import ChatRequest, ChatResponse
from rag.agent import get_rag_response

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/chat", response_model=ChatResponse)
async def chat(body: ChatRequest):
    """
    Ask the AI agent anything about Mustafiz:
      - Skills and tech stack
      - Projects and what they do
      - Education and background
      - How to get in touch
    """
    session_id = body.session_id or str(uuid.uuid4())

    try:
        logger.info(f"[{session_id}] Q: {body.message[:80]}")
        answer, sources = await get_rag_response(body.message)
        logger.info(f"[{session_id}] A: {answer[:80]}...")

        return ChatResponse(
            response=answer,
            sources=sources,
            session_id=session_id,
        )

    except Exception as exc:
        logger.error(f"[{session_id}] Chat error: {exc}")
        raise HTTPException(
            status_code=500,
            detail="Agent is temporarily unavailable. Please try again.",
        )
