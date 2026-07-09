import { useEffect, useRef, useState } from 'react';
import type { IssPosition } from '../live/iss';

// Equirectangular projection: lon -180..180 -> x 0..360, lat 90..-90 -> y 0..180
function project(pos: IssPosition) {
  return { x: pos.longitude + 180, y: 90 - pos.latitude };
}

// Stylized low-poly continents for the HUD map (equirectangular, 360x180).
const CONTINENTS = [
  'M 14,24 L 38,16 L 62,18 L 88,24 L 106,34 L 112,44 L 96,50 L 88,64 L 96,74 L 90,82 L 80,68 L 66,54 L 44,44 L 22,38 Z',
  'M 100,80 L 120,84 L 136,94 L 130,114 L 116,138 L 108,152 L 100,126 L 96,98 Z',
  'M 122,10 L 142,6 L 152,14 L 142,26 L 126,22 Z',
  'M 176,30 L 198,22 L 214,28 L 210,42 L 194,48 L 180,44 Z',
  'M 166,58 L 198,54 L 220,62 L 228,82 L 216,106 L 200,126 L 190,120 L 178,94 L 168,74 Z',
  'M 212,28 L 246,14 L 288,16 L 322,26 L 334,42 L 318,54 L 300,64 L 286,54 L 270,58 L 262,84 L 252,60 L 234,50 L 216,42 Z',
  'M 293,104 L 316,100 L 330,112 L 322,127 L 302,125 L 291,114 Z',
];

const TRAIL_LENGTH = 14;

function IssTracker({ position }: { position: IssPosition | null }) {
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);
  const [smooth, setSmooth] = useState(true);
  const lastXRef = useRef<number | null>(null);

  useEffect(() => {
    if (!position) return;
    const point = project(position);

    // Crossing the antimeridian would sweep the dot across the whole map —
    // teleport instead of gliding for that one update.
    const jumped = lastXRef.current !== null && Math.abs(point.x - lastXRef.current) > 180;
    setSmooth(!jumped);
    lastXRef.current = point.x;

    setTrail((prev) => [...prev.slice(-(TRAIL_LENGTH - 1)), point]);
  }, [position]);

  if (!position) return null;
  const { x, y } = project(position);

  return (
    <div className="iss-map" aria-label="Live ISS ground track">
      <svg viewBox="0 0 360 180" preserveAspectRatio="none">
        {/* graticule */}
        {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((gx) => (
          <line key={`v${gx}`} x1={gx} y1="0" x2={gx} y2="180" className="iss-map__grid" />
        ))}
        {[30, 60, 120, 150].map((gy) => (
          <line key={`h${gy}`} x1="0" y1={gy} x2="360" y2={gy} className="iss-map__grid" />
        ))}
        <line x1="0" y1="90" x2="360" y2="90" className="iss-map__equator" />

        {/* continents */}
        {CONTINENTS.map((d) => (
          <path key={d} d={d} className="iss-map__land" />
        ))}

        {/* ground-track trail */}
        {trail.slice(0, -1).map((point, i) => (
          <circle
            key={`${point.x}-${point.y}-${i}`}
            cx={point.x}
            cy={point.y}
            r="1.6"
            className="iss-map__trail"
            style={{ opacity: ((i + 1) / trail.length) * 0.55 }}
          />
        ))}

        {/* the ISS — glides to each new real fix */}
        <g
          className={smooth ? 'iss-map__sat iss-map__sat--smooth' : 'iss-map__sat'}
          style={{ transform: `translate(${x}px, ${y}px)` }}
        >
          <circle r="7" className="iss-map__ping" />
          <circle r="2.4" className="iss-map__dot" />
        </g>
      </svg>
      <span className="iss-map__caption">live ground track · NORAD 25544</span>
    </div>
  );
}

export default IssTracker;
