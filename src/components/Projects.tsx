import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { MouseEvent } from 'react';
import chatSentinelImage from '../../assets/ChatSentinel.png';

type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  featured?: boolean;
  impact?: string;
};

const projects: Project[] = [
  {
    title: 'Netflix Agentic Game Tester',
    description:
      'Vision-driven AI agent that plays and tests Netflix mobile games (Bloons TD 6, Farming Simulator, Into the Breach) on real Android devices — a GPT-4o reasoning loop reads screenshots, routes between models, and drives Appium tool calls, emitting structured test reports.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    tech: ['Agentic AI', 'GPT-4o', 'Python', 'Appium', 'Vision'],
    link: 'https://github.com/Sinha28Shivam/Netflix-Farming-simulator-Agentic-Automation',
    featured: true,
    impact: 'Automated 100+ manual tests, reducing QA cycle time by 60%',
  },
  {
    title: 'AI-Powered SaaS API Testing Platform',
    description:
      'Full-stack SaaS where Gemini generates intelligent test cases and edge cases for any API — React 19 dashboard with live analytics, Express backend, Redis + BullMQ job queues for high-volume async runs, JWT auth, Prisma/PostgreSQL + MongoDB, fully Dockerized behind Nginx.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tech: ['Google Gemini', 'React 19', 'Node.js', 'Redis', 'Docker'],
    link: 'https://github.com/Sinha28Shivam/AI-Powered-SaaS-API-Testing-Platform',
    featured: true,
    impact: 'Generated 500+ intelligent test cases instantly, ensuring 99% coverage',
  },
  {
    title: 'Validation POC — AI Web Validator',
    description:
      'Hybrid validation pipeline that captures pages with Playwright, runs deterministic checks for soft-404s, thin content and bad redirects, then escalates ambiguous pages to an LLM for semantic review — producing PASS / FAIL / UNCERTAIN reports.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    tech: ['LLM Judge', 'Playwright', 'Python', 'Azure OpenAI'],
    link: 'https://github.com/Sinha28Shivam/Validation_POC',
    featured: true,
  },
  {
    title: 'URL Shortener',
    description:
      'Link compression service built on Node.js and Express with an EJS-templated frontend.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    tech: ['NodeJS', 'ExpressJS', 'EJS'],
    link: 'https://github.com/Sinha28Shivam/Url_shortner.git',
  },
  {
    title: 'NodeJS Backend',
    description: 'A production-style backend server wired with MongoDB and Express.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80',
    tech: ['MongoDB', 'NodeJS', 'ExpressJS'],
    link: 'https://github.com/Sinha28Shivam/NODEJS_practice.git',
  },
  {
    title: 'Leave Management System',
    description: 'Enterprise leave workflow built with SAPUI5 and OData services.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    tech: ['SAPUI5', 'OData', 'JavaScript'],
    link: 'https://github.com/Sinha28Shivam/LeaveMangementSystem.git',
  },
  {
    title: 'To-Do List',
    description: 'Task manager with a Supabase backend and a React frontend.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    tech: ['Supabase', 'React', 'NextJS'],
    link: 'https://incomparable-licorice-f2ddd8.netlify.app/',
  },
  {
    title: 'ChatSentinel',
    description: 'Real-time chat application streaming over Socket.io with a Node.js core.',
    image: chatSentinelImage,
    tech: ['NodeJS', 'ReactJS', 'Socket.io', 'MongoDB'],
    link: 'https://chatsentinal.onrender.com',
  },
];

// Pointer-tracked CSS variables drive the tilt + spotlight in index.css.
function handleTilt(event: MouseEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  card.style.setProperty('--mx', `${x * 100}%`);
  card.style.setProperty('--my', `${y * 100}%`);
  card.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
  card.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
}

function resetTilt(event: MouseEvent<HTMLElement>) {
  const card = event.currentTarget;
  card.style.setProperty('--rx', '0deg');
  card.style.setProperty('--ry', '0deg');
}

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projects.find(p => p.title === selectedId);

  return (
    <div className="projects-inner">
      <div className="section-heading">
        <p className="section-kicker">Project archive</p>
        <h2>Deployed experiments and shipped systems.</h2>
        <p>
          Each card is live telemetry from something I actually built — click to expand. The
          latest batch: autonomous agents and LLM-powered testing systems.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            layoutId={`project-${project.title}`}
            key={project.title}
            className={`project-card glass-panel glow-border ${project.featured ? 'project-card--featured' : ''}`}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            onClick={() => setSelectedId(project.title)}
            style={{ cursor: 'pointer' }}
          >
            <div className="project-card__spotlight" aria-hidden="true" />
            <motion.div className="project-card__media" layoutId={`media-${project.title}`}>
              <img src={project.image} alt={project.title} loading="lazy" />
              <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>
              {project.featured && <span className="project-card__flag">AI / Agentic</span>}
            </motion.div>
            <div className="project-card__body">
              <motion.h3 layoutId={`title-${project.title}`}>{project.title}</motion.h3>
              <p className="line-clamp-2" style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
              <div className="project-tech">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="tech-chip">{tech}</span>
                ))}
                {project.tech.length > 3 && <span className="tech-chip">+{project.tech.length - 3}</span>}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`project-${selectedProject.title}`}
              className="project-modal glass-panel glow-border"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="project-modal-close" onClick={() => setSelectedId(null)}>✕</button>
              
              <motion.div className="project-modal__media" layoutId={`media-${selectedProject.title}`}>
                <img src={selectedProject.image} alt={selectedProject.title} />
              </motion.div>
              
              <div className="project-modal__content">
                <motion.h2 layoutId={`title-${selectedProject.title}`}>{selectedProject.title}</motion.h2>
                
                <div className="project-tech" style={{ margin: '1rem 0' }}>
                  {selectedProject.tech.map((tech) => (
                    <span key={tech} className="tech-chip">{tech}</span>
                  ))}
                </div>

                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--slate-300)' }}>
                  {selectedProject.description}
                </p>

                {selectedProject.impact && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--panel)', borderLeft: '3px solid var(--primary)', fontSize: '1rem', color: 'var(--slate-200)', borderRadius: '0 8px 8px 0' }}>
                    <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--primary)' }}>Business Impact</strong> 
                    {selectedProject.impact}
                  </div>
                )}
                
                <div style={{ marginTop: '2rem' }}>
                  <a href={selectedProject.link} className="primary-link" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', padding: '0.75rem 1.5rem' }}>
                    Launch Project
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
