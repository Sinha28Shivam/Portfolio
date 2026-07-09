import { useEffect, useRef, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#$%&';

// Scramble-reveals its text the first time it scrolls into view.
function DecryptText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const step = Math.max(1, Math.round(text.length / 36));
    let revealed = 0;
    const timer = window.setInterval(() => {
      revealed += step;
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (i < revealed || char === ' ') return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(''),
      );
      if (revealed >= text.length) window.clearInterval(timer);
    }, 30);
    return () => window.clearInterval(timer);
  }, [started, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}

export default DecryptText;
