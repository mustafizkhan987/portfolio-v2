"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  Code2, 
  BrainCircuit, 
  Server, 
  TerminalSquare, 
  Globe2
} from "lucide-react";

export default function SkillsSection() {
  const skills = [
    { name: "Java", icon: <Code2 size={24} />, color: "text-red-500", bg: "bg-red-500/10" },
    { name: "JavaScript", icon: <TerminalSquare size={24} />, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { name: "Python", icon: <Code2 size={24} />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "MongoDB", icon: <Database size={24} />, color: "text-green-500", bg: "bg-green-500/10" },
    { name: "SQL", icon: <Database size={24} />, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { name: "Machine Learning", icon: <BrainCircuit size={24} />, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "RAG", icon: <Server size={24} />, color: "text-orange-500", bg: "bg-orange-500/10" },
    { name: "Web Development", icon: <Globe2 size={24} />, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-24 px-6 relative bg-[var(--muted)]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Outfit']">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-2xl flex flex-col items-center justify-center gap-4 text-center border border-[var(--border)] cursor-pointer group"
            >
              <div className={`p-4 rounded-full ${skill.bg} ${skill.color} transition-transform group-hover:-translate-y-1`}>
                {skill.icon}
              </div>
              <h4 className="font-semibold text-lg">{skill.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
