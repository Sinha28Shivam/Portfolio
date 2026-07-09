import { useEffect, useState } from 'react';

type Telemetry = {
  fps: number;
  points: number;
  drawCalls: number;
};

// Live render stats emitted by Scene via the `engine-telemetry` event.
function EngineHud() {
  const [stats, setStats] = useState<Telemetry | null>(null);

  useEffect(() => {
    const onTelemetry = (event: Event) => {
      setStats((event as CustomEvent<Telemetry>).detail);
    };
    window.addEventListener('engine-telemetry', onTelemetry);
    return () => window.removeEventListener('engine-telemetry', onTelemetry);
  }, []);

  if (!stats) return null;

  return (
    <div className="engine-hud" aria-hidden="true">
      <span className="live-dot" />
      FPS {stats.fps} · PTS {stats.points.toLocaleString()} · DRAW {stats.drawCalls}
    </div>
  );
}

export default EngineHud;
