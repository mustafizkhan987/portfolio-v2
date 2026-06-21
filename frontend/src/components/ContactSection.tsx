"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail } from "lucide-react";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      // Backend is currently disconnected. Simulating a successful response.
      /*
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error("Failed to send message");
      */

      setTimeout(() => {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      }, 1000);
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert("Error sending message.");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative bg-[var(--background)]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Outfit']">Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Whether you have a question, a project idea, or just want to say hi, my inbox is always open. Let's build something amazing together.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-blue-500 font-medium">
            <Mail size={20} />
            <a href="mailto:mustafizkhanmohammad39@gmail.com" className="hover:underline">
              mustafizkhanmohammad39@gmail.com
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass p-8 md:p-12 rounded-3xl border border-[var(--border)] max-w-2xl mx-auto"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <CheckCircle2 size={64} className="text-green-500 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-[var(--muted-foreground)]">I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/5 dark:bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/5 dark:bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-sm font-medium">Company (Optional)</label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-black/5 dark:bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Tech Corp Inc."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/5 dark:bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
              >
                {status === "submitting" ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
