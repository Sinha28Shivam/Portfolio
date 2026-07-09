import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  Github,
  Linkedin,
  Mail,
  Radar,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Workflow,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Scene from './components/Scene';
import Projects from './components/Projects';
import myImage from '../assets/MyIMage.jpeg';

const navigation = [
  { label: 'Signal', href: '#hero' },
  { label: 'Trajectory', href: '#trajectory' },
  { label: 'Focus', href: '#focus' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const signalCards = [
  {
    title: 'Systems + Story',
    description: 'Building products that still feel human after the architecture diagram is done.',
  },
  {
    title: 'Quality by Design',
    description: 'Shipping with test thinking wired in from the first component, not taped on at the end.',
  },
  {
    title: 'Attack Surface Awareness',
    description: 'Using a security mindset to reduce blind spots in delivery, automation, and scale.',
  },
];

const missionStats = [
  { label: 'Core vector', value: 'Full stack + QA' },
  { label: 'Current orbit', value: 'Automation engineering' },
  { label: 'Expansion path', value: 'Node.js, Express, MongoDB' },
  { label: 'Field history', value: 'Cybersecurity and testing' },
];

const trajectory = [
  {
    year: 'Now',
    title: 'Automation-first execution',
    description:
      'Designing reliable test flows and using systems thinking to keep releases stable under pressure.',
  },
  {
    year: 'Next',
    title: 'Backend depth',
    description:
      'Expanding into Node.js, Express, APIs, and data modeling to own more of the product lifecycle.',
  },
  {
    year: 'Forward',
    title: 'Security-informed engineering',
    description:
      'Blending development, automation, and security intuition into a sharper product engineering stack.',
  },
];

const focusModes = [
  {
    id: 'build',
    label: 'Build Mode',
    icon: Workflow,
    headline: 'Interface systems with movement, hierarchy, and intent.',
    summary:
      'I like products that feel engineered and editorial at the same time. The UI should do more than arrange content; it should make capability obvious.',
    metrics: [
      { label: 'Frontend systems', value: 'React, TypeScript, Tailwind' },
      { label: 'Backend motion', value: 'Node.js, Express, APIs' },
      { label: 'Delivery style', value: 'Fast iteration with clean structure' },
    ],
  },
  {
    id: 'test',
    label: 'Quality Mode',
    icon: TestTube2,
    headline: 'Reliability is part of the product, not a post-launch patch.',
    summary:
      'Automation work shaped how I think: every good system makes intent observable, failures reproducible, and regressions harder to hide.',
    metrics: [
      { label: 'Current role', value: 'Automation testing' },
      { label: 'Bias', value: 'Coverage that protects velocity' },
      { label: 'Outcome', value: 'Confidence before release' },
    ],
  },
  {
    id: 'secure',
    label: 'Threat Mode',
    icon: ShieldCheck,
    headline: 'A security lens changes how you build before an incident ever happens.',
    summary:
      'Past cybersecurity and penetration testing experience makes me notice trust boundaries, failure modes, and hidden assumptions in product flows.',
    metrics: [
      { label: 'Past domain', value: 'Cybersecurity and pentesting' },
      { label: 'Mindset', value: 'Assume misuse, reduce blast radius' },
      { label: 'Value', value: 'Sharper engineering decisions' },
    ],
  },
];

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Sinha28Shivam',
    icon: Github,
    value: 'Sinha28Shivam',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shivam-sinha-057066250/',
    icon: Linkedin,
    value: 'shivam-sinha-057066250',
  },
  {
    label: 'Email',
    href: 'mailto:sinha28.shivam@gmail.com',
    icon: Mail,
    value: 'sinha28.shivam@gmail.com',
  },
];

