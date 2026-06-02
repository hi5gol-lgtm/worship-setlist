export default async function handler(req, res) {
  const APPS_URL = process.env.APPS_SCRIPT_URL;
  
  let url = APPS_URL;
  if (req.method === 'GET') {
    const params = new URLSearchParams(req.query).toString();
    if (params) url += '?' + params;
  }

  const fetchOptions = { method: req.method, redirect: 'follow' };
  if (req.method === 'POST') {
    fetchOptions.body = JSON.stringify(req.body);
    fetchOptions.headers = { 'Content-Type': 'application/json' };
  }

  try {
    const r = await fetch(url, fetchOptions);
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
