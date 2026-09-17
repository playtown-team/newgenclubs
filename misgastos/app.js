// ============================================================
// MIS GASTOS EN ORDEN — app.js
// Todo el JS del sitio: íconos, utils, estado local, capa de datos
// (mock hoy para contenido; localStorage para datos del usuario),
// motor de vencimientos, nav, e init de cada página.
// ============================================================

// ───────────────────────── ICONS ─────────────────────────

const UI_ICONS = {
  sparkles: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.6L19 9l-5.2 1.9L12 16l-1.8-5.1L5 9l5.2-1.4L12 2z"/><path d="M19 14l.9 2.6L22 17l-2.1.7L19 20l-.9-2.3L16 17l2.1-.4L19 14z"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  house: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5 11-11"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="17" r="4"/><path d="M10 14 20 4"/><path d="M15 9l3 3"/><path d="M18 6l2.5 2.5"/></svg>',
  dots: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0V4z"/><path d="M8 6H5.6a2.6 2.6 0 0 0 0 5.2H8"/><path d="M16 6h2.4a2.6 2.6 0 0 1 0 5.2H16"/><path d="M12 13v4"/><path d="M8.5 20h7"/><path d="M10 20v-3h4v3"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  percent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21C12 21 4 15.5 4 9.5C4 6.5 6.5 4 9.3 4C10.9 4 12 5 12 5C12 5 13.1 4 14.7 4C17.5 4 20 6.5 20 9.5C20 15.5 12 21 12 21Z"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"/><path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>',
  cap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/></svg>',
};

const FIXED_CAT_ICONS = {
  play: UI_ICONS.play,
  bolt: UI_ICONS.bolt,
  card: UI_ICONS.card,
  key: UI_ICONS.key,
  dots: UI_ICONS.dots,
  percent: UI_ICONS.percent,
  heart: UI_ICONS.heart,
  car: UI_ICONS.car,
  cap: UI_ICONS.cap,
};

const TIP_GRADIENTS = {
  'tips-financieros': 'linear-gradient(135deg,#0f9b8f,#2f66ac)',
  'alertas': 'linear-gradient(135deg,#6952b3,#b3392b)',
  'ahorro': 'linear-gradient(135deg,#177a4a,#b3720f)',
  'educacion-financiera': 'linear-gradient(135deg,#6952b3,#0f9b8f)',
};

// ───────────────────────── UTILS ─────────────────────────

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function uid(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

function isoToday() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function formatCLP(amount) {
  const n = Math.round(Math.abs(amount || 0));
  return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function fmtDatePretty(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d.getTime())) return '';
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
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

// ───────────────────────── LOCAL STORAGE ─────────────────────────
// Toda la data del USUARIO vive acá — sin backend, sin cuenta. Se pierde
// si el usuario borra el caché o cambia de dispositivo (asumido por ahora).

const STORAGE_KEYS = {
  profile: 'mgo_profile',
  movements: 'mgo_movements',
  subscriptions: 'mgo_subscriptions',
  tipsSeen: 'mgo_tips_seen',
  challenges: 'mgo_challenges',
};
const DEFAULT_PROFILE = { name: 'Invitado' };

function getProfile() {
  try {
    return Object.assign({}, DEFAULT_PROFILE, JSON.parse(localStorage.getItem(STORAGE_KEYS.profile) || '{}'));
  } catch (e) {
    return { ...DEFAULT_PROFILE };
  }
}
function saveProfile(p) {
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(p));
}

function getMovements() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.movements) || '[]');
  } catch (e) {
    return [];
  }
}
function saveMovements(list) {
  localStorage.setItem(STORAGE_KEYS.movements, JSON.stringify(list));
}
function addMovement(m) {
  const list = getMovements();
  list.push(m);
  saveMovements(list);
}

function getSubscriptions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.subscriptions) || '[]');
  } catch (e) {
    return [];
  }
}
function saveSubscriptions(list) {
  localStorage.setItem(STORAGE_KEYS.subscriptions, JSON.stringify(list));
}

// Estado de lectura de cada tip: 'unread' (por defecto), 'seen' (abrió el detalle)
// y 'done' (tocó "Entendido" en el detalle). Se guarda como mapa { id: estado }.
const TIP_STATUS_LABELS = { unread: 'Sin leer', seen: 'Visto', done: 'Entendido ✓' };

function getTipsRead() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.tipsSeen) || '{}');
    // Formato viejo: array de ids marcados como leídos.
    if (Array.isArray(raw)) {
      const migrated = {};
      raw.forEach((id) => { migrated[id] = 'done'; });
      return migrated;
    }
    return raw && typeof raw === 'object' ? raw : {};
  } catch (e) {
    return {};
  }
}
function tipStatus(id) {
  return getTipsRead()[id] || 'unread';
}
function setTipStatus(id, status) {
  const map = getTipsRead();
  // 'done' es el estado final: abrir de nuevo el detalle no lo baja a 'seen'.
  if (map[id] === 'done' && status !== 'done') return;
  map[id] = status;
  localStorage.setItem(STORAGE_KEYS.tipsSeen, JSON.stringify(map));
}

// Retos semanales del usuario: qué semana fue la primera que abrió la app
// (para no inventarle retos "no finalizados" de antes de conocerla) y el mapa
// de semanas finalizadas → id del reto que finalizó esa semana.
// { startWeek: 'YYYY-MM-DD' (lunes), done: { [lunes]: challengeId } }
function getChallengeState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.challenges) || '{}');
    return {
      startWeek: typeof raw.startWeek === 'string' ? raw.startWeek : null,
      done: raw.done && typeof raw.done === 'object' ? raw.done : {},
    };
  } catch (e) {
    return { startWeek: null, done: {} };
  }
}
function saveChallengeState(state) {
  localStorage.setItem(STORAGE_KEYS.challenges, JSON.stringify(state));
}

function resetLocalData() {
  Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
}

