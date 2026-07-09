import { useEffect, useRef, useState } from 'react';

// Targeting-reticle cursor: a center dot rides the pointer, a rotating dashed
// ring with corner brackets lerps behind it and "locks on" over interactive
// elements, and a mono x:y coordinate readout trails alongside — HUD style.
// Uses any-pointer (not primary-pointer) detection so touchscreen laptops
// with a mouse attached still get the cursor.
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trail = { x: target.x, y: target.y };
    let raf = 0;
    let visible = false;

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        visible = true;
        dotRef.current?.classList.add('is-visible');
        reticleRef.current?.classList.add('is-visible');
      }
      const interactive = (event.target as Element | null)?.closest(
        'a, button, input, [role="button"], [role="tab"]',
      );
      reticleRef.current?.classList.toggle('is-locked', Boolean(interactive));
    };

    const tick = () => {
      trail.x += (target.x - trail.x) * 0.18;
      trail.y += (target.y - trail.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }
      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0)`;
      }
      if (coordsRef.current) {
        coordsRef.current.textContent = `${Math.round(target.x)} : ${Math.round(target.y)}`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-core" aria-hidden="true">
        <span ref={coordsRef} className="cursor-coords" />
      </div>
      <div ref={reticleRef} className="cursor-reticle" aria-hidden="true">
        <span className="reticle-ring" />
        <span className="reticle-corner reticle-corner--tl" />
        <span className="reticle-corner reticle-corner--tr" />
        <span className="reticle-corner reticle-corner--bl" />
        <span className="reticle-corner reticle-corner--br" />
      </div>
    </>
  );
}

export default CustomCursor;
