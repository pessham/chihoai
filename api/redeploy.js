// Vercel Scheduled Function: triggers a new Production deploy via Deploy Hook
// Schedule is defined in vercel.json "crons" (UTC). 06:00 JST = 21:00 UTC (前日)

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const isDry = url.searchParams.get('dry') === '1';
    const isPreview = url.searchParams.get('preview') === '1';

    // Choose hook: preview or production
    const hook = isPreview
      ? (process.env.DEPLOY_HOOK_URL_PREVIEW || '')
      : (process.env.DEPLOY_HOOK_URL || '');

    if (!hook) {
      const which = isPreview ? 'DEPLOY_HOOK_URL_PREVIEW' : 'DEPLOY_HOOK_URL';
      return res.status(500).json({ ok: false, error: `${which} is not set` });
    }

    // Dry-run: do not call hook, just echo env readiness
    if (isDry) {
      const now = new Date();
      const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
      return res.status(200).json({
        ok: true,
        mode: 'dry-run',
        target: isPreview ? 'preview' : 'production',
        hookConfigured: true,
        nowUTC: now.toISOString(),
        nowJST: jst.toISOString(),
      });
    }

    // Trigger deploy
    const r = await fetch(hook, { method: 'POST' });
    const code = r.status;
    const ok = code >= 200 && code < 300;
    return res.status(ok ? 200 : 500).json({ ok, status: code });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
