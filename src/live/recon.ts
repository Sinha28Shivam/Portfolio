export type VisitorRecon = {
  lines: string[];
};

type Geo = { city?: string; country_name?: string; org?: string } | null;

let geoCache: Geo | undefined;

async function getGeo(): Promise<Geo> {
  if (geoCache !== undefined) return geoCache;
  let result: Geo = null;
  try {
    const res = await fetch('https://ipapi.co/json/');
    result = res.ok ? await res.json() : null;
  } catch {
    result = null;
  }
  geoCache = result;
  return result;
}

function detectBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return 'Microsoft Edge';
  if (/opr\//i.test(ua)) return 'Opera';
  if (/chrome\//i.test(ua)) return 'Chrome';
  if (/firefox\//i.test(ua)) return 'Firefox';
  if (/safari\//i.test(ua)) return 'Safari';
  return 'unknown browser';
}

function detectOs(ua: string): string {
  if (/windows nt 10/i.test(ua)) return 'Windows 10/11';
  if (/windows/i.test(ua)) return 'Windows';
  if (/mac os x/i.test(ua)) return 'macOS';
  if (/android/i.test(ua)) return 'Android';
  if (/iphone|ipad/i.test(ua)) return 'iOS';
  if (/linux/i.test(ua)) return 'Linux';
  return 'unknown OS';
}

function getGpu(): string | null {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return null;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return null;
    const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
    return typeof renderer === 'string' ? renderer : null;
  } catch {
    return null;
  }
}

export async function getVisitorRecon(): Promise<VisitorRecon> {
  const ua = navigator.userAgent;
  const lines: string[] = ['initiating passive recon on visitor ...', ''];

  lines.push(`[agent]     ${detectBrowser(ua)} on ${detectOs(ua)}`);
  lines.push(`[display]   ${screen.width}x${screen.height} @ ${window.devicePixelRatio}x`);

  const gpu = getGpu();
  if (gpu) lines.push(`[gpu]       ${gpu}`);

  if (navigator.hardwareConcurrency) {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const mem = nav.deviceMemory ? ` · ~${nav.deviceMemory}GB RAM` : '';
    lines.push(`[compute]   ${navigator.hardwareConcurrency} logical cores${mem}`);
  }

  const conn = (navigator as Navigator & {
    connection?: { effectiveType?: string; downlink?: number };
  }).connection;
  if (conn?.effectiveType) {
    const speed = conn.downlink ? ` · ~${conn.downlink} Mbps` : '';
    lines.push(`[network]   ${conn.effectiveType}${speed}`);
  }

  lines.push(
    `[locale]    ${navigator.language} · ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
  );

  try {
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<{ level: number; charging: boolean }>;
    };
    if (nav.getBattery) {
      const battery = await nav.getBattery();
      lines.push(
        `[power]     ${Math.round(battery.level * 100)}%${battery.charging ? ' (charging)' : ''}`,
      );
    }
  } catch {
    /* battery API unavailable */
  }

  const geo = await getGeo();
  if (geo?.city) {
    lines.push(`[uplink]    ${geo.city}, ${geo.country_name ?? ''}${geo.org ? ` · ${geo.org}` : ''}`);
  }

  lines.push('');
  lines.push('recon complete. nothing was stored or transmitted — this all lives in your browser.');
  return { lines };
}
