"""
RAG Agent
─────────
User question → retrieve top-k portfolio chunks from ChromaDB
             → inject as context → LLM generates grounded answer

LLM priority:
  1. Groq (free — llama-3.1-8b-instant, 14 400 tokens/min)
  2. Anthropic Claude (haiku — cheapest option)
  Both are set via env vars; Groq is recommended for free hosting.
"""

import os
import asyncio
import logging

from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

from rag.vector_store import get_vectorstore

logger = logging.getLogger(__name__)

# ── System prompt ─────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """\
You are a helpful AI assistant embedded in Mustafiz Khan's portfolio website.
Your job is to answer visitors' questions about Mustafiz — his skills, projects,
education, achievements, and how to contact him.

Rules:
- Answer ONLY from the provided context. If the answer isn't there, say so.
- Be friendly, concise, and professional (like Mustafiz himself).
- Never invent facts, links, or numbers not in the context.
- If asked something personal/off-topic, politely redirect to Mustafiz's work.

Context:
{context}
"""


# ── LLM factory ───────────────────────────────────────────────────────────────

def _get_llm():
    """Pick the best available free/cheap LLM."""

    groq_key = os.getenv("GROQ_API_KEY")
    if groq_key:
        from langchain_groq import ChatGroq
        logger.info("🤖 Using Groq (llama-3.1-8b-instant) — free tier")
        return ChatGroq(
            api_key=groq_key,
            model_name="llama-3.1-8b-instant",  # Fast and generous free tier
            temperature=0.3,
            max_tokens=600,
        )

    anthropic_key = os.getenv("ANTHROPIC_API_KEY")
    if anthropic_key:
        from langchain_anthropic import ChatAnthropic
        logger.info("🤖 Using Claude Haiku (Anthropic)")
        return ChatAnthropic(
            api_key=anthropic_key,
            model="claude-haiku-4-5-20251001",
            temperature=0.3,
            max_tokens=600,
        )

    raise RuntimeError(
        "No LLM API key found!\n"
        "  → Set GROQ_API_KEY  (free at https://console.groq.com)\n"
        "  → OR set ANTHROPIC_API_KEY"
    )


# ── RAG chain builder ─────────────────────────────────────────────────────────

def _build_chain():
    """Assemble the full RAG chain (built fresh per request to keep it stateless)."""
    vectorstore = get_vectorstore()

    retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 4},  # top-4 most relevant portfolio chunks
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        ("human",  "{input}"),
    ])

    llm               = _get_llm()
    doc_chain         = create_stuff_documents_chain(llm, prompt)
    retrieval_chain   = create_retrieval_chain(retriever, doc_chain)

    return retrieval_chain


# ── Public API ─────────────────────────────────────────────────────────────────

async def get_rag_response(question: str) -> tuple[str, list[str]]:
    """
    Run the RAG pipeline asynchronously.
    Returns (answer_text, list_of_source_labels).
    """
    chain  = _build_chain()

    # LangChain chains are synchronous — run in a thread pool so we don't
    # block the FastAPI event loop.
    loop   = asyncio.get_event_loop()
    result = await loop.run_in_executor(
        None,
        lambda: chain.invoke({"input": question}),
    )

    answer = result.get("answer", "I couldn't find an answer to that.")

    # Collect unique source labels for transparency
    source_docs = result.get("context", [])
    sources = list({
        doc.metadata.get("source", "portfolio")
        for doc in source_docs
    })

    return answer, sources
