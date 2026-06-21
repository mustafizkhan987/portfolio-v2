"use client";

import { motion } from "framer-motion";
import { Award, Download } from "lucide-react";

export default function CertificationsSection() {
  const certifications = [
    { name: "Linux for Beginners", issuer: "Infosys Springboard", date: "Recent" },
    { name: "JavaScript Programming", issuer: "Completed", date: "Recent" },
    { name: "MongoDB Fundamentals", issuer: "Completed", date: "Recent" },
  ];

  return (
    <section id="certifications" className="py-24 px-6 relative bg-[var(--muted)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        
        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Outfit']">Certifications</h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full mb-10"></div>
          
          <div className="flex flex-col gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="glass p-6 rounded-2xl flex items-center gap-4 border border-[var(--border)]">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-full">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{cert.name}</h4>
                  <p className="text-[var(--muted-foreground)] text-sm">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Resume Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Outfit']">Resume</h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full mb-10"></div>

          <div className="glass p-8 rounded-3xl border border-[var(--border)] flex flex-col items-center text-center h-[350px] justify-center">
            <div className="w-24 h-24 bg-[var(--foreground)] text-[var(--background)] rounded-full flex items-center justify-center mb-6 shadow-xl">
              <span className="text-3xl font-bold font-['Outfit']">CV</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Mohammed Mustafiz Khan</h3>
            <p className="text-[var(--muted-foreground)] mb-8">AIML Engineer & Software Developer</p>
            
            <div className="flex gap-4">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium hover:scale-105 transition-transform flex items-center gap-2">
                Preview
              </a>
              <a href="/resume.pdf" download className="px-6 py-3 rounded-full border border-[var(--border)] glass font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-2">
                <Download size={18} /> Download
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
