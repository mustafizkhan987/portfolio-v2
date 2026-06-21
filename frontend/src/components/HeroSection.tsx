"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MessageSquare, Briefcase, Code2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl w-full flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[var(--color-glass-light)] dark:border-[var(--color-glass-dark)] shadow-xl mb-8"
        >
          {/* Placeholder for Photo */}
          <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl">
            MK
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 font-['Outfit']"
        >
          Mohammed Mustafiz Khan
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-3xl font-medium text-[var(--muted-foreground)] mb-6"
        >
          AIML Engineer & Software Developer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl text-[var(--foreground)] opacity-80 mb-10 leading-relaxed"
        >
          B.Tech CSE AIML student at Dayananda Sagar University. I build intelligent, scalable applications and thrive at the intersection of product engineering and AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="https://github.com/mustafizkhan987" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium hover:scale-105 transition-transform">
            <Code2 size={18} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/mohammed-mustafiz-khan-84bb6b350/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] glass font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all">
            <Briefcase size={18} /> LinkedIn
          </a>
          <a href="/resume.pdf" target="_blank" className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] glass font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all">
            <Download size={18} /> Resume
          </a>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-500/25"
          >
            <MessageSquare size={18} /> Chat with AI
          </button>
        </motion.div>
      </div>
    </section>
  );
}
