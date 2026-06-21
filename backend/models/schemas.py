from pydantic import BaseModel, EmailStr, Field
from typing import Optional


# ── Contact Form ──────────────────────────────────────────────────────────────

class ContactRequest(BaseModel):
    name:    str      = Field(..., min_length=2, max_length=100,  description="Your full name")
    email:   EmailStr = Field(...,                                 description="Your email address")
    subject: Optional[str] = Field(None, max_length=200,          description="Subject (optional)")
    company: Optional[str] = Field(None, max_length=200,          description="Company (optional)")
    message: str      = Field(..., min_length=10, max_length=2000, description="Your message")

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Priya Sharma",
                "email": "priya@example.com",
                "subject": "Collaboration",
                "company": "Tech Corp",
                "message": "Hi Mustafiz, I'd love to collaborate on an AI project!",
            }
        }
    }


class ContactResponse(BaseModel):
    success: bool
    message: str
    id:      Optional[int] = None


# ── AI Chat ───────────────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message:    str           = Field(..., min_length=1, max_length=500, description="Your question")
    session_id: Optional[str] = Field(None, description="Session ID for multi-turn conversations")
    history:    list[dict]    = Field(default_factory=list, description="Previous messages for context")

    model_config = {
        "json_schema_extra": {
            "example": {
                "message": "What are Mustafiz's top AI/ML projects?",
                "history": []
            }
        }
    }


class ChatResponse(BaseModel):
    response:   str
    sources:    list[str] = []
    session_id: Optional[str] = None
