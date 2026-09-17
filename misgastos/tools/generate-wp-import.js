#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// MIS GASTOS EN ORDEN — Generador del XML (WXR) para importar todo el
// contenido editorial a WordPress (contenidos.vip/misgastoseo).
//
// Migración one-shot: lee el contenido que vivía en `mock-data.js` y arma un
// archivo importable desde WP Admin → Herramientas → Importar → WordPress.
// Después de la migración el contenido vive SOLO en WordPress; este script
// queda como registro de cómo se armó el import. Para regenerar el XML hay que
// recuperar el contenido original del historial:
//   git show d98435e:mock-data.js > tools/content-source.js
//
// Uso:  node tools/generate-wp-import.js
// Sale: wp-import/misgastoseo-content.xml
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'wp-import');
const OUT_FILE = path.join(OUT_DIR, 'misgastoseo-content.xml');

const WP_URL = 'https://contenidos.vip/misgastoseo';
// Las imágenes de los tips ya están publicadas acá: el importador de WordPress
// las descarga desde esta URL y las sube a la biblioteca de medios.
const IMG_BASE = 'https://mis-gastos-en-orden.vercel.app';
const AUTHOR = 'admin';

// ── Fuente del contenido ─────────────────────────────────────────────────────
// Antes de la migración vivía en mock-data.js (hoy borrado: el contenido está
// en WordPress). Para regenerar, recuperalo del historial de git en
// tools/content-source.js — ver la cabecera.
function loadSource() {
  const candidates = [
    path.join(__dirname, 'content-source.js'),
    path.join(ROOT, 'mock-data.js'),
  ];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const ctx = {};
    const code = fs.readFileSync(file, 'utf8').replace(/\bconst\b|\blet\b/g, 'var');
    vm.runInNewContext(code, ctx);
    const db = ctx.MOCK_DB || ctx.CONTENT_SOURCE;
    if (db && db.tips && db.tips.length) return { db, file };
  }
  console.error('\n❌  No encontré el contenido a migrar (tools/content-source.js o mock-data.js con `tips`).\n');
  process.exit(1);
}

const { db, file } = loadSource();
console.log(`\n📦  Leyendo contenido de: ${path.relative(ROOT, file)}`);

// ── Helpers ──────────────────────────────────────────────────────────────────
const cdata = (s) => `<![CDATA[${String(s == null ? '' : s).replace(/\]\]>/g, ']]]]><![CDATA[>')}]]>`;
const json = (o) => JSON.stringify(o, null, 2);

// WP guarda dos fechas: local y GMT. El sitio corre en GMT-3, así que la
// versión GMT se corre 3 horas para adelante.
function dates(ymd, hour = 12) {
  const local = `${ymd} ${String(hour).padStart(2, '0')}:00:00`;
  const gmt = new Date(`${ymd}T${String(hour).padStart(2, '0')}:00:00Z`);
  gmt.setUTCHours(gmt.getUTCHours() + 3);
  return { local, gmt: gmt.toISOString().replace('T', ' ').slice(0, 19) };
}

