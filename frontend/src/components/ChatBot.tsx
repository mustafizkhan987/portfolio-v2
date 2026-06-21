"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I am the AI assistant for Mohammed Mustafiz Khan, a B.Tech CSE (AIML) student at Dayananda Sagar University. Ask me anything about his skills, projects like Sarathi, or his background!" }
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    try {
      // Backend is currently disconnected.
      /*
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      
      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response || "Sorry, I couldn't process that." }
      ]);
      */

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "The backend is currently being rebuilt. I'll be back online soon!" }
        ]);
      }, 1000);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to the AI server." }
      ]);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-600 text-white shadow-xl hover:scale-105 transition-transform"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] glass border border-[var(--border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden bg-[var(--background)]"
          >
            {/* Header */}
            <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-black/5 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <Bot className="text-blue-500" />
                <h3 className="font-semibold text-lg">AI Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-blue-600 text-white"}`}>
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm ${msg.role === "user" ? "bg-[var(--foreground)] text-[var(--background)] rounded-tr-none" : "bg-black/5 dark:bg-white/10 rounded-tl-none"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 border-t border-[var(--border)] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Mustafiz..."
                className="flex-1 bg-transparent border border-[var(--border)] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
