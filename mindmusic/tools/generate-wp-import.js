#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// MINDMUSIC — Generador del XML (WXR) para importar todo el contenido a
// WordPress (contenidos.vip/mindmusic).
//
// Migración one-shot: lee el contenido que vivía en `mock-data.js` y arma un
// archivo importable desde WP Admin → Herramientas → Importar → WordPress.
// Después de la migración el contenido vive SOLO en WordPress; este script
// queda como registro de cómo se armó el import. Para regenerar el XML hay que
// recuperar el contenido original del historial:
//   git show ab15193:mock-data.js > tools/content-source.js
//
// Uso:  node tools/generate-wp-import.js
// Sale: wp-import/mindmusic-content.xml
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'wp-import');
const OUT_FILE = path.join(OUT_DIR, 'mindmusic-content.xml');

const WP_URL = 'https://contenidos.vip/mindmusic';
const AUTHOR = 'admin';

// Las 21 melodías están en S3, fuera del repo. Los `audioUrl` del mock eran
// rutas relativas a `audio/<mood>/…`; en WordPress viajan como URL absoluta.
const AUDIO_BASE = 'https://ptown-wap-ar.s3.sa-east-1.amazonaws.com/mindmusic/music';

// Las fotos NO se suben a la biblioteca de medios: viajan como URL dentro del
// JSON, exactamente las mismas que usaba el mock. Es la única forma de que cada
// canción conserve su foto propia (las canciones no son posts, viven dentro del
// JSON de su playlist), y así el import no depende de descargar 35 adjuntos.

// ── Fuente del contenido ─────────────────────────────────────────────────────
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
    if (db && db.moods && db.moods.length) return { db, file };
  }
  console.error('\n❌  No encontré el contenido a migrar (tools/content-source.js o mock-data.js con `moods`).\n');
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

// `audio/relax/ease.m4a` → `https://…/mindmusic/music/relax/ease.m4a`.
// Una URL que ya es absoluta se deja como está.
function audioUrl(rel) {
  if (!rel) return '';
  if (/^https?:\/\//i.test(rel)) return rel;
  return `${AUDIO_BASE}/${String(rel).replace(/^audio\//, '').replace(/^\//, '')}`;
}

// ── Términos (categorías) ────────────────────────────────────────────────────
const CATS = {
  'estados-de-animo': 'Estados de Ánimo',
  'playlists':        'Playlists',
  'audios':           'Audios',
};

// ── Item genérico ────────────────────────────────────────────────────────────
function postItem({ id, title, slug, payload, excerpt, date, categories, hour }) {
  const d = dates(date, hour);
  const cats = categories.map((c) => `\n    <category domain="category" nicename="${c}">${cdata(CATS[c] || c)}</category>`).join('');
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
    <wp:is_sticky>0</wp:is_sticky>${cats}
  </item>`;
}

// ── Construcción de los items ────────────────────────────────────────────────
const items = [];
let nMoods = 0, nPlaylists = 0, nAudios = 0, nSongs = 0;

// 1) Estados de ánimo (7) — `order` fija el orden del catálogo (Calma → Superación).
//    `icon` es la clave de MOOD_ICONS en app.js; `ink`/`grad` son la identidad
//    visual del estado, autoradas junto con el contenido (mismo criterio que el
//    `grad`/`emoji` de los retos de Retofit).
const MOODS_BASE_DATE = '2026-01-05';
db.moods.forEach((m, i) => {
  const payload = json({
    id: m.id,
    name: m.name,
    subtitle: m.subtitle,
    cta: m.cta,
    icon: m.icon,
    ink: m.ink,
    grad: m.grad,
    photo: m.photo || '',
    order: i,
  });
  items.push(postItem({
    id: 2001 + i,
    title: m.name,
    slug: `estado-${m.id}`,
    payload,
    excerpt: m.subtitle,
    date: addDays(MOODS_BASE_DATE, i),
    categories: ['estados-de-animo'],
  }));
  nMoods++;
});

// 2) Playlists (7) — cada una con su tracklist completo adentro del JSON.
//    Las canciones no son posts: viven acá con su título, duración, audio (S3)
//    y su foto propia.
const PLAYLISTS_BASE_DATE = '2026-02-02';
db.playlists.forEach((p, i) => {
  const tracks = p.tracks.map((s) => ({
    title: s.title,
    duration: s.duration,
    audioUrl: audioUrl(s.audioUrl),
    photo: s.photo || '',
  }));
  const payload = json({
    id: p.id,
    moodId: p.moodId,
    contentType: p.contentType || 'playlists',
    title: p.title,
    desc: p.desc,
    photo: p.photo || '',
    order: i,
    tracks,
  });
  items.push(postItem({
    id: 3001 + i,
    title: p.title,
    slug: `playlist-${p.id}`,
    payload,
    excerpt: p.desc,
    date: addDays(PLAYLISTS_BASE_DATE, i),
    categories: ['playlists'],
  }));
  nPlaylists++;
  nSongs += tracks.length;
});

// 3) Audios sueltos (cápsulas, audio mensajes, música guiada) — hoy ninguno:
//    no hay grabado todavía. El bloque queda armado para cuando existan.
const AUDIOS_BASE_DATE = '2026-03-02';
(db.tracks || []).forEach((t, i) => {
  const payload = json({
    id: t.id,
    moodId: t.moodId,
    contentType: t.contentType,
    title: t.title,
    desc: t.desc,
    duration: t.duration,
    photo: t.photo || '',
    audioUrl: audioUrl(t.audioUrl),
    order: i,
  });
  items.push(postItem({
    id: 4001 + i,
    title: t.title,
    slug: `audio-${t.id}`,
    payload,
    excerpt: t.desc,
    date: addDays(AUDIOS_BASE_DATE, i),
    categories: ['audios'],
  }));
  nAudios++;
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
  <title>MindMusic — Contenido</title>
  <link>${WP_URL}</link>
  <description>Estados de ánimo, playlists emocionales y audios sueltos</description>
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
console.log(`   ${nMoods} estados de ánimo`);
console.log(`   ${nPlaylists} playlists (${nSongs} canciones adentro)`);
console.log(`   ${nAudios} audios sueltos`);
console.log(`   ─────────────────────────────`);
console.log(`   ${items.length} items en total\n`);
