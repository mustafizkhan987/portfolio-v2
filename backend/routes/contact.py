"""
POST /api/v1/contact
--------------------
Receives contact form data → saves to SQLite → optionally sends Gmail notification.

Gmail setup (optional):
  1. Enable 2-FA on your Gmail
  2. Go to: Google Account → Security → App Passwords → Create one
  3. Set SMTP_USER, SMTP_PASS, NOTIFY_EMAIL in .env
"""

import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select

from models.schemas import ContactRequest, ContactResponse
from db.database import get_db, ContactSubmission

router = APIRouter()
logger = logging.getLogger(__name__)


# ── Email helper ──────────────────────────────────────────────────────────────

def _send_email_notification(contact: ContactRequest) -> None:
    """Fire-and-forget email alert when someone fills the contact form."""
    smtp_host  = os.getenv("SMTP_HOST",    "smtp.gmail.com")
    smtp_port  = int(os.getenv("SMTP_PORT", "465"))
    smtp_user  = os.getenv("SMTP_USER")
    smtp_pass  = os.getenv("SMTP_PASS")
    notify_to  = os.getenv("NOTIFY_EMAIL")

    if not all([smtp_user, smtp_pass, notify_to]):
        logger.info("Email env vars not set — skipping notification")
        return

    try:
        msg = MIMEMultipart("alternative")
        msg["From"]    = smtp_user
        msg["To"]      = notify_to
        msg["Subject"] = f"📬 New Portfolio Contact — {contact.subject or 'No subject'}"

        body = f"""\
New message from your portfolio!

━━━━━━━━━━━━━━━━━━━
Name    : {contact.name}
Email   : {contact.email}
Company : {contact.company or "N/A"}
Subject : {contact.subject or "N/A"}
━━━━━━━━━━━━━━━━━━━

{contact.message}
        """
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)

        logger.info(f"📧 Notification sent for contact from {contact.email}")

    except Exception as exc:
        logger.error(f"Failed to send email notification: {exc}")


# ── Routes ────────────────────────────────────────────────────────────────────

@router.post("/contact", response_model=ContactResponse, status_code=201)
async def submit_contact(
    body:       ContactRequest,
    background: BackgroundTasks,
    db:         AsyncSession = Depends(get_db),
):
    """
    Save a contact form submission.
    Returns immediately; email notification runs in the background.
    """
    try:
        row = ContactSubmission(
            name    = body.name,
            email   = body.email,
            subject = body.subject,
            message = body.message,
        )
        db.add(row)
        await db.commit()
        await db.refresh(row)

        # Send email in background — doesn't block the HTTP response
        background.add_task(_send_email_notification, body)

        logger.info(f"✅ Contact saved #{row.id} — {body.name} <{body.email}>")

        return ContactResponse(
            success=True,
            message="Thanks for reaching out! I'll get back to you soon 🚀",
            id=row.id,
        )

    except Exception as exc:
        logger.error(f"Contact save failed: {exc}")
        raise HTTPException(
            status_code=500,
            detail="Failed to save your message. Please try again.",
        )


@router.get("/contacts/count")
async def contact_count(db: AsyncSession = Depends(get_db)):
    """Quick check — how many people have reached out."""
    result = await db.execute(select(func.count(ContactSubmission.id)))
    return {"total_contacts": result.scalar()}