function addDays(ymd, n) {
  const d = new Date(`${ymd}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

// ── Términos (categorías) ────────────────────────────────────────────────────
// Los slugs coinciden con los que ya existen en el WordPress: el importador
// reutiliza el término existente en vez de crear uno nuevo.
const CATS = {
  'tips-educativos':      'Tips Educativos',
  'tips-financieros':     'Tips Financieros',
  'alertas':              'Alertas',
  'ahorro':               'Ahorro',
  'educacion-financiera': 'Educacion Financiera',
  'retos-semanales':      'Retos Semanales',
  'tips-de-la-semana':    'Tips de la Semana',
  'dosis-de-calma':       'Dosis de Calma',
};

// ── Item genérico ────────────────────────────────────────────────────────────
function postItem({ id, title, slug, payload, excerpt, date, categories, thumbId, hour }) {
  const d = dates(date, hour);
  const cats = categories.map((c) => `\n    <category domain="category" nicename="${c}">${cdata(CATS[c] || c)}</category>`).join('');
  const meta = thumbId ? `
    <wp:postmeta>
      <wp:meta_key>${cdata('_thumbnail_id')}</wp:meta_key>
      <wp:meta_value>${cdata(String(thumbId))}</wp:meta_value>
    </wp:postmeta>` : '';
  return `
  <item>
    <title>${cdata(title)}</title>
    <link>${WP_URL}/${slug}/</link>
    <pubDate>${new Date(`${date}T12:00:00Z`).toUTCString()}</pubDate>
    <dc:creator>${cdata(AUTHOR)}</dc:creator>
    <guid isPermaLink="false">${WP_URL}/?p=${id}</guid>
    <description></description>
    <content:encoded>${cdata(payload)}</content:encoded>
    <excerpt:encoded>${cdata(excerpt || '')}</excerpt:encoded>
    <wp:post_id>${id}</wp:post_id>
    <wp:post_date>${cdata(d.local)}</wp:post_date>
    <wp:post_date_gmt>${cdata(d.gmt)}</wp:post_date_gmt>
    <wp:post_modified>${cdata(d.local)}</wp:post_modified>
    <wp:post_modified_gmt>${cdata(d.gmt)}</wp:post_modified_gmt>
    <wp:comment_status>${cdata('closed')}</wp:comment_status>
    <wp:ping_status>${cdata('closed')}</wp:ping_status>
    <wp:post_name>${cdata(slug)}</wp:post_name>
    <wp:status>${cdata('publish')}</wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:post_type>${cdata('post')}</wp:post_type>
    <wp:post_password></wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>${cats}${meta}
  </item>`;
}

function attachmentItem({ id, parentId, slug, title, url, date }) {
  const d = dates(date, 12);
  return `
  <item>
    <title>${cdata(title)}</title>
    <link>${url}</link>
    <pubDate>${new Date(`${date}T12:00:00Z`).toUTCString()}</pubDate>
    <dc:creator>${cdata(AUTHOR)}</dc:creator>
    <guid isPermaLink="false">${url}</guid>
    <description></description>
    <content:encoded>${cdata('')}</content:encoded>
    <excerpt:encoded>${cdata('')}</excerpt:encoded>
    <wp:post_id>${id}</wp:post_id>
    <wp:post_date>${cdata(d.local)}</wp:post_date>
    <wp:post_date_gmt>${cdata(d.gmt)}</wp:post_date_gmt>
    <wp:post_modified>${cdata(d.local)}</wp:post_modified>
    <wp:post_modified_gmt>${cdata(d.gmt)}</wp:post_modified_gmt>
    <wp:comment_status>${cdata('closed')}</wp:comment_status>
    <wp:ping_status>${cdata('closed')}</wp:ping_status>
    <wp:post_name>${cdata(slug)}</wp:post_name>
    <wp:status>${cdata('inherit')}</wp:status>
    <wp:post_parent>${parentId}</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:post_type>${cdata('attachment')}</wp:post_type>
    <wp:post_password></wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>
    <wp:attachment_url>${cdata(url)}</wp:attachment_url>
  </item>`;
}

// ── Construcción de los items ────────────────────────────────────────────────
const items = [];
let nTips = 0, nImgs = 0, nRetos = 0, nFeat = 0, nCalm = 0;

// 1) Tips educativos (30) — cada uno en su categoría temática + "tips-educativos"
//    (el endpoint que la app usa para traerlos todos de una).
db.tips.forEach((t, i) => {
  const postId = 2001 + i;
  const imgId = 2101 + i;
  const hasImg = !!t.image;
  const payload = json({
    id: t.id,
    category: t.categoryId,
    badge: t.badge,
    title: t.title,
    excerpt: t.excerpt,
    image: t.image || '',
    publishedAt: t.publishedAt,
    body: t.body,
  });
  items.push(postItem({
    id: postId,
    title: t.title,
    slug: t.id,
    payload,
    excerpt: t.excerpt,
    date: t.publishedAt,
    categories: ['tips-educativos', t.categoryId],
    thumbId: hasImg ? imgId : null,
  }));
  nTips++;
  if (hasImg) {
    items.push(attachmentItem({
      id: imgId,
      parentId: postId,
      slug: `${t.id}-img`,
      title: t.title,
      url: `${IMG_BASE}/${String(t.image).replace(/^\//, '')}`,
      date: t.publishedAt,
    }));
    nImgs++;
  }
});

