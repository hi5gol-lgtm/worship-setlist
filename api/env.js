export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
    APPS_SCRIPT_URL: process.env.APPS_SCRIPT_URL || ''
  });
}
