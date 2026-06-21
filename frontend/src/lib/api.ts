// Portfolio Backend API client
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ── Contact Form ─────────────────────────────────────────────────────────────
export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
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
    throw new Error(err.detail || 'Failed to send message');
  }
  return res.json();
}

// ── AI Chat Agent ─────────────────────────────────────────────────────────────
export interface ChatPayload {
  message: string;
  session_id?: string;
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
