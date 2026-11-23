export function notFound(req, res) {
  res.status(404).json({ ok: false, message: 'Not found.' });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, message: 'The request body is not valid JSON.' });
  }
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({ ok: false, message: 'The request is too large.' });
  }

  console.error('[api] unhandled error:', err);
  return res.status(500).json({
    ok: false,
    message: 'The server could not save your request. Try again shortly.',
  });
}