// ───────────────────────── API DE CONTENIDO (WordPress) ─────────────────────────
// Todo el contenido editorial (notas, retos, tip de la semana, dosis de calma)
// vive en WordPress y se trae por REST. Los datos del USUARIO
// (movimientos/vencimientos/perfil) NO pasan por acá: son locales, ver arriba.
//
// Cada post guarda su JSON en el cuerpo y la API lo devuelve en
// `mobile_content`. El endpoint `fulldata/category/...` ya trae ese campo en el
// listado, así que alcanza UNA llamada por categoría — no hace falta pedir el
// detalle de cada nota.

const API_BASE = 'https://contenidos.vip/misgastoseo/wp-json/api/v3/articles';
const WP_CATEGORY = {
  tips:       'tips-educativos',   // todas las notas, sin importar su categoría temática
  featured:   'tips-de-la-semana',
  challenges: 'retos-semanales',
  calm:       'dosis-de-calma',
};
// Orden de los chips del filtro en Home. El nombre visible sale del `badge` de
// cada nota: sumar una categoría nueva en WordPress no obliga a tocar el
// código — sólo aparece al final del filtro si no está listada acá.
const CONTENT_CATEGORY_ORDER = ['tips-financieros', 'alertas', 'ahorro', 'educacion-financiera'];

const API_PAGE_SIZE = 100;

async function apiFetchCategory(slug) {
  const out = [];
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(`${API_BASE}/fulldata/category/${encodeURIComponent(slug)}?limit=${API_PAGE_SIZE}&page=${page}`);
    if (!res.ok) throw new Error(`HTTP ${res.status} al pedir "${slug}"`);
    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];
    out.push(...data);
    if (data.length < API_PAGE_SIZE) break;
  }
  return out;
}

// El JSON viaja en el cuerpo del post, así que puede llegar con una coma
// colgando o con comillas tipográficas si se pegó desde un procesador de texto.
// Antes de descartar una nota, probamos repararlo.
function parseMobileContent(item) {
  let raw = (item && item.mobile_content) || '';
  if (raw.includes('<script')) raw = raw.replace(/^[\s\S]*?<script[^>]*>/i, '').replace(/<\/script>[\s\S]*$/i, '');
  const tries = [raw, raw.replace(/,(\s*[}\]])/g, '$1')];
  // Sin una sola comilla recta, el texto entero pasó por el "tipografiador".
  if (!raw.includes('"')) tries.push(raw.replace(/[“”]/g, '"').replace(/,(\s*[}\]])/g, '$1'));
  for (const t of tries) {
    try {
      const parsed = JSON.parse(t);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch (e) { /* probamos la siguiente reparación */ }
  }
  console.warn('[contenido] No pude leer el JSON de la nota', item && item.id, item && item.title);
  return null;
}

// Descarta las notas sin JSON válido y los ids repetidos: un import corrido dos
// veces deja duplicados, y en Retos un duplicado correría toda la rotación.
function mapContentItems(items, mapFn) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const mc = parseMobileContent(item);
    if (!mc) continue;
    const mapped = mapFn(mc, item);
    if (!mapped || !mapped.id || seen.has(mapped.id)) continue;
    seen.add(mapped.id);
    out.push(mapped);
  }
  return out;
}

// El plugin de la API NUNCA devuelve `thumbnail` vacío: si el post no tiene
// imagen destacada (o apunta a un adjunto que no existe) manda su placeholder.
// Hay que descartarlo o el respaldo al `image` del JSON no se usaría nunca.
function wpThumbnail(item) {
  const url = (item && item.thumbnail) || '';
  return /\/default_image\.(png|jpe?g)$/i.test(url) ? '' : url;
}

function toOrder(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
}

// Una sola pasada por la red por categoría y por carga de página.
const CONTENT_CACHE = { tips: null, featured: null, challenges: null, calm: null };

async function fetchTips() {
  if (CONTENT_CACHE.tips) return CONTENT_CACHE.tips;
  const raw = await apiFetchCategory(WP_CATEGORY.tips);
  CONTENT_CACHE.tips = mapContentItems(raw, (mc, item) => ({
    id: mc.id || item.slug,
    categoryId: mc.category || '',
    badge: mc.badge || '',
    title: mc.title || item.title || '',
    excerpt: mc.excerpt || '',
    // La imagen destacada de WordPress manda; el `image` del JSON queda de
    // respaldo (sirve mientras la foto siga viviendo en el repo).
    image: wpThumbnail(item) || mc.image || '',
    imageFit: mc.imageFit || '',
    body: Array.isArray(mc.body) ? mc.body : [],
    publishedAt: mc.publishedAt || '',
  })).sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
  return CONTENT_CACHE.tips;
}

async function fetchTipById(id) {
  const tips = await fetchTips();
  return tips.find((t) => t.id === id) || null;
}

// Notas de la misma categoría, sin la que se está leyendo. Vive acá (y no en la
// página) para que la fuente de datos sea siempre la misma.
async function fetchRelatedTips(categoryId, excludeId, limit = 3) {
  const tips = await fetchTips();
  return tips.filter((t) => t.categoryId === categoryId && t.id !== excludeId).slice(0, limit);
}

// Siempre la más nueva de la categoría: publicar una nota nueva en "Tips de la
// Semana" alcanza para reemplazar la destacada, las anteriores quedan de
// historial. `false` en el cache = ya buscamos y no hay ninguna.
async function fetchFeaturedTip() {
  if (CONTENT_CACHE.featured !== null) return CONTENT_CACHE.featured;
  const raw = await apiFetchCategory(WP_CATEGORY.featured);
  const list = mapContentItems(raw, (mc, item) => ({
    id: mc.id || item.slug,
    title: mc.title || item.title || '',
    excerpt: mc.excerpt || '',
    body: Array.isArray(mc.body) ? mc.body : [],
    actions: Array.isArray(mc.actions) ? mc.actions : [],
    source: mc.source || '',
    sourceUrl: mc.sourceUrl || '',
    publishedAt: mc.publishedAt || '',
  }));
  CONTENT_CACHE.featured = list.length ? list[0] : false;
  return CONTENT_CACHE.featured;
}