// 2) Retos semanales (30) — `order` ES la rotación: la app los ordena por ese
//    campo, no por fecha de publicación.
const RETOS_BASE_DATE = '2026-01-05'; // lunes
db.weeklyChallenges.forEach((c, i) => {
  const payload = json({ id: c.id, title: c.title, description: c.description, order: i });
  items.push(postItem({
    id: 3001 + i,
    title: c.title,
    slug: c.id,
    payload,
    excerpt: c.description,
    date: addDays(RETOS_BASE_DATE, i * 7),
    categories: ['retos-semanales'],
  }));
  nRetos++;
});

// 3) Tip de la semana — la app muestra siempre el más nuevo de la categoría.
db.featuredTips.forEach((f, i) => {
  const payload = json({
    id: f.id,
    title: f.title,
    excerpt: f.excerpt,
    publishedAt: f.publishedAt,
    body: f.body,
    actions: f.actions || [],
    source: f.source || '',
    sourceUrl: f.sourceUrl || '',
  });
  items.push(postItem({
    id: 4001 + i,
    title: f.title,
    slug: f.id,
    payload,
    excerpt: f.excerpt,
    date: f.publishedAt,
    categories: ['tips-de-la-semana'],
  }));
  nFeat++;
});

// 4) Dosis de calma (30 frases) — `order` fija la rotación diaria.
const CALM_BASE_DATE = '2026-01-01';
function slugify(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}
db.calmQuotes.forEach((q, i) => {
  const id = `calma-${String(i + 1).padStart(2, '0')}-${slugify(q)}`.slice(0, 70);
  const payload = json({ id, quote: q, order: i });
  items.push(postItem({
    id: 5001 + i,
    title: q,
    slug: id,
    payload,
    excerpt: q,
    date: addDays(CALM_BASE_DATE, i),
    categories: ['dosis-de-calma'],
  }));
  nCalm++;
});

// ── XML ──────────────────────────────────────────────────────────────────────
const termBlocks = Object.entries(CATS).map(([slug, name], i) => `
  <wp:category>
    <wp:term_id>${100 + i}</wp:term_id>
    <wp:category_nicename>${slug}</wp:category_nicename>
    <wp:category_parent></wp:category_parent>
    <wp:cat_name>${cdata(name)}</wp:cat_name>
  </wp:category>`).join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>Mis Gastos en Orden — Contenido</title>
  <link>${WP_URL}</link>
  <description>Tips educativos, retos semanales, tip de la semana y dosis de calma</description>
  <pubDate>${new Date().toUTCString()}</pubDate>
  <language>es</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>${WP_URL}</wp:base_site_url>
  <wp:base_blog_url>${WP_URL}</wp:base_blog_url>
  <wp:author>
    <wp:author_id>1</wp:author_id>
    <wp:author_login>${cdata(AUTHOR)}</wp:author_login>
    <wp:author_email>${cdata('')}</wp:author_email>
    <wp:author_display_name>${cdata(AUTHOR)}</wp:author_display_name>
    <wp:author_first_name>${cdata('')}</wp:author_first_name>
    <wp:author_last_name>${cdata('')}</wp:author_last_name>
  </wp:author>${termBlocks}
${items.join('\n')}
</channel>
</rss>
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, xml, 'utf8');

console.log(`✓  ${path.relative(ROOT, OUT_FILE)}\n`);
console.log(`   ${nTips} tips educativos (+ ${nImgs} imágenes destacadas)`);
console.log(`   ${nRetos} retos semanales`);
console.log(`   ${nFeat} tip de la semana`);
console.log(`   ${nCalm} dosis de calma`);
console.log(`   ─────────────────────────────`);
console.log(`   ${items.length} items en total\n`);
