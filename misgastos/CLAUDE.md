# MIS GASTOS EN ORDEN — Contexto del proyecto

## Qué es
App de bienestar financiero para un club de Playtown (hermana de MindMusic y Retofit, mismo patrón de arquitectura). Combina contenido educativo (tips/alertas/ahorro/educación financiera) con una sección de registro — y, como diferencial, un motor de **vencimientos/suscripciones recurrentes** que avisa antes de que algo venza y se resetea solo cada mes, más un **reto semanal** que rota solo cada lunes. Sin registro ni login — experiencia directa, todo local al dispositivo.

**Alcance actual de Registros:** por ahora la única forma de carga es **Gasto Fijo** (suscripciones/vencimientos recurrentes). Gasto Variable, Ingreso y Ahorro no están implementados — se sacaron del grid de carga; se podrán reintroducir más adelante, pero hoy no existen ni en la UI ni deberían asumirse al tocar `registros.html`/`app.js`.

## Sistema visual — "Wallet Teal" (evolución de "Fases", pivot 2026-08-25)
El diseño ya **no** calca `gastos-en-orden.vercel.app` ni la paleta lavanda-noche de "Fases" — ahora sigue el lenguaje visual de un moodboard tipo wallet/fintech (referencia: UI kit "ELYA" pasado por el usuario) tomado como guía de estilo general, no a calcar pixel a pixel: paleta menta+turquesa, tipografía redondeada y juguetona, cards blancas con anillos de progreso, botones pill, nav inferior flotante en pill oscuro. Se conserva el concepto de fondo de "Fases" (la plata como ciclo natural, no como alarma) y su mecanismo insignia: el anillo de vencimiento y la marca lunar del header (`renderMoonGlyphs()` en `app.js`, `.moon-glyph`/`.moon-shadow` en `styles.css`) siguen funcionando exactamente igual — sólo heredan la paleta nueva vía variables CSS.

- **Color** (tokens en `:root`, mismos nombres de siempre — sólo cambiaron los valores): `--bg` #eaf3f1 (menta muy pálido), `--ink` #16221f (casi negro con tinte verdoso), `--cyan` #0f9b8f (turquesa vibrante — color de marca/CTA, "vence pronto"), `--violet` #6952b3 (streaming/CTA secundaria), `--blue` #2f66ac (servicios), `--green` #177a4a (pagado/alquiler), `--orange` #b3720f (tarjeta), `--red` #b3392b (vencido — sigue sin ser "rojo alarma"). `--card` sigue blanco puro. Todos los pares color/pastel usados como texto (badges, `status-pill`) están chequeados a mano contra WCAG AA. Tokens nuevos `--nav-bg`/`--nav-fg`/`--nav-fg-active`/`--nav-active-bg` para el nav inferior mobile (pill flotante teal oscuro, no barra blanca pegada al borde).
- **Tipografía (ajuste 2026-08-25 — más seria y moderna)**: `Sora` (display/títulos — geométrica, tono fintech; reemplaza a `Fredoka`, que era redondeada y juguetona, y antes a `Newsreader`) + `Inter` (cuerpo — neutra de UI; reemplaza a `Manrope`) + `IBM Plex Mono` (montos/fechas, sin cambios — sigue siendo la voz "cartola"). Token nuevo `--tracking-display: -0.02em`, aplicado en **toda** regla que use `--font-display`: Sora viene ancha de fábrica y sin ese tracking los títulos se ven sueltos y viejos. La cita de "Dosis de Calma" sigue en bold normal, sin itálica (Sora tampoco tiene itálica real).
- **Radios y sombras (ajuste 2026-08-25)**: los contenedores pasaron a esquinas apenas redondeadas — casi cuadradas (`--rl` 30→14px, `--rm` 22→12px, `--rs` 16→10px; `modal-sheet` 26→16px, `app-nav` pill→20px, `nav-item` pill→`--rs`). Los elementos tipo píldora (`cta-btn`, `danger-btn`, botones de `modal-actions`, `status-pill`, `badge-state`, `tip-badge`, `cat-chip`, `toast`) siguen en `border-radius: 999px`, y los íconos/anillos circulares (`50%`) no se tocaron — el contraste entre cajas rectas y controles redondos es intencional.
- **Nav inferior (mobile)**: pill flotante teal oscuro con margen respecto al borde, iconos blancos translúcidos, ítem activo en blanco sólido sobre un chip semitransparente (`.nav-item`/`.nav-item.active` en `styles.css`). El sidebar de desktop (`min-width:900px`) se mantiene claro/blanco como antes — el tratamiento oscuro es sólo del nav mobile.
- **Logo (2026-08-25)**: la app tiene isotipo propio — barras ascendentes + curva de crecimiento + cinta con check + moneda con `$`, todo en el degradé turquesa de marca. Vive en `assets/brand/logo-mark.svg` (vectorial, sin dependencias) y se usa como favicon y en el lockup de header/sidebar (`.brand-mark` = `.brand-icon` + wordmark "Mis Gastos en Orden / by PLAYTOWN"). `assets/brand/app-icon.svg` es la versión con fondo para icono de app, de donde salen `app-icon-512.png` y `apple-touch-icon.png`. **El SVG actual es una reconstrucción vectorial del PNG que pasó el usuario** — si aparece el archivo original (SVG/AI), reemplazar `logo-mark.svg` y regenerar los PNG. Al entrar el isotipo, la luna dejó el header/sidebar y quedó sólo como avatar del saludo en Inicio (`.moon-glyph--lg`); `renderMoonGlyphs()` sigue igual.
- Libertad de diseño total sigue vigente (confirmada 2026-08-22, re-confirmada con este pivot 2026-08-25) — la referencia se usa como guía de estilo, no como calco.