// El reto vigente sale de este pool ordenado por `order` (ver motor de retos):
// hay que cargarlo antes de dibujar cualquier card de reto o el historial.
async function loadChallenges() {
  if (CONTENT_CACHE.challenges) return CONTENT_CACHE.challenges;
  const raw = await apiFetchCategory(WP_CATEGORY.challenges);
  CONTENT_CACHE.challenges = mapContentItems(raw, (mc, item) => ({
    id: mc.id || item.slug,
    title: mc.title || item.title || '',
    description: mc.description || '',
    order: toOrder(mc.order),
  })).sort((a, b) => a.order - b.order);
  return CONTENT_CACHE.challenges;
}

// Mismo criterio que los retos: `order` fija la rotación, la frase del día sale
// de esa posición y no del azar.
async function loadCalmQuotes() {
  if (CONTENT_CACHE.calm) return CONTENT_CACHE.calm;
  const raw = await apiFetchCategory(WP_CATEGORY.calm);
  CONTENT_CACHE.calm = mapContentItems(raw, (mc, item) => ({
    id: mc.id || item.slug,
    quote: mc.quote || item.title || '',
    order: toOrder(mc.order),
  })).sort((a, b) => a.order - b.order);
  return CONTENT_CACHE.calm;
}

// Los chips del filtro salen de las notas ya cargadas: si una categoría se
// queda sin notas en WordPress, deja de aparecer sola.
function contentCategoriesFromTips(tips) {
  const found = new Map();
  tips.forEach((t) => {
    if (t.categoryId && !found.has(t.categoryId)) found.set(t.categoryId, t.badge || t.categoryId);
  });
  const ordered = CONTENT_CATEGORY_ORDER.filter((id) => found.has(id));
  const extra = [...found.keys()].filter((id) => !CONTENT_CATEGORY_ORDER.includes(id));
  return [...ordered, ...extra].map((id) => ({ id, name: found.get(id) }));
}

function fixedCategoryById(id) {
  return APP_DATA.fixedExpenseCategories.find((c) => c.id === id);
}

// ───────────────────────── MOTOR DE VENCIMIENTOS ─────────────────────────
// Nada de timers/cron: el estado de cada vencimiento se recalcula como
// función pura de (suscripción, hoy) cada vez que se carga una página. El
// botón "Pagado" sólo guarda `lastPaidPeriod`; el mes siguiente ese período
// ya no matchea y el aviso vuelve a aparecer solo.

function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}
function clampedDueDate(year, monthIndex, day) {
  return new Date(year, monthIndex, Math.min(day, daysInMonth(year, monthIndex)));
}
function periodKey(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}`;
}
function subscriptionDaysUntilDue(sub, today = new Date()) {
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const due = clampedDueDate(t.getFullYear(), t.getMonth(), sub.dueDay);
  return Math.round((due - t) / 86400000);
}
function subscriptionStatus(sub, today = new Date()) {
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (sub.lastPaidPeriod === periodKey(t)) return 'paid';
  const daysUntilDue = subscriptionDaysUntilDue(sub, t);
  if (daysUntilDue < 0) return 'overdue';
  if (daysUntilDue <= sub.reminderDays) return 'due_soon';
  return 'upcoming';
}
function markSubscriptionPaid(id) {
  const subs = getSubscriptions();
  const sub = subs.find((s) => s.id === id);
  if (!sub) return;
  const today = new Date();
  sub.lastPaidPeriod = periodKey(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  saveSubscriptions(subs);
  addMovement({ id: uid('mov'), type: 'fijo', name: sub.name, amount: sub.amount, date: isoToday(), createdAt: Date.now() });
}

// El anillo del ciclo: en reposo (fuera de la ventana de aviso) no hay nada
// que mirar, así que el anillo queda vacío. Al entrar en la ventana de aviso
// se llena hasta el día de vencimiento — el mismo umbral que define "vence
// pronto", así el anillo y el estado siempre cuentan la misma historia.
// Vencido/pagado lo fuerzan a un estado cerrado.
const VENC_RING_COLOR = { upcoming: 'var(--border)', due_soon: 'var(--cyan)', overdue: 'var(--red)', paid: 'var(--green)' };

function vencRingProgress(sub, status, days) {
  if (status === 'paid' || status === 'overdue') return 1;
  if (status === 'upcoming') return 0;
  return Math.max(0, Math.min(1, 1 - days / sub.reminderDays));
}

function renderVencRing(status, progress, size = 44) {
  const r = (size - 3) / 2;
  const c = 2 * Math.PI * r;
  const dash = (c * progress).toFixed(1);
  const pulse = status === 'overdue' ? ' venc-ring--pulse' : '';
  return `
    <svg class="venc-ring${pulse}" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
      <circle class="venc-ring-track" cx="${size / 2}" cy="${size / 2}" r="${r}"></circle>
      <circle class="venc-ring-fill" cx="${size / 2}" cy="${size / 2}" r="${r}" style="stroke:${VENC_RING_COLOR[status]}" stroke-dasharray="${dash} ${c.toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"></circle>
    </svg>`;
}

function vencCountdownLabel(status, days, dueDay) {
  const abs = Math.abs(days);
  if (status === 'paid') return 'Pagado este mes';
  if (status === 'overdue') return `Vencido hace ${abs} día${abs === 1 ? '' : 's'}`;
  if (status === 'due_soon') return days === 0 ? 'Vence hoy' : `Vence en ${abs} día${abs === 1 ? '' : 's'}`;
  return `Vence el día ${dueDay}`;
}

// ───────────────────────── MOTOR DE RETOS SEMANALES ─────────────────────────
// Mismo criterio que el motor de vencimientos: sin timers ni cron. El reto
// vigente es función pura de (pool, hoy) — se resuelve por el número de semana
// desde un lunes de referencia, así cambia solo el lunes a las 00:00 (hora
// local del dispositivo), dura toda la semana y recargar no lo altera.

const WEEK_MS = 7 * 86400000;
const CHALLENGE_EPOCH = new Date(2024, 0, 1); // lunes de referencia (1-ene-2024)

// Lunes 00:00 de la semana de `date`. getDay() cuenta 0=domingo; el (+6)%7 lo
// rota para que la semana arranque el lunes, como pidió el producto.
function weekStart(date = new Date()) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}
function weekKey(date = new Date()) {
  const d = weekStart(date);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function weekKeyToDate(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}
// Redondeamos porque los cambios de horario de verano hacen que la resta no dé
// un múltiplo exacto de 7 días (queda ±1 hora).
function weekIndex(date = new Date()) {
  return Math.round((weekStart(date) - CHALLENGE_EPOCH) / WEEK_MS);
}
// El guión lee bien suelto en la card ("24 ago – 30 ago"); dentro de la frase
// del historial queda mejor "Semana del 27 jul al 2 ago".
function weekRangeLabel(key, sep = '–') {
  const from = weekKeyToDate(key);
  const to = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 6);
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${from.getDate()} ${months[from.getMonth()]} ${sep} ${to.getDate()} ${months[to.getMonth()]}`;
}

