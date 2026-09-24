// ============================================================
// MINDMUSIC — app.js
// Todo el JS del sitio: íconos, utils, estado local, capa de datos
// (REST de WordPress), nav, e init de cada página.
// ============================================================

// ───────────────────────── ICONS ─────────────────────────

const MOOD_ICONS = {
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-4 2-8 8-13 6 5 8 9 8 13a7 7 0 0 1-7 7c-1.5 0-3-.5-4-1.5"/><path d="M11 20v-6M11 14l4-4"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>',
  infinity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.5 8a4 4 0 0 0 0 8c2.5 0 3.5-2 5.5-4-2-2-3-4-5.5-4zM5.5 8a4 4 0 0 1 0 8c-2.5 0-3.5-2-5.5-4 2-2 3-4 5.5-4z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/></svg>',
  mountain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m4 19 6-11 3 5 2-3 5 9H4z"/></svg>',
};

const UI_ICONS = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  playing: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="4" y="9" width="3" height="6" rx="1.5"/><rect x="10.5" y="5" width="3" height="14" rx="1.5"/><rect x="17" y="11" width="3" height="2" rx="1"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h3.5L15 18h3.5M3 18h3.5l2-2.7M16 6h2.5M18.5 6 16 3.5M18.5 6 16 8.5M18.5 18 16 15.5M18.5 18 16 20.5"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h2v14H6zM20 5v14l-11-7z"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg>',
  repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m15 9-4 2-2 4 4-2z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/></svg>',
};

