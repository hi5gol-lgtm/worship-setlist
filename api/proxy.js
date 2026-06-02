export default async function handler(req, res) {
  const APPS_URL = process.env.APPS_SCRIPT_URL;

  try {
    let url = APPS_URL;
    let fetchOptions = { redirect: 'follow' };

    if (req.method === 'POST') {
      const body = JSON.stringify(req.body);
      // POST는 리다이렉트 후 GET으로 재시도
      const r1 = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        redirect: 'manual'
      });
      if (r1.status === 302 || r1.status === 301) {
        const location = r1.headers.get('location');
        const r2 = await fetch(location, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
        const data = await r2.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(data);
      }
      const data = await r1.json();
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.json(data);
    }

    // GET
    const params = new URLSearchParams(req.query).toString();
    if (params) url += '?' + params;

    const r1 = await fetch(url, { redirect: 'manual' });
    if (r1.status === 302 || r1.status === 301) {
      const location = r1.headers.get('location');
      const r2 = await fetch(location);
      const data = await r2.json();
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.json(data);
    }
    const data = await r1.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(data);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
