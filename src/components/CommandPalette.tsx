import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getGitHubPulse } from '../live/github';
import { formatIss, getIssPosition } from '../live/iss';
import { getVisitorRecon } from '../live/recon';

type Entry = {
  id: number;
  cmd: string;
  output: string[];
};

const SECTIONS = ['hero', 'trajectory', 'focus', 'projects', 'contact'];

const BANNER = [
  'SHIVAM.SYS interactive shell — type `help` to list commands.',
];

function runCommand(raw: string): {
  output: string[] | Promise<string[]>;
  action?: 'clear' | 'exit';
} {
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
          '  scan            passive recon on YOUR device (live)',
          '  github          live github activity feed',
          '  iss             live ISS position right now',
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
          'current focus: generative & agentic ai — llm-driven testing systems',
          'trajectory: node.js, express, mongodb, product engineering',
        ],
      };
    case 'skills':
      return {
        output: [
          '[ai]        agentic systems · gpt-4o · gemini · llm-as-judge · vision agents',
          '[frontend]  react · typescript · tailwind · framer-motion · three.js',
          '[backend]   node.js · express · mongodb · redis · docker',
          '[quality]   automation testing · playwright · appium · python',
          '[security]  pentesting background · threat modelling instinct',
        ],
      };
    case 'projects':
      return {
        output: [
          '01  netflix agentic game tester   gpt-4o · appium · vision agent',
          '02  ai saas api testing platform  gemini · react 19 · redis · docker',
          '03  validation poc                playwright · llm judge · python',
          '04  url shortener                 node · express · ejs',
          '05  nodejs backend                mongodb · express',
          '06  leave management              sapui5 · odata',
          '07  to-do list                    react · supabase',
          '08  chatsentinel                  react · socket.io · realtime',
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
    case 'scan':
      return { output: getVisitorRecon().then((recon) => recon.lines) };
    case 'github':
      return {
        output: getGitHubPulse().then((pulse) =>
          pulse
            ? [
                `live from api.github.com — Sinha28Shivam`,
                `last push    ${pulse.lastPushAgo ?? 'n/a'}${pulse.lastPushRepo ? ` → ${pulse.lastPushRepo}` : ''}`,
                `repos        ${pulse.publicRepos} public`,
                `followers    ${pulse.followers}`,
                `recent work  ${pulse.recentCommits} commits across ${pulse.activeRepos.join(', ') || '—'}`,
              ]
            : ['signal lost — github api unreachable from this network.'],
        ),
      };
    case 'iss':
      return {
        output: getIssPosition().then((pos) =>
          pos
            ? [
                'international space station — live fix:',
                `position     ${formatIss(pos)}`,
                `altitude     ${Math.round(pos.altitudeKm)} km above earth`,
                'source: api.wheretheiss.at (NORAD 25544)',
              ]
            : ['signal lost — tracking api unreachable.'],
        ),
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
  const entryIdRef = useRef(0);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  const submit = useCallback((overrideCmd?: string) => {
    const cmdStr = typeof overrideCmd === 'string' ? overrideCmd : value;
    const { output, action } = runCommand(cmdStr);
    if (action === 'clear') {
      setHistory([]);
    } else if (cmdStr.trim()) {
      const id = ++entryIdRef.current;
      if (output instanceof Promise) {
        setHistory((prev) => [...prev, { id, cmd: cmdStr, output: ['[ querying live feed... ]'] }]);
        output.then((lines) => {
          setHistory((prev) =>
            prev.map((entry) => (entry.id === id ? { ...entry, output: lines } : entry)),
          );
        });
      } else {
        setHistory((prev) => [...prev, { id, cmd: cmdStr, output }]);
      }
    }
    if (typeof overrideCmd !== 'string') setValue('');
    if (action === 'exit') setOpen(false);
  }, [value]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        toggle();
      }
      if (event.key === 'Escape') setOpen(false);
    };
    const onOpen = () => setOpen(true);
    
    const onDemo = async () => {
      setOpen(true);
      setHistory([]);
      const commands = ['whoami', 'skills', 'projects', 'sudo hire-me'];
      for (const cmd of commands) {
        await new Promise((r) => setTimeout(r, 600));
        setValue(cmd);
        await new Promise((r) => setTimeout(r, 500));
        submit(cmd);
        setValue('');
      }
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('open-terminal', onOpen);
    window.addEventListener('run-demo', onDemo);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-terminal', onOpen);
      window.removeEventListener('run-demo', onDemo);
    };
  }, [toggle, submit]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [history, open]);

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
              className="cmdk-panel glass-panel glow-border"
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
                {history.map((entry) => (
                  <div key={entry.id} className="cmdk-entry">
                    <p>
                      <span className="cmdk-prompt">visitor@shivam:~$</span> {entry.cmd}
                    </p>
                    {entry.output.map((line, j) => (
                      <p key={j} className="cmdk-output">{line || ' '}</p>
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
