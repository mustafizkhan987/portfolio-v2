"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Outfit']">About Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass p-8 md:p-12 rounded-3xl"
          >
            <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-6">
              I am a Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning. I believe in continuous learning, practical implementation, and project-based skill development.
            </p>
            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
              My primary goal is to become a highly skilled AIML Engineer capable of building intelligent applications that solve real-world problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <div className="glass p-6 rounded-2xl border border-[var(--border)]">
              <h4 className="font-semibold text-xl mb-2">Education</h4>
              <p className="text-[var(--muted-foreground)]">B.Tech in CSE (AI & ML)<br/>Dayananda Sagar University</p>
              <p className="text-sm opacity-60">Expected 2028 | CGPA: 6.2</p>
            </div>
            <div className="glass p-6 rounded-2xl border border-[var(--border)]">
              <h4 className="font-semibold text-xl mb-2">Career Goals</h4>
              <p className="text-[var(--muted-foreground)]">Build AI-powered software products, master Full Stack & Data Structures, and become a professional AIML Engineer.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
