// Portfolio Backend API client
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ── Contact Form ─────────────────────────────────────────────────────────────
export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  company?: string;
  message: string;
}

export interface ContactResult {
  success: boolean;
  message: string;
  id?: number;
}

export async function submitContact(data: ContactPayload): Promise<ContactResult> {
  const res = await fetch(`${API_URL}/api/v1/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    let errMsg = 'Failed to send message. Please try again.';
    if (err.detail) {
      if (typeof err.detail === 'string') {
        errMsg = err.detail;
      } else if (Array.isArray(err.detail)) {
        errMsg = err.detail.map((e: any) => e.msg || JSON.stringify(e)).join(', ');
      }
    }
    throw new Error(errMsg);
  }
  return res.json();
}

// ── AI Chat Agent ─────────────────────────────────────────────────────────────
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatPayload {
  message: string;
  session_id?: string;
  history: ChatMessage[];
}

export interface ChatResult {
  response: string;
  sources: string[];
  session_id: string;
}

export async function chatWithAgent(data: ChatPayload): Promise<ChatResult> {
  const res = await fetch(`${API_URL}/api/v1/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Agent unavailable');
  }
  return res.json();
}
