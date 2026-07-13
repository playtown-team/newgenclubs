# RETOFIT — Contexto del proyecto

## Qué es
PWA de fitness para un club. Los usuarios hacen retos diarios de ejercicio, leen contenido de nutrición/mentalidad/bienestar y acumulan streak. Sin registro ni login — experiencia directa.

## Stack
- **Multi-página estática**: sin build tools, sin framework.
- **CSS compartido**: `styles.css`.
- **JS compartido**: `app.js` (toda la lógica, API, estado, init de páginas).
- **Datos**: REST API de WordPress. `data.js` es obsoleto y no se usa.
- **Estado local**: `localStorage` (streak, stats, perfil — sin auth).
- **PWA**: `uploads/sw.js` + `uploads/manifest.json`.

## Archivos del proyecto

| Archivo | Rol |
|---|---|
| `index.html` | Home: retos del día + contenido reciente |
| `challenge.html` | Detalle de reto (`?id=XXX`) — video, timer, misión cumplida |
| `article.html` | Detalle de artículo (`?id=XXX`) — imagen, cuerpo, siguiente |
| `stats.html` | Estadísticas (streak, retos, gráfico semanal) |
| `perfil.html` | Perfil editable + acciones |
| `app.js` | TODO el JS (API, estado, lógica de cada página) |
| `styles.css` | TODO el CSS (design system, nav, componentes) |
| `data.js` | OBSOLETO — no referenciar |

## API de WordPress

Base: `https://contenidos.vip/retofit/wp-json/api/v3/articles`

| Endpoint | Uso |
|---|---|
| `/category/Challenges` | Lista de todos los retos |
| `/category/content` | Lista de todo el contenido |
| `/category/Nutricion` | Artículos de nutrición |
| `/category/Mentalidad` | Artículos de mentalidad |
| `/category/Bienestar` | Artículos de bienestar |
| `/id/{id}` | Detalle completo de un artículo |

Todos los endpoints de lista están paginados (`?page=N`) y devuelven `next` con la URL de la página siguiente.

## Estructura de datos de la API

### Lista (todos los endpoints `/category/...`)
```json
{ "id": 133, "title": "...", "thumbnail": "URL", "short_description": "...", "date": "...", "template": "video|standard" }
```

### Detalle (`/id/{id}`)
Campos clave:
- `thumbnail` — imagen principal
- `title`, `date`, `categories[]`
- `mobile_content` — **JSON string** con los datos ricos del ítem
- `next` — ID del siguiente artículo (string vacío si no hay)
- `previous` — ID del anterior

### `mobile_content` para Challenges
```json
{ "name": "...", "duration": 60, "difficulty": "facil|medio|dificil", "desc": "...", "steps": [], "video": "URL", "emoji": "⚡", "grad": "CSS gradient", "anim": "plank|squat|breath|stretch|circuit" }
```

### `mobile_content` para Contenido
```json
{ "title": "...", "category": "bienestar|mentalidad|nutricion", "duration": "3 MIN", "desc": "...", "body": ["párrafo 1", "párrafo 2"] }
```

## Retos del día
- Se fetchean todos los retos de `/category/Challenges`.
- Se eligen 4 al azar con un seed basado en la fecha del día (mismo resultado todo el día).
- El progreso (completados) se guarda en `localStorage` bajo `rf_daily`, con la fecha para reset automático al día siguiente.

## localStorage keys
- `rf_stats` — `{ streak, totalChallenges, totalMins, lastActiveDate, weekStats }`
- `rf_daily` — `{ date, challengeIds[], completed[] }`
- `rf_profile` — `{ name, age, weight, height }`

## Navegación entre páginas
- Nav bottom (mobile) / sidebar (desktop) en todas las páginas: `index.html`, `stats.html`, `perfil.html`.
- Reto clickeado → `challenge.html?id=XXX`
- Artículo clickeado → `article.html?id=XXX`
- Volver → `history.back()`
- El nav activo se resuelve en `initNav()` (app.js) según `location.pathname`.

## Categorías en el home
- **Todos**: retos del día + featured content + grilla de contenido reciente.
- **Entrenamiento**: solo retos del día.
- **Nutrición / Mentalidad / Bienestar**: fetcha el endpoint correspondiente, muestra todos los artículos más nuevo → más viejo, con botón "Cargar más" (paginación).

## Convenciones
- No usar frameworks, no agregar build steps.
- CSS custom properties en `:root` para colores (`--lime`, `--cyan`, `--bg`, etc.).
- Animaciones de ejercicios en `ANIMS` (app.js, SVG inline) — no tocar sin necesidad.
- El `app.js` detecta en qué página está por la presencia de IDs únicos en el DOM (`home-challenges`, `challenge-container`, `article-content`, `stats-container`, `perfil-container`).
- Skeletons mientras se fetchea. Sin fallback a datos estáticos.
