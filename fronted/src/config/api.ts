// Helper to resolve API base depending on environment (local vs deployed)
export function getApiUrl() {
  const envUrl = import.meta.env.VITE_API_URL || "";

  // If running on the browser locally (localhost or 127.0.0.1) prefer localhost
  try {
    const host = typeof window !== 'undefined' ? window.location.hostname : '';
    if (host === 'localhost' || host === '127.0.0.1' || import.meta.env.DEV) {
      // allow an explicit localhost fallback if env not set
      return envUrl || `http://localhost:8000`;
    }
    // deployed: use provided env url or the current origin
    return envUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  } catch {
    return envUrl || '';
  }
}
