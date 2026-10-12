import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('out');
const origin = 'https://www.sanliotokurtarma.com';
const issues = [];
const check = (ok, message) => { if (!ok) issues.push(message); };
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const files = walk(root).filter(file => file.endsWith('.html') && !file.includes(`${path.sep}404${path.sep}`) && !file.endsWith(`${path.sep}404.html`));
const titles = new Set(), descriptions = new Set(), routes = new Set();
let linkCount = 0, schemaCount = 0;
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const route = '/' + relative.replace(/index\.html$/, ''); routes.add(route);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  check(title && !titles.has(title), `${route}: missing or duplicate title`); titles.add(title);
  check(description && !descriptions.has(description), `${route}: missing or duplicate description`); descriptions.add(description);
  check(html.includes(`rel="canonical" href="${origin}${route}"`), `${route}: canonical mismatch`);
  check((html.match(/<h1[ >]/g) || []).length === 1, `${route}: expected one h1`);
  check(!/example\.com|PHONE_PLACEHOLDER|WHATSAPP_PLACEHOLDER/.test(html), `${route}: placeholder leak`);
  check(html.includes('href="tel:+905446043460"'), `${route}: phone link missing`);
  check(html.includes('href="https://wa.me/905446043460?'), `${route}: WhatsApp link missing`);
  check(!/905514726160|0551 472 61 60/.test(html), `${route}: old phone remains`);
  for (const img of html.matchAll(/<img\b[^>]*>/g)) check(/alt="[^"]+"/.test(img[0]), `${route}: image alt missing`);
  for (const entry of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
    try { const data = JSON.parse(entry[1]); check(data['@context'] === 'https://schema.org', `${route}: schema context`); schemaCount++; } catch { issues.push(`${route}: invalid JSON-LD`); }
  }
  for (const entry of html.matchAll(/href="([^"]+)"/g)) {
    const href = entry[1].replaceAll('&amp;', '&');
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url = new URL(href, origin + route); if (url.origin !== origin) continue;
    const target = path.join(root, decodeURIComponent(url.pathname), url.pathname.endsWith('/') ? 'index.html' : '');
    check(fs.existsSync(target), `${route}: missing target ${href}`); linkCount++;
    if (url.hash && fs.existsSync(target)) check(fs.readFileSync(target, 'utf8').includes(`id="${url.hash.slice(1)}"`), `${route}: missing anchor ${href}`);
  }
}
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const listed = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
for (const route of routes) if (route !== '/gizlilik/') check(listed.includes(origin + route), `sitemap missing ${route}`);
for (const url of listed) check(url.startsWith(origin) && routes.has(url.slice(origin.length)), `sitemap invalid URL ${url}`);
check(fs.readFileSync(path.join(root, 'robots.txt'), 'utf8').includes(`Sitemap: ${origin}/sitemap.xml`), 'robots sitemap mismatch');
check(fs.existsSync(path.join(root, '404.html')), '404 export missing');
check(fs.statSync(path.join(root, 'hero-tow-truck.webp')).size < 150000, 'Hero exceeds 150 KB budget');
check(fs.existsSync(path.join(root, '.htaccess')), 'cPanel config missing');
if (issues.length) { console.error(issues.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${files.length} pages; ${linkCount} internal links; ${schemaCount} JSON-LD blocks; unique metadata, canonicals, sitemap, CTA links, 404 and hero budget. Schema syntax only; not Google rich-result eligibility.`);
