# 🤖 Portfolio Backend — Setup Guide

FastAPI backend with:
- **Contact form** → SQLite storage + optional Gmail alerts  
- **RAG AI Agent** → ChromaDB + Groq (free) answers questions about you

---

## 📁 Project Structure

```
backend/
├── main.py               ← FastAPI app entry point
├── train.py              ← Run once to index your data
├── requirements.txt
├── render.yaml           ← Render.com deployment config
├── .env.example          ← Copy to .env and fill in
│
├── routes/
│   ├── contact.py        ← POST /api/v1/contact
│   └── chat.py           ← POST /api/v1/chat
│
├── rag/
│   ├── agent.py          ← LangChain RAG pipeline
│   └── vector_store.py   ← ChromaDB singleton
│
├── db/
│   └── database.py       ← SQLAlchemy + SQLite
│
├── models/
│   └── schemas.py        ← Pydantic request/response models
│
└── data/
    └── portfolio_data.json ← ✏️  FILL THIS IN with your info
```

---

## ⚡ Local Setup (5 minutes)

### Step 1 — Get a free Groq API key
1. Go to **https://console.groq.com** → sign up (it's free)
2. Click **API Keys** → **Create API Key**
3. Copy the key (starts with `gsk_`)

### Step 2 — Configure environment
```bash
cd backend
cp .env.example .env
```
Open `.env` and paste your `GROQ_API_KEY`.

### Step 3 — Fill in your portfolio data
Open `data/portfolio_data.json` and replace all the placeholder values:
- Your college name
- Your CGPA
- Your email and LinkedIn
- Your projects and achievements

### Step 4 — Install dependencies
```bash
pip install -r requirements.txt
```

### Step 5 — Train the RAG agent
```bash
python train.py
```
This downloads the embedding model (~90 MB, one time) and indexes your data.  
You should see: `🎉 Training complete! XX chunks stored`

### Step 6 — Run the server
```bash
uvicorn main:app --reload --port 8000
```

Visit **http://localhost:8000/docs** → interactive API docs!

---

## 🧪 Test the API

**Test contact form:**
```bash
curl -X POST http://localhost:8000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Hello",
    "message": "This is a test message from the contact form!"
  }'
```

**Test AI chat:**
```bash
curl -X POST http://localhost:8000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your top skills?"}'
```

---

## 🚀 Deploy on Render (Free)

1. Push your code to GitHub (make sure `backend/` folder is committed)
2. Go to **https://render.com** → New → Web Service
3. Connect your GitHub repo → select `mustafizkhan987/portfolio-v2`
4. Render auto-detects `render.yaml` — just fill in **Environment Variables**:
   - `GROQ_API_KEY` → your Groq key
   - `FRONTEND_URL` → your Vercel portfolio URL (for CORS)
5. Click **Deploy**

Build takes ~5 min (downloads sentence-transformers + runs train.py).  
Your API will be live at: `https://portfolio-backend-xxxx.onrender.com`

> **Note:** Render free tier sleeps after 15 min of inactivity.  
> First request after sleep takes ~30 seconds to wake up. Use Render's "ping" cron to keep it alive.

---

## 🔗 Connect Frontend to Backend

In your Next.js frontend, add to `.env.local`:
```
NEXT_PUBLIC_API_URL=https://portfolio-backend-xxxx.onrender.com
```

Then call the API:
```typescript
// Contact form submit
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, subject, message }),
});

// AI chat
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userQuestion }),
});
```

---

## 📧 Optional: Gmail Email Notifications

When someone fills the contact form, get an email alert:

1. Go to **myaccount.google.com** → Security → 2-Step Verification → Turn on
2. Go to **myaccount.google.com** → Security → App Passwords
3. Select app: **Mail** → Generate → copy the 16-char password
4. Add to `.env`:
   ```
   SMTP_USER=your_gmail@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   NOTIFY_EMAIL=your_email@gmail.com
   ```

---

## 🔄 Re-train After Updates

Every time you update `portfolio_data.json` (new project, new skill, etc.):
```bash
python train.py
```
Then restart the server. Takes about 30 seconds.

---

## 📚 API Reference

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/`                   | API info                       |
| GET    | `/health`             | Health check (for Render)      |
| GET    | `/docs`               | Interactive Swagger docs       |
| POST   | `/api/v1/contact`     | Submit contact form            |
| GET    | `/api/v1/contacts/count` | Total submissions count     |
| POST   | `/api/v1/chat`        | Chat with RAG AI agent         |