function challengeForWeek(date = new Date()) {
  const pool = CONTENT_CACHE.challenges || [];
  if (!pool.length) return null;
  const i = ((weekIndex(date) % pool.length) + pool.length) % pool.length;
  return pool[i];
}
function challengeById(id) {
  return (CONTENT_CACHE.challenges || []).find((c) => c.id === id) || null;
}

// La primera semana se sella en la primera carga: sin esto no sabríamos desde
// cuándo contar los retos que quedaron sin finalizar.
function ensureChallengeStart() {
  const state = getChallengeState();
  if (!state.startWeek) {
    state.startWeek = weekKey();
    saveChallengeState(state);
  }
  return state;
}

function currentChallenge(date = new Date()) {
  const challenge = challengeForWeek(date);
  if (!challenge) return null;
  const key = weekKey(date);
  return { challenge, weekKey: key, done: !!getChallengeState().done[key] };
}

function setCurrentChallengeDone(done) {
  const challenge = challengeForWeek();
  if (!challenge) return;
  const state = ensureChallengeStart();
  const key = weekKey();
  if (done) state.done[key] = challenge.id;
  else delete state.done[key];
  saveChallengeState(state);
}

// Recorre semana a semana desde la primera visita hasta hoy y parte el
// historial en finalizados / no finalizados. La semana en curso todavía no
// cuenta como "no finalizada" — está corriendo.
function challengeHistory(date = new Date()) {
  const state = getChallengeState();
  const currentKey = weekKey(date);
  const currentStart = weekStart(date);
  const cursor = weekKeyToDate(state.startWeek || currentKey);
  const done = [];
  const missed = [];
  // El tope es sólo un cinturón de seguridad por si quedara guardada una
  // startWeek basura: 10 años de semanas y corta.
  for (let i = 0; cursor <= currentStart && i < 520; i++, cursor.setDate(cursor.getDate() + 7)) {
    const key = weekKey(cursor);
    const doneId = state.done[key];
    const challenge = (doneId && challengeById(doneId)) || challengeForWeek(cursor);
    if (!challenge) continue;
    if (doneId) done.push({ challenge, weekKey: key, isCurrent: key === currentKey });
    else if (key !== currentKey) missed.push({ challenge, weekKey: key });
  }
  done.reverse();
  missed.reverse();
  return { done, missed };
}

// ───────────────────────── LUNA DE HOY (marca de la app) ─────────────────────────
// La misma gramática del anillo de vencimientos, pero para la app entera:
// el glifo del header es la fase lunar real de hoy (aproximación estándar,
// no requiere precisión astronómica). Dos círculos superpuestos — la sombra
// se desplaza según cuánto falta para la luna llena.

const MOON_PHASE_NAMES = ['Luna nueva', 'Creciente', 'Cuarto creciente', 'Gibosa creciente', 'Luna llena', 'Gibosa menguante', 'Cuarto menguante', 'Menguante'];

function moonPhaseFraction(date = new Date()) {
  const synodicDays = 29.530588853;
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14, 0);
  const days = (date.getTime() - knownNewMoon) / 86400000;
  return (((days % synodicDays) + synodicDays) % synodicDays) / synodicDays;
}

function renderMoonGlyphs() {
  const glyphs = document.querySelectorAll('.moon-glyph');
  if (!glyphs.length) return;
  const p = moonPhaseFraction();
  const illuminated = (1 - Math.cos(2 * Math.PI * p)) / 2;
  const sign = p < 0.5 ? -1 : 1;
  const name = MOON_PHASE_NAMES[Math.round(p * 8) % 8];
  glyphs.forEach((el) => {
    const size = el.offsetWidth || 20;
    const shadow = el.querySelector('.moon-shadow');
    if (shadow) shadow.style.transform = `translateX(${(sign * illuminated * size).toFixed(1)}px)`;
    el.title = name;
  });
}

// ───────────────────────── NAV ─────────────────────────

function initNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'nav-home', '': 'nav-home',
    'contenido.html': 'nav-home',
    'registros.html': 'nav-registros',
    'retos.html': 'nav-retos',
    'perfil.html': 'nav-perfil',
  };
  const activeId = map[page];
  if (activeId) document.getElementById(activeId)?.classList.add('active');

  renderMoonGlyphs();

  const profile = getProfile();
  const initial = (profile.name || 'I').charAt(0).toUpperCase();
  document.querySelectorAll('.js-avatar').forEach((el) => (el.textContent = initial));
  document.querySelectorAll('.js-greet-name').forEach((el) => (el.textContent = profile.name));
  document.querySelectorAll('.nav-user-name').forEach((el) => (el.textContent = profile.name));
}

// ───────────────────────── CARD DEL RETO DE LA SEMANA ─────────────────────────
// La misma pieza en Home y en Retos, para que el reto se reconozca de un
// vistazo en las dos pantallas. Finalizarlo no lo esconde: la card se queda
// toda la semana y sólo cambia de violeta a verde con el check cerrado.

