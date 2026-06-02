export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`window.__ENV__ = { ANTHROPIC_API_KEY: "${process.env.ANTHROPIC_API_KEY || ''}" };`);
}
