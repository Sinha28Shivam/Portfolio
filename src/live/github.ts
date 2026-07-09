export type GitHubPulse = {
  followers: number;
  publicRepos: number;
  lastPushRepo: string | null;
  lastPushAgo: string | null;
  recentCommits: number;
  activeRepos: string[];
};

const USERNAME = 'Sinha28Shivam';
const CACHE_KEY = 'gh-pulse-v1';
const CACHE_TTL_MS = 30 * 60 * 1000;

let inflight: Promise<GitHubPulse | null> | null = null;

export function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

async function fetchPulse(): Promise<GitHubPulse | null> {
  try {
    const [userRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`),
      fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=60`),
    ]);
    if (!userRes.ok || !eventsRes.ok) return null;

    const user = await userRes.json();
    const events: Array<{
      type: string;
      created_at: string;
      repo?: { name: string };
      payload?: { commits?: unknown[] };
    }> = await eventsRes.json();

    const pushes = events.filter((e) => e.type === 'PushEvent');
    const lastPush = pushes[0] ?? null;
    const activeRepos = [...new Set(pushes.map((e) => e.repo?.name?.split('/')[1] ?? ''))]
      .filter(Boolean)
      .slice(0, 3);
    const recentCommits = pushes.reduce(
      (total, e) => total + (e.payload?.commits?.length ?? 0),
      0,
    );

    return {
      followers: user.followers ?? 0,
      publicRepos: user.public_repos ?? 0,
      lastPushRepo: lastPush?.repo?.name?.split('/')[1] ?? null,
      lastPushAgo: lastPush ? timeAgo(lastPush.created_at) : null,
      recentCommits,
      activeRepos,
    };
  } catch {
    return null;
  }
}

export async function getGitHubPulse(): Promise<GitHubPulse | null> {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const { at, data } = JSON.parse(cached);
      if (Date.now() - at < CACHE_TTL_MS) return data;
    }
  } catch {
    /* ignore storage failures */
  }

  if (!inflight) {
    inflight = fetchPulse().then((data) => {
      if (data) {
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
        } catch {
          /* ignore storage failures */
        }
      }
      inflight = null;
      return data;
    });
  }
  return inflight;
}
