// Base URL of the Express API. Empty means same origin (dev proxy or reverse proxy in production).
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message);
    this.status = status;
    this.errors = errors || {};
  }
}

export async function submitDemoRequest(payload, { signal } = {}) {
  // Static design previews have no backend: say so plainly rather than pretending to send.
  if (import.meta.env.VITE_PREVIEW_MODE === 'true') {
    throw new ApiError('This is a design preview, so demo requests are not sent from here. The live site emails them to the WazzupPAP team.');
  }
  let response;
  try {
    response = await fetch(`${API_BASE}/api/demo-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Your request could not be sent. Check your connection and try again.');
  }

  let body = {};
  try {
    body = await response.json();
  } catch {
    // Non-JSON response (e.g. proxy error page)
  }

  if (!response.ok || body.ok === false) {
    throw new ApiError(
      body.message || 'The server could not send your request. Try again shortly.',
      { status: response.status, errors: body.errors },
    );
  }
  return body;
}