function renderChallengeCard(el, { showLink = false } = {}) {
  if (!el) return;
  const current = currentChallenge();
  if (!current) { el.innerHTML = ''; el.hidden = true; return; }
  const { challenge, weekKey: key, done } = current;
  el.hidden = false;
  el.innerHTML = `
    <div class="challenge-card${done ? ' is-done' : ''}">
      <div class="challenge-head">
        <span class="challenge-eyebrow">${UI_ICONS.trophy}<span>Reto de la semana</span></span>
        <span class="challenge-week">${escapeHtml(weekRangeLabel(key))}</span>
      </div>
      <h3 class="challenge-title">${escapeHtml(challenge.title)}</h3>
      <p class="challenge-desc">${escapeHtml(challenge.description)}</p>
      <div class="challenge-foot">
        <button class="challenge-btn" type="button" title="${done ? 'Tocá para desmarcarlo' : 'Marcar el reto como finalizado'}">
          <span class="challenge-check">${UI_ICONS.check}</span>
          <span>${done ? '¡Reto finalizado!' : 'Reto Finalizado'}</span>
        </button>
        ${showLink ? '' : '<a class="challenge-link" href="retos.html">Ver todos los retos →</a>'}
      </div>
    </div>`;

  el.querySelector('.challenge-btn').addEventListener('click', () => {
    // Marcar es directo; desmarcar pregunta, para que un toque de más no borre
    // un reto que el usuario sí cumplió.
    if (done && !confirm('¿Marcar este reto como no finalizado?')) return;
    setCurrentChallengeDone(!done);
    showToast(done ? 'Reto desmarcado' : '¡Reto finalizado! 🎉');
    renderChallengeCard(el, { showLink });
    renderChallengeHistory();
  });
}

// ───────────────────────── HOME ─────────────────────────

async function initHome() {
  initNav();
  renderSummarySkeletons();
  renderTipSkeletons();
  renderChallengeSkeleton(document.getElementById('home-challenge'));
  ensureChallengeStart();

  // Los vencimientos son locales: se dibujan sin esperar a la red.
  refreshHomeSummary();

  // Las cuatro categorías se piden en paralelo y cada bloque se dibuja apenas
  // llega la suya, sin esperar a las otras.
  const calm = loadCalmQuotes();
  const challenges = loadChallenges();
  const featured = fetchFeaturedTip();
  const tips = fetchTips();

  calm.then(renderCalmCard).catch(() => renderCalmCard([]));
  challenges
    .then(() => renderChallengeCard(document.getElementById('home-challenge')))
    .catch((err) => hideOnContentError('home-challenge', err));

  try {
    renderFeaturedTip(await featured);
  } catch (err) {
    hideOnContentError('home-featured-tip', err);
  }

  try {
    const list = await tips;
    renderCategoryFilter(contentCategoriesFromTips(list), list);
  } catch (err) {
    console.error('[contenido] No pude traer las notas', err);
    const el = document.getElementById('home-tips');
    if (el) el.innerHTML = `<div class="empty-state">No pudimos cargar el contenido. Revisá tu conexión y volvé a intentar.</div>`;
  }
}

// Si una sección del contenido no carga, se esconde en vez de quedar a medias.
function hideOnContentError(id, err) {
  console.error(`[contenido] No pude traer "${id}"`, err);
  const el = document.getElementById(id);
  if (el) { el.innerHTML = ''; el.hidden = true; }
}

function renderChallengeSkeleton(el) {
  if (!el) return;
  el.hidden = false;
  el.innerHTML = `<div class="skeleton skel-card"></div>`;
}

function renderFeaturedTip(tip) {
  const el = document.getElementById('home-featured-tip');
  if (!el) return;
  if (!tip) { el.hidden = true; return; }
  el.hidden = false;
  el.innerHTML = `
    <svg class="featured-tip-deco" viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <rect x="52" y="14" width="92" height="118" rx="12" stroke="var(--violet)" stroke-width="5" opacity="0.2"/>
      <path d="M70 42h56M70 60h56M70 78h34" stroke="var(--violet)" stroke-width="5" stroke-linecap="round" opacity="0.2"/>
    </svg>
    <div class="featured-tip-body">
      <p class="featured-tip-eyebrow">Tip de la Semana</p>
      <h3>${escapeHtml(tip.title)}</h3>
      <p class="featured-tip-excerpt">${escapeHtml(tip.excerpt)}</p>
      ${tip.body.map((p) => `<p class="featured-tip-p">${escapeHtml(p)}</p>`).join('')}
      ${tip.actions && tip.actions.length ? `
        <p class="featured-tip-actions-label">Qué podés hacer</p>
        <ul class="featured-tip-actions">
          ${tip.actions.map((a) => `
            <li class="featured-tip-action">
              <span class="featured-tip-action-icon">${UI_ICONS.check}</span>
              <span>${escapeHtml(a)}</span>
            </li>
          `).join('')}
        </ul>
      ` : ''}
      <div class="featured-tip-footer">
        <span class="featured-tip-source">${escapeHtml([tip.source ? `Fuente: ${tip.source}` : '', tip.publishedAt ? fmtDatePretty(tip.publishedAt) : ''].filter(Boolean).join(' · '))}</span>
        ${tip.sourceUrl ? `<a class="featured-tip-link" href="${escapeHtml(tip.sourceUrl)}" target="_blank" rel="noopener noreferrer">Ver noticia ↗</a>` : ''}
      </div>
    </div>
  `;
}

let homeTipsCategory = 'all';

function renderCategoryFilter(categories, tips) {
  const el = document.getElementById('home-cat-filter');
  if (!el) return;
  const chips = [{ id: 'all', name: 'Todas' }, ...categories];
  el.innerHTML = chips.map((c) => `
    <button class="cat-chip ${homeTipsCategory === c.id ? 'active' : ''}" data-cat="${c.id}">${escapeHtml(c.name)}</button>
  `).join('');
  el.querySelectorAll('.cat-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      homeTipsCategory = btn.dataset.cat;
      el.querySelectorAll('.cat-chip').forEach((b) => b.classList.toggle('active', b === btn));
      renderTipsList(homeTipsCategory === 'all' ? tips : tips.filter((t) => t.categoryId === homeTipsCategory));
    });
  });
  renderTipsList(homeTipsCategory === 'all' ? tips : tips.filter((t) => t.categoryId === homeTipsCategory));
}

function renderSummarySkeletons() {
  const el = document.getElementById('home-summary');
  if (!el) return;
  el.innerHTML = Array.from({ length: 2 }).map(() => `<div class="skeleton skel-card"></div>`).join('');
}
function renderTipSkeletons() {
  const el = document.getElementById('home-tips');
  if (!el) return;
  el.innerHTML = Array.from({ length: 2 }).map(() => `<div class="skeleton skel-tip"></div>`).join('');
}

