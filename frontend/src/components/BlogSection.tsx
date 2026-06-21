"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const updates = [
    { 
      title: "Mastering RAG pipelines", 
      category: "Learning", 
      date: "June 2026",
      content: "Successfully built and deployed multiple Retrieval-Augmented Generation pipelines using LangChain and Pinecone. Explored various embedding models and chunking strategies to optimize the context retrieval for LLMs."
    },
    { 
      title: "Launched Smart Traffic Predictor", 
      category: "Project", 
      date: "April 2026",
      content: "Deployed a full-stack ML application that forecasts traffic congestion in major cities. Built with Python, Flask, and a Random Forest Regressor trained on historical traffic datasets."
    },
    { 
      title: "MongoDB Certification Completed", 
      category: "Milestone", 
      date: "Jan 2026",
      content: "Achieved the MongoDB Associate Developer certification. Mastered advanced aggregation pipelines, data modeling, indexing strategies, and database performance tuning."
    },
  ];

  return (
    <section id="blog" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Outfit']">Updates & Blog</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col gap-6">
          {updates.map((update, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 md:p-8 rounded-2xl flex flex-col gap-4 border border-[var(--border)] group cursor-pointer hover:border-blue-500/30 transition-all"
              onClick={() => setExpandedId(expandedId === index ? null : index)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 block">{update.category}</span>
                  <h3 className="text-xl md:text-2xl font-semibold group-hover:text-blue-500 transition-colors">{update.title}</h3>
                </div>
                <div className="text-[var(--muted-foreground)] font-medium">
                  {update.date}
                </div>
              </div>
              
              <AnimatePresence>
                {expandedId === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-[var(--border)] mt-2 text-[var(--muted-foreground)] leading-relaxed">
                      {update.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
