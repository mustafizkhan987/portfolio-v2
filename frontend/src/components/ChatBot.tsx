"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { chatWithAgent, ChatMessage } from "@/lib/api";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm Mustafiz's AI assistant powered by Google Gemini. Ask me anything about his skills, projects, education, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for custom event to open chatbot
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-chatbot", handleOpen);
    return () => window.removeEventListener("open-chatbot", handleOpen);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: userMsg },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Send conversation history (skip the initial greeting)
      const historyForApi = newMessages.slice(1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const result = await chatWithAgent({
        message: userMsg,
        session_id: sessionId,
        history: historyForApi,
      });
      setSessionId(result.session_id);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the server. Make sure the backend is running, or reach out to Mustafiz directly at mustafizkhanmohammad39@gmail.com",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "What are his skills?",
    "Tell me about his projects",
    "How to contact him?",
  ];

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
          >
            <MessageSquare size={24} />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] h-[520px] border border-[var(--border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              background: "var(--background)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-[10px] text-[var(--muted-foreground)]">
                    Powered by Google Gemini
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-[var(--foreground)] text-[var(--background)]"
                        : "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={14} />
                    ) : (
                      <Bot size={14} />
                    )}
                  </div>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl max-w-[78%] text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-sm"
                        : "bg-black/5 dark:bg-white/10 rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-black/5 dark:bg-white/10 flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full bg-[var(--muted-foreground)] animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-[var(--muted-foreground)] animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-[var(--muted-foreground)] animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Quick Questions — show only when just the greeting */}
              {messages.length === 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-2 mt-2"
                >
                  <p className="text-[11px] text-[var(--muted-foreground)] font-medium uppercase tracking-wider">
                    Quick questions
                  </p>
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(q);
                        setTimeout(() => {
                          const form = document.getElementById("chat-form") as HTMLFormElement;
                          form?.requestSubmit();
                        }, 50);
                      }}
                      className="text-left text-[12px] px-3 py-2 rounded-xl border border-[var(--border)] hover:bg-blue-500/10 hover:border-blue-500/30 transition-all text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              id="chat-form"
              onSubmit={handleSend}
              className="p-3 border-t border-[var(--border)] flex gap-2 bg-black/[0.02] dark:bg-white/[0.02]"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Mustafiz..."
                className="flex-1 bg-transparent border border-[var(--border)] rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-40 disabled:shadow-none transition-all"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