## Stack
- **Multi-página estática**: sin build tools, sin framework — mismo patrón que MindMusic.
- **CSS compartido**: `styles.css`.
- **JS compartido**: `app.js` (íconos, utils, estado, motor de vencimientos, capa de datos de contenido, init de páginas).
- **Contenido educativo**: **REST de WordPress** (`contenidos.vip/misgastoseo`), mismo patrón que Retofit. Sin mock ni fallback estático: si la API no responde, la sección muestra un empty-state. Ver "API de contenido" abajo.
- **Datos del usuario (movimientos, vencimientos, perfil)**: **100% `localStorage`**, sin backend, sin mock. No pasan por WordPress ni por ninguna función `fetch*` — son el estado real de la app. Se pierden si el usuario borra caché o cambia de dispositivo (aceptado por ahora; no hay plan de backend todavía).
- **Carga de registros**: formulario estructurado (nombre, monto, fecha/categoría según el tipo). No hay parsing de lenguaje natural ni IA, ni siquiera como mock.
- **Moneda**: pesos chilenos, formato simple `$12.500` (sin selector de moneda).

## Archivos del proyecto

| Archivo | Rol |
|---|---|
| `index.html` | Home: Resumen del día (avisos de vencimientos, con acción rápida de marcar pagado o ir al detalle) + Reto de la semana + Dosis de Calma + Consejos Conscientes |
| `registros.html` | Página "Vencimientos" en el nav (el archivo conserva su nombre). CTA único "Nuevo Gasto Fijo" + modal de formulario + lista de vencimientos activos (editar/eliminar/marcar pagado). Sin sección de Actividad Reciente (se sacó de la UI). |
| `contenido.html` | Detalle de un tip educativo (`?id=XXX`) — con "← Volver" **y** el nav/sidebar de siempre (marca "Inicio" como activo). Al pie, sección "Tips relacionados" con hasta 3 tips de la misma categoría |
| `retos.html` | Retos semanales: card del reto vigente + "Finalizados" + "No finalizados" |
| `perfil.html` | Nombre editable + "Borrar datos locales" |
| `app.js` | Íconos, utils, estado en localStorage, motor de vencimientos, API de contenido (WordPress), nav, init de cada página |
| `app-data.js` | Catálogo de categorías de Gasto Fijo (íconos/colores). **Nada de contenido editorial** — eso vive en WordPress. Antes era `mock-data.js` |
| `wp-import/misgastoseo-content.xml` | Archivo WXR con TODO el contenido editorial, para cargar en WP Admin → Herramientas → Importar |
| `wp-import/LEEME.md` | Cómo importarlo y el formato JSON de cada tipo de contenido |
| `tools/generate-wp-import.js` | Generador de ese XML (migración one-shot, ver su cabecera) |
| `tools/subir-imagenes-wp.py` | Sube a WordPress las fotos de notas que quedaron sin imagen destacada (el import de adjuntos se corta por timeout) |
| `styles.css` | Design system light/fintech (tokens, nav, cards, modal, badges de estado) |
| `assets/brand/` | Isotipo (`logo-mark.svg`, también favicon), icono de app (`app-icon.svg`, `app-icon-512.png`, `apple-touch-icon.png`) |
| `.claude/launch.json` | Server estático local (`python3 -m http.server 4321`) para previsualizar la app sin build |

