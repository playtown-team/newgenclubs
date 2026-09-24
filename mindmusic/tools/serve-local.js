#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// MINDMUSIC — Server local de desarrollo (SÓLO local, no se despliega).
//
// Sirve la app y, además, imita los endpoints `content/v2` de WordPress con el
// contenido de `wp-import/mindmusic-content.xml`. Sirve para ver la app entera
// funcionando sin depender de que WordPress esté cargado — por ejemplo antes de
// correr el import, o para probar un cambio de contenido antes de subirlo.
//
// Imita también las dos mañas de WordPress que la app tiene que aguantar:
// el cuerpo vuelve envuelto en HTML (`wpautop`) y con las comillas
// tipografiadas (`wptexturize`), y el extracto automático se corta a 55
// palabras. Si algo de eso rompe el parseo, se ve acá y no en producción.
//
// El `API_BASE` de `app.js` NO se toca: este server lo reescribe al vuelo a una
// ruta relativa cuando entrega el archivo. En producción sigue apuntando a
// contenidos.vip.
//
// Uso:  node tools/serve-local.js [puerto]   (por defecto 4180)
// ─────────────────────────────────────────────────────────────────────────────

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = Number(process.argv[2] || process.env.PORT || 4180);
const WP_URL = 'https://contenidos.vip/mindmusic';
const PLACEHOLDER_THUMB = `${WP_URL}/wp-content/themes/eventos/assets/img/default-thumb.png`;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.m4a': 'audio/mp4', '.ico': 'image/x-icon',
};

// ── Las mañas de WordPress ───────────────────────────────────────────────────
// wptexturize: las comillas rectas salen como entidades de comilla curva.
function texturize(s) {
  let open = true;
  return s.replace(/&/g, '&amp;').replace(/"/g, () => (open = !open) ? '&#8221;' : '&#8220;');
}
// wpautop: el cuerpo se sirve envuelto en <p> y con los saltos como <br />.
function autop(s) {
  return `<p>${texturize(s).split('\n').join('<br />\n')}</p>\n`;
}
// El extracto automático se corta a 55 palabras y queda un […]. Un extracto
// manual (el `excerpt:encoded` del WXR) se devuelve entero.
function excerpt(manual, body) {
  if (manual) return texturize(manual);
  const words = body.split(/\s+/);
  return texturize(words.length <= 55 ? body : words.slice(0, 55).join(' ') + ' […]');
}

// ── Contenido: se lee del WXR, el mismo archivo que se importa a WordPress ────
function loadPosts() {
  const file = path.join(ROOT, 'wp-import', 'mindmusic-content.xml');
  if (!fs.existsSync(file)) {
    console.error(`✖  No encontré ${path.relative(ROOT, file)} — la API va a contestar vacío.`);
    return { byCategory: {}, byId: {} };
  }
  const xml = fs.readFileSync(file, 'utf8');
  const byCategory = {};
  const byId = {};
  for (const block of xml.split('<item>').slice(1)) {
    const pick = (tag) => (block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`)) || [])[1] || '';
    const body = pick('content:encoded');
    const post = {
      id: Number((block.match(/<wp:post_id>(\d+)<\/wp:post_id>/) || [])[1] || 0),
      date: pick('wp:post_date').slice(0, 10),
      title: pick('title'),
      slug: pick('wp:post_name'),
      author: ' ',
      author_avatar: '',
      // El plugin nunca manda `thumbnail` vacío: manda el placeholder del theme.
      // Lo replicamos para ejercitar `wpThumbnail()` igual que en producción.
      thumbnail: PLACEHOLDER_THUMB,
      _excerpt: excerpt(pick('excerpt:encoded'), body),
      _content: autop(body),
    };
    byId[post.id] = post;
    for (const [, slug] of block.matchAll(/<category domain="category" nicename="([^"]+)">/g)) {
      (byCategory[slug] = byCategory[slug] || []).push(post);
    }
  }
  return { byCategory, byId };
}

const listShape = (p) => ({
  id: p.id, date: p.date, title: p.title, slug: p.slug,
  short_description: p._excerpt, author: p.author,
  author_avatar: p.author_avatar, thumbnail: p.thumbnail,
});

const detailShape = (p) => ({
  id: p.id, date: p.date, title: p.title, slug: p.slug, author: p.author,
  author_avatar: p.author_avatar, thumbnail: p.thumbnail, content: p._content,
  categories: [], tags: [], comments: 0, related: [],
});

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const json = (body) => {
    res.writeHead(200, { 'Content-Type': MIME['.json'] });
    res.end(JSON.stringify(body));
  };

  // se relee en cada request: editar el XML y recargar el navegador alcanza
  if (url.pathname === '/wp-json/content/v2/articles') {
    const slug = url.searchParams.get('category') || '';
    const limit = Number(url.searchParams.get('limit') || 10);
    const posts = loadPosts().byCategory[slug] || [];
    // El plugin contesta `results: false` cuando no encuentra nada.
    return json(posts.length
      ? { results: posts.slice(0, limit).map(listShape), limit, category: slug, status: true, statusCode: 200, message: 'OK' }
      : { results: false, status: false, statusCode: 404, message: 'ERROR' });
  }

  if (url.pathname === '/wp-json/content/v2/article') {
    const post = loadPosts().byId[Number(url.searchParams.get('id'))];
    return json(post
      ? { results: [detailShape(post)], previous: '', next: '', status: true, statusCode: 200, message: 'OK' }
      : { results: false, status: false, statusCode: 404, message: 'ERROR' });
  }

  if (url.pathname === '/wp-json/content/v2/categories') {
    const cats = Object.keys(loadPosts().byCategory).map((key) => ({ name: key, key }));
    return json({ results: cats, status: true, statusCode: 200, message: 'OK' });
  }

  const rel = url.pathname === '/' ? '/index.html' : url.pathname;
  const file = path.join(ROOT, path.normalize(rel).replace(/^(\.\.[/\\])+/, ''));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404');
    return;
  }

  const ext = path.extname(file).toLowerCase();
  if (path.basename(file) === 'app.js') {
    // Única diferencia con producción: la API apunta acá en vez de a contenidos.vip.
    const src = fs.readFileSync(file, 'utf8')
      .replace(/const API_BASE = '[^']*';/, "const API_BASE = '/wp-json/content/v2';");
    res.writeHead(200, { 'Content-Type': MIME['.js'] });
    res.end(src);
    return;
  }

  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, () => {
  console.log(`\n▶  MindMusic en http://localhost:${PORT}`);
  console.log(`   API content/v2 servida desde wp-import/mindmusic-content.xml`);
  console.log(`   (el audio se sigue trayendo de S3 — hace falta internet)\n`);
});
