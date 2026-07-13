'use strict';

// ═══════════════════════════════════════
//   RETOFIT — app.js
// ═══════════════════════════════════════

const API_BASE = 'https://contenidos.vip/retofit/wp-json/api/v3/articles';

// ═══════ EXERCISE ANIMATIONS ═══════
const ANIMS = {
  plank: `<svg class="aa-plank" viewBox="0 0 200 120" style="width:220px;height:132px">
    <defs><linearGradient id="ag" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#BFFF00"/><stop offset="100%" stop-color="#00E5FF"/></linearGradient></defs>
    <line x1="15" y1="98" x2="185" y2="98" stroke="rgba(255,255,255,0.07)" stroke-width="1.5"/>
    <circle cx="158" cy="60" r="14" stroke="url(#ag)" stroke-width="2.5" fill="rgba(191,255,0,0.06)"/>
    <line x1="144" y1="66" x2="42" y2="74" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="105" y1="71" x2="105" y2="98" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="105" y1="98" x2="93" y2="98" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="128" y1="73" x2="128" y2="98" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="128" y1="98" x2="116" y2="98" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="42" y1="74" x2="28" y2="98" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="28" y1="98" x2="16" y2="98" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,
  squat: `<svg class="aa-squat" viewBox="0 0 200 160" style="width:180px;height:144px">
    <defs><linearGradient id="ag" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#BFFF00"/><stop offset="100%" stop-color="#00E5FF"/></linearGradient></defs>
    <line x1="20" y1="148" x2="180" y2="148" stroke="rgba(255,255,255,0.07)" stroke-width="1.5"/>
    <circle cx="100" cy="22" r="14" stroke="url(#ag)" stroke-width="2.5" fill="rgba(191,255,0,0.06)"/>
    <line x1="100" y1="36" x2="100" y2="78" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="100" y1="50" x2="72" y2="66" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="100" y1="50" x2="128" y2="66" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="100" y1="78" x2="78" y2="112" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="78" y1="112" x2="72" y2="148" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="100" y1="78" x2="122" y2="112" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="122" y1="112" x2="128" y2="148" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,
  breath: `<svg viewBox="0 0 200 200" style="width:180px;height:180px">
    <defs><linearGradient id="ag" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#BFFF00"/><stop offset="100%" stop-color="#00E5FF"/></linearGradient></defs>
    <circle class="aa-breath" cx="100" cy="100" r="18" stroke="url(#ag)" stroke-width="2.5" fill="rgba(191,255,0,0.1)"/>
    <circle class="aa-breath" cx="100" cy="100" r="40" stroke="url(#ag)" stroke-width="1.5" fill="none" opacity=".55" style="animation-delay:-1s"/>
    <circle class="aa-breath" cx="100" cy="100" r="62" stroke="url(#ag)" stroke-width="1" fill="none" opacity=".28" style="animation-delay:-2s"/>
    <circle class="aa-breath" cx="100" cy="100" r="84" stroke="url(#ag)" stroke-width=".7" fill="none" opacity=".12" style="animation-delay:-3s"/>
  </svg>`,
  stretch: `<svg viewBox="0 0 200 180" style="width:180px;height:162px">
    <defs><linearGradient id="ag" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#BFFF00"/><stop offset="100%" stop-color="#00E5FF"/></linearGradient></defs>
    <line x1="20" y1="168" x2="180" y2="168" stroke="rgba(255,255,255,0.07)" stroke-width="1.5"/>
    <circle cx="100" cy="24" r="14" stroke="url(#ag)" stroke-width="2.5" fill="rgba(191,255,0,0.06)"/>
    <line x1="100" y1="38" x2="100" y2="92" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line class="aa-stretch" x1="100" y1="54" x2="52" y2="42" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round" style="transform-origin:100px 54px"/>
    <line class="aa-stretch" x1="100" y1="54" x2="148" y2="42" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round" style="transform-origin:100px 54px;animation-direction:reverse"/>
    <line x1="100" y1="92" x2="80" y2="132" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="80" y1="132" x2="75" y2="168" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="100" y1="92" x2="120" y2="132" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="120" y1="132" x2="125" y2="168" stroke="url(#ag)" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,
  circuit: `<svg viewBox="0 0 200 200" style="width:180px;height:180px">
    <defs><linearGradient id="ag" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#BFFF00"/><stop offset="100%" stop-color="#00E5FF"/></linearGradient></defs>
    <g class="aa-circuit">
      <circle cx="100" cy="32" r="18" stroke="url(#ag)" stroke-width="2" fill="rgba(191,255,0,0.07)"/>
      <circle cx="168" cy="100" r="18" stroke="url(#ag)" stroke-width="2" fill="rgba(0,229,255,0.07)"/>
      <circle cx="100" cy="168" r="18" stroke="url(#ag)" stroke-width="2" fill="rgba(191,255,0,0.07)"/>
      <circle cx="32" cy="100" r="18" stroke="url(#ag)" stroke-width="2" fill="rgba(0,229,255,0.07)"/>
      <path d="M118,32 A68,68 0 0,1 168,82" stroke="url(#ag)" stroke-width="1.5" fill="none" opacity=".45"/>
      <path d="M168,118 A68,68 0 0,1 118,168" stroke="url(#ag)" stroke-width="1.5" fill="none" opacity=".45"/>
      <path d="M82,168 A68,68 0 0,1 32,118" stroke="url(#ag)" stroke-width="1.5" fill="none" opacity=".45"/>
      <path d="M32,82 A68,68 0 0,1 82,32" stroke="url(#ag)" stroke-width="1.5" fill="none" opacity=".45"/>
    </g>
  </svg>`
};

// ═══════ UTILS ═══════
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._to);
  t._to = setTimeout(() => { t.style.opacity = '0'; }, 2500);
}

function fmtTime(s) {
  const m = Math.floor(s / 60), r = s % 60;
  return m + ':' + (r < 10 ? '0' : '') + r;
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = Math.imul(31, h) + s.charCodeAt(i) | 0; }
  return Math.abs(h);
}

function getTodayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

function catLabel(cat) {
  return { nutricion: 'Nutrición', mentalidad: 'Mentalidad', bienestar: 'Bienestar', entrenamiento: 'Entrenamiento', challenges: 'Reto', content: 'Contenido' }[cat] || cat;
}

function catClass(cats) {
  if (!cats) return '';
  const list = Array.isArray(cats) ? cats : [cats];
  if (list.includes('nutricion')) return 'nutricion';
  if (list.includes('mentalidad')) return 'mentalidad';
  if (list.includes('bienestar')) return 'bienestar';
  if (list.includes('challenges')) return 'challenges';
  return 'entrenamiento';
}

// ═══════ LOCAL STORAGE / STATS ═══════
const STATS_KEY = 'rf_stats';
const DAILY_KEY = 'rf_daily';
const PROFILE_KEY = 'rf_profile';

function getStats() {
  const def = { streak: 0, totalChallenges: 0, totalMins: 0, lastActiveDate: '', weekStats: { weekMon: '', days: [0, 0, 0, 0, 0, 0, 0] } };
  try { return Object.assign(def, JSON.parse(localStorage.getItem(STATS_KEY) || '{}')); } catch (e) { return def; }
}

function saveStats(s) { localStorage.setItem(STATS_KEY, JSON.stringify(s)); }

function getProfile() {
  const def = { name: 'Atleta', age: 30, weight: 70, height: 170 };
  try { return Object.assign(def, JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}')); } catch (e) { return def; }
}

function saveProfile(p) { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); }

function getDailyState() {
  const today = getTodayStr();
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    if (raw) { const s = JSON.parse(raw); if (s.date === today) return s; }
  } catch (e) {}
  return { date: today, challengeIds: [], completed: [], inProgress: [] };
}

function saveDailyState(s) { localStorage.setItem(DAILY_KEY, JSON.stringify(s)); }

function markChallengeCompleted(id) {
  const s = getDailyState();
  const key = String(id);
  if (!s.completed.includes(key)) { s.completed.push(key); saveDailyState(s); }
  return s;
}

function isChallengeCompleted(id) {
  return getDailyState().completed.includes(String(id));
}

function markChallengeInProgress(id) {
  const s = getDailyState();
  s.inProgress = s.inProgress || [];
  const key = String(id);
  if (!s.inProgress.includes(key)) { s.inProgress.push(key); saveDailyState(s); }
}

function removeChallengeInProgress(id) {
  const s = getDailyState();
  s.inProgress = (s.inProgress || []).filter(k => k !== String(id));
  saveDailyState(s);
}

function isChallengeInProgress(id) {
  return (getDailyState().inProgress || []).includes(String(id));
}

function getThisMonday() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const m = new Date(d.getFullYear(), d.getMonth(), diff);
  return m.getFullYear() + '-' + (m.getMonth() + 1) + '-' + m.getDate();
}

function updateStatsAfterChallenge(duration) {
  const s = getStats();
  const today = getTodayStr();
  const yesterday = (() => {
    const d = new Date(); d.setDate(d.getDate() - 1);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  })();
  if (s.lastActiveDate !== today) {
    s.streak = s.lastActiveDate === yesterday ? s.streak + 1 : 1;
  }
  s.totalChallenges = (s.totalChallenges || 0) + 1;
  s.totalMins = (s.totalMins || 0) + Math.round(duration / 60);
  s.lastActiveDate = today;
  const mon = getThisMonday();
  if (!s.weekStats || s.weekStats.weekMon !== mon) {
    s.weekStats = { weekMon: mon, days: [0, 0, 0, 0, 0, 0, 0] };
  }
  const d = new Date(); let di = d.getDay() - 1; if (di < 0) di = 6;
  s.weekStats.days[di] = Math.min(4, (s.weekStats.days[di] || 0) + 1);
  saveStats(s);
  return s;
}

// ═══════ DAILY CHALLENGE SELECTION ═══════
function pickDailyChallenges(all, n = 4) {
  const today = getTodayStr();
  const arr = [...all];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = hashStr(today + String(i)) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

// ═══════ CHALLENGE DATA PARSING ═══════
function parseChallengeData(article) {
  let d = {};
  try { d = JSON.parse(article.mobile_content || '{}'); } catch (e) {}
  const gradMap = {
    facil: 'linear-gradient(270deg,#002a0d,#001a14,#002a0d)',
    medio: 'linear-gradient(270deg,#0d2000,#001420,#0d2000)',
    dificil: 'linear-gradient(270deg,#200000,#100010,#200000)',
  };
  const diff = d.difficulty || 'medio';
  return {
    id: article.id,
    name: d.name || article.title,
    duration: (d.duration || 1) * 60,
    difficulty: diff,
    desc: d.desc || article.short_description || '',
    steps: d.steps || [],
    video: d.video || '',
    emoji: d.emoji || '⚡',
    grad: d.grad || gradMap[diff] || gradMap.medio,
    anim: d.anim || 'squat',
    thumbnail: article.thumbnail || '',
    categoria: d.categoria || '',
  };
}

// ═══════ API ═══════
async function apiFetch(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function fetchChallengesList() {
  const json = await apiFetch(`${API_BASE}/category/Challenges`);
  return json.data || [];
}

async function fetchContentList(page = 1) {
  const json = await apiFetch(`${API_BASE}/category/content?page=${page}`);
  return { data: json.data || [], next: json.next || null };
}

async function fetchCategoryList(category, page = 1) {
  const json = await apiFetch(`${API_BASE}/category/${category}?page=${page}`);
  return { data: json.data || [], next: json.next || null };
}

async function fetchArticleById(id) {
  const json = await apiFetch(`${API_BASE}/id/${id}`);
  return json.data;
}

// ═══════ NAV ═══════
function initNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  const map = { 'index.html': 'nav-home', '': 'nav-home', 'stats.html': 'nav-stats', 'perfil.html': 'nav-perfil' };
  const activeId = map[page];
  if (activeId) document.getElementById(activeId)?.classList.add('active');

  // Actualizar avatar con inicial del perfil
  const profile = getProfile();
  const av = profile.name.charAt(0).toUpperCase();
  document.querySelectorAll('.home-ava, .nav-user-ava').forEach(el => { el.textContent = av; });
  document.querySelectorAll('.nav-user-name').forEach(el => { el.textContent = profile.name; });

  // SW registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./uploads/sw.js').catch(() => {});
  }
}

// ═══════ HOME PAGE INIT ═══════
let allChallenges = [];
let allContent = [];
let contentNextUrl = null;
let currentCategory = 'todos';

async function initHome() {
  initNav();

  const params = new URLSearchParams(location.search);
  const catParam = params.get('cat');
  if (catParam) {
    currentCategory = catParam;
    document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    const chip = document.querySelector(`.cat-chip[data-cat="${catParam}"]`);
    if (chip) chip.classList.add('active');
  }

  renderDailySkeletons();

  try {
    const [challengesRaw, contentResult] = await Promise.all([
      fetchChallengesList(),
      fetchContentList(1)
    ]);

    allContent = contentResult.data;
    contentNextUrl = contentResult.next;

    // Pick 4 daily challenges and store IDs
    const daily = pickDailyChallenges(challengesRaw, 4);
    allChallenges = daily;
    const ds = getDailyState();
    ds.challengeIds = daily.map(c => String(c.id));
    saveDailyState(ds);

    renderHome();
  } catch (e) {
    console.error('Failed to load home data:', e);
    document.getElementById('daily-cards').innerHTML = '<p style="color:var(--muted);padding:16px;font-size:13px">No se pudo cargar el contenido. Revisá tu conexión.</p>';
  }
}

function renderDailySkeletons() {
  const container = document.getElementById('daily-cards');
  if (!container) return;
  container.innerHTML = Array(4).fill(0).map(() => `
    <div class="skel-card">
      <div class="skel-thumb skeleton"></div>
      <div class="skel-body">
        <div class="skel-line skeleton"></div>
        <div class="skel-line skeleton short"></div>
      </div>
    </div>`).join('');
}

function renderHome() {
  const cat = currentCategory;
  const retosSection = document.getElementById('home-retos-section');
  const tipsSection = document.getElementById('home-tips-section');

  if (retosSection) retosSection.style.display = (cat === 'todos' || cat === 'entrenamiento') ? '' : 'none';
  if (tipsSection) tipsSection.style.display = cat === 'todos' ? '' : 'none';

  renderDailyCards();

  if (cat === 'todos') {
    renderFeaturedContent(allContent);
    renderContentGrid(allContent, false);
    const loadMore = document.getElementById('content-load-more');
    if (loadMore) loadMore.style.display = contentNextUrl ? '' : 'none';
  } else if (cat === 'entrenamiento') {
    document.getElementById('home-featured-wrap').innerHTML = '';
    document.getElementById('home-grid').innerHTML = '';
    const loadMore = document.getElementById('content-load-more');
    if (loadMore) loadMore.style.display = 'none';
    document.getElementById('home-recent-section').style.display = 'none';
  } else {
    loadCategoryContent(cat);
  }
}

function renderDailyCards() {
  const container = document.getElementById('daily-cards');
  if (!container || !allChallenges.length) return;
  const ds = getDailyState();
  const done = ds.completed;
  const inProg = ds.inProgress || [];
  const total = allChallenges.length;
  const doneCount = done.filter(id => allChallenges.some(c => String(c.id) === id)).length;

  const lbl = document.getElementById('daily-prog-lbl');
  const bar = document.getElementById('daily-prog-bar');
  if (lbl) lbl.textContent = doneCount + '/' + total;
  if (bar) bar.style.width = (doneCount / total * 100) + '%';

  container.innerHTML = allChallenges.map(c => {
    const isDone = done.includes(String(c.id));
    const isInProg = !isDone && inProg.includes(String(c.id));
    return `<div class="reto-card${isDone ? ' reto-done' : isInProg ? ' reto-inprog' : ''}" onclick="${isDone ? '' : `location.href='challenge.html?id=${c.id}'`}">
      <div class="reto-thumb">
        <img src="${c.thumbnail}" alt="${c.title}" loading="lazy" onerror="this.style.display='none'">
        ${isDone ? `<div class="reto-done-ov"><div class="reto-check"><svg style="width:18px;height:18px;stroke:#000;fill:none;stroke-width:3;stroke-linecap:round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div></div>` : ''}
        ${isInProg ? `<div class="reto-inprog-ov"><div class="reto-inprog-dot"></div></div>` : ''}
      </div>
      <div class="reto-body">
        <p class="reto-name">${c.title}</p>
        ${isDone ? `<div class="reto-done-badge"><svg viewBox="0 0 24 24"><path d="M13 2L4.5 13.5H11L10 22L20 10H13.5Z"/></svg><span>COMPLETADO</span></div>` : ''}
        ${isInProg ? `<div class="reto-inprog-badge"><svg viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg><span>EN PROGRESO</span></div>` : ''}
      </div>
    </div>`;
  }).join('');
}

function renderFeaturedContent() {
  const wrap = document.getElementById('home-featured-wrap');
  if (wrap) wrap.innerHTML = '';
}

function renderContentGrid(items, showAll) {
  const grid = document.getElementById('home-grid');
  const titleEl = document.getElementById('home-recent-title');
  const recentSection = document.getElementById('home-recent-section');
  if (!grid) return;
  if (recentSection) recentSection.style.display = '';

  const pool = showAll ? items : items.slice(0, 8);
  if (!pool.length) { grid.innerHTML = ''; return; }

  if (titleEl) titleEl.textContent = 'Contenido reciente';
  grid.innerHTML = pool.map(item => `
    <div class="content-card" onclick="location.href='article.html?id=${item.id}'">
      <div class="content-card-thumb">
        <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="content-card-body">
        <p class="content-card-title">${item.title}</p>
        ${item.short_description ? `<p class="content-card-desc">${item.short_description}</p>` : ''}
      </div>
    </div>`).join('');
}

// Maneja categorías de contenido (Nutricion, Mentalidad, Bienestar)
let categoryContent = [];
let categoryNextUrl = null;
let loadingCategory = false;

async function loadCategoryContent(cat) {
  const grid = document.getElementById('home-grid');
  const titleEl = document.getElementById('home-recent-title');
  const recentSection = document.getElementById('home-recent-section');
  const loadMore = document.getElementById('content-load-more');
  const featWrap = document.getElementById('home-featured-wrap');

  if (featWrap) featWrap.innerHTML = '';
  if (recentSection) recentSection.style.display = '';
  if (titleEl) titleEl.textContent = catLabel(cat);
  if (grid) grid.innerHTML = '<div style="grid-column:1/-1;padding:20px 0;text-align:center;color:var(--muted);font-size:13px">Cargando...</div>';

  try {
    const result = await fetchCategoryList(cat, 1);
    categoryContent = result.data;
    categoryNextUrl = result.next;

    if (!categoryContent.length) {
      grid.innerHTML = '<div style="grid-column:1/-1;padding:20px 0;text-align:center;color:var(--muted);font-size:13px">No hay artículos en esta categoría.</div>';
      if (loadMore) loadMore.style.display = 'none';
      return;
    }

    grid.innerHTML = categoryContent.map(item => contentCardHTML(item)).join('');
    if (loadMore) loadMore.style.display = categoryNextUrl ? '' : 'none';
  } catch (e) {
    if (grid) grid.innerHTML = '<div style="grid-column:1/-1;padding:20px 0;text-align:center;color:var(--muted);font-size:13px">Error al cargar contenido.</div>';
  }
}

async function loadMoreCategoryContent() {
  if (loadingCategory || !categoryNextUrl) return;
  const btn = document.getElementById('content-load-more');
  const grid = document.getElementById('home-grid');
  loadingCategory = true;
  if (btn) { btn.disabled = true; btn.textContent = 'Cargando...'; }

  try {
    const res = await fetch(categoryNextUrl);
    const json = await res.json();
    const newItems = json.data || [];
    categoryContent = [...categoryContent, ...newItems];
    categoryNextUrl = json.next || null;
    grid.innerHTML = categoryContent.map(item => contentCardHTML(item)).join('');
    if (btn) { btn.style.display = categoryNextUrl ? '' : 'none'; }
  } catch (e) {
    showToast('Error al cargar más contenido');
  } finally {
    loadingCategory = false;
    if (btn) { btn.disabled = false; btn.textContent = 'Cargar más'; }
  }
}

async function loadMoreContent() {
  if (!contentNextUrl) return;
  const btn = document.getElementById('content-load-more');
  if (btn) { btn.disabled = true; btn.textContent = 'Cargando...'; }
  try {
    const res = await fetch(contentNextUrl);
    const json = await res.json();
    allContent = [...allContent, ...(json.data || [])];
    contentNextUrl = json.next || null;
    renderContentGrid(allContent, false);
    if (btn) { btn.style.display = contentNextUrl ? '' : 'none'; }
  } catch (e) {
    showToast('Error al cargar más contenido');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Cargar más'; }
  }
}

function contentCardHTML(item) {
  return `<div class="content-card" onclick="location.href='article.html?id=${item.id}'">
    <div class="content-card-thumb">
      <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'">
    </div>
    <div class="content-card-body">
      <p class="content-card-title">${item.title}</p>
      ${item.short_description ? `<p class="content-card-desc">${item.short_description}</p>` : ''}
    </div>
  </div>`;
}

function setCategory(cat, el) {
  currentCategory = cat;
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  renderHome();
}

// ═══════ ARTICLE PAGE INIT ═══════
async function initArticlePage() {
  initNav();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!id) { location.href = 'index.html'; return; }

  document.getElementById('article-loading')?.style.setProperty('display', 'flex');

  try {
    const article = await fetchArticleById(id);
    renderArticle(article);
  } catch (e) {
    document.getElementById('article-loading').innerHTML = '<p style="color:var(--muted);font-size:14px;padding:24px">No se pudo cargar el artículo.</p>';
  }
}

function renderArticle(article) {
  const loading = document.getElementById('article-loading');
  const contentEl = document.getElementById('article-content');
  if (loading) loading.style.display = 'none';
  if (contentEl) contentEl.style.display = 'flex';

  // Parse mobile_content for rich data
  let mc = {};
  try { mc = JSON.parse(article.mobile_content || '{}'); } catch (e) {}

  // Update page title
  if (article.title) document.title = article.title + ' — RETOFIT';

  // Media
  const img = document.getElementById('ct-img');
  const placeholder = document.getElementById('ct-placeholder');
  const thumb = article.thumbnail || mc.image || '';
  if (thumb) {
    img.src = thumb;
    img.style.display = 'block';
    img.onerror = function () { this.style.display = 'none'; if (placeholder) placeholder.style.display = 'flex'; };
    if (placeholder) placeholder.style.display = 'none';
  } else {
    img.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
  }

  // Duration badge
  const durBadge = document.getElementById('ct-dur-badge');
  if (durBadge && mc.duration) {
    durBadge.textContent = mc.duration;
    durBadge.style.display = '';
  }

  // Category pill
  const cats = article.categories || [];
  const catCls = catClass(cats);
  const catLbl = catLabel(catCls);
  const pill = document.getElementById('ct-cat-pill');
  if (pill) { pill.textContent = catLbl; pill.className = 'ct-cat-pill ' + catCls; }
  const durLbl = document.getElementById('ct-dur-lbl');
  if (durLbl && mc.duration) durLbl.textContent = mc.duration + ' LECTURA';

  // Title
  const titleEl = document.getElementById('ct-title');
  if (titleEl) titleEl.textContent = article.title;

  // Description (from mobile_content)
  const descEl = document.getElementById('ct-desc');
  if (descEl) descEl.textContent = mc.desc || '';

  // Body paragraphs (from mobile_content.body array)
  const paras = document.getElementById('ct-paragraphs');
  if (paras) {
    if (mc.body && mc.body.length) {
      paras.innerHTML = mc.body.map(p => `<p class="ct-paragraph">${p}</p>`).join('');
    } else {
      // Fallback: try content array
      const blocks = (article.content || []).filter(b => b && b.type === 'p');
      paras.innerHTML = blocks.map(block => {
        const text = (block.children || []).filter(Boolean).map(c => typeof c === 'string' ? c : (c.text || '')).join('');
        return text ? `<p class="ct-paragraph">${text}</p>` : '';
      }).filter(Boolean).join('');
    }
  }

  // Previous / next article navigation
  const navSection = document.getElementById('ct-art-nav');
  const prevId = article.previous && article.previous !== '' ? article.previous : null;
  const nextId = article.next && article.next !== '' ? article.next : null;
  const prevBtn = document.getElementById('ct-prev-btn');
  const nextBtn = document.getElementById('ct-next-btn');

  if (prevId && prevBtn) {
    prevBtn.href = `article.html?id=${prevId}`;
    prevBtn.style.display = 'flex';
    fetchArticleById(prevId).then(prev => {
      const img = document.getElementById('ct-prev-img');
      if (img && prev.thumbnail) img.src = prev.thumbnail;
      const name = document.getElementById('ct-prev-name');
      if (name) name.textContent = prev.title;
    }).catch(() => {});
  }
  if (nextId && nextBtn) {
    nextBtn.href = `article.html?id=${nextId}`;
    nextBtn.style.display = 'flex';
    fetchArticleById(nextId).then(next => {
      const img = document.getElementById('ct-next-img');
      if (img && next.thumbnail) img.src = next.thumbnail;
      const name = document.getElementById('ct-next-name');
      if (name) name.textContent = next.title;
    }).catch(() => {});
  }
  if (navSection && (prevId || nextId)) navSection.style.display = 'flex';

  document.getElementById('ct-body-wrap')?.scrollTo(0, 0);
}

// ═══════ CHALLENGE PAGE INIT ═══════
let currentChallenge = null;
let videoPlaying = false;
let vprogInt = null;
let realVideoReady = false;
let countdownSecs = 0;
let countdownInt = null;
let countdownRunning = false;
let settingVideoState = false;

async function initChallengePage() {
  initNav();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!id) { location.href = 'index.html'; return; }

  const loading = document.getElementById('challenge-loading');
  const container = document.getElementById('challenge-container');
  if (loading) loading.style.display = 'flex';

  try {
    const article = await fetchArticleById(id);
    currentChallenge = parseChallengeData(article);
    if (loading) loading.style.display = 'none';
    if (container) container.style.display = 'grid';
    renderChallenge(currentChallenge);
  } catch (e) {
    if (loading) loading.innerHTML = '<p style="color:var(--muted);font-size:14px;padding:24px">No se pudo cargar el reto.</p>';
  }

  // Video event listeners
  setupVideoListeners();
}

function renderChallenge(c) {
  document.getElementById('ch-title').textContent = c.name;
  const durLabel = c.duration === 60 ? '1 minuto' : c.duration === 180 ? '3 minutos' : c.duration === 300 ? '5 minutos' : Math.round(c.duration / 60) + ' min';
  document.getElementById('ch-level').textContent = durLabel;
  document.getElementById('ch-desc').textContent = c.desc;
  document.getElementById('vbg').style.background = c.grad + ';background-size:400% 400%';
  document.getElementById('vanim').innerHTML = '';
  document.getElementById('ch-dur-txt').textContent = 'Duración: ' + fmtTime(c.duration);
  document.getElementById('ch-dur-txt').style.display = '';
  document.getElementById('vtime-lbl').textContent = '0:00 / ' + fmtTime(c.duration);
  const cdVal = document.getElementById('countdown-val');
  if (cdVal) cdVal.textContent = fmtTime(c.duration);
  const cdWrap = document.getElementById('countdown-wrap');
  if (cdWrap) cdWrap.style.display = 'none';
  document.getElementById('ch-steps').innerHTML = c.steps.map((s, i) => `
    <div class="ch-step">
      <div class="step-num"><span>${i + 1}</span></div>
      <span class="step-txt">${s}</span>
    </div>`).join('');

  const vid = document.getElementById('vreal');
  const vl = document.getElementById('vloading');
  const ve = document.getElementById('verror');
  if (vl) vl.style.display = 'none';
  if (ve) ve.style.display = 'none';
  if (c.video) {
    vid.src = c.video;
    vid.load();
    document.getElementById('vplayer').style.display = '';
    if (vl) vl.style.display = 'flex';
  } else {
    vid.src = '';
    document.getElementById('vplayer').style.display = 'none';
  }

  resetVideo();
}

function toggleVideo() {
  videoPlaying = !videoPlaying;
  const bg = document.getElementById('vbg');
  const ov = document.getElementById('voverlay');
  const rec = document.getElementById('vrec');
  const icon = document.getElementById('vplay-icon');
  const fill = document.getElementById('vpfill');
  const dur = (currentChallenge && currentChallenge.duration) || 60;
  const vid = document.getElementById('vreal');

  if (videoPlaying) {
    bg.classList.add('playing');
    ov.style.display = 'none';
    rec.textContent = 'EN VIVO';
    rec.classList.add('live');
    icon.innerHTML = '<rect x="6" y="4" width="4" height="16" fill="rgba(255,255,255,0.8)"/><rect x="14" y="4" width="4" height="16" fill="rgba(255,255,255,0.8)"/>';
    settingVideoState = true;
    vid.play().catch(() => {});
    settingVideoState = false;
    if (!realVideoReady) {
      clearInterval(vprogInt);
      const tickMs = Math.max(50, dur * 1000 / 200);
      let pct = parseFloat(fill.style.width) || 0;
      vprogInt = setInterval(() => {
        pct += 0.5;
        fill.style.width = pct + '%';
        const elapsed = Math.round((pct / 100) * dur);
        updateVTimeLabel(elapsed, dur);
        if (pct >= 100) {
          clearInterval(vprogInt);
          fill.style.width = '100%';
          updateVTimeLabel(dur, dur);
          enableFinishBtn();
        }
      }, tickMs);
    }
    resumeCountdown();
  } else {
    bg.classList.remove('playing');
    ov.style.display = 'flex';
    rec.textContent = 'Tutorial';
    rec.classList.remove('live');
    icon.innerHTML = '<path d="M5 3l14 9-14 9V3z" fill="rgba(255,255,255,0.8)" stroke="none"/>';
    settingVideoState = true;
    vid.pause();
    settingVideoState = false;
    clearInterval(vprogInt);
    pauseCountdown();
  }
}

function pauseCountdown() {
  clearInterval(countdownInt);
  countdownInt = null;
}

function resumeCountdown() {
  if (!countdownRunning || countdownSecs <= 0 || countdownInt) return;
  countdownInt = setInterval(() => {
    countdownSecs = Math.max(0, countdownSecs - 1);
    updateCountdownDisplay();
    if (countdownSecs <= 0) {
      clearInterval(countdownInt);
      countdownInt = null;
      countdownRunning = false;
      enableFinishBtn();
    }
  }, 1000);
}

function resetVideo() {
  videoPlaying = false;
  countdownRunning = false;
  clearInterval(vprogInt);
  clearInterval(countdownInt);
  countdownInt = null;
  const vid = document.getElementById('vreal');
  vid.pause();
  vid.currentTime = 0;
  document.getElementById('vbg').classList.remove('playing');
  document.getElementById('voverlay').style.display = 'flex';
  document.getElementById('vrec').textContent = 'Tutorial';
  document.getElementById('vrec').classList.remove('live');
  document.getElementById('vpfill').style.width = '0%';
  document.getElementById('vplay-icon').innerHTML = '<path d="M5 3l14 9-14 9V3z" fill="rgba(255,255,255,0.8)" stroke="none"/>';
}

function updateVTimeLabel(e, t) {
  const el = document.getElementById('vtime-lbl');
  if (el) el.textContent = fmtTime(e) + ' / ' + fmtTime(t);
}

function enableFinishBtn() {
  const finBtn = document.getElementById('ch-finish-btn');
  if (finBtn) { finBtn.disabled = false; finBtn.style.opacity = '1'; finBtn.classList.add('pulse'); }
  const hint = document.getElementById('ch-watch-hint');
  if (hint) hint.style.display = 'none';
}

function setupVideoListeners() {
  const vid = document.getElementById('vreal');
  if (!vid) return;
  vid.addEventListener('canplay', () => {
    realVideoReady = true;
    vid.style.display = 'block';
    const vl = document.getElementById('vloading');
    if (vl) vl.style.display = 'none';
    document.getElementById('vbg').style.opacity = '0';
  });
  vid.addEventListener('error', () => {
    realVideoReady = false;
    vid.style.display = 'none';
    const vl = document.getElementById('vloading');
    if (vl) vl.style.display = 'none';
    const ve = document.getElementById('verror');
    if (ve) ve.style.display = 'flex';
    document.getElementById('vbg').style.opacity = '';
  });
  vid.addEventListener('waiting', () => {
    if (videoPlaying) {
      const vl = document.getElementById('vloading');
      if (vl) vl.style.display = 'flex';
      pauseCountdown();
    }
  });
  vid.addEventListener('playing', () => {
    clearInterval(vprogInt);
    const vl = document.getElementById('vloading');
    if (vl) vl.style.display = 'none';
    if (videoPlaying) {
      resumeCountdown();
    } else if (countdownRunning) {
      videoPlaying = true;
      resumeCountdown();
      document.getElementById('vbg').classList.add('playing');
      document.getElementById('voverlay').style.display = 'none';
      document.getElementById('vrec').textContent = 'EN VIVO';
      document.getElementById('vrec').classList.add('live');
      document.getElementById('vplay-icon').innerHTML = '<rect x="6" y="4" width="4" height="16" fill="rgba(255,255,255,0.8)"/><rect x="14" y="4" width="4" height="16" fill="rgba(255,255,255,0.8)"/>';
    }
  });
  vid.addEventListener('pause', () => {
    if (settingVideoState) return;
    if (videoPlaying) {
      videoPlaying = false;
      pauseCountdown();
      document.getElementById('vbg').classList.remove('playing');
      document.getElementById('voverlay').style.display = 'flex';
      document.getElementById('vrec').textContent = 'Tutorial';
      document.getElementById('vrec').classList.remove('live');
      document.getElementById('vplay-icon').innerHTML = '<path d="M5 3l14 9-14 9V3z" fill="rgba(255,255,255,0.8)" stroke="none"/>';
    }
  });
  vid.addEventListener('timeupdate', () => {
    if (!currentChallenge || !vid.duration) return;
    if (countdownInt) return;
    const pct = Math.min(100, (vid.currentTime / currentChallenge.duration) * 100);
    document.getElementById('vpfill').style.width = pct + '%';
    updateVTimeLabel(Math.floor(vid.currentTime), currentChallenge.duration);
  });
}

function startCountdown(dur) {
  clearInterval(countdownInt);
  countdownInt = null;
  countdownSecs = dur;
  countdownRunning = true;
  updateCountdownDisplay();
  resumeCountdown();
}

function updateCountdownDisplay() {
  const el = document.getElementById('countdown-val');
  if (el) el.textContent = fmtTime(countdownSecs);
  if (!currentChallenge) return;
  const dur = currentChallenge.duration;
  const elapsed = dur - countdownSecs;
  updateVTimeLabel(elapsed, dur);
  const fill = document.getElementById('vpfill');
  if (fill) fill.style.width = Math.min(100, (elapsed / dur) * 100) + '%';
}

function restartChallenge() {
  const dur = (currentChallenge && currentChallenge.duration) || 60;
  startCountdown(dur);
  const finBtn = document.getElementById('ch-finish-btn');
  if (finBtn) { finBtn.disabled = true; finBtn.style.opacity = '0.4'; finBtn.classList.remove('pulse'); }
}

function abandonChallenge() {
  clearInterval(countdownInt);
  countdownInt = null;
  countdownRunning = false;
  history.back();
}

function startChallenge() {
  document.getElementById('ch-start-btn').style.display = 'none';
  document.getElementById('ch-dur-txt').style.display = 'none';
  const wrap = document.getElementById('countdown-wrap');
  if (wrap) wrap.style.display = 'block';

  const finBtn = document.getElementById('ch-finish-btn');
  finBtn.style.display = 'flex';
  finBtn.disabled = true;
  finBtn.style.opacity = '0.4';
  finBtn.classList.remove('pulse');

  const actBtns = document.getElementById('ch-action-btns');
  if (actBtns) actBtns.style.display = 'flex';

  const dur = (currentChallenge && currentChallenge.duration) || 60;
  startCountdown(dur);
  if (currentChallenge && currentChallenge.id) markChallengeInProgress(currentChallenge.id);

  const hasVideo = !!(currentChallenge && currentChallenge.video);
  if (hasVideo) {
    const hint = document.getElementById('ch-watch-hint');
    if (hint) hint.style.display = 'block';
    if (!videoPlaying) toggleVideo();
  }
}

function finishChallenge() {
  if (!currentChallenge) return;
  clearInterval(countdownInt);
  countdownInt = null;
  countdownRunning = false;
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (id) markChallengeCompleted(id);
  if (currentChallenge.id) removeChallengeInProgress(currentChallenge.id);
  const stats = updateStatsAfterChallenge(currentChallenge.duration);
  resetVideo();
  showMissionComplete(currentChallenge, stats);
}

function showMissionComplete(c, stats) {
  const container = document.getElementById('challenge-container');
  const mision = document.getElementById('screen-mision');
  if (container) container.style.display = 'none';
  if (mision) { mision.style.display = 'flex'; document.body.style.overflow = 'auto'; }
  const mcName = document.getElementById('mc-name');
  if (mcName) mcName.textContent = c.name;
  const mcTime = document.getElementById('mc-time');
  if (mcTime) mcTime.textContent = fmtTime(c.duration);
  const mcStreak = document.getElementById('mc-streak');
  if (mcStreak) mcStreak.textContent = stats.streak;
  const mcTotal = document.getElementById('mc-total');
  if (mcTotal) mcTotal.textContent = stats.totalChallenges;
}

async function shareAchievement() {
  const name = currentChallenge ? currentChallenge.name : 'un reto';
  const stats = getStats();
  const streak = stats.streak;
  const text = `¡Completé "${name}" en RETOFIT! 🔥 ${streak} día${streak !== 1 ? 's' : ''} de racha ⚡`;
  if (navigator.share) {
    try { await navigator.share({ title: 'RETOFIT', text }); } catch (e) {}
  } else {
    try { await navigator.clipboard.writeText(text); showToast('¡Copiado al portapapeles!'); }
    catch (e) { showToast('¡' + name + ' completado!'); }
  }
}

// ═══════ STATS PAGE INIT ═══════
function initStatsPage() {
  initNav();
  const s = getStats();
  const el = id => document.getElementById(id);
  if (el('lg-total')) el('lg-total').textContent = s.totalChallenges;
  if (el('lg-streak')) el('lg-streak').textContent = s.streak;
  if (el('lg-mins')) el('lg-mins').textContent = s.totalMins + 'm';

  const mon = getThisMonday();
  const ws = (s.weekStats && s.weekStats.weekMon === mon) ? s.weekStats : { weekMon: mon, days: [0, 0, 0, 0, 0, 0, 0] };
  const wkTotal = ws.days.reduce((a, b) => a + b, 0);
  if (el('lg-week')) el('lg-week').textContent = wkTotal;

  const container = el('week-bars');
  if (!container) return;
  const labels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const d = new Date(); let todayIdx = d.getDay() - 1; if (todayIdx < 0) todayIdx = 6;
  container.innerHTML = labels.map((lbl, i) => {
    const val = ws.days[i] || 0;
    const pct = val / 4 * 100;
    const isToday = i === todayIdx;
    const isFuture = i > todayIdx;
    return `<div class="wbar-wrap">
      <p class="wbar-n" style="color:${val > 0 ? 'var(--lime)' : 'transparent'}">${val > 0 ? val : '.'}</p>
      <div class="wbar-bg" style="opacity:${isFuture ? '0.3' : '1'}">
        <div class="wbar-fill${isToday ? ' is-today' : ''}" style="height:${pct}%"></div>
      </div>
      <p class="wbar-lbl" style="color:${isToday ? 'var(--lime)' : 'var(--muted)'}">${lbl}</p>
    </div>`;
  }).join('');
}

// ═══════ PROFILE PAGE INIT ═══════
let editField = null;
const EDIT_CONF = {
  name: { label: 'Nombre', type: 'text', key: 'name' },
  age: { label: 'Edad', type: 'number', key: 'age', min: 10, max: 99, unit: 'años' },
  weight: { label: 'Peso', type: 'number', key: 'weight', min: 30, max: 250, unit: 'kg' },
  height: { label: 'Altura', type: 'number', key: 'height', min: 100, max: 230, unit: 'cm' },
};

function initPerfilPage() {
  initNav();
  renderPerfil();
}

function renderPerfil() {
  const p = getProfile();
  const s = getStats();
  const av = p.name.charAt(0).toUpperCase();
  document.querySelectorAll('.pf-ava').forEach(el => { el.textContent = av; });
  const pfName = document.getElementById('pf-name');
  if (pfName) pfName.textContent = p.name;
  const pfValName = document.getElementById('pf-val-name');
  if (pfValName) pfValName.textContent = p.name;
  const pfValAge = document.getElementById('pf-val-age');
  if (pfValAge) pfValAge.textContent = p.age + ' años';
  const pfValWeight = document.getElementById('pf-val-weight');
  if (pfValWeight) pfValWeight.textContent = p.weight + ' kg';
  const pfValHeight = document.getElementById('pf-val-height');
  if (pfValHeight) pfValHeight.textContent = p.height + ' cm';
  const pfStreak = document.getElementById('pf-streak');
  if (pfStreak) pfStreak.textContent = s.streak + ' días';
  const pfTotal = document.getElementById('pf-total');
  if (pfTotal) pfTotal.textContent = s.totalChallenges + ' retos';
}

function openEdit(field) {
  editField = field;
  const conf = EDIT_CONF[field];
  const p = getProfile();
  document.getElementById('modal-label').textContent = conf.label;
  let html = '';
  if (conf.type === 'number') {
    const val = p[conf.key] || conf.min;
    html = `<div style="display:flex;align-items:center;background:var(--s1);border:1px solid var(--border);border-radius:14px;overflow:hidden">
      <button style="width:52px;height:52px;background:transparent;border:none;color:var(--lime);font-size:24px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center" onclick="editNum(-1,${conf.min},${conf.max})">−</button>
      <div style="flex:1;text-align:center">
        <span id="edit-num-val" style="font-family:'Barlow Condensed';font-size:30px;font-weight:900;color:var(--text)">${val}</span>
        <span style="font-size:14px;color:var(--muted2);margin-left:6px">${conf.unit}</span>
      </div>
      <button style="width:52px;height:52px;background:transparent;border:none;color:var(--lime);font-size:24px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center" onclick="editNum(1,${conf.min},${conf.max})">+</button>
    </div>`;
  } else {
    const val = p[conf.key] || '';
    html = `<input class="field" id="edit-txt-val" type="${conf.type}" value="${val}" placeholder="${conf.label}" style="padding-left:16px">`;
  }
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').classList.add('on');
}

function editNum(delta, min, max) {
  const el = document.getElementById('edit-num-val');
  let v = parseInt(el.textContent) + delta;
  v = Math.max(min, Math.min(max, v));
  el.textContent = v;
}

function saveEdit() {
  const conf = EDIT_CONF[editField];
  let val;
  if (conf.type === 'number') { val = parseInt(document.getElementById('edit-num-val').textContent); }
  else { val = document.getElementById('edit-txt-val').value.trim(); if (!val) return; }
  const p = getProfile();
  p[conf.key] = val;
  saveProfile(p);
  renderPerfil();
  closeEdit();
}

function closeEdit() { document.getElementById('modal').classList.remove('on'); editField = null; }

function resetAllData() {
  if (!confirm('¿Estás seguro? Se borrarán todos tus datos y progreso.')) return;
  localStorage.removeItem(STATS_KEY);
  localStorage.removeItem(DAILY_KEY);
  localStorage.removeItem(PROFILE_KEY);
  location.reload();
}

// ═══════ ANI VALIDATION ═══════
const ANI_KEY = 'rf_ani';
const ANI_VALIDATE_BASE = 'https://restito.playtown.com.ar:3000/club/checkClubSubscription/playar';
const ANI_CLUB_ID = '35';
const ANI_BEARER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.pwI0ElRICzc-j85krDiV5nUkz_lZLwmiuJ3m790JNBQ';

const ANI_COUNTRIES = [
  { prefix: '54', name: 'Argentina', flag: '🇦🇷', placeholder: 'Ej: 11 1234 5678' },
  { prefix: '595', name: 'Paraguay', flag: '🇵🇾', placeholder: 'Ej: 961 123456' },
];

function getSavedAni() {
  const raw = localStorage.getItem(ANI_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed.ani || null;
  } catch {
    return raw; // legacy: plain string
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
  } catch {
    return false; // legacy plain string = needs re-validation
  }
}

async function validateAniWithApi(fullAni) {
  const res = await fetch(`${ANI_VALIDATE_BASE}/${encodeURIComponent(fullAni)}/${ANI_CLUB_ID}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${ANI_BEARER}` },
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  return typeof data.result === 'object' && !!data.result?.ANI;
}

function checkAniInUrl() {
  const params = new URLSearchParams(location.search);
  const ani = params.get('ani');
  if (ani && ani.trim()) {
    saveAni(ani.trim()); // carrier-injected ANI is already validated by the network
    const url = new URL(location.href);
    url.searchParams.delete('ani');
    history.replaceState(null, '', url.toString());
    return true;
  }
  return false;
}

function updateAniPlaceholder() {
  const sel = document.getElementById('ani-country');
  const input = document.getElementById('ani-phone-input');
  if (!sel || !input) return;
  const country = ANI_COUNTRIES.find(c => c.prefix === sel.value);
  if (country) input.placeholder = country.placeholder;
}

function showAniModal() {
  if (document.getElementById('ani-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'ani-modal';
  modal.className = 'ani-modal-wrap';
  modal.innerHTML = `
    <div class="ani-modal">
      <img src="logo.png" alt="RETOFIT" style="height:26px;width:auto;display:block;margin:0 auto 20px">
      <p class="label tc" style="margin-bottom:6px">Acceso RETOFIT</p>
      <h2 style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:24px;text-transform:uppercase;letter-spacing:-.5px;text-align:center;color:var(--text);margin-bottom:10px">Verificá tu suscripción</h2>
      <p style="font-size:13px;color:var(--muted2);line-height:1.55;text-align:center;margin-bottom:22px">Para acceder a RETOFIT necesitás tener una suscripción activa. Ingresá tu número para verificar.</p>
      <div style="margin-bottom:12px">
        <p class="label" style="margin-bottom:8px">País</p>
        <select class="field" id="ani-country" onchange="updateAniPlaceholder()" style="cursor:pointer">
          ${ANI_COUNTRIES.map(c => `<option value="${c.prefix}">${c.flag} ${c.name} (+${c.prefix})</option>`).join('')}
        </select>
      </div>
      <div style="margin-bottom:6px">
        <p class="label" style="margin-bottom:8px">Número de celular</p>
        <div class="field-wrap">
          <svg class="field-icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.35 2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.06 6.06l.79-.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16.92Z"/></svg>
          <input class="field" type="tel" id="ani-phone-input" placeholder="Ej: 11 1234 5678" inputmode="numeric" maxlength="15">
        </div>
      </div>
      <p class="err" id="ani-error" style="min-height:18px;margin-bottom:10px"></p>
      <button class="btn btn-p" id="ani-validate-btn" onclick="handleAniValidate()">VERIFICAR</button>
    </div>`;
  document.body.appendChild(modal);
  setTimeout(() => document.getElementById('ani-phone-input')?.focus(), 150);
}

async function handleAniValidate() {
  const btn = document.getElementById('ani-validate-btn');
  const errEl = document.getElementById('ani-error');
  const phoneInput = document.getElementById('ani-phone-input');
  const prefix = document.getElementById('ani-country')?.value || '54';
  if (!phoneInput || !errEl) return;

  errEl.textContent = '';
  const digits = phoneInput.value.trim().replace(/\D/g, '').replace(/^0+/, '');
  if (digits.length < 7) {
    errEl.textContent = 'Ingresá un número válido (sin el 0 inicial).';
    return;
  }

  const fullAni = prefix + digits;
  btn.disabled = true;
  btn.textContent = 'VERIFICANDO...';

  try {
    const ok = await validateAniWithApi(fullAni);
    if (ok) {
      saveAni(fullAni);
      document.getElementById('ani-modal')?.remove();
      const page = location.pathname.split('/').pop() || 'index.html';
      if (page !== 'start.html' && !localStorage.getItem(PROFILE_KEY)) {
        location.href = 'start.html';
      }
    } else {
      errEl.textContent = 'ANI no suscripto. Contactá a tu operadora para activar el servicio.';
    }
  } catch (e) {
    errEl.textContent = 'Error al verificar. Revisá tu conexión e intentá de nuevo.';
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'VERIFICAR'; }
  }
}

// ═══════ START PAGE INIT ═══════
const START_LIMITS = { age: [10, 99], height: [100, 230], weight: [30, 250] };

function stepStart(field, delta) {
  const el = document.getElementById('start-' + field + '-val');
  if (!el) return;
  const [min, max] = START_LIMITS[field];
  let v = parseInt(el.textContent) + delta;
  el.textContent = Math.max(min, Math.min(max, v));
}

function submitStartForm(e) {
  e.preventDefault();
  const name = (document.getElementById('start-name')?.value || '').trim() || 'Atleta';
  const age = parseInt(document.getElementById('start-age-val')?.textContent) || 25;
  const height = parseInt(document.getElementById('start-height-val')?.textContent) || 170;
  const weight = parseInt(document.getElementById('start-weight-val')?.textContent) || 70;
  saveProfile({ name, age, height, weight });
  location.href = 'index.html';
}

function initStartPage() {
  if (localStorage.getItem(PROFILE_KEY)) {
    location.href = 'index.html';
  }
}

// ═══════ INIT ROUTER ═══════
document.addEventListener('DOMContentLoaded', () => {
  // 1. Save ANI from URL if carrier-redirected
  checkAniInUrl();

  const page = location.pathname.split('/').pop() || 'index.html';
  const isStartPage = page === 'start.html';

  // 2. Profile guard: redirect to onboarding if no profile
  if (!isStartPage && !localStorage.getItem(PROFILE_KEY)) {
    location.href = 'start.html';
    return;
  }

  // 3. ANI guard: block navigation until subscription is verified this month
  if (!isAniValidThisMonth()) {
    showAniModal();
  }

  // 4. Init page
  if (document.getElementById('home-challenges')) { initHome(); return; }
  if (document.getElementById('challenge-container')) { initChallengePage(); return; }
  if (document.getElementById('article-content')) { initArticlePage(); return; }
  if (document.getElementById('stats-container')) { initStatsPage(); return; }
  if (document.getElementById('perfil-container')) { initPerfilPage(); return; }
  if (document.getElementById('start-container')) { initStartPage(); return; }
});
