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
import json
import asyncio
import logging

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

logger = logging.getLogger(__name__)

# Load the JSON data directly
DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "portfolio_data.json")

def _load_portfolio_data() -> str:
    if not os.path.exists(DATA_FILE):
        return "Mustafiz Khan's portfolio data is currently unavailable."
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    return json.dumps(data, indent=2)

# ── System prompt ─────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """\
You are a helpful AI assistant embedded in Mustafiz Khan's portfolio website.
Your job is to answer visitors' questions about Mustafiz — his skills, projects,
education, achievements, and how to contact him.

Rules:
- Answer ONLY from the provided context below. If the answer isn't there, say so.
- Be friendly, concise, and professional (like Mustafiz himself).
- Never invent facts, links, or numbers not in the context.
- If asked something personal/off-topic, politely redirect to Mustafiz's work.

Here is ALL of the information about Mustafiz Khan:
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

    raise RuntimeError(
        "No LLM API key found!\n"
        "  → Set GROQ_API_KEY  (free at https://console.groq.com)\n"
    )

# ── Public API ─────────────────────────────────────────────────────────────────

async def get_rag_response(question: str) -> tuple[str, list[str]]:
    """
    Run the AI response generation asynchronously using direct context injection.
    Returns (answer_text, list_of_source_labels).
    """
    portfolio_data = _load_portfolio_data()
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT.replace("{context}", portfolio_data)),
        ("human", "{input}"),
    ])
    
    llm = _get_llm()
    chain = prompt | llm | StrOutputParser()

    # Run the synchronous chain in an executor thread
    loop = asyncio.get_event_loop()
    try:
        answer = await loop.run_in_executor(
            None,
            lambda: chain.invoke({"input": question}),
        )
    except Exception as e:
        logger.error(f"Error generating response: {e}")
        answer = "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later."

    # Since we use the entire portfolio data directly, the source is always the portfolio itself
    sources = ["portfolio_data"]

    return answer, sources