// ───────────────────────── UTILS ─────────────────────────

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fmtTime(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${String(rem).padStart(2, '0')}`;
}

function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function contentTypeName(id) {
  const ct = APP_DATA.contentTypes.find((c) => c.id === id);
  return ct ? ct.name : id;
}

// Sincrónico a propósito (se usa en pleno render): lee el índice que dejó
// `fetchMoodList()`. Toda página que pinte un estado lo espera antes.
function moodById(id) {
  return MOODS_BY_ID.get(id);
}

function photoUrl(base, w, q = 75) {
  return base ? `${base}?auto=format&fit=crop&w=${w}&q=${q}` : '';
}

// Ambienta la pantalla de detalle (mood/playlist/player) con la foto real
// del estado: reemplaza la foto de marca genérica del body por la del mood,
// manteniendo el mismo scrim para legibilidad y un tinte radial con su ink.
function applyMoodAmbient(mood) {
  if (!mood?.photo) return;
  document.body.style.setProperty('--ambient',
    `linear-gradient(180deg, rgba(15,12,8,.46) 0%, rgba(15,12,8,.4) 22%, rgba(15,12,8,.62) 45%, rgba(15,12,8,.94) 80%, var(--ink) 100%), ` +
    `radial-gradient(ellipse 900px 700px at 25% 0%, color-mix(in srgb, ${mood.ink} 30%, transparent), transparent 65%), ` +
    `url('${photoUrl(mood.photo, 2200)}')`
  );
}

let toastTimer;
function showToast(msg) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// Semilla determinística a partir del mood + el nombre del tema: la misma
// canción dibuja siempre la misma portada, y dos canciones del mismo estado
// nunca dibujan la misma.
function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Variables CSS del arte de un tema suelto: la foto del mood (recortada en un
// punto distinto para cada canción) + capas de color con su tinta, giradas
// según el nombre. Las consume `.songart` / `.cover--art` en styles.css.
function songArtVars(mood, title, photoBase) {
  const h = hashString((mood ? mood.id : '') + '·' + (title || ''));
  const base = photoBase || (mood ? mood.photo : '');
  const photo = base ? `url('${photoUrl(base, 700)}')` : 'none';
  return [
    `--m-ink:${mood ? mood.ink : ''}`,
    `--sa-photo:${photo}`,
    `--sa-pos:${18 + (h % 64)}% ${18 + ((h >> 7) % 64)}%`,
    `--sa-angle:${h % 360}deg`,
    `--sa-x1:${16 + ((h >> 4) % 62)}%`,
    `--sa-y1:${14 + ((h >> 9) % 60)}%`,
    `--sa-x2:${18 + ((h >> 14) % 62)}%`,
    `--sa-y2:${24 + ((h >> 19) % 58)}%`,
  ].join(';');
}

// Cuadrado de arte de un tema: su foto propia, apenas teñida con la tinta del
// estado. Se usa en las filas de tracklist, en la cola del player y (en
// grande) arriba del título del reproductor.
function songArtHTML(mood, title, modifier = '', photoBase) {
  const icon = mood ? (MOOD_ICONS[mood.icon] || '') : '';
  return `
    <span class="songart${modifier ? ' ' + modifier : ''}" style="${songArtVars(mood, title, photoBase)}" aria-hidden="true">
      <span class="songart-glyph">${icon}</span>
    </span>
  `;
}

// Portada tipo funda: las playlists se ven como una pila de fundas (varios
// discos adentro) sobre su foto y con la palabra PLAYLIST bien visible; los
// temas sueltos, como la foto propia de esa canción firmada apenas con el
// ícono del estado.
function coverHTML(kind, mood, trackCount, title, photo) {
  const isPlaylist = kind === 'playlist';
  const icon = mood ? (MOOD_ICONS[mood.icon] || '') : '';
  const moodBadge = mood ? `<span class="cover-mood-badge">${escapeHtml(mood.name)}</span>` : '';
  // La playlist se ve como la foto del estado dentro de una pila de fundas:
  // sin disco adelante, que tapaba la imagen.
  const style = isPlaylist ? playlistCoverVars(mood, photo) : songArtVars(mood, title, photo);
  // La playlist grita PLAYLIST; el tema suelto muestra su propia foto, sin
  // disco ni iniciales que la tapen — la portada tiene que leerse como esa
  // canción y no como una etiqueta.
  const face = isPlaylist
    ? `${trackCount != null ? `<span class="cover-count">${trackCount} temas</span>` : ''}
       <div class="cover-foot"><span class="cover-kind">Playlist</span></div>`
    : `<span class="cover-glyph">${icon}</span>`;

  return `
    <div class="cover ${isPlaylist ? 'cover--stack' : 'cover--art'}" style="${style}">
      <div class="cover-face">${face}</div>
      ${moodBadge}
    </div>
  `;
}

// Foto de portada de una playlist: la suya propia (`playlist.photo`), del
// mismo clima que la del estado pero nunca la misma imagen. Si algún día
// falta, cae en la del mood.
function playlistCoverVars(mood, photoBase) {
  const base = photoBase || (mood ? mood.photo : '');
  const photo = base ? `url('${photoUrl(base, 700)}')` : 'none';
  return `--m-ink:${mood ? mood.ink : ''};--m-photo:${photo}`;
}

function buildFeed(tracks, playlists) {
  return [
    ...tracks.map((t) => ({ ...t, kind: 'track' })),
    ...playlists.map((p) => ({ ...p, kind: 'playlist' })),
  ];
}

// ───────────────────────── LOCAL STORAGE ─────────────────────────

const PROFILE_KEY = 'mm_profile';
const DEFAULT_PROFILE = { name: 'Invitado' };

function getProfile() {
  try {
    return Object.assign({}, DEFAULT_PROFILE, JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}'));
  } catch (e) {
    return { ...DEFAULT_PROFILE };
  }
}

function saveProfile(p) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

function resetLocalData() {
  localStorage.removeItem(PROFILE_KEY);
}

// El nombre por defecto ('Invitado') no es un nombre: es el placeholder de
// alguien que todavía no lo cargó en ajustes. El saludo de la home sólo suma
// el nombre cuando es propio.
function customName() {
  const name = (getProfile().name || '').trim();
  return name && name !== DEFAULT_PROFILE.name ? name : '';
}

// Saludo de la home: sin nombre cargado queda la pregunta sola.
function greetingText() {
  const name = customName();
  return name ? `¿Cómo te sentís hoy, ${name}?` : '¿Cómo te sentís hoy?';
}

function refreshGreeting() {
  document.querySelectorAll('.js-greet-title').forEach((el) => (el.textContent = greetingText()));
}

// ───────────────────────── API DE CONTENIDO (WordPress) ─────────────────────────
// Todo el contenido (estados de ánimo, playlists con su tracklist, audios
// sueltos) vive en WordPress y se trae por REST. El perfil del usuario NO pasa
// por acá: es local, ver arriba.
//
// El plugin de este sitio publica el namespace `content/v2` (no el `api/v3` de
// Retofit / Mis Gastos en Orden), con dos endpoints útiles:
//
//   GET  articles?category=<slug>&limit=100   → lista: id, title, slug,
//        short_description (el EXTRACTO del post), thumbnail
//   GET  article?id=<id>                      → detalle: incluye `content`,
//        el cuerpo completo del post
//
// `limit` y `page` no se pueden combinar (juntos devuelven 404), pero con
// `limit=100` entra todo de una: no hace falta paginar.
//
// Cada post guarda su JSON en el cuerpo. Ojo con dos cosas:
//  1. WordPress "tipografía" el cuerpo al servirlo: las comillas rectas del
//     JSON vuelven como `&#8220;`/`&#8221;`, y el texto viene envuelto en HTML
//     (`<p>`, `<br />`). `parsePostJson()` deshace las dos cosas.
//  2. El extracto automático se corta a 55 palabras (queda un `[…]`). Por eso
//     `short_description` es sólo un ATAJO: si el JSON entero entró ahí, se usa
//     y nos ahorramos una request por ítem; si no parsea, se pide el detalle.
//
// Las fotos viajan como URL dentro del JSON (`photo`): es la única forma de que
// cada canción tenga la suya, porque las canciones no son posts — viven dentro
// del JSON de su playlist. Para estados y playlists, si el post tiene imagen
// destacada en WordPress, esa gana sobre la del JSON.

const API_BASE = 'https://contenidos.vip/mindmusic/wp-json/content/v2';
const WP_CATEGORY = {
  moods:     'estados-de-animo',
  playlists: 'playlists',
  tracks:    'audios',       // cápsulas / audio mensajes / música guiada
};

const API_LIMIT = 100;

async function apiGet(path) {
  const res = await fetch(`${API_BASE}/${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} al pedir "${path}"`);
  const json = await res.json();
  // El plugin contesta 200 con `results: false` cuando no encuentra nada: una
  // categoría vacía (o que todavía no existe) no es un error — hoy `audios`
  // está así. Ojo: un slug mal escrito devuelve exactamente lo mismo, así que
  // esto no distingue "vacía" de "no existe" (ver `fetchMoodList`).
  return Array.isArray(json.results) ? json.results : [];
}

// ── Fuente principal: la REST estándar de WordPress (`wp/v2`) ───────────────
// El `articles?category=` del plugin `content/v2` devuelve 404 para TODO en el
// sitio real (también con categorías que tienen posts, y también en el sitio de
// Retofit): sólo le anda `article?id=`. La REST del core sí responde, manda
// CORS abierto y trae el cuerpo completo de todos los posts de la categoría en
// un solo viaje — así que es la fuente principal, y `content/v2` queda de
// respaldo (es además lo que imita `tools/serve-local.js`).
const WP_API_BASE = API_BASE.replace(/\/content\/v2$/, '/wp/v2');

// slug de categoría → id numérico (el core filtra posts por id, no por slug).
// Una sola request para las tres, compartida por toda la carga de página.
let WP_CATEGORY_IDS = null;
function wpCategoryIds() {
  if (!WP_CATEGORY_IDS) {
    const slugs = Object.values(WP_CATEGORY).join(',');
    WP_CATEGORY_IDS = fetch(`${WP_API_BASE}/categories?slug=${slugs}&per_page=100&_fields=id,slug`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} al pedir las categorías`);
        return res.json();
      })
      .then((cats) => new Map(cats.map((c) => [c.slug, c.id])));
    WP_CATEGORY_IDS.catch(() => { WP_CATEGORY_IDS = null; }); // que se pueda reintentar
  }
  return WP_CATEGORY_IDS;
}

async function wpFetchCategory(slug) {
  const catId = (await wpCategoryIds()).get(slug);
  if (catId == null) return []; // la categoría todavía no existe en WordPress
  const res = await fetch(`${WP_API_BASE}/posts?categories=${catId}&per_page=${API_LIMIT}`
    + '&_embed=wp:featuredmedia&_fields=id,slug,title,content,_links,_embedded');
  if (!res.ok) throw new Error(`HTTP ${res.status} al pedir los posts de "${slug}"`);
  const posts = await res.json();
  return posts.map((post) => {
    const media = post._embedded && post._embedded['wp:featuredmedia'];
    // Misma forma de ítem que devuelve `content/v2`, para que los mapeos de
    // abajo no sepan de dónde vino.
    const item = {
      id: post.id,
      slug: post.slug,
      title: decodeHtml(post.title && post.title.rendered),
      thumbnail: (media && media[0] && media[0].source_url) || '',
    };
    return { item, data: parsePostJson(post.content && post.content.rendered) };
  });
}

function decodeHtml(html) {
  if (!html) return '';
  try {
    return new DOMParser().parseFromString(String(html), 'text/html').body.textContent || '';
  } catch (e) {
    return String(html);
  }
}

// Respaldo: el plugin `content/v2`. Una request para la lista, más una por cada
// ítem cuyo JSON no haya entrado entero en el extracto.
async function pluginFetchCategory(slug) {
  const list = await apiGet(`articles?category=${encodeURIComponent(slug)}&limit=${API_LIMIT}`);
  return Promise.all(list.map(async (item) => {
    const fast = parsePostJson(item.short_description);
    if (fast) return { item, data: fast };
    const [detail] = await apiGet(`article?id=${encodeURIComponent(item.id)}`);
    return { item: Object.assign({}, item, detail), data: parsePostJson(detail && detail.content) };
  }));
}

// Devuelve `[{ item, data }]`: el post tal como lo manda la API y su JSON ya
// parseado.
async function apiFetchCategory(slug) {
  try {
    return await wpFetchCategory(slug);
  } catch (e) {
    console.warn(`[contenido] wp/v2 no respondió para "${slug}", pruebo content/v2:`, e.message);
    return pluginFetchCategory(slug);
  }
}

// El JSON llega envuelto en HTML y con las comillas tipografiadas por
// WordPress. `textContent` decodifica las entidades y saca las etiquetas de una
// sola pasada; después se prueba enderezar las comillas y sacar una coma
// colgando (pasa al editar el post a mano).
function parsePostJson(raw) {
  if (!raw) return null;
  let text = String(raw);
  if (/[<&]/.test(text)) {
    try {
      text = new DOMParser().parseFromString(text, 'text/html').body.textContent || text;
    } catch (e) { /* sin DOM, se prueba con el texto tal cual */ }
  }
  const tries = [];
  for (const variant of [text, text.replace(/[“”]/g, '"')]) {
    tries.push(variant, variant.replace(/,(\s*[}\]])/g, '$1'));
  }
  for (const t of tries) {
    try {
      const parsed = JSON.parse(t);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch (e) { /* probamos la siguiente reparación */ }
  }
  return null;
}

// Descarta los posts sin JSON válido y los ids repetidos: un import corrido dos
// veces deja duplicados, y con estados duplicados el catálogo mostraría dos
// veces el mismo mood.
function mapContentItems(entries, mapFn) {
  const seen = new Set();
  const out = [];
  for (const { item, data } of entries) {
    if (!data) {
      console.warn('[contenido] No pude leer el JSON del post', item && item.id, item && item.title);
      continue;
    }
    const mapped = mapFn(data, item);
    if (!mapped || !mapped.id || seen.has(mapped.id)) continue;
    seen.add(mapped.id);
    out.push(mapped);
  }
  return out;
}

// El plugin NUNCA devuelve `thumbnail` vacío: si el post no tiene imagen
// destacada manda el placeholder del theme. Hay que descartarlo o la foto del
// JSON no se usaría nunca.
const WP_PLACEHOLDER_THUMB = /\/(default-thumb|default_image)\.(png|jpe?g)$/i;

function wpThumbnail(item) {
  const url = (item && item.thumbnail) || '';
  return WP_PLACEHOLDER_THUMB.test(url) ? '' : url;
}

function toOrder(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
}

function byOrder(a, b) {
  return a.order - b.order;
}

// Una sola pasada por la red por categoría y por carga de página.
const CONTENT_CACHE = { moods: null, playlists: null, tracks: null };

// Índice de estados para `moodById()`, que se usa en pleno render (sincrónico).
// Lo llena `fetchMoodList()`: toda página que pinte un mood tiene que esperar
// esa carga antes de dibujar.
let MOODS_BY_ID = new Map();

async function fetchMoodList() {
  if (CONTENT_CACHE.moods) return CONTENT_CACHE.moods;
  const raw = await apiFetchCategory(WP_CATEGORY.moods);
  const list = mapContentItems(raw, (mc, item) => ({
    id: mc.id || item.slug,
    name: mc.name || item.title || '',
    subtitle: mc.subtitle || '',
    cta: mc.cta || '',
    icon: mc.icon || '',
    ink: mc.ink || '',
    grad: mc.grad || '',
    photo: wpThumbnail(item) || mc.photo || '',
    order: toOrder(mc.order),
  })).sort(byOrder);
  // El plugin contesta 200 con `results: false` tanto para una categoría vacía
  // como para un slug mal escrito, así que "cero estados" no se distingue de un
  // error de red — y sin estados no hay app. Se trata como falla de carga para
  // que la pantalla lo diga, en vez de quedar en blanco.
  if (!list.length) throw new Error('WordPress no devolvió ningún estado de ánimo');
  CONTENT_CACHE.moods = list;
  MOODS_BY_ID = new Map(list.map((m) => [m.id, m]));
  return list;
}

async function fetchAllPlaylists() {
  if (CONTENT_CACHE.playlists) return CONTENT_CACHE.playlists;
  CONTENT_CACHE.playlists = mapContentItems(await apiFetchCategory(WP_CATEGORY.playlists), (mc, item) => {
    const id = mc.id || item.slug;
    // Las canciones no tienen post propio: el id se deriva de su posición en la
    // playlist, igual que la URL `player.html?playlist=XXX&t=N`.
    const tracks = (Array.isArray(mc.tracks) ? mc.tracks : []).map((song, i) => ({
      id: `${id}-${i}`,
      title: song.title || '',
      duration: Number(song.duration) || 0,
      audioUrl: song.audioUrl || '',
      photo: song.photo || '',
    }));
    return {
      id,
      moodId: mc.moodId || '',
      contentType: mc.contentType || 'playlists',
      title: mc.title || item.title || '',
      desc: mc.desc || '',
      photo: wpThumbnail(item) || mc.photo || '',
      // El `short_description` del post es el JSON crudo (o su recorte), no un
      // texto: el resumen sale del propio `desc`.
      short_description: (mc.desc || '').split('.')[0],
      template: 'playlist',
      order: toOrder(mc.order),
      tracks,
    };
  }).sort(byOrder);
  return CONTENT_CACHE.playlists;
}

async function fetchAllTracks() {
  if (CONTENT_CACHE.tracks) return CONTENT_CACHE.tracks;
  CONTENT_CACHE.tracks = mapContentItems(await apiFetchCategory(WP_CATEGORY.tracks), (mc, item) => ({
    id: mc.id || item.slug,
    moodId: mc.moodId || '',
    contentType: mc.contentType || '',
    title: mc.title || item.title || '',
    desc: mc.desc || '',
    duration: Number(mc.duration) || 0,
    photo: wpThumbnail(item) || mc.photo || '',
    audioUrl: mc.audioUrl || '',
    short_description: (mc.desc || '').split('.')[0],
    template: 'audio',
    order: toOrder(mc.order),
  })).sort(byOrder);
  return CONTENT_CACHE.tracks;
}

async function fetchTracksByMood(moodId) {
  return (await fetchAllTracks()).filter((t) => t.moodId === moodId);
}

async function fetchTracksByType(contentType) {
  const tracks = await fetchAllTracks();
  if (!contentType || contentType === 'todos') return tracks;
  return tracks.filter((t) => t.contentType === contentType);
}

async function fetchTrackById(id) {
  return (await fetchAllTracks()).find((t) => t.id === id) || null;
}

async function fetchPlaylistsByMood(moodId) {
  return (await fetchAllPlaylists()).filter((p) => p.moodId === moodId);
}

async function fetchPlaylistById(id) {
  return (await fetchAllPlaylists()).find((p) => p.id === id) || null;
}

// Si el contenido no carga, la pantalla lo dice en vez de quedarse en el
// esqueleto para siempre. No hay fallback a datos estáticos: la fuente es WP.
function showContentError(el, msg = 'No pudimos cargar el contenido. Revisá tu conexión y volvé a intentar.') {
  const node = typeof el === 'string' ? document.getElementById(el) : el;
  if (!node) return;
  node.style.display = '';
  node.innerHTML = `<div class="empty-state">${escapeHtml(msg)}</div>`;
}

// ───────────────────────── NAV ─────────────────────────

function initNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'nav-home', '': 'nav-home',
    'explorar.html': 'nav-explorar',
    'perfil.html': 'nav-perfil',
  };
  const activeId = map[page];
  if (activeId) document.getElementById(activeId)?.classList.add('active');

  const profile = getProfile();
  const initial = (profile.name || 'I').charAt(0).toUpperCase();
  document.querySelectorAll('.js-avatar').forEach((el) => (el.textContent = initial));
  document.querySelectorAll('.js-greet-name').forEach((el) => (el.textContent = profile.name));
  document.querySelectorAll('.nav-user-name').forEach((el) => (el.textContent = profile.name));
  refreshGreeting();
}

// ───────────────────────── HOME ─────────────────────────

let homeAllItems = [];
let homeActiveType = 'todos';

async function initHome() {
  initNav();
  renderMoodSkeletons();
  renderTrackSkeletons('home-tracks');

  let moods, tracks, playlists;
  try {
    [moods, tracks, playlists] = await Promise.all([fetchMoodList(), fetchAllTracks(), fetchAllPlaylists()]);
  } catch (err) {
    console.error('[contenido] No pude traer el contenido de la home', err);
    showContentError('home-moods', 'No pudimos cargar los estados de ánimo.');
    showContentError('home-tracks');
    return;
  }
  homeAllItems = buildFeed(tracks, playlists);

  renderMoodGrid(moods.slice(0, 4), document.getElementById('home-moods'));
  renderContentTabs();
  renderHomeTracks();
}

function renderMoodSkeletons() {
  const el = document.getElementById('home-moods');
  if (!el) return;
  el.innerHTML = Array.from({ length: 4 }).map(() => `
    <div class="mood-card">
      <div class="skeleton" style="width:44px;height:44px;border-radius:50%;margin-bottom:14px"></div>
      <div class="skeleton skel-line" style="width:70%"></div>
      <div class="skeleton skel-line short"></div>
    </div>
  `).join('');
}

function renderMoodGrid(moods, el) {
  if (!el) return;
  el.innerHTML = moods.map((m) => `
    <a class="mood-card" href="mood.html?id=${encodeURIComponent(m.id)}" style="--m-ink:${m.ink};--m-photo:url('${photoUrl(m.photo, 900)}')">
      <div class="mood-icon">${MOOD_ICONS[m.icon] || ''}</div>
      <h3>${escapeHtml(m.name)}</h3>
      <p>${escapeHtml(m.subtitle)}</p>
      <span class="pill-btn">${escapeHtml(m.cta)}</span>
    </a>
  `).join('');
}

function renderContentTabs() {
  const el = document.getElementById('home-tabs');
  if (!el) return;
  // Con una sola categoría de contenido, el filtro no filtra nada: se oculta
  // en vez de mostrar un "Todos / Playlists" redundante. Vuelve solo cuando
  // haya más de un contentType.
  if (APP_DATA.contentTypes.length < 2) {
    el.style.display = 'none';
    homeActiveType = 'todos';
    return;
  }
  el.style.display = '';
  const types = [{ id: 'todos', name: 'Todos' }, ...APP_DATA.contentTypes];
  el.innerHTML = types.map((t) => `
    <button class="tab ${t.id === homeActiveType ? 'active' : ''}" data-type="${t.id}">${escapeHtml(t.name)}</button>
  `).join('');
  el.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      homeActiveType = btn.dataset.type;
      el.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b === btn));
      renderHomeTracks();
    });
  });
}

function renderTrackSkeletons(containerId, count = 4) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array.from({ length: count }).map(() => `
    <div class="track-card">
      <div class="skeleton skel-thumb"></div>
      <div class="track-body">
        <div class="skeleton skel-line"></div>
        <div class="skeleton skel-line short"></div>
      </div>
    </div>
  `).join('');
}

// items mezcla tracks sueltos (cápsulas/mensajes/guiada) y playlists —
// cada uno navega a un destino distinto: player.html vs. playlist.html.
function renderTrackGrid(items, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!items.length) {
    el.innerHTML = `<div class="empty-state">No encontramos contenido para esa búsqueda.</div>`;
    return;
  }
  el.innerHTML = items.map((item) => {
    const mood = moodById(item.moodId);
    const isPlaylist = item.kind === 'playlist';
    const href = isPlaylist
      ? `playlist.html?id=${encodeURIComponent(item.id)}`
      : `player.html?id=${encodeURIComponent(item.id)}`;
    const meta = isPlaylist
      ? `Playlist · ${item.tracks.length} canciones`
      : `${escapeHtml(contentTypeName(item.contentType))} · ${fmtTime(item.duration)}`;
    return `
      <a class="track-card" href="${href}">
        ${coverHTML(isPlaylist ? 'playlist' : 'track', mood, isPlaylist ? item.tracks.length : null, item.title, item.photo)}
        <div class="track-body">
          <h4>${escapeHtml(item.title)}</h4>
          <span>${meta}</span>
        </div>
      </a>
    `;
  }).join('');
}

function renderHomeTracks(query = '') {
  let list = homeActiveType === 'todos'
    ? homeAllItems
    : homeActiveType === 'playlists'
      ? homeAllItems.filter((i) => i.kind === 'playlist')
      : homeAllItems.filter((i) => i.kind === 'track' && i.contentType === homeActiveType);
  if (query) {
    list = list.filter((i) => i.title.toLowerCase().includes(query) || moodById(i.moodId)?.name.toLowerCase().includes(query));
  }
  renderTrackGrid(list, 'home-tracks');
}

// ───────────────────────── EXPLORAR ─────────────────────────

let explorarMoods = [];

async function initExplorar() {
  initNav();
  renderCatSkeletons();
  try {
    explorarMoods = await fetchMoodList();
  } catch (err) {
    console.error('[contenido] No pude traer los estados de ánimo', err);
    showContentError('explorar-grid', 'No pudimos cargar los estados de ánimo.');
    return;
  }
  renderCatGrid(explorarMoods);

  const searchInput = document.getElementById('explorar-search');
  searchInput?.addEventListener('input', debounce((e) => {
    const q = e.target.value.trim().toLowerCase();
    const filtered = q ? explorarMoods.filter((m) => m.name.toLowerCase().includes(q) || m.subtitle.toLowerCase().includes(q)) : explorarMoods;
    renderCatGrid(filtered);
  }, 150));
}

function renderCatSkeletons() {
  const el = document.getElementById('explorar-grid');
  if (!el) return;
  el.innerHTML = Array.from({ length: 6 }).map(() => `<div class="skeleton cat-card"></div>`).join('');
}

function renderCatGrid(moods) {
  const el = document.getElementById('explorar-grid');
  if (!el) return;
  if (!moods.length) {
    el.innerHTML = `<div class="empty-state">No encontramos ningún estado para esa búsqueda.</div>`;
    return;
  }
  el.innerHTML = moods.map((m) => `
    <a class="cat-card" href="mood.html?id=${encodeURIComponent(m.id)}" style="--m-ink:${m.ink};--m-photo:url('${photoUrl(m.photo, 1200)}')">
      <div class="cat-disc">${MOOD_ICONS[m.icon] || ''}</div>
      <div class="overlay">
        <h3>${escapeHtml(m.name)}</h3>
        <p>${escapeHtml(m.subtitle)}</p>
      </div>
    </a>
  `).join('');
}

// ───────────────────────── MOOD ─────────────────────────

async function initMoodPage() {
  initNav();
  const id = new URLSearchParams(location.search).get('id');

  // El estado y su contenido se piden juntos; `moodById()` sólo responde
  // después de que `fetchMoodList()` haya llenado el índice.
  let mood, tracks, playlists;
  try {
    [, tracks, playlists] = await Promise.all([fetchMoodList(), fetchTracksByMood(id), fetchPlaylistsByMood(id)]);
    mood = moodById(id);
  } catch (err) {
    console.error('[contenido] No pude traer el estado de ánimo', err);
    showContentError('mood-loading');
    return;
  }

  if (!mood) {
    document.getElementById('mood-loading').innerHTML = `<div class="empty-state">No encontramos ese estado de ánimo.</div>`;
    return;
  }

  applyMoodAmbient(mood);
  document.getElementById('mood-title').textContent = mood.name;
  document.getElementById('mood-sub').textContent = mood.subtitle;
  document.getElementById('mood-icon').innerHTML = MOOD_ICONS[mood.icon] || '';
  document.getElementById('mood-icon').style.setProperty('--m-ink', mood.ink);

  document.getElementById('mood-loading').style.display = 'none';
  document.getElementById('mood-content').style.display = '';

  // Dos caminos, uno arriba del otro: primero la playlist entera (para
  // dejarse llevar), abajo los temas sueltos (para ir a uno puntual).
  toggleSection('mood-playlists-section', playlists.length);
  renderMoodPlaylists(playlists);

  const songs = moodSongList(tracks, playlists);
  toggleSection('mood-songs-section', songs.length);
  if (songs.length) renderMoodSongs(songs, mood);
}

function toggleSection(id, show) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? '' : 'none';
}

// Los temas sueltos de un estado son los ítems de audio propios más las
// canciones de sus playlists: cada una se puede escuchar sola, pero al
// tocarla el player arranca con la cola de su playlist.
function moodSongList(tracks, playlists) {
  const own = tracks.map((t) => ({
    title: t.title,
    duration: t.duration,
    href: `player.html?id=${encodeURIComponent(t.id)}`,
    photo: t.photo,
  }));
  const fromPlaylists = playlists.flatMap((p) =>
    p.tracks.map((song, i) => ({
      title: song.title,
      duration: song.duration,
      href: `player.html?playlist=${encodeURIComponent(p.id)}&t=${i}`,
      photo: song.photo || p.photo,
    }))
  );
  return [...own, ...fromPlaylists];
}

// La playlist del estado se muestra como una pieza ancha (funda + datos al
// costado), no como una tarjeta más de grilla: es el camino principal.
function renderMoodPlaylists(playlists) {
  const el = document.getElementById('mood-playlists');
  if (!el) return;
  el.innerHTML = playlists.map((p) => {
    const mood = moodById(p.moodId);
    return `
      <a class="playlist-hero" href="playlist.html?id=${encodeURIComponent(p.id)}" style="${playlistCoverVars(mood, p.photo)}">
        <div class="cover cover--stack" style="${playlistCoverVars(mood, p.photo)}">
          <div class="cover-face"></div>
        </div>
        <div class="meta">
          <span class="ph-kind">Playlist</span>
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.desc)}</p>
          <span class="ph-count">${p.tracks.length} canciones</span>
        </div>
      </a>
    `;
  }).join('');
}

function renderMoodSongs(songs, mood) {
  const el = document.getElementById('mood-songs');
  if (!el) return;
  el.innerHTML = songs.map((song) => `
    <a class="track-card" href="${song.href}">
      ${coverHTML('track', mood, null, song.title, song.photo)}
      <div class="track-body">
        <h4>${escapeHtml(song.title)}</h4>
        <span>Tema &middot; ${fmtTime(song.duration)}</span>
      </div>
    </a>
  `).join('');
}

// ───────────────────────── PLAYLIST ─────────────────────────
// Acá se lee la playlist "de atrás para adelante", como el dorso de una
// funda: todas las canciones apiladas una debajo de la otra, en orden.

async function initPlaylistPage() {
  initNav();
  const id = new URLSearchParams(location.search).get('id');

  let playlist;
  try {
    [, playlist] = await Promise.all([fetchMoodList(), fetchPlaylistById(id)]);
  } catch (err) {
    console.error('[contenido] No pude traer la playlist', err);
    showContentError('playlist-loading');
    return;
  }

  if (!playlist) {
    document.getElementById('playlist-loading').innerHTML = `<div class="empty-state">No encontramos esa playlist.</div>`;
    return;
  }

  const mood = moodById(playlist.moodId);
  applyMoodAmbient(mood);

  document.getElementById('playlist-loading').style.display = 'none';
  document.getElementById('playlist-content').style.display = '';

  const coverEl = document.getElementById('playlist-cover');
  const moodBadge = mood ? `<span class="cover-mood-badge">${escapeHtml(mood.name)}</span>` : '';
  coverEl.innerHTML = `
    <div class="cover-face">
      <span class="cover-count">${playlist.tracks.length} temas</span>
      <div class="cover-foot"><span class="cover-kind">Playlist</span></div>
    </div>
    ${moodBadge}`;
  coverEl.setAttribute('style', playlistCoverVars(mood, playlist.photo));
  document.querySelector('.playlist-head').style.setProperty('--m-ink', mood ? mood.ink : '');

  document.getElementById('playlist-title').textContent = playlist.title;
  document.getElementById('playlist-desc').textContent = playlist.desc;

  const listEl = document.getElementById('playlist-tracklist');
  listEl.innerHTML = playlist.tracks.map((song, i) => `
    <a class="tracklist-row" href="player.html?playlist=${encodeURIComponent(playlist.id)}&t=${i}">
      <span class="tl-index">${String(i + 1).padStart(2, '0')}</span>
      ${songArtHTML(mood, song.title, '', song.photo || playlist.photo)}
      <span class="tl-play">${UI_ICONS.play}</span>
      <span class="tl-title">${escapeHtml(song.title)}</span>
      <span class="tl-duration">${fmtTime(song.duration)}</span>
    </a>
  `).join('');
}

// ───────────────────────── PLAYER ─────────────────────────

let playerTracks = [];
let playerIndex = -1;
let playerMood = null;
let playerPlaylist = null;
let audioEl = null;
let isShuffled = false;
let isRepeating = false;

async function initPlayerPage() {
  initNav();
  const params = new URLSearchParams(location.search);
  const playlistId = params.get('playlist');

  // El índice de estados tiene que estar cargado antes de resolver el mood
  // de la pista, sea de una playlist o de un audio suelto.
  try {
    await fetchMoodList();
  } catch (err) {
    console.error('[contenido] No pude traer los estados de ánimo', err);
    showContentError('player-loading');
    return;
  }

  if (playlistId) {
    let playlist;
    try {
      playlist = await fetchPlaylistById(playlistId);
    } catch (err) {
      console.error('[contenido] No pude traer la playlist', err);
      showContentError('player-loading');
      return;
    }
    if (!playlist) {
      document.getElementById('player-loading').innerHTML = `<div class="empty-state">No encontramos esa playlist.</div>`;
      return;
    }
    playerPlaylist = playlist;
    playerMood = moodById(playlist.moodId);
    playerTracks = playlist.tracks;
    const t = parseInt(params.get('t'), 10);
    playerIndex = Number.isInteger(t) && t >= 0 && t < playerTracks.length ? t : 0;
  } else {
    const id = params.get('id');
    let track;
    try {
      track = await fetchTrackById(id);
    } catch (err) {
      console.error('[contenido] No pude traer el audio', err);
      showContentError('player-loading');
      return;
    }
    if (!track) {
      document.getElementById('player-loading').innerHTML = `<div class="empty-state">No encontramos ese audio.</div>`;
      return;
    }
    playerPlaylist = null;
    playerMood = moodById(track.moodId);
    playerTracks = await fetchTracksByMood(track.moodId);
    playerIndex = playerTracks.findIndex((tr) => tr.id === track.id);
  }

  applyMoodAmbient(playerMood);
  document.getElementById('player-loading').style.display = 'none';
  document.getElementById('player-content').style.display = '';

  audioEl = document.getElementById('player-audio');
  // Debe fijarse antes del primer src: sin esto el analizador de ondas nunca
  // puede leer un archivo servido desde otro origen (ver MM_AUDIO_CORS).
  if (MM_AUDIO_CORS) audioEl.crossOrigin = 'anonymous';

  document.getElementById('shuffle-btn').addEventListener('click', () => {
    isShuffled = !isShuffled;
    document.getElementById('shuffle-btn').classList.toggle('active', isShuffled);
  });
  document.getElementById('repeat-btn').addEventListener('click', () => {
    isRepeating = !isRepeating;
    document.getElementById('repeat-btn').classList.toggle('active', isRepeating);
  });
  document.getElementById('prev-btn').addEventListener('click', () => stepTrack(-1));
  document.getElementById('next-btn').addEventListener('click', () => stepTrack(1));
  document.getElementById('play-main').addEventListener('click', togglePlay);

  const progressTrack = document.getElementById('progress-track');
  progressTrack.addEventListener('click', (e) => {
    if (!audioEl.duration) return;
    const rect = progressTrack.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    audioEl.currentTime = ratio * audioEl.duration;
  });

  const visual = document.getElementById('player-visual');
  visual.style.setProperty('--m-ink', playerMood ? playerMood.ink : '');
  waveViz.init(visual, playerMood ? playerMood.ink : null);

  // La cola sólo existe cuando se entró desde una playlist: ahí el usuario ya
  // eligió un conjunto ordenado y quiere ver qué viene después.
  if (playerPlaylist) {
    const queueEl = document.getElementById('player-queue');
    queueEl.style.display = '';
    queueEl.querySelector('.section-head h2').textContent = playerPlaylist.title;
    document.getElementById('queue-open').href = `playlist.html?id=${encodeURIComponent(playerPlaylist.id)}`;
    document.getElementById('queue-list').addEventListener('click', (e) => {
      const row = e.target.closest('.tracklist-row');
      if (!row) return;
      const index = parseInt(row.dataset.index, 10);
      // Tocar el tema que ya suena no recarga nada: hace play/pausa.
      if (index === playerIndex) togglePlay();
      else jumpToTrack(index);
    });
  }

  loadTrack(playerIndex);
}

function loadTrack(index) {
  const t = playerTracks[index];

  if (playerPlaylist) {
    document.getElementById('mood-badge').textContent = `PLAYLIST · ${playerPlaylist.title.toUpperCase()}`;
  } else {
    document.getElementById('mood-badge').textContent = `MOOD ACTUAL: ${playerMood ? playerMood.name.toUpperCase() : ''}`;
  }
  document.getElementById('player-art').innerHTML = songArtHTML(playerMood, t.title, 'songart--lg', t.photo || (playerPlaylist && playerPlaylist.photo));
  document.getElementById('player-title').textContent = t.title;
  document.getElementById('player-desc').textContent = playerPlaylist ? playerPlaylist.desc : t.desc;

  audioEl.src = t.audioUrl;
  audioEl.currentTime = 0;
  setPlayingUI(false);

  document.getElementById('progress-fill').style.width = '0%';
  document.getElementById('time-current').textContent = '0:00';
  document.getElementById('time-total').textContent = fmtTime(t.duration);

  audioEl.onloadedmetadata = () => {
    document.getElementById('time-total').textContent = fmtTime(audioEl.duration || t.duration);
  };
  audioEl.ontimeupdate = () => {
    if (!audioEl.duration) return;
    const pct = (audioEl.currentTime / audioEl.duration) * 100;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('time-current').textContent = fmtTime(audioEl.currentTime);
  };
  audioEl.onended = () => {
    if (isRepeating) {
      audioEl.currentTime = 0;
      audioEl.play();
    } else {
      stepTrack(1);
    }
  };

  audioEl.play().then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));

  renderQueue();
}

// La cola se dibuja rotada: primero el tema que suena y después los que
// siguen (dando la vuelta al final, igual que stepTrack), para que lo de
// abajo del player siempre se lea como "ahora y lo que viene".
function renderQueue() {
  if (!playerPlaylist) return;
  const listEl = document.getElementById('queue-list');
  const rotated = playerTracks.map((song, i) => ({ song, i }));
  rotated.push(...rotated.splice(0, playerIndex));

  listEl.innerHTML = rotated.map(({ song, i }, pos) => `
    <button class="tracklist-row${pos === 0 ? ' is-current' : ''}" type="button" data-index="${i}">
      <span class="tl-index">${pos === 0 ? UI_ICONS.playing : String(i + 1).padStart(2, '0')}</span>
      ${songArtHTML(playerMood, song.title, '', song.photo || (playerPlaylist && playerPlaylist.photo))}
      <span class="tl-play">${pos === 0 ? UI_ICONS.pause : UI_ICONS.play}</span>
      <span class="tl-title">${escapeHtml(song.title)}</span>
      <span class="tl-duration">${fmtTime(song.duration)}</span>
    </button>
  `).join('');
}

function jumpToTrack(index) {
  if (!Number.isInteger(index) || index === playerIndex) return;
  playerIndex = index;
  const params = new URLSearchParams(location.search);
  params.set('playlist', playerPlaylist.id);
  params.set('t', playerIndex);
  params.delete('id');
  history.replaceState(null, '', `player.html?${params.toString()}`);
  loadTrack(playerIndex);
}

function togglePlay() {
  if (!audioEl) return;
  if (audioEl.paused) {
    audioEl.play().then(() => setPlayingUI(true)).catch(() => showToast('No se pudo reproducir el audio'));
  } else {
    audioEl.pause();
    setPlayingUI(false);
  }
}

function setPlayingUI(playing) {
  const mainBtn = document.getElementById('play-main');
  mainBtn.innerHTML = playing ? UI_ICONS.pause : UI_ICONS.play;
  mainBtn.classList.toggle('playing', playing);
  const currentRow = document.querySelector('#queue-list .tracklist-row.is-current');
  if (currentRow) {
    currentRow.classList.toggle('is-paused', !playing);
    currentRow.querySelector('.tl-play').innerHTML = playing ? UI_ICONS.pause : UI_ICONS.play;
  }
  if (playing) waveViz.connect(audioEl);
  waveViz.setPlaying(playing);
}

function stepTrack(dir) {
  if (playerTracks.length < 2) {
    audioEl.currentTime = 0;
    audioEl.play();
    return;
  }
  let nextIndex;
  if (isShuffled) {
    do {
      nextIndex = Math.floor(Math.random() * playerTracks.length);
    } while (nextIndex === playerIndex);
  } else {
    nextIndex = (playerIndex + dir + playerTracks.length) % playerTracks.length;
  }
  playerIndex = nextIndex;
  const params = new URLSearchParams(location.search);
  if (playerPlaylist) {
    params.set('playlist', playerPlaylist.id);
    params.set('t', playerIndex);
    params.delete('id');
  } else {
    params.set('id', playerTracks[playerIndex].id);
  }
  history.replaceState(null, '', `player.html?${params.toString()}`);
  loadTrack(playerIndex);
}

// ───────────────────────── ONDAS (visualizador) ─────────────────────────
// Reemplaza al vinilo en la parte de arriba del player: una banda de ondas
// que respira con la canción. Dos modos:
//
//  · REAL — AnalyserNode de Web Audio leyendo el <audio>. Sólo se activa si
//    la pista es analizable: mismo origen, o servida con CORS y MM_AUDIO_CORS
//    en true. Conectar un MediaElementSource a un audio cross-origin SIN CORS
//    devuelve silencio (spec de Web Audio) y mataría la reproducción, así que
//    nunca se intenta a ciegas.
//  · OLEAJE — fallback para pistas remotas sin CORS: las ondas se mueven con
//    un oleaje sintético lento, atado a play/pausa. Misma sensación de calma,
//    sin seguir el espectro real.
//
// Hoy las melodías se sirven desde S3 (cross-origin) y el bucket NO manda
// headers CORS, así que corre el modo OLEAJE. Para volver al modo REAL:
// habilitar CORS en el bucket y recién ahí poner MM_AUDIO_CORS = true — en ese
// orden, o el <audio> pide con crossOrigin, S3 lo rechaza y deja de sonar.
// Paso a paso en `tools/LEEME-s3-cors.md`.
const MM_AUDIO_CORS = false;
const WAVE_BANDS = 56;

function audioIsAnalysable(url) {
  if (!url) return false;
  try {
    return new URL(url, location.href).origin === location.origin || MM_AUDIO_CORS;
  } catch (e) {
    return false;
  }
}

function hexToRgba(hex, alpha) {
  const h = String(hex || '').replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  if (!/^[0-9a-f]{6}$/i.test(full) || Number.isNaN(n)) return `rgba(212,175,110,${alpha})`;
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

const waveViz = {
  visual: null, canvas: null, ctx: null,
  w: 0, h: 0, dpr: 1,
  raf: 0, last: 0, time: 0,
  levels: new Array(WAVE_BANDS).fill(0.35),
  energy: 0.2,
  playing: false,
  reduced: false,
  ink: '#D4AF6E',
  audioCtx: null, srcNode: null, analyser: null, freqData: null,

  init(visual, ink) {
    this.visual = visual;
    this.canvas = document.getElementById('wave-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    if (ink) this.ink = ink;
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop();
      else this.start();
    });
    this.start();
  },

  resize() {
    if (!this.canvas) return;
    const rect = this.visual.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(1, rect.width);
    this.h = Math.max(1, rect.height);
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (this.reduced) this.draw();
  },

  // Con motion reducido se dibuja una sola vez: ondas quietas, sin loop.
  start() {
    if (!this.ctx || this.raf || this.reduced) return;
    this.last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      this.time += dt;
      this.sample(dt);
      this.draw();
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  },

  stop() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  },

  setPlaying(playing) {
    this.playing = playing;
    if (this.audioCtx && playing && this.audioCtx.state === 'suspended') this.audioCtx.resume();
    if (this.reduced) {
      // Sin animación: se redibuja una vez, más alto al reproducir.
      this.energy = playing ? 0.7 : 0.22;
      this.draw();
      return;
    }
    this.start();
  },

  connect(audio) {
    if (!audio || this.srcNode || !audioIsAnalysable(audio.currentSrc || audio.src)) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    try {
      this.audioCtx = new Ctx();
      this.srcNode = this.audioCtx.createMediaElementSource(audio);
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.85;
      this.srcNode.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
      this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
    } catch (e) {
      this.analyser = null;
      this.freqData = null;
    }
  },

  // Actualiza el perfil de la onda (una altura por banda) y la energía global.
  sample(dt) {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.freqData);
      const bins = this.freqData.length;
      for (let i = 0; i < WAVE_BANDS; i++) {
        // Reparto logarítmico: más resolución en graves/medios, que es donde
        // vive el cuerpo de la música.
        const from = Math.floor(Math.pow(i / WAVE_BANDS, 1.7) * bins);
        const to = Math.max(from + 1, Math.floor(Math.pow((i + 1) / WAVE_BANDS, 1.7) * bins));
        let sum = 0;
        for (let b = from; b < to && b < bins; b++) sum += this.freqData[b];
        const v = sum / (to - from) / 255;
        this.levels[i] += (v - this.levels[i]) * Math.min(1, dt * 10);
      }
    } else {
      // Oleaje: suma de senos lentos con períodos no múltiplos entre sí, para
      // que nunca se note el bucle.
      for (let i = 0; i < WAVE_BANDS; i++) {
        const p = i / WAVE_BANDS;
        const v = 0.48
          + 0.24 * Math.sin(this.time * 0.5 + p * 5.1)
          + 0.15 * Math.sin(this.time * 0.29 - p * 8.9)
          + 0.09 * Math.sin(this.time * 0.77 + p * 2.4);
        this.levels[i] += (Math.max(0, Math.min(1, v)) - this.levels[i]) * Math.min(1, dt * 4);
      }
    }

    // En pausa las ondas no se congelan: bajan a un latido mínimo.
    const target = this.playing ? 1 : 0.22;
    this.energy += (target - this.energy) * Math.min(1, dt * 1.6);
  },

  // Altura interpolada (suave, coseno) en una posición 0..1 del ancho.
  levelAt(p) {
    const f = Math.max(0, Math.min(0.9999, p)) * (WAVE_BANDS - 1);
    const i = Math.floor(f);
    const k = (1 - Math.cos((f - i) * Math.PI)) / 2;
    return this.levels[i] * (1 - k) + this.levels[i + 1] * k;
  },

  draw() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, this.w, this.h);

    // De atrás hacia adelante: las de atrás, más lentas, largas y tenues.
    const layers = [
      { base: 0.44, amp: 0.44, freq: 3.1, speed: 0.30, phase: 0.0, alpha: 0.10 },
      { base: 0.53, amp: 0.36, freq: 4.9, speed: -0.44, phase: 1.7, alpha: 0.12 },
      { base: 0.62, amp: 0.28, freq: 7.3, speed: 0.60, phase: 3.1, alpha: 0.14 },
      { base: 0.71, amp: 0.21, freq: 10.2, speed: -0.85, phase: 4.6, alpha: 0.16 },
    ];
    layers.forEach((l) => this.drawLayer(l));
    this.drawCrest();
  },

  drawLayer(l) {
    const ctx = this.ctx;
    const baseY = this.h * l.base;
    const amp = this.h * l.amp;

    ctx.beginPath();
    ctx.moveTo(0, this.h);
    for (let x = 0; x <= this.w; x += 5) {
      ctx.lineTo(x, this.waveY(x, baseY, amp, l.freq, l.speed, l.phase));
    }
    ctx.lineTo(this.w, this.h);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, baseY - amp, 0, this.h);
    grad.addColorStop(0, hexToRgba(this.ink, l.alpha * 1.6));
    grad.addColorStop(0.5, hexToRgba(this.ink, l.alpha * 0.5));
    grad.addColorStop(1, hexToRgba(this.ink, 0));
    ctx.fillStyle = grad;
    ctx.fill();

    // El borde de cada capa se marca apenas: sin esto las capas se funden en
    // una mancha sólida y se pierde la sensación de agua superpuesta.
    ctx.beginPath();
    for (let x = 0; x <= this.w; x += 5) {
      const y = this.waveY(x, baseY, amp, l.freq, l.speed, l.phase);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = hexToRgba(this.ink, 0.16 + 0.2 * this.energy);
    ctx.lineWidth = 1;
    ctx.stroke();
  },

  // La línea de arriba: la única con brillo, para que la banda tenga un filo
  // nítido en vez de ser una mancha de color.
  drawCrest() {
    const ctx = this.ctx;
    const baseY = this.h * 0.48;
    const amp = this.h * 0.38;

    ctx.beginPath();
    for (let x = 0; x <= this.w; x += 4) {
      const y = this.waveY(x, baseY, amp, 3.4, 0.24, 0.6);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    const grad = ctx.createLinearGradient(0, 0, this.w, 0);
    grad.addColorStop(0, hexToRgba(this.ink, 0.25));
    grad.addColorStop(0.5, hexToRgba('#F5EDE0', 0.55 + 0.35 * this.energy));
    grad.addColorStop(1, hexToRgba(this.ink, 0.25));
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = hexToRgba(this.ink, 0.75);
    ctx.shadowBlur = 16 + 12 * this.energy;
    ctx.stroke();
    ctx.shadowBlur = 0;
  },

  // Portadora continua (dos senos) modulada por el perfil de la canción, y
  // apagada en los bordes para que la onda muera contra los costados.
  waveY(x, baseY, amp, freq, speed, phase) {
    const p = x / this.w;
    const carrier =
      Math.sin(p * freq + this.time * speed + phase) * 0.62 +
      Math.sin(p * freq * 0.53 - this.time * speed * 0.7 + phase) * 0.38;
    const edge = Math.sin(Math.PI * Math.max(0, Math.min(1, p)));
    return baseY - carrier * amp * (0.35 + 0.8 * this.levelAt(p)) * this.energy * edge;
  },
};

// ───────────────────────── PERFIL ─────────────────────────

function initPerfilPage() {
  initNav();
  renderPerfil();

  document.getElementById('edit-name-btn')?.addEventListener('click', () => openEditModal());
  document.getElementById('modal-cancel')?.addEventListener('click', closeEditModal);
  document.getElementById('modal-save')?.addEventListener('click', saveEditModal);
  document.getElementById('reset-data-btn')?.addEventListener('click', () => {
    if (!confirm('¿Borrar todos los datos guardados en este dispositivo?')) return;
    resetLocalData();
    showToast('Datos borrados');
    initNav();
    renderPerfil();
  });
}

function renderPerfil() {
  const profile = getProfile();
  document.getElementById('perfil-name').textContent = profile.name;
  document.getElementById('perfil-avatar').textContent = (profile.name || 'I').charAt(0).toUpperCase();
  document.getElementById('perfil-name-value').textContent = profile.name;
}

function openEditModal() {
  const profile = getProfile();
  document.getElementById('modal-input').value = profile.name;
  document.getElementById('edit-modal').classList.add('open');
}
function closeEditModal() {
  document.getElementById('edit-modal').classList.remove('open');
}
function saveEditModal() {
  const value = document.getElementById('modal-input').value.trim();
  if (!value) return;
  const profile = getProfile();
  profile.name = value;
  saveProfile(profile);
  closeEditModal();
  renderPerfil();
  document.querySelectorAll('.js-avatar').forEach((el) => (el.textContent = value.charAt(0).toUpperCase()));
  document.querySelectorAll('.js-greet-name, .nav-user-name').forEach((el) => (el.textContent = value));
  refreshGreeting();
  showToast('Perfil actualizado');
}

// ───────────────────────── VALIDACIÓN DE ANI ─────────────────────────
// Mismo chequeo de suscripción que Retofit y Mis Gastos en Orden: no hay
// login ni cuenta — lo único que habilita la app es que el ANI (el número
// de la línea) esté suscripto al club en el sistema de Playtown.
//
// Dos caminos:
//   1. El operador redirige con ?ani=... — ese número ya lo validó la red,
//      se guarda directo y se limpia de la URL.
//   2. No hay ANI válido — se muestra una pantalla bloqueante para cargarlo
//      a mano; hasta que la API confirme la suscripción no se puede navegar.
//
// La validación se renueva por mes calendario (no por 30 días): si el mes
// cambió, se vuelve a pedir. La baja del servicio queda reflejada como
// máximo al mes siguiente, que es el ciclo con el que factura la operadora.

// ⚠️ Chequeo APAGADO momentáneamente: la app entra directo, sin pantalla de
// verificación. Para reactivarlo alcanza con volver esto a `true` (y tener el
// ANI_CLUB_ID real) — el resto de la sección queda intacto.
const ANI_CHECK_ENABLED = false;

const ANI_KEY = 'mm_ani';
const ANI_VALIDATE_BASE = 'https://restito.playtown.com.ar:3000/club/checkClubSubscription/playar';
// TODO: reemplazar por el club ID de MindMusic en el sistema de Playtown
// (Retofit = 35). Con 'TODO' la API responde "no suscripto" y nadie entra.
const ANI_CLUB_ID = 'TODO';
const ANI_BEARER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.pwI0ElRICzc-j85krDiV5nUkz_lZLwmiuJ3m790JNBQ';
// Chile es el único mercado de este club, así que el prefijo es fijo y el
// usuario sólo escribe su número (9 + 8 dígitos).
const ANI_PREFIX = '56';

function getSavedAni() {
  const raw = localStorage.getItem(ANI_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw).ani || null;
  } catch (e) {
    return raw; // formato viejo: string pelado
  }
}

function saveAni(ani) {
  localStorage.setItem(ANI_KEY, JSON.stringify({ ani, validatedAt: new Date().toISOString() }));
}

function isAniValidThisMonth() {
  const raw = localStorage.getItem(ANI_KEY);
  if (!raw) return false;
  try {
    const { ani, validatedAt } = JSON.parse(raw);
    if (!ani || !validatedAt) return false;
    const saved = new Date(validatedAt);
    const now = new Date();
    return saved.getFullYear() === now.getFullYear() && saved.getMonth() === now.getMonth();
  } catch (e) {
    return false; // formato viejo = hay que revalidar
  }
}

async function validateAniWithApi(fullAni) {
  const res = await fetch(`${ANI_VALIDATE_BASE}/${encodeURIComponent(fullAni)}/${ANI_CLUB_ID}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${ANI_BEARER}` },
    // La API tarda varios segundos; sin corte, una red caída deja el botón
    // en "VERIFICANDO..." para siempre y el usuario no puede reintentar.
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  return typeof data.result === 'object' && !!data.result?.ANI;
}

function checkAniInUrl() {
  const params = new URLSearchParams(location.search);
  const ani = params.get('ani');
  if (!ani || !ani.trim()) return false;
  saveAni(ani.trim()); // el ANI que inyecta el operador ya viene validado por la red
  const url = new URL(location.href);
  url.searchParams.delete('ani');
  history.replaceState(null, '', url.toString());
  return true;
}

// Normaliza lo que escribe el usuario a un ANI completo: saca todo lo que no
// sea dígito, el 0 de larga distancia y el 56 si lo escribió igual.
function normalizeAniInput(value) {
  let digits = String(value).replace(/\D/g, '').replace(/^0+/, '');
  if (digits.startsWith(ANI_PREFIX) && digits.length > 9) digits = digits.slice(ANI_PREFIX.length);
  return digits;
}

function showAniGate() {
  if (document.getElementById('ani-gate')) return;
  const gate = document.createElement('div');
  gate.id = 'ani-gate';
  gate.className = 'ani-gate';
  gate.innerHTML = `
    <div class="ani-card" role="dialog" aria-modal="true" aria-labelledby="ani-title">
      <svg class="ani-brand" viewBox="0 0 120 64" fill="none" aria-hidden="true"><defs><linearGradient id="mmWaveAni" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#8FD9E8"/><stop offset="50%" stop-color="#6E8EE8"/><stop offset="100%" stop-color="#B3A6EE"/></linearGradient></defs><path d="M4,46 C12,46 12,26 20,26 C27,26 27,46 34,46 C41,46 41,6 48,6 C54,6 54,58 60,58 C66,58 66,6 72,6 C79,6 79,46 86,46 C93,46 93,26 100,26 C108,26 108,46 116,46" stroke="url(#mmWaveAni)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <h2 class="ani-title" id="ani-title">Verificá tu suscripción</h2>
      <p class="ani-sub">Para escuchar MindMusic necesitás una suscripción activa. Ingresá el número de tu línea para verificarla.</p>
      <label class="ani-label" for="ani-input">Número de celular</label>
      <div class="ani-input-wrap">
        <span class="ani-cc">🇨🇱 +${ANI_PREFIX}</span>
        <input class="ani-input" type="tel" id="ani-input" placeholder="9 1234 5678" inputmode="numeric" maxlength="15" autocomplete="tel-national">
      </div>
      <p class="ani-error" id="ani-error"></p>
      <button class="ani-btn" id="ani-btn" type="button">VERIFICAR</button>
      <p class="ani-foot">Sin registro ni contraseña: sólo validamos que tu línea tenga el servicio activo.</p>
    </div>`;
  document.body.appendChild(gate);
  document.body.style.overflow = 'hidden';

  const input = gate.querySelector('#ani-input');
  gate.querySelector('#ani-btn').addEventListener('click', handleAniValidate);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleAniValidate(); });
  setTimeout(() => input.focus(), 150);
}

function hideAniGate() {
  document.getElementById('ani-gate')?.remove();
  document.body.style.overflow = '';
}

async function handleAniValidate() {
  const btn = document.getElementById('ani-btn');
  const errEl = document.getElementById('ani-error');
  const input = document.getElementById('ani-input');
  if (!btn || !errEl || !input) return;

  errEl.textContent = '';
  const digits = normalizeAniInput(input.value);
  if (digits.length < 8) {
    errEl.textContent = 'Ingresá un número válido, sin el 0 inicial.';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'VERIFICANDO...';
  try {
    if (await validateAniWithApi(ANI_PREFIX + digits)) {
      saveAni(ANI_PREFIX + digits);
      hideAniGate();
    } else {
      errEl.textContent = 'Número no suscripto. Contactá a tu operadora para activar el servicio.';
    }
  } catch (e) {
    errEl.textContent = 'No pudimos verificar. Revisá tu conexión e intentá de nuevo.';
  } finally {
    btn.disabled = false;
    btn.textContent = 'VERIFICAR';
  }
}

// Guard de suscripción. Se llama antes de inicializar cualquier página: la
// página se arma igual detrás del velo (para que quede lista al validar),
// pero el overlay cubre todo y no deja navegar.
function initAniGuard() {
  checkAniInUrl(); // aun apagado: guarda el ANI de la operadora y limpia la URL
  if (!ANI_CHECK_ENABLED) return;
  if (ANI_CLUB_ID === 'TODO') {
    console.warn('[ANI] ANI_CLUB_ID sin configurar en app.js — ninguna validación va a pasar.');
  }
  if (!isAniValidThisMonth()) showAniGate();
}

// ───────────────────────── ROUTER ─────────────────────────

function getCountry() {
  const parts = location.pathname.split('/').filter(Boolean);

  const countries = ['ar', 'cl', 'py'];

  return parts.find(part => countries.includes(part)) || null;
}

document.addEventListener('DOMContentLoaded', () => {
  const country = getCountry();
  console.log(country);

  initAniGuard();

  if (document.getElementById('home-container')) { initHome(); return; }
  if (document.getElementById('explorar-container')) { initExplorar(); return; }
  if (document.getElementById('mood-container')) { initMoodPage(); return; }
  if (document.getElementById('playlist-container')) { initPlaylistPage(); return; }
  if (document.getElementById('player-container')) { initPlayerPage(); return; }
  if (document.getElementById('perfil-container')) { initPerfilPage(); return; }
});
