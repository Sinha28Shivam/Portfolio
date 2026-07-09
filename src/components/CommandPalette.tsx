import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

type Entry = {
  cmd: string;
  output: string[];
};

const SECTIONS = ['hero', 'trajectory', 'focus', 'projects', 'contact'];

const BANNER = [
  'SHIVAM.SYS interactive shell — type `help` to list commands.',
];

function runCommand(raw: string): { output: string[]; action?: 'clear' | 'exit' } {
  const input = raw.trim().toLowerCase();

  switch (input) {
    case '':
      return { output: [] };
    case 'help':
      return {
        output: [
          'available commands:',
          '  whoami          identity readout',
          '  skills          current stack',
          '  projects        list the project archive',
          '  goto <section>  jump to a section (hero, trajectory, focus, projects, contact)',
          '  contact         open channels',
          '  time            local time in Lucknow (IST)',
          '  sudo hire-me    escalate privileges',
          '  clear           wipe the buffer',
          '  exit            close the shell',
        ],
      };
    case 'whoami':
      return {
        output: [
          'shivam sinha — full stack developer & automation tester',
          'base: lucknow, uttar pradesh, india',
          'history: cybersecurity & penetration testing',
          'trajectory: node.js, express, mongodb, product engineering',
        ],
      };
    case 'skills':
      return {
        output: [
          '[frontend]  react · typescript · tailwind · framer-motion · three.js',
          '[backend]   node.js · express · mongodb',
          '[quality]   automation testing · python (learning)',
          '[security]  pentesting background · threat modelling instinct',
        ],
      };
    case 'projects':
      return {
        output: [
          '01  url shortener        node · express · ejs',
          '02  nodejs backend       mongodb · express',
          '03  leave management     sapui5 · odata',
          '04  to-do list           react · supabase',
          '05  chatsentinel         react · socket.io · realtime',
          'hint: `goto projects` to view the archive.',
        ],
      };
    case 'contact':
      return {
        output: [
          'github    https://github.com/Sinha28Shivam',
          'linkedin  linkedin.com/in/shivam-sinha-057066250',
          'email     sinha28.shivam@gmail.com',
        ],
      };
    case 'time':
      return {
        output: [
          `IST ${new Intl.DateTimeFormat('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'medium',
            timeZone: 'Asia/Kolkata',
          }).format(new Date())}`,
        ],
      };
    case 'sudo hire-me':
    case 'sudo hire me':
      return {
        output: [
          '[sudo] password for visitor: ********',
          'privileges escalated — root access granted.',
          'deploying resume payload... done.',
          '> uplink: sinha28.shivam@gmail.com',
        ],
      };
    case 'clear':
      return { output: [], action: 'clear' };
    case 'exit':
      return { output: [], action: 'exit' };
    default: {
      if (input.startsWith('goto ')) {
        const target = input.slice(5).trim();
        if (SECTIONS.includes(target)) {
          document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
          return { output: [`navigating to /${target} ...`], action: 'exit' };
        }
        return { output: [`unknown sector: ${target}`, `valid: ${SECTIONS.join(', ')}`] };
      }
      if (input.startsWith('sudo')) {
        return { output: ['visitor is not in the sudoers file. this incident will be reported.'] };
      }
      return { output: [`command not found: ${input} — try \`help\``] };
    }
  }
}

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<Entry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        toggle();
      }
      if (event.key === 'Escape') setOpen(false);
    };
    const onOpen = () => setOpen(true);

    window.addEventListener('keydown', onKey);
    window.addEventListener('open-terminal', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-terminal', onOpen);
    };
  }, [toggle]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [history, open]);

  const submit = () => {
    const { output, action } = runCommand(value);
    if (action === 'clear') {
      setHistory([]);
    } else if (value.trim()) {
      setHistory((prev) => [...prev, { cmd: value, output }]);
    }
    setValue('');
    if (action === 'exit') setOpen(false);
  };

  return (
    <>
      <button type="button" className="terminal-fab" onClick={toggle} aria-label="Open terminal">
        <span className="terminal-fab__glyph">&gt;_</span>
        <span className="terminal-fab__hint">ctrl+K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cmdk-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="cmdk-panel"
              role="dialog"
              aria-label="Interactive terminal"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="cmdk-header">
                <span className="cmdk-dot cmdk-dot--red" />
                <span className="cmdk-dot cmdk-dot--amber" />
                <span className="cmdk-dot cmdk-dot--green" />
                <span className="cmdk-title">visitor@shivam.sys — interactive shell</span>
              </div>

              <div className="cmdk-body" ref={bodyRef}>
                {BANNER.map((line) => (
                  <p key={line} className="cmdk-banner">{line}</p>
                ))}
                {history.map((entry, i) => (
                  <div key={`${entry.cmd}-${i}`} className="cmdk-entry">
                    <p>
                      <span className="cmdk-prompt">visitor@shivam:~$</span> {entry.cmd}
                    </p>
                    {entry.output.map((line, j) => (
                      <p key={j} className="cmdk-output">{line}</p>
                    ))}
                  </div>
                ))}
                <div className="cmdk-input-row">
                  <span className="cmdk-prompt">visitor@shivam:~$</span>
                  <input
                    ref={inputRef}
                    className="cmdk-input"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') submit();
                    }}
                    spellCheck={false}
                    autoComplete="off"
                    aria-label="Terminal command input"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CommandPalette;