function App() {
  const [activeMode, setActiveMode] = useState(focusModes[0].id);
  const [indiaTime, setIndiaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setIndiaTime(
        new Intl.DateTimeFormat('en-IN', {
          timeStyle: 'medium',
          timeZone: 'Asia/Kolkata',
        }).format(new Date()),
      );
    };

    updateTime();
    const timer = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const selectedMode = focusModes.find((mode) => mode.id === activeMode) ?? focusModes[0];
  const SelectedIcon = selectedMode.icon;

  return (
    <div className="app-shell">
      <div className="scene-shell" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 7], fov: 48 }}>
          <Scene />
        </Canvas>
      </div>

      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <header className="topbar">
        <a href="#hero" className="brand-mark">
          <span className="brand-mark__dot" />
          Shivam Sinha
        </a>

        <nav className="topbar-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="hero" className="hero section-frame">
          <div className="hero-copy">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="eyebrow"
            >
              <Sparkles className="eyebrow__icon" />
              Future-facing portfolio system
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hero-title"
            >
              I build digital experiences like a control room, not a brochure.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-description"
            >
              Full stack developer, automation engineer, and security-minded problem solver based in
              India. I care about interfaces with presence, systems with resilience, and execution
              that feels intentional all the way through.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-actions"
            >
              <a className="primary-link" href="#projects">
                Enter project archive
                <ArrowDownRight size={18} />
              </a>
              <a className="secondary-link" href="#contact">
                Open contact relay
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="hero-signal-grid"
            >
              {signalCards.map((card) => (
                <article key={card.title} className="signal-card">
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </article>
              ))}
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="command-panel"
          >
            <div className="command-panel__header">
              <div>
                <p className="mini-label">Live signal</p>
                <h2>Mission control</h2>
              </div>
              <div className="status-pill">
                <span className="status-pill__dot" />
                active
              </div>
            </div>

            <div className="profile-lockup">
              <img src={myImage} alt="Shivam Sinha portrait" />
              <div>
                <p className="mini-label">Identity</p>
                <h3>Shivam Sinha</h3>
                <p className="profile-note">Engineer focused on product feel, test reliability, and secure delivery.</p>
              </div>
            </div>

            <div className="command-readout">
              <div>
                <p className="mini-label">Location</p>
                <strong>Lucknow, Uttar Pradesh</strong>
              </div>
              <div>
                <p className="mini-label">Local time</p>
                <strong>{indiaTime || '--:--:--'}</strong>
              </div>
            </div>

            <div className="metrics-cluster">
              {missionStats.map((item) => (
                <div key={item.label} className="metrics-cluster__item">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="contact-row">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                    <Icon size={16} />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.aside>
        </section>

        <section id="trajectory" className="section-frame">
          <div className="section-heading">
            <p className="section-kicker">Trajectory</p>
            <h2>From automation floors to expressive product engineering.</h2>
            <p>
              The through-line in my work is simple: systems should be reliable under stress and
              memorable when someone touches them.
            </p>
          </div>

          <div className="trajectory-grid">
            {trajectory.map((step) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                className="trajectory-card"
              >
                <span>{step.year}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="focus" className="section-frame focus-frame">
          <div className="section-heading">
            <p className="section-kicker">Focus system</p>
            <h2>Three operating modes, one engineering identity.</h2>
            <p>
              Switch the lens and the same pattern shows up: clarity, resilience, and a bias toward
              building things that survive real-world complexity.
            </p>
          </div>

          <div className="focus-layout">
            <div className="focus-nav" role="tablist" aria-label="Focus modes">
              {focusModes.map((mode) => {
                const Icon = mode.icon;
                const isActive = mode.id === selectedMode.id;

                return (
                  <button
                    key={mode.id}
                    type="button"
                    className={isActive ? 'focus-toggle is-active' : 'focus-toggle'}
                    onClick={() => setActiveMode(mode.id)}
                  >
                    <Icon size={18} />
                    {mode.label}
                  </button>
                );
              })}
            </div>

            <motion.article
              key={selectedMode.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="focus-card"
            >
              <div className="focus-card__header">
                <div className="focus-badge">
                  <SelectedIcon size={18} />
                  {selectedMode.label}
                </div>
                <div className="focus-orbit">
                  <Radar size={18} />
                  signal stable
                </div>
              </div>

              <h3>{selectedMode.headline}</h3>
              <p>{selectedMode.summary}</p>

              <div className="focus-metrics">
                {selectedMode.metrics.map((metric) => (
                  <div key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </section>

        <section className="section-frame proof-frame">
          <div className="section-heading">
            <p className="section-kicker">Proof of range</p>
            <h2>A stack that connects interface craft, product logic, and verification.</h2>
          </div>

          <div className="proof-grid">
            <article className="proof-card">
              <BrainCircuit size={22} />
              <h3>Frontend systems</h3>
              <p>React, TypeScript, animated UI architecture, modern CSS, responsive layouts.</p>
            </article>
            <article className="proof-card">
              <BadgeCheck size={22} />
              <h3>Delivery confidence</h3>
              <p>Automation thinking, reproducible flows, and structured release quality.</p>
            </article>
            <article className="proof-card">
              <ShieldCheck size={22} />
              <h3>Risk awareness</h3>
              <p>Security-informed engineering choices that reduce fragility and hidden exposure.</p>
            </article>
          </div>
        </section>

        <section id="projects" className="section-frame projects-frame">
          <Projects />
        </section>

        <section id="contact" className="section-frame contact-frame">
          <div className="section-heading">
            <p className="section-kicker">Contact relay</p>
            <h2>If the goal is ambitious, I’m interested.</h2>
            <p>
              I’m especially drawn to product engineering work that mixes UI depth, automation, and
              systems thinking. If that sounds like your lane, let’s talk.
            </p>
          </div>

          <div className="contact-terminal">
            <div className="terminal-line">
              <span className="terminal-prompt">status</span>
              <span>Available for high-ownership builds and collaboration.</span>
            </div>
            <div className="terminal-line">
              <span className="terminal-prompt">specialties</span>
              <span>React interfaces, automation-first engineering, secure delivery mindset.</span>
            </div>
            {contactLinks.map((item) => (
              <a
                key={item.label}
                className="terminal-link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="terminal-prompt">{item.label.toLowerCase()}</span>
                <span>{item.value}</span>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