## API de contenido (WordPress)

Base: `https://contenidos.vip/misgastoseo/wp-json/api/v3/articles`

Cada nota guarda su JSON **en el cuerpo del post, en texto plano**; la API lo
devuelve en `mobile_content`. Se usa siempre `fulldata/category/{slug}?limit=100`,
que ya trae `mobile_content` en el listado — así alcanza **una llamada por
categoría** y no hay que pedir el detalle de cada nota.

| Categoría en WP | Qué alimenta | Forma del JSON |
|---|---|---|
| `tips-educativos` | Cards de Home y detalle en `contenido.html` | `{ id, category, badge, title, excerpt, image, publishedAt, body[] }` |
| `retos-semanales` | Pool del reto de la semana | `{ id, title, description, order }` |
| `tips-de-la-semana` | Card "Tip de la Semana" (siempre la más nueva) | `{ id, title, excerpt, publishedAt, body[], actions[], source, sourceUrl }` |
| `dosis-de-calma` | Frase del día | `{ id, quote, order }` |

- Las notas van en `tips-educativos` **y** en su categoría temática
  (`tips-financieros` / `alertas` / `ahorro` / `educacion-financiera`): la
  primera es la que la app pide para traerlas todas de una.
- Los chips del filtro de Home **se derivan de las notas cargadas**
  (`contentCategoriesFromTips()`): el nombre sale del `badge` y el orden de
  `CONTENT_CATEGORY_ORDER`. No hay endpoint de categorías.
- La imagen de una nota sale de la **imagen destacada** del post; el `image` del
  JSON queda de respaldo (ruta relativa al repo). Ojo: el plugin **nunca manda
  `thumbnail` vacío** — si el post no tiene destacada (o apunta a un adjunto que
  no existe) devuelve su placeholder `…/appapi/public/images/default_image.png`.
  `wpThumbnail()` lo descarta; sin eso el respaldo no se usaría nunca.
- `parseMobileContent()` tolera JSON con una coma colgando o con comillas
  tipográficas (pasa al pegar desde un procesador de texto);
  `mapContentItems()` descarta los `id` repetidos — un import corrido dos veces
  deja duplicados y en Retos un duplicado correría toda la rotación.
- `CONTENT_CACHE` guarda una copia por categoría por carga de página.
- `fetchRelatedTips(categoryId, excludeId, limit=3)` alimenta "Tips
  relacionados" al pie del detalle, resolviéndose sobre las notas ya cacheadas
  (sin ir de nuevo a la red).
- El formato de cada tipo de contenido y cómo importarlo: `wp-import/LEEME.md`.

## Modelo de datos

