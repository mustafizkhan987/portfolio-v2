"""
RAG Agent — Google Gemini (REST API)
─────────────────────────────────────
User question → inject portfolio data as context → Gemini generates grounded answer.

Uses Gemini 2.0 Flash Lite via direct REST API calls.
"""

import os
import json
import asyncio
import logging
import httpx

logger = logging.getLogger(__name__)

# Load the JSON data directly
DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "portfolio_data.json")

GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models"
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash-lite")


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
- Use markdown formatting where appropriate (bold, lists, etc).
- Keep answers concise — 2-4 sentences for simple questions, more for detailed ones.

Here is ALL of the information about Mustafiz Khan:
"""


# ── Public API ─────────────────────────────────────────────────────────────────

async def get_rag_response(question: str, history: list[dict] | None = None) -> tuple[str, list[str]]:
    """
    Generate an AI response using Google Gemini REST API with portfolio context.
    Returns (answer_text, list_of_source_labels).
    """
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise RuntimeError(
            "GOOGLE_API_KEY not set!\n"
            "  → Get a free key at https://aistudio.google.com/apikey\n"
        )

    portfolio_data = _load_portfolio_data()

    # Build conversation contents
    contents = []

    # Add chat history if available (skip the initial greeting from the UI)
    if history:
        for msg in history[:-1]:
            role = "user" if msg.get("role") == "user" else "model"
            contents.append({
                "role": role,
                "parts": [{"text": msg["content"]}]
            })

    # Add the current question
    contents.append({
        "role": "user",
        "parts": [{"text": question}]
    })

    # Build request body
    request_body = {
        "system_instruction": {
            "parts": [{"text": SYSTEM_PROMPT + portfolio_data}]
        },
        "contents": contents,
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 800,
        }
    }

    url = f"{GEMINI_BASE_URL}/{GEMINI_MODEL}:generateContent?key={api_key}"

    # Retry with exponential backoff for rate limits
    max_retries = 3
    for attempt in range(max_retries):
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(url, json=request_body)

            if response.status_code == 429:
                wait_time = (attempt + 1) * 15  # 15s, 30s, 45s
                logger.warning(f"Rate limited (429), retrying in {wait_time}s (attempt {attempt + 1}/{max_retries})")
                await asyncio.sleep(wait_time)
                continue

            if response.status_code != 200:
                error_detail = response.text
                logger.error(f"Gemini API error {response.status_code}: {error_detail}")
                raise Exception(f"Gemini API returned {response.status_code}")

            result = response.json()
            answer = result["candidates"][0]["content"]["parts"][0]["text"]
            logger.info(f"✅ Gemini response generated ({len(answer)} chars)")
            sources = ["portfolio_data"]
            return answer, sources

        except Exception as e:
            if attempt < max_retries - 1 and "429" in str(e):
                continue
            logger.error(f"Gemini API error: {e}")
            break

    answer = (
        "I'm sorry, I'm having trouble connecting right now. "
        "Please try again in a moment, or reach out to Mustafiz directly at "
        "mustafizkhanmohammad39@gmail.com"
    )
    sources = ["portfolio_data"]
    return answer, sources
