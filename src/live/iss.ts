export type IssPosition = {
  latitude: number;
  longitude: number;
  altitudeKm: number;
  velocityKmh: number;
};

const ISS_URL = 'https://api.wheretheiss.at/v1/satellites/25544';
const POLL_MS = 5000;

export async function getIssPosition(): Promise<IssPosition | null> {
  try {
    const res = await fetch(ISS_URL);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      altitudeKm: data.altitude,
      velocityKmh: data.velocity,
    };
  } catch {
    return null;
  }
}

export function formatIss(pos: IssPosition): string {
  const lat = `${Math.abs(pos.latitude).toFixed(1)}°${pos.latitude >= 0 ? 'N' : 'S'}`;
  const lon = `${Math.abs(pos.longitude).toFixed(1)}°${pos.longitude >= 0 ? 'E' : 'W'}`;
  return `${lat} ${lon} · ${Math.round(pos.velocityKmh).toLocaleString()} km/h`;
}

// Polls every 5s; stops silently after repeated failures. Returns unsubscribe.
export function subscribeIss(callback: (pos: IssPosition) => void): () => void {
  let timer = 0;
  let failures = 0;

  const poll = async () => {
    const pos = await getIssPosition();
    if (pos) {
      failures = 0;
      callback(pos);
    } else if (++failures >= 3) {
      window.clearInterval(timer);
      return;
    }
  };

  poll();
  timer = window.setInterval(poll, POLL_MS);
  return () => window.clearInterval(timer);
}
