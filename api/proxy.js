export default async function handler(req, res) {
  const APPS_URL = process.env.APPS_SCRIPT_URL;
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const params = new URLSearchParams(req.query).toString();
    const url = params ? `${APPS_URL}?${params}` : APPS_URL;

    if (req.method === 'POST') {
      const body = JSON.stringify(req.body);
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        redirect: 'follow',
      });
      const text = await r.text();
      res.setHeader('Content-Type', 'application/json');
      return res.send(text);
    }

    const r = await fetch(url, { redirect: 'follow' });
    const text = await r.text();
    res.setHeader('Content-Type', 'application/json');
    return res.send(text);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
