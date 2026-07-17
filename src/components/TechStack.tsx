import { motion } from 'framer-motion';

const SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 
  'Playwright', 'Appium', 'Python', 'Docker', 'AWS', 
  'OpenAI / LLMs', 'Tailwind CSS', 'Framer Motion', 'Three.js'
];

function TechStack() {
  return (
    <div className="tech-stack-container" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-heading" style={{ marginBottom: '2rem' }}>
        <p className="section-kicker">Core Arsenal</p>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Technologies I use to build and automate.</h2>
      </div>
      <div className="tech-stack-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill}
            className="tech-chip glass-panel glow-border"
            style={{ padding: '1rem 2rem', fontSize: '1.2rem', fontWeight: 600, textAlign: 'center', borderRadius: '12px' }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TechStack;