### Catálogo local (`app-data.js` → `APP_DATA`)
- `fixedExpenseCategories`: `{ id, name, icon, color }` — streaming, servicios, tarjeta, alquiler, etc. Va atado al código de la UI (íconos/colores), no es contenido editable, y por eso no se migró a WordPress.

### Datos del usuario (`localStorage`, ver `STORAGE_KEYS` en `app.js`)
- `mgo_profile` → `{ name }`.
- `mgo_movements` → `{ id, type: 'fijo', name, amount, date, createdAt }[]` — historial de pagos, se sigue escribiendo al marcar un vencimiento como pagado (`markSubscriptionPaid()`), pero hoy no tiene ninguna pantalla que lo liste (se sacó "Actividad Reciente" de `registros.html`; queda como dato guardado por si se reintroduce una vista de historial más adelante). El `type` queda como campo abierto pensando en el día que se reintroduzcan Gasto Variable/Ingreso/Ahorro, pero hoy sólo se genera con `type: 'fijo'`.
- `mgo_subscriptions` → `{ id, name, amount, categoryId, dueDay, reminderDays, lastPaidPeriod, createdAt }[]` — fuente de verdad de los vencimientos recurrentes.
- `mgo_tips_seen` → mapa `{ [tipId]: 'seen' | 'done' }` con el estado de lectura de cada tip. Sin entrada = "Sin leer" (por defecto); `seen` = abrió el detalle en `contenido.html` (se marca solo al renderizar la nota) → "Visto"; `done` = tocó el botón "Entendido" del detalle → "Entendido ✓". `done` es final: volver a abrir el detalle no lo baja a `seen`. La home sólo muestra ese estado como texto (`.tip-status` en la card, no es clickeable). Lee/escribe vía `getTipsRead()` / `tipStatus()` / `setTipStatus()` en `app.js`, que migran solo el formato viejo (array de ids → todos `done`).

- `mgo_challenges` → `{ startWeek: 'YYYY-MM-DD', done: { [lunes]: challengeId } }`. `startWeek` es el lunes de la primera vez que se abrió la app — sin eso le inventaríamos al usuario retos "no finalizados" de semanas anteriores a conocer la app. `done` guarda el `id` del reto (no sólo la semana) para que el historial no se rompa si el pool se reordena.

## El motor de vencimientos
Sin timers/cron: el estado de cada vencimiento se recalcula como función pura de `(suscripción, hoy)` en cada carga de página (`subscriptionStatus()` en `app.js`).

- `paid`: `lastPaidPeriod` matchea el mes actual → oculto en Home.
- `overdue`: pasó la fecha de vencimiento sin pagar → rojo, badge "Vencido".
- `due_soon`: dentro de la ventana de aviso elegida (3/5/7 días) → aparece en Resumen del día.
- `upcoming`: todavía lejos → no se muestra.

El botón "Pagado" (`markSubscriptionPaid()`) sólo escribe `lastPaidPeriod` y agrega el pago a `mgo_movements`. Al mes siguiente el período ya no matchea y el ciclo vuelve a arrancar solo. El día de vencimiento se clampea al último día del mes cuando corresponde (`clampedDueDate()`).

**Comunicación visual del estado (semilla del sistema "Fases", ver arriba):** cada ícono de vencimiento lleva un anillo de progreso SVG (`renderVencRing()` en `app.js`) en vez de un badge de color plano. En reposo (`upcoming`) el anillo queda vacío — no hay nada que mirar todavía; al entrar en la ventana de aviso (`due_soon`) se llena en cyan a medida que se acerca el día de vencimiento (mismo umbral que define el estado, vía `vencRingProgress()`); `overdue` cierra el anillo en rojo con un pulso lento (`--venc-ring--pulse`); `paid` lo cierra en verde con un check superpuesto (`.venc-check`). Se usa en `registros.html` (lista de vencimientos) y en el "Resumen del día" de `index.html`. No introduce colores nuevos — reutiliza `--border/--cyan/--red/--green`. No tocar esta pieza sin necesidad; es la seña de identidad visual de la app.

