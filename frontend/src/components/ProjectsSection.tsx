"use client";

import { motion } from "framer-motion";
import { GitBranch, ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Sarathi",
      description: "An advanced women safety transportation platform with live location tracking, emergency alerts, and driver verification.",
      tech: ["Machine Learning", "Mobile Dev", "Real-time Tracking"],
      github: "https://github.com/mustafizkhan987",
      demo: "#"
    },
    {
      title: "Smart Traffic Congestion Predictor",
      description: "A machine learning-based traffic prediction system designed to forecast congestion levels and improve route planning.",
      tech: ["Machine Learning", "Data Analysis", "Predictive Modeling"],
      github: "https://github.com/mustafizkhan987",
      demo: "#"
    },
    {
      title: "Payflow",
      description: "A personal finance management platform to track expenses, manage savings, and provide financial insights.",
      tech: ["Full Stack", "Data Analytics", "Finance Insights"],
      github: "https://github.com/mustafizkhan987",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Outfit']">Featured Projects</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-[var(--border)] hover:border-blue-500/50 transition-colors group"
            >
              <div>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-[var(--muted-foreground)] mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-xs font-medium bg-[var(--foreground)] text-[var(--background)] rounded-full opacity-80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-[var(--border)]">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition-colors"
                >
                  <GitBranch size={18} /> Code
                </a>
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition-colors"
                >
                  <ExternalLink size={18} /> Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
