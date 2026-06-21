<div align="center">

# ✦ Mohammed Mustafiz Khan — Portfolio v2

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Outfit&weight=700&size=28&duration=3000&pause=1000&color=3B82F6&center=true&vCenter=true&width=600&lines=AIML+Engineer+%26+Software+Developer;Full+Stack+%7C+AI+%7C+Machine+Learning;Building+Intelligent+Applications;B.Tech+CSE+(AI+%26+ML)+%40+DSU" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/mustafizkhan987/portfolio-v2">
    <img src="https://img.shields.io/badge/Version-2.0-blue?style=for-the-badge&logo=github" alt="Version"/>
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-16.2.7-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  </a>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
</p>

<p align="center">
  <b>A blazing-fast, AI-powered personal portfolio — built to impress, designed to convert.</b><br/>
  <sub>Smooth animations • Dark/Light Mode • AI Chatbot • Dynamic Resume • Real Projects</sub>
</p>

<br/>

> **"I build at the intersection of product engineering and artificial intelligence."**

<br/>

</div>

---

## 📌 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🗂️ Sections](#️-sections)
- [🤖 AI Chatbot](#-ai-chatbot)
- [💼 Featured Projects](#-featured-projects)
- [🎓 About the Developer](#-about-the-developer)
- [📬 Contact](#-contact)

---

## 🌟 Overview

**portfolio-v2** is a complete redesign of my personal developer portfolio — a production-grade web application that goes beyond a static site. It features an AI-powered chatbot, cinematic animations, a dynamically generated resume, and a full contact backend — all powered by the latest bleeding-edge web technologies.

Every pixel and interaction has been intentionally crafted to tell my story as a **CSE-AIML student and aspiring AI Engineer** at Dayananda Sagar University.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Chatbot** | Google Gemini-powered assistant that answers questions about me in real-time |
| 🎞️ **Framer Motion Animations** | Cinematic entrance animations, stagger effects & micro-interactions |
| 🌗 **Dark / Light Mode** | Fully themed with CSS variables for seamless mode switching |
| 📄 **Dynamic Resume** | PDF resume generated on-the-fly using PDFKit |
| 📬 **Contact Form** | Functional backend-connected contact form with status feedback |
| 📱 **Fully Responsive** | Mobile-first design, pixel-perfect on all screen sizes |
| ⚡ **App Router** | Built with Next.js 16 App Router for optimal performance and SEO |
| 🔤 **Custom Typography** | Outfit + Inter via Google Fonts for a premium editorial feel |
| 🧩 **Component-Driven** | Cleanly separated sections as reusable, standalone components |

---

## 🛠️ Tech Stack

### Core

```
Next.js 16        →  App Router, SSR, and file-based routing
React 19          →  Latest concurrent features and server components
TypeScript 5      →  Strict typing throughout the codebase
```

### Styling & Animation

```
Tailwind CSS v4   →  Utility-first styling with CSS variable theming
Framer Motion 12  →  Production-grade animations and transitions
Lucide React      →  Consistent and clean icon library
```

### AI & Utilities

```
Google Gemini     →  Powers the AI chatbot assistant
PDFKit            →  Server-side PDF resume generation
clsx              →  Conditional class merging
tailwind-merge    →  Smart Tailwind class conflict resolution
```

### Developer Experience

```
ESLint 9          →  Next.js-configured linting ruleset
TypeScript 5      →  Static type checking
```

<details>
<summary><b>📦 Full dependency list</b></summary>

```json
{
  "dependencies": {
    "clsx": "^2.1.1",
    "framer-motion": "^12.40.0",
    "lucide-react": "^1.17.0",
    "next": "16.2.7",
    "pdfkit": "^0.18.0",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "tailwind-merge": "^3.6.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.7",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

</details>

---

## 📂 Project Structure

```
portfolio-v2/
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx          ← Root layout, metadata, Google Fonts
    │   │   ├── page.tsx            ← Main page — composes all sections
    │   │   └── globals.css         ← CSS variables, base styles
    │   ├── components/
    │   │   ├── Navbar.tsx          ← Sticky navigation bar
    │   │   ├── HeroSection.tsx     ← Landing hero with animated intro
    │   │   ├── AboutSection.tsx    ← Bio, education, goals
    │   │   ├── SkillsSection.tsx   ← Animated tech skill grid
    │   │   ├── ProjectsSection.tsx ← Featured project cards
    │   │   ├── CertificationsSection.tsx  ← Certs + resume download
    │   │   ├── BlogSection.tsx     ← Journey updates & milestones
    │   │   ├── ContactSection.tsx  ← Functional contact form
    │   │   └── ChatBot.tsx         ← 🤖 Google Gemini AI assistant
    │   └── lib/
    │       └── api.ts              ← API utility functions
    ├── public/                     ← Static assets
    ├── next.config.ts
    ├── tailwind.config.ts
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18+ — [Download](https://nodejs.org/)
- **npm** or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mustafizkhan987/portfolio-v2.git
cd portfolio-v2

# 2. Navigate to the frontend
cd frontend

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

### Build for Production

```bash
# Build the optimized production bundle
npm run build

# Start the production server
npm run start
```

### Environment Variables

Create a `.env.local` file in the `frontend/` directory and add:

```env
# Google Gemini API Key (for AI Chatbot)
GEMINI_API_KEY=your_gemini_api_key_here

# Contact Form Backend (optional)
NEXT_PUBLIC_API_URL=your_api_endpoint
```

> 💡 Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

---

## 🗂️ Sections

The portfolio is a single-page application with smooth scroll navigation. Here's what each section does:

### 🏠 Hero
The first thing visitors see — full-screen landing with an animated avatar, role title, personal bio, and CTA buttons linking to GitHub and a contact prompt.

### 👤 About
A two-column layout sharing my journey as a CSE-AIML student, my education at **Dayananda Sagar University**, and my career mission: *"Build AI-powered software products and become a professional AIML Engineer."*

### 💡 Skills
An animated 4-column grid showcasing core technical skills:
`Java` · `JavaScript` · `Python` · `MongoDB` · `SQL` · `Machine Learning` · `RAG` · `Web Development`

### 🗃️ Projects
Three featured project cards with descriptions, tech tags, GitHub links, and live demo buttons. Each card has hover animations and a glassmorphism design.

### 🏆 Certifications + Resume
A combined section displaying earned certifications and a visual resume card with a one-click **PDF download** generated dynamically using PDFKit.

### 📰 Blog / Updates
An expandable timeline of milestones, learning updates, and launched projects — a live logbook of my engineering journey.

### 📬 Contact
A fully functional contact form with live status indicators (`submitting`, `success`, `error`) — connects to a backend API to deliver messages directly to my inbox.

---

## 🤖 AI Chatbot

One of the standout features of this portfolio is a **floating AI chatbot**, powered by **Google Gemini**, accessible from any page via a bubble in the bottom-right corner.

- 🧠 Knows everything about my skills, projects, education, and goals
- 💬 Natural conversational replies with session-based memory
- ⚡ Auto-scrolls to the latest message
- 🎨 Animated open/close with Framer Motion

> **Ask it anything** — *"What projects has Mustafiz built?"*, *"What's his tech stack?"*, *"How do I contact him?"*

---

## 💼 Featured Projects

### 🚗 Sarathi
> Women safety transportation platform

An advanced safety-focused platform with **live location tracking**, emergency alerts, and driver verification — built to solve real-world safety concerns for women commuters.

`Machine Learning` · `Mobile Dev` · `Real-time Tracking`

---

### 🚦 Smart Traffic Congestion Predictor
> ML-based urban traffic intelligence

A full-stack ML application that forecasts traffic congestion in major cities using a **Random Forest Regressor** trained on historical datasets.

`Python` · `Flask` · `Machine Learning` · `Predictive Modeling`

---

### 💰 Payflow
> Personal finance intelligence platform

A personal finance management app that tracks expenses, manages savings, and surfaces **financial insights** through data analytics.

`Full Stack` · `Data Analytics` · `Finance Insights`

---

## 🎓 About the Developer

<table>
<tr>
<td>

**Mohammed Mustafiz Khan**

- 🎓 B.Tech CSE (AI & ML) — Dayananda Sagar University (Expected 2028)
- 🏠 Bengaluru, Karnataka, India
- 🧠 Focus: AI/ML Engineering, Full Stack Development, RAG Pipelines
- 🏅 Certified in: Linux (Infosys Springboard), JavaScript, MongoDB

</td>
</tr>
</table>

I'm a passionate builder who believes in **learning by doing**. Every project I build is a step toward becoming a production-grade AI Engineer. I specialize in bringing AI into real-world products — from RAG pipelines with LangChain & Pinecone, to intelligent web apps with cutting-edge LLMs.

---

## 📬 Contact

Whether you have a project idea, an internship opportunity, or just want to say hi — reach out!

<p align="center">
  <a href="mailto:mustafizkhanmohammad39@gmail.com">
    <img src="https://img.shields.io/badge/Email-mustafizkhanmohammad39%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/>
  </a>
  <br/><br/>
  <a href="https://github.com/mustafizkhan987">
    <img src="https://img.shields.io/badge/GitHub-mustafizkhan987-181717?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
</p>

> *Open to internships, collaborations, and full-time opportunities in AI/ML and Full Stack Engineering.*

---

<div align="center">

### ⭐ If this portfolio inspired you, drop a star — it keeps me going!

<br/>

Made with 💙 by **Mohammed Mustafiz Khan** · Built with Next.js, TypeScript & Framer Motion

<sub>© 2026 Mohammed Mustafiz Khan. All rights reserved.</sub>

</div>