## El motor de retos semanales
Misma filosofía que el de vencimientos: **sin timers ni cron**. El reto vigente es función pura de `(pool, hoy)` y se recalcula en cada carga (`challengeForWeek()` en `app.js`).

- El pool sale de WordPress (`loadChallenges()`), ordenado por el campo `order` del JSON — **hay que esperar esa carga antes de dibujar cualquier card de reto o el historial**.
- La semana arranca el **lunes 00:00** (hora local del dispositivo): `weekStart()` normaliza cualquier fecha a su lunes, `weekKey()` la vuelve `'YYYY-MM-DD'` (la clave de todo el historial).
- `weekIndex()` cuenta semanas desde `CHALLENGE_EPOCH` (1-ene-2024, lunes) y el reto sale de `pool[weekIndex % pool.length]`. Es `Math.round()` a propósito: con el cambio de horario de verano la resta no da un múltiplo exacto de 7 días.
- Todos los usuarios ven el mismo reto la misma semana, y recargar la página nunca lo cambia.
- `challengeHistory()` recorre semana a semana desde `startWeek` hasta hoy y parte el resultado en `done` / `missed`. La semana en curso **no** cuenta como "no finalizada" — todavía está corriendo.

**Comunicación visual:** la card del reto (`renderChallengeCard()`, `.challenge-card` en `styles.css`) es la pieza más saturada de la app a propósito — violeta lleno mientras el reto corre, verde al finalizarlo — para que no se confunda con un aviso de vencimiento. **Finalizarlo no la esconde**: se queda visible toda la semana, sólo cambia de color. El check del botón hereda la gramática del anillo de vencimiento (vacío = pendiente, cerrado y verde = listo). Es la misma card en Home y en `retos.html` (un solo renderer); en Home suma el link "Ver todos los retos". Marcar es directo, desmarcar pide `confirm()`.

## localStorage keys
- `mgo_profile`, `mgo_movements`, `mgo_subscriptions`, `mgo_tips_seen`, `mgo_challenges` (ver arriba). `resetLocalData()` en `app.js` recorre `STORAGE_KEYS`, así que borra todas — agregar una clave ahí alcanza.

## Navegación entre páginas
- Nav bottom (mobile) / sidebar (desktop) en `index.html`, `registros.html`, `retos.html`, `perfil.html` — 4 ítems: Inicio, Vencimientos (label del nav; el archivo detrás sigue siendo `registros.html`), Retos, Perfil.
- `contenido.html` conserva el nav (a diferencia de `mood.html`/`player.html` de MindMusic): mantiene el "← Volver" → `history.back()` en el header, pero además muestra el nav bottom / sidebar con "Inicio" activo, para poder saltar a otra sección sin volver atrás primero. `initNav()` mapea `contenido.html` → `nav-home`.
- El nav activo se resuelve en `initNav()` (`app.js`) según `location.pathname`.

## Convenciones
- No usar frameworks, no agregar build steps.
- CSS custom properties en `:root` (`--bg`, `--cyan`, `--violet`, `--card`, etc.), light UI, radios chicos en contenedores (`--rl: 14px`) y pill sólo en botones/badges.
- Tipografía: `Sora` (display/títulos, siempre con `letter-spacing: var(--tracking-display)`), `Inter` (cuerpo), `IBM Plex Mono` (montos, fechas, datos tipo cartola).
- El `app.js` detecta en qué página está por la presencia de IDs únicos en el DOM (`home-container`, `registros-container`, `contenido-container`, `retos-container`, `perfil-container`).
- Skeletons mientras se fetchea el contenido de WordPress; **sin fallback a datos estáticos** (igual que Retofit). Los datos del usuario (localStorage) se leen sync, sin skeleton — por eso el "Resumen del día" se dibuja antes que nada.
- Sin buscadores en esta app (a diferencia de MindMusic) — no hay campo de búsqueda en ninguna pantalla.
