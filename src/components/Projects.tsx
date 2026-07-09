import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { MouseEvent } from 'react';
import chatSentinelImage from '../../assets/ChatSentinel.png';

const projects = [
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

function Projects() {
  return (
    <div className="projects-inner">
      <div className="section-heading">
        <p className="section-kicker">Project archive</p>
        <h2>Deployed experiments and shipped systems.</h2>
        <p>Each card is live telemetry from something I actually built — hover to inspect.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className="project-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
          >
            <div className="project-card__spotlight" aria-hidden="true" />
            <div className="project-card__media">
              <img src={project.image} alt={project.title} loading="lazy" />
              <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="project-card__body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-chip">{tech}</span>
                ))}
              </div>
              <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                Open transmission
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default Projects;
