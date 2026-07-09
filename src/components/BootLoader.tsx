import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BOOT_LINES = [
  'SHIVAM.SYS v2.0 — cold boot',
  '> mounting render core .............. OK',
  '> compiling particle field .......... OK',
  '> linking mission control ........... OK',
  '> scanning visitor .................. trusted',
  '> access granted. welcome aboard.',
];

const LINE_INTERVAL = 240;

function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) {
      const done = window.setTimeout(onComplete, 450);
      return () => window.clearTimeout(done);
    }
    const timer = window.setTimeout(() => setVisibleLines((n) => n + 1), LINE_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [visibleLines, onComplete]);

  return (
    <motion.div
      className="boot-loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onComplete}
    >
      <div className="boot-terminal">
        {BOOT_LINES.slice(0, visibleLines).map((line) => (
          <p key={line} className="boot-line">{line}</p>
        ))}
        <div className="boot-progress">
          <div
            className="boot-progress__bar"
            style={{ width: `${(visibleLines / BOOT_LINES.length) * 100}%` }}
          />
        </div>
        <p className="boot-skip">click anywhere to skip</p>
      </div>
    </motion.div>
  );
}

export default BootLoader;
