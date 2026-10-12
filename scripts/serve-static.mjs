import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('out');
const port = Number(process.env.PORT || 3000);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2' };
http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400); res.end(); return; }
  let file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep) && file !== root || pathname.includes('\\') || pathname.split('/').some(segment => segment.startsWith('.'))) { res.writeHead(404); res.end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!pathname.endsWith('/')) { res.writeHead(308, { Location: pathname + '/' }); res.end(); return; }
    file = path.join(file, 'index.html');
  }
  let status = 200;
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { file = path.join(root, '404.html'); status = 404; }
  if (!fs.existsSync(file)) { res.writeHead(503); res.end('Run npm run build first.'); return; }
  res.writeHead(status, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  if (req.method === 'HEAD') res.end(); else fs.createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`Static preview: http://127.0.0.1:${port}`));