function refreshHomeSummary() {
  const subs = getSubscriptions();
  const today = new Date();
  const avisos = subs
    .map((sub) => ({ sub, status: subscriptionStatus(sub, today), days: subscriptionDaysUntilDue(sub, today) }))
    .filter((x) => x.status === 'due_soon' || x.status === 'overdue')
    .sort((a, b) => a.days - b.days);
  renderSummaryList(avisos);
}

function paySubscriptionFromHome(id) {
  markSubscriptionPaid(id);
  showToast('Marcado como pagado');
  refreshHomeSummary();
}

function renderSummaryList(avisos) {
  const el = document.getElementById('home-summary');
  if (!el) return;
  if (!avisos.length) {
    el.innerHTML = `<div class="empty-state">Sin vencimientos próximos. Todo en orden ✓</div>`;
    return;
  }
  el.innerHTML = avisos.map(({ sub, status, days }) => {
    const cat = fixedCategoryById(sub.categoryId);
    const isOverdue = status === 'overdue';
    const progress = vencRingProgress(sub, status, days);
    return `
      <div class="summary-card ${isOverdue ? 'is-overdue' : ''}">
        <div class="summary-card-top">
          <div class="venc-icon" style="width:58px;height:58px">
            ${renderVencRing(status, progress, 58)}
            <div class="summary-icon ${isOverdue ? 'red' : (cat ? cat.color : 'cyan')}">${(cat && FIXED_CAT_ICONS[cat.icon]) || UI_ICONS.bell}</div>
          </div>
          <div class="summary-body">
            <h3>${escapeHtml(sub.name)}${cat ? ` <span class="summary-cat">(${escapeHtml(cat.name)})</span>` : ''}</h3>
            <p><span class="status-pill ${isOverdue ? 'overdue' : 'due-soon'}">${vencCountdownLabel(status, days, sub.dueDay)}</span></p>
          </div>
        </div>
        <div class="summary-card-bottom">
          <div class="summary-actions">
            <button class="summary-pay-btn" data-id="${sub.id}" title="Marcar como pagado" aria-label="Marcar como pagado">${UI_ICONS.check}<span>Marcar como Pagado</span></button>
            <a class="summary-more-btn" href="registros.html" title="Ver en Vencimientos" aria-label="Ver en Vencimientos">${UI_ICONS.edit}</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
  el.querySelectorAll('.summary-pay-btn').forEach((b) => b.addEventListener('click', () => paySubscriptionFromHome(b.dataset.id)));
}

function renderCalmCard(quotes) {
  const el = document.getElementById('home-calm-quote');
  if (!el) return;
  const card = el.closest('.calm-card');
  // Sin frases publicadas no hay card: mejor que quede vacía con comillas.
  if (!quotes || !quotes.length) { if (card) card.hidden = true; return; }
  if (card) card.hidden = false;
  // Días transcurridos en hora *local*: Date.now()/86400000 cuenta días UTC, así
  // que la frase cambiaba a las 21hs de Chile en vez de a la medianoche.
  const now = new Date();
  const dayNumber = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 86400000);
  const dayIndex = ((dayNumber % quotes.length) + quotes.length) % quotes.length;
  el.textContent = `"${quotes[dayIndex].quote}"`;
}

function renderTipsList(tips) {
  const el = document.getElementById('home-tips');
  if (!el) return;
  const read = getTipsRead();
  el.innerHTML = tips.map((t) => {
    const st = read[t.id] || 'unread';
    return `
    <div class="tip-card">
      <a class="tip-image" style="--tip-grad:${TIP_GRADIENTS[t.categoryId] || ''}" href="contenido.html?id=${encodeURIComponent(t.id)}">
        ${t.image ? `<img class="tip-image-photo" src="${escapeHtml(t.image)}" alt="" style="object-fit:${t.imageFit || 'cover'}">` : ''}
        <span class="tip-badge">${escapeHtml(t.badge)}</span>
      </a>
      <div class="tip-body">
        <a href="contenido.html?id=${encodeURIComponent(t.id)}"><h3>${escapeHtml(t.title)}</h3></a>
        <p class="tip-excerpt">${escapeHtml(t.excerpt)}</p>
        <hr class="tip-divider">
        <div class="tip-footer">
          <span class="tip-hint">${t.publishedAt ? `Publicado el ${fmtDatePretty(t.publishedAt)}` : ''}</span>
          <span class="tip-status is-${st}">${TIP_STATUS_LABELS[st]}</span>
        </div>
      </div>
    </div>
  `;
  }).join('');
}

// ───────────────────────── CONTENIDO (detalle de un tip) ─────────────────────────

async function initContenidoPage() {
  initNav();
  const id = new URLSearchParams(location.search).get('id');
  let tip = null;
  try {
    tip = await fetchTipById(id);
  } catch (err) {
    console.error('[contenido] No pude traer la nota', err);
    document.getElementById('contenido-loading').innerHTML = `<div class="empty-state">No pudimos cargar el contenido. Revisá tu conexión y volvé a intentar.</div>`;
    return;
  }

  if (!tip) {
    document.getElementById('contenido-loading').innerHTML = `<div class="empty-state">No encontramos ese contenido.</div>`;
    return;
  }

  document.getElementById('contenido-loading').style.display = 'none';
  document.getElementById('contenido-content').style.display = '';

  const hero = document.getElementById('contenido-hero');
  hero.style.setProperty('--tip-grad', TIP_GRADIENTS[tip.categoryId] || '');
  hero.innerHTML = tip.image ? `<img class="content-hero-photo" src="${escapeHtml(tip.image)}" alt="" style="object-fit:${tip.imageFit || 'cover'}">` : '';
  const meta = [tip.badge ? tip.badge.toUpperCase() : '', tip.publishedAt ? `Publicado el ${fmtDatePretty(tip.publishedAt)}` : ''].filter(Boolean);
  document.getElementById('contenido-meta').textContent = meta.join(' · ');
  document.getElementById('contenido-title').textContent = tip.title;
  document.getElementById('contenido-body').innerHTML = tip.body.map((p) => `<p>${escapeHtml(p)}</p>`).join('');

  // Abrir el detalle ya cuenta como "Visto"; "Entendido" es el paso explícito.
  setTipStatus(tip.id, 'seen');

  document.getElementById('contenido-cta').addEventListener('click', () => {
    setTipStatus(tip.id, 'done');
    history.back();
  });

  renderRelatedTips(await fetchRelatedTips(tip.categoryId, tip.id));
}

function renderRelatedTips(tips) {
  const section = document.getElementById('contenido-related');
  const list = document.getElementById('contenido-related-list');
  if (!section || !list) return;
  // Sin hermanos en la categoría no hay nada que ofrecer: la sección no aparece.
  if (!tips.length) { section.hidden = true; return; }

  const read = getTipsRead();
  list.innerHTML = tips.map((t) => {
    const st = read[t.id] || 'unread';
    return `
    <a class="related-card" href="contenido.html?id=${encodeURIComponent(t.id)}">
      <span class="related-thumb" style="--tip-grad:${TIP_GRADIENTS[t.categoryId] || ''}">
        ${t.image ? `<img src="${escapeHtml(t.image)}" alt="" style="object-fit:${t.imageFit || 'cover'}">` : ''}
      </span>
      <span class="related-info">
        <span class="related-badge">${escapeHtml(t.badge)}</span>
        <span class="related-name">${escapeHtml(t.title)}</span>
        <span class="tip-status is-${st}">${TIP_STATUS_LABELS[st]}</span>
      </span>
      <svg class="related-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
    </a>
  `;
  }).join('');
  section.hidden = false;
}

// ───────────────────────── REGISTROS ─────────────────────────

let editingSubId = null;

function initRegistros() {
  initNav();

  document.getElementById('new-fixed-btn').addEventListener('click', () => openSubscriptionModal(null));

  document.getElementById('subscription-cancel').addEventListener('click', closeSubscriptionModal);
  document.getElementById('subscription-save').addEventListener('click', saveSubscriptionModal);

  populateSubscriptionCategorySelect();
  renderSubscriptions();
}

function populateSubscriptionCategorySelect() {
  const sel = document.getElementById('subscription-category');
  if (!sel) return;
  // Placeholder deshabilitado al frente: elegir categoría es obligatorio, no
  // queremos que se guarde "Streaming" sólo por ser la primera de la lista.
  const placeholder = '<option value="" disabled selected>Elegir categoría</option>';
  sel.innerHTML = placeholder + APP_DATA.fixedExpenseCategories.map((c) => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');
}

function openSubscriptionModal(sub) {
  editingSubId = sub ? sub.id : null;
  document.getElementById('subscription-modal-title').textContent = sub ? 'Editar Gasto Fijo' : 'Nuevo Gasto Fijo';
  document.getElementById('subscription-name').value = sub ? sub.name : '';
  document.getElementById('subscription-amount').value = sub ? sub.amount : '';
  document.getElementById('subscription-category').value = sub ? sub.categoryId : '';
  document.getElementById('subscription-day').value = sub ? sub.dueDay : '';
  document.getElementById('subscription-reminder').value = sub ? String(sub.reminderDays) : '5';
  document.getElementById('subscription-modal').classList.add('open');
  document.getElementById('subscription-name').focus();
}
function closeSubscriptionModal() {
  document.getElementById('subscription-modal').classList.remove('open');
  editingSubId = null;
}
function saveSubscriptionModal() {
  const name = document.getElementById('subscription-name').value.trim();
  const amount = parseFloat(document.getElementById('subscription-amount').value);
  const categoryId = document.getElementById('subscription-category').value;
  const dueDay = parseInt(document.getElementById('subscription-day').value, 10);
  const reminderDays = parseInt(document.getElementById('subscription-reminder').value, 10);
  if (!name || !amount || amount <= 0 || !dueDay || dueDay < 1 || dueDay > 31) {
    showToast('Revisá los datos del vencimiento');
    return;
  }
  if (!categoryId) {
    showToast('Elegí una categoría');
    return;
  }
  const subs = getSubscriptions();
  if (editingSubId) {
    const sub = subs.find((s) => s.id === editingSubId);
    if (sub) Object.assign(sub, { name, amount, categoryId, dueDay, reminderDays });
  } else {
    subs.push({ id: uid('sub'), name, amount, categoryId, dueDay, reminderDays, lastPaidPeriod: null, createdAt: Date.now() });
  }
  saveSubscriptions(subs);
  closeSubscriptionModal();
  renderSubscriptions();
  showToast('Vencimiento guardado');
}

function deleteSubscriptionById(id) {
  if (!confirm('¿Dar de baja este vencimiento?')) return;
  saveSubscriptions(getSubscriptions().filter((s) => s.id !== id));
  renderSubscriptions();
  showToast('Vencimiento eliminado');
}

function paySubscription(id) {
  markSubscriptionPaid(id);
  renderSubscriptions();
  showToast('Marcado como pagado');
}

function renderSubscriptions() {
  const el = document.getElementById('subs-list');
  if (!el) return;
  const subs = getSubscriptions();
  if (!subs.length) {
    el.innerHTML = `<div class="empty-state">Todavía no cargaste gastos fijos o suscripciones.</div>`;
    return;
  }
  const today = new Date();
  el.innerHTML = subs.map((sub) => {
    const cat = fixedCategoryById(sub.categoryId);
    const status = subscriptionStatus(sub, today);
    const days = subscriptionDaysUntilDue(sub, today);
    const progress = vencRingProgress(sub, status, days);
    return `
      <div class="sub-row">
        <div class="venc-icon" style="width:50px;height:50px">
          ${renderVencRing(status, progress, 50)}
          <div class="sub-cat-icon ${cat ? cat.color : 'grey'}">${(cat && FIXED_CAT_ICONS[cat.icon]) || UI_ICONS.dots}</div>
          ${status === 'paid' ? `<span class="venc-check">${UI_ICONS.check}</span>` : ''}
        </div>
        <div class="sub-main">
          <div class="sub-top">
            <h4>${escapeHtml(sub.name)}</h4>
            <div class="sub-amount">${formatCLP(sub.amount)}</div>
          </div>
          <div class="sub-bottom">
            <div class="sub-meta-wrap">
              <span class="sub-meta">Día ${sub.dueDay} · aviso ${sub.reminderDays}d</span>
              ${status !== 'upcoming' ? `<span class="badge-state ${status.replace('_', '-')}">${vencCountdownLabel(status, days, sub.dueDay)}</span>` : ''}
            </div>
            <div class="sub-actions">
              ${status !== 'paid' ? `<button class="pay-btn" data-id="${sub.id}" title="Marcar pagado">${UI_ICONS.check}</button>` : ''}
              <button class="edit-btn" data-id="${sub.id}" title="Editar">${UI_ICONS.edit}</button>
              <button class="danger delete-btn" data-id="${sub.id}" title="Eliminar">${UI_ICONS.trash}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  el.querySelectorAll('.pay-btn').forEach((b) => b.addEventListener('click', () => paySubscription(b.dataset.id)));
  el.querySelectorAll('.edit-btn').forEach((b) => b.addEventListener('click', () => {
    const sub = getSubscriptions().find((s) => s.id === b.dataset.id);
    if (sub) openSubscriptionModal(sub);
  }));
  el.querySelectorAll('.delete-btn').forEach((b) => b.addEventListener('click', () => deleteSubscriptionById(b.dataset.id)));
}

// ───────────────────────── RETOS ─────────────────────────

async function initRetos() {
  initNav();
  ensureChallengeStart();
  renderChallengeSkeleton(document.getElementById('retos-current'));
  try {
    await loadChallenges();
  } catch (err) {
    hideOnContentError('retos-current', err);
    ['retos-done', 'retos-missed'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = `<div class="empty-state">No pudimos cargar los retos. Revisá tu conexión y volvé a intentar.</div>`;
    });
    return;
  }
  renderChallengeCard(document.getElementById('retos-current'), { showLink: true });
  renderChallengeHistory();
}

// Historial: los finalizados arriba, los que se pasaron abajo. Los dos
// listados se arman de una sola pasada por las semanas vividas.
function renderChallengeHistory() {
  const doneEl = document.getElementById('retos-done');
  const missedEl = document.getElementById('retos-missed');
  if (!doneEl && !missedEl) return;

  const { done, missed } = challengeHistory();
  renderChallengeList(doneEl, done, 'done', 'Todavía no finalizaste ningún reto. El de esta semana te espera arriba.');
  renderChallengeList(missedEl, missed, 'missed', 'Ninguno se te pasó por ahora. Seguí así ✓');
  setSectionCount('retos-done-count', done.length);
  setSectionCount('retos-missed-count', missed.length);
}

function setSectionCount(id, n) {
  const el = document.getElementById(id);
  if (el) el.textContent = n ? String(n) : '';
}

function renderChallengeList(el, items, kind, emptyMsg) {
  if (!el) return;
  if (!items.length) {
    el.innerHTML = `<div class="empty-state">${escapeHtml(emptyMsg)}</div>`;
    return;
  }
  el.innerHTML = items.map(({ challenge, weekKey: key, isCurrent }) => `
    <div class="challenge-row">
      <span class="challenge-row-icon is-${kind}">${kind === 'done' ? UI_ICONS.check : UI_ICONS.close}</span>
      <div class="challenge-row-body">
        <div class="challenge-row-top">
          <h4>${escapeHtml(challenge.title)}</h4>
          ${isCurrent ? '<span class="badge-state due-soon">Esta semana</span>' : ''}
        </div>
        <p>${escapeHtml(challenge.description)}</p>
        <span class="challenge-row-week">Semana del ${escapeHtml(weekRangeLabel(key, 'al'))}</span>
      </div>
    </div>
  `).join('');
}

// ───────────────────────── PERFIL ─────────────────────────

function initPerfil() {
  initNav();
  renderPerfilInfo();

  document.getElementById('edit-name-btn')?.addEventListener('click', openEditNameModal);
  document.getElementById('modal-cancel')?.addEventListener('click', closeEditNameModal);
  document.getElementById('modal-save')?.addEventListener('click', saveEditNameModal);
  document.getElementById('reset-data-btn')?.addEventListener('click', () => {
    if (!confirm('¿Borrar todos los datos guardados en este dispositivo? Se eliminan tus movimientos, vencimientos y tu nombre.')) return;
    resetLocalData();
    showToast('Datos borrados');
    renderPerfilInfo();
    initNav();
  });
}

function renderPerfilInfo() {
  const profile = getProfile();
  document.getElementById('perfil-name').textContent = profile.name;
  document.getElementById('perfil-avatar').textContent = (profile.name || 'I').charAt(0).toUpperCase();
  document.getElementById('perfil-name-value').textContent = profile.name;
}
function openEditNameModal() {
  const profile = getProfile();
  document.getElementById('modal-input').value = profile.name;
  document.getElementById('edit-modal').classList.add('open');
}
function closeEditNameModal() {
  document.getElementById('edit-modal').classList.remove('open');
}
function saveEditNameModal() {
  const value = document.getElementById('modal-input').value.trim();
  if (!value) return;
  const profile = getProfile();
  profile.name = value;
  saveProfile(profile);
  closeEditNameModal();
  renderPerfilInfo();
  document.querySelectorAll('.js-avatar').forEach((el) => (el.textContent = value.charAt(0).toUpperCase()));
  document.querySelectorAll('.js-greet-name, .nav-user-name').forEach((el) => (el.textContent = value));
  showToast('Perfil actualizado');
}


function getCountry() {
  const parts = location.pathname.split('/').filter(Boolean);

  const countries = ['ar', 'cl', 'py'];

  return parts.find(part => countries.includes(part)) || null;
}
// ───────────────────────── ROUTER ─────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const country = getCountry();
  console.log(country);

  if (document.getElementById('home-container')) { initHome(); return; }
  if (document.getElementById('registros-container')) { initRegistros(); return; }
  if (document.getElementById('contenido-container')) { initContenidoPage(); return; }
  if (document.getElementById('retos-container')) { initRetos(); return; }
  if (document.getElementById('perfil-container')) { initPerfil(); return; }
});
