# MINDMUSIC — Contexto del proyecto

## Qué es
PWA de música asociada a estados de ánimo, para un club de Playtown (hermana de RETOFIT, mismo patrón de arquitectura). El usuario elige un estado de ánimo puntual tocando una tarjeta (sin texto libre ni IA), navega por categorías de contenido y reproduce audio en un player dedicado. Sin registro ni login — experiencia directa.

## Stack
- **Multi-página estática**: sin build tools, sin framework.
- **CSS compartido**: `styles.css`.
- **JS compartido**: `app.js` (íconos, utils, estado, capa de datos, init de páginas).
- **Datos**: **REST de WordPress** (`contenidos.vip/mindmusic`), mismo patrón que Retofit y Mis Gastos en Orden — aunque este sitio expone el plugin `content/v2` en vez del `api/v3` de los otros dos (ver "API de contenido"). Sin mock ni fallback estático: si la API no responde, la pantalla muestra el error. `app-data.js` (antes `mock-data.js`) ya no tiene contenido: sólo el catálogo de `contentTypes`, que está atado al código de la UI.
- **Audio**: real y propio, servido desde **S3** — `https://ptown-wap-ar.s3.sa-east-1.amazonaws.com/mindmusic/music/<mood-id>/<archivo>`. Hay dos tandas: las 21 primeras son `<titulo-kebab>.m4a` (`Golden Hour` → `golden-hour.m4a`; si se renombra un tema, se renombra el archivo) y las 17 de la segunda ("melodias 2") conservan el nombre original del archivo, `.mp3` (`Room at Sundown` → `Room_at_Sundown.mp3` — S3 distingue mayúsculas, el `audioUrl` tiene que calcarlo). Las 38 melodías **ya no están en el repo**; el `audioUrl` de cada canción es esa URL absoluta y viaja en el JSON de su playlist en WordPress.
- **Ondas del player**: el audio ahora es cross-origin y **el bucket S3 no manda headers CORS**, así que las ondas corren en modo "oleaje" (movimiento sintético atado a play/pausa). Conectar un `MediaElementSource` a un audio cross-origin sin CORS devuelve **silencio**, y por eso `audioIsAnalysable()` no lo intenta a ciegas. Para recuperar el modo **real** (`AnalyserNode` siguiendo el espectro) alcanza con habilitar CORS en el bucket y poner `MM_AUDIO_CORS = true` en `app.js` — nada más cambia.
- **Estado local**: `localStorage` (perfil — sin auth, sin streak/stats).

## Archivos del proyecto

| Archivo | Rol |
|---|---|
| `index.html` | Home: 4 estados destacados + tabs de contenido + grid recomendado |
| `explorar.html` | Catálogo completo de los 7 estados de ánimo (banners con foto) |
| `mood.html` | Contenido asociado a un estado (`?id=XXX`): arriba la playlist del estado, abajo sus temas sueltos |
| `playlist.html` | Tracklist de una playlist (`?id=XXX`) — canciones apiladas una debajo de otra, sin selector tipo grilla |
| `player.html` | Reproductor de audio (`?id=XXX` para un ítem suelto, o `?playlist=XXX&t=N` para una canción dentro de una playlist) — controles reales sobre `<audio>`; entrando desde una playlist muestra abajo la cola (tema actual + los que siguen) |
| `perfil.html` | Perfil (nombre editable) + configuración (versión, club, borrar datos locales) en una sola pantalla |
| `app.js` | TODO el JS (íconos, utils, API de WordPress, nav, init de cada página) |
| `app-data.js` | Catálogo local de `contentTypes` (atado a la UI). **Nada de contenido** — eso vive en WordPress. Antes era `mock-data.js` |
| `wp-import/mindmusic-content.xml` | Archivo WXR con TODO el contenido, para cargar en WP Admin → Herramientas → Importar |
| `wp-import/LEEME.md` | Cómo importarlo y el formato JSON de cada tipo de contenido |
| `tools/generate-wp-import.js` | Generador de ese XML (migración one-shot, ver su cabecera) |
| `tools/add-tracks.js` | Suma una tanda de melodías nuevas al XML en el lugar (al final de cada `tracks`, idempotente). Hoy trae la tanda "melodias 2" |
| `tools/serve-local.js` | Server de desarrollo que sirve la app **y** imita `content/v2` leyendo el WXR (incluidas sus mañas: HTML, comillas tipografiadas, extracto recortado) — para probar sin WordPress (`node tools/serve-local.js`) |
| `tools/s3-cors.json` + `tools/LEEME-s3-cors.md` | Política CORS para el bucket y el paso a paso para volver a las ondas reales del player |
| `styles.css` | TODO el CSS (design system, nav, componentes) |
| `favicon.svg` | Favicon / apple-touch-icon: la onda del logo de marca sobre teja oscura, linkeado desde las 6 páginas |

## API de contenido (WordPress)

Base: `https://contenidos.vip/mindmusic/wp-json/content/v2`

> ⚠️ **La fuente principal hoy es la REST del core (`wp/v2`), no `content/v2`.** En el sitio real el `articles?category=` del plugin devuelve 404 para **todo** (también con categorías que tienen posts, y también en el sitio de Retofit); sólo le anda `article?id=`. `apiFetchCategory()` va primero por `wp/v2` — `categories?slug=…` para pasar de slug a id (una request, compartida) y `posts?categories=<id>&per_page=100&_embed=wp:featuredmedia`, que trae el cuerpo de todos los posts de la categoría en **un solo viaje** — y sólo si eso falla cae a `content/v2` (`pluginFetchCategory()`), que es además lo que imita `tools/serve-local.js`. `wpFetchCategory()` arma el mismo ítem (`id`, `slug`, `title`, `thumbnail`) que devolvía el plugin, así que los mapeos no saben de dónde vino. Todo lo que sigue sobre `content/v2` describe el respaldo.

**Ojo: este sitio expone `content/v2`, no el `api/v3` de Retofit / Mis Gastos en
Orden** (el plugin `appapi`, que sirve `mobile_content` ya listo, no está activo
acá). Es otro plugin y trabaja distinto:

| Endpoint | Qué devuelve |
|---|---|
| `articles?category={slug}&limit=100` | Lista: `id`, `title`, `slug`, `thumbnail`, `short_description` |
| `article?id={id}` | Detalle: además el `content`, el cuerpo completo del post |
| `categories` | Los slugs de categoría disponibles |

- `limit` y `page` **no se pueden combinar** (juntos dan 404), pero con
  `limit=100` entra todo de una: no hace falta paginar.
- Cada post guarda su JSON en el cuerpo, y WordPress lo devuelve **tipografiado
  y envuelto en HTML**: las comillas rectas salen como `&#8220;`/`&#8221;` y el
  texto viene en `<p>`/`<br />`. `parsePostJson()` deshace las dos cosas
  (`DOMParser` → `textContent` decodifica entidades y saca etiquetas de una
  pasada) y después prueba enderezar comillas y sacar una coma colgando.
- `short_description` es el **extracto** del post, y el extracto automático de
  WordPress se corta a 55 palabras dejando un `[…]` — por eso **no** es fuente
  confiable del JSON. Se usa como atajo: `apiFetchCategory()` intenta parsearlo
  y, si no da, pide `article?id=`. Hoy los extractos son texto humano, así que
  siempre se pide el detalle: **2 viajes de red por categoría** (la lista, y
  después todos los detalles en paralelo), no uno por ítem en fila.

| Categoría en WP | Qué alimenta | Forma del JSON |
|---|---|---|
| `estados-de-animo` | Los 7 estados (home, explorar, mood, ambientación) | `{ id, name, subtitle, cta, icon, ink, grad, photo, order }` |
| `playlists` | Las 7 playlists con su tracklist completo adentro | `{ id, moodId, contentType, title, desc, photo, order, tracks[] }` |
| `audios` | Audios sueltos (cápsulas / mensajes / música guiada) — **hoy vacía** | `{ id, moodId, contentType, title, desc, duration, photo, audioUrl, order }` |

- **Las fotos viajan como URL dentro del JSON** (`photo`), no como adjuntos de la
  biblioteca de medios. Es la única forma de que **cada canción tenga la suya**:
  las canciones no son posts, viven dentro del JSON de su playlist. De paso, el
  import no depende de descargar 52 adjuntos (que es donde se cortó el de Mis
  Gastos en Orden). Para **estados y playlists** sí se puede poner imagen
  destacada en WP y ésa gana sobre la del JSON — `wpThumbnail()` descarta el
  placeholder que el plugin manda cuando no hay destacada, sin eso el respaldo no
  se usaría nunca.
- **El orden lo fija el campo `order`**, no la fecha del post (`byOrder`).
- `mapContentItems()` descarta los posts cuyo JSON no se pudo leer y los `id`
  repetidos — un import corrido dos veces dejaría dos veces el mismo estado en el
  catálogo.
- El plugin contesta **siempre HTTP 200**: cuando no encuentra nada manda
  `{"results": false, "statusCode": 404}` en el cuerpo. `apiGet()` lo traduce a
  lista vacía, que es lo correcto para `audios` (hoy sin contenido) — pero un
  slug mal escrito devuelve **exactamente lo mismo**. Por eso `fetchMoodList()`
  tira error si vuelven cero estados: sin estados no hay app, y es preferible que
  la pantalla lo diga a que quede en blanco.
- `CONTENT_CACHE` guarda una copia por categoría por carga de página.
  `MOODS_BY_ID` es el índice que usa `moodById()`, que es **sincrónico** porque se
  llama en pleno render: **toda página que pinte un estado tiene que esperar
  `fetchMoodList()` antes de dibujar** (por eso `initMoodPage`/`initPlaylistPage`/
  `initPlayerPage` lo meten en su `Promise.all` inicial).
- Si el fetch falla, `showContentError()` deja el mensaje en la pantalla en vez
  de un esqueleto eterno. No hay fallback a datos estáticos.
- El formato de cada tipo de contenido y cómo importarlo: `wp-import/LEEME.md`.

## Modelo de datos

- **Estados de ánimo** (7, categoría `estados-de-animo`): `{ id, name, subtitle, cta, icon, ink, grad, photo, order }` — Calma, Energía, Foco, Flujo, Alegría, Relax, Superación. `icon` es una clave de `MOOD_ICONS` (app.js); `ink`/`grad` son la identidad visual del estado, autoradas junto con el contenido (mismo criterio que el `grad`/`emoji` de los retos de Retofit).
- **`contentTypes`** (`app-data.js`, local — no está en WordPress porque está atado al código de la UI): hoy sólo **Playlists Emocionales**. Cápsulas de Sonido, Audio Mensajes y Música Guiada siguen previstas en el modelo pero no tienen audio grabado todavía, así que no están en el catálogo. Con una sola categoría, `renderContentTabs()` oculta la barra de tabs de la home (vuelve sola cuando haya dos o más).
- **Audios sueltos** (categoría `audios`): cápsulas, audio mensajes, música guiada — **hoy la categoría está vacía**, a la espera de contenido real; la capa `fetch*` y el modo `player.html?id=XXX` siguen soportando el caso. Cada uno con `moodId` + `contentType` + `duration` + `desc` + `photo` + `audioUrl`. Tocar uno lleva directo a `player.html?id=XXX`.
- **Playlists** (7, categoría `playlists`): una por estado de ánimo, con las melodías reales adentro del mismo JSON (`{ id, moodId, contentType, title, desc, photo, order, tracks: [{ title, duration, audioUrl, photo }] }`). Las canciones **no son posts**: su `id` lo deriva la app de su posición (`<playlistId>-<N>`), igual que el `t=N` de la URL del player — **reordenar el array cambia a qué canción apunta un link ya compartido**. La playlist de Flujo se llama **Concentración** (antes "Estado de Flow"); el estado sigue llamándose Flujo. `photo` es la **imagen propia de la playlist**: del mismo clima que la del estado (`mood.photo`) pero nunca la misma foto, para que el estado y su playlist no se vean como lo mismo. Sólo cuatro estados tienen repertorio propio grabado — Foco, Relax, Alegría y Superación; **Flujo reusa las melodías de Foco, Calma las de Relax, y Energía las de Alegría** (mismos archivos, otro orden — la segunda tanda, entregada en carpetas `Relax`/`alegria`/`concentracion`/`superacion`, siguió igual: los 4 de "concentracion" están en `foco/` en S3 y alimentan Foco y Flujo, y cada tema nuevo entró **al final** de su playlist para no mover los `t=N`; hoy son 10 temas en Relax/Calma/Alegría/Energía y 9 en Foco/Flujo/Superación); Superación no comparte repertorio con nadie — hasta que existan pistas propias para Calma, Flujo y Energía. En `mood.html` la playlist va sola arriba, como pieza ancha (`.playlist-hero`: funda + título/desc/cantidad al costado) en vez de una tarjeta de grilla, y debajo sus canciones aparecen como **temas sueltos**: `renderMoodSongs` las dibuja en `.track-grid`, una tarjeta al lado de la otra con su propio arte (`coverHTML('track', ...)`), **no** como tracklist apilada — ahí se leerían como "la playlist otra vez" en vez de como temas eligibles de a uno. Dentro de `mood.html` esas tarjetas esconden el badge del estado (la página entera ya es ese estado). No son un ítem más del grid — tocar una playlist lleva a `playlist.html?id=XXX`, que muestra el tracklist completo apilado (una canción atrás de la otra, en el flujo normal de la página, no un carrusel/selector). Tocar una canción del tracklist lleva a `player.html?playlist=XXX&t=N`, donde la cola de reproducción (anterior/siguiente) recorre esa playlist en vez de las del mood. En ese modo el player muestra debajo de la tarjeta la **cola** (`#player-queue`): la misma tracklist rotada para empezar por el tema que suena y seguir con los próximos (dando la vuelta al final, igual que `stepTrack`). Tocar una fila cambia de canción in situ (`jumpToTrack`, sin recargar la página); tocar la fila que ya suena hace play/pausa. Con `?id=XXX` (ítem suelto) la cola no se muestra.

La capa de API en `app.js` (`fetchMoodList`, `fetchAllTracks`, `fetchTracksByMood`, `fetchTracksByType`, `fetchTrackById`, `fetchAllPlaylists`, `fetchPlaylistsByMood`, `fetchPlaylistById`) es la única que sabe de WordPress: las páginas que la llaman no cambiaron al migrar. Las variantes por mood/tipo/id filtran sobre la lista ya cacheada, sin volver a la red.

## Sistema visual
Identidad basada en el objeto físico del disco/funda de vinilo (encaja con "tu pausa emocional"): cada estado de ánimo tiene una tinta sólida (`mood.ink`) que tiñe su portada; tanto los temas sueltos (`.cover--art`) como las playlists (`.cover--stack`: dos lomos asomando arriba de la funda de adelante) van **sin disco adelante** — ahí manda la imagen. El disco de vinilo ya no se dibuja en ninguna portada (tapaba la foto de cada tema): el objeto sigue siendo la funda. El reproductor (`player.html`) no dibuja el disco: arriba de la tarjeta hay una banda de **ondas** a sangre (canvas, `waveViz` en `app.js`) teñidas con la tinta del mood, que se mueven mientras suena y bajan a un latido mínimo en pausa — la idea es calma, no un ecualizador de barras. Tipografía: `Fraunces` (display), `Work Sans` (cuerpo), `IBM Plex Mono` (duraciones, contadores, datos tipo "etiqueta de disco").

**Portadas.** Toda portada lleva imagen, y sale de los datos del propio proyecto — nunca del campo `thumbnail` (que se mantiene sólo para el futuro swap a WordPress) ni de bancos genéricos tipo picsum:
- **Playlists** (`.cover--stack`): su foto propia (`playlist.photo`, con `mood.photo` como fallback) llenando la funda, teñida con `mood.ink`, sin disco ni nada que la tape (los lomos de la pila asoman arriba, fuera de la imagen). Abajo, la palabra **PLAYLIST** en un chip sólido con la tinta del mood (`.cover-foot` / `.cover-kind`), y en `playlist.html` además como antetítulo grande sobre el nombre (`.playlist-kind`). El player, entrando desde una playlist, ya lo dice en el badge (`PLAYLIST · <título>`).
- **Temas sueltos**: cada canción tiene su propia foto real (`song.photo` en el JSON de su playlist en WordPress, elegida a mano por tema — distinta de las demás canciones de su playlist y de la foto del mood/playlist, pero del mismo clima temático: p. ej. dentro de Foco cada tema tiene su propia escena de calma/trabajo, dentro de Superación cada uno su propia escena de montaña/ascenso). Si a algún tema le faltara `photo` (caso hoy inexistente, pero soportado), `songArtVars`/`moodSongList` caen en la foto de la playlist y, para un track suelto, en la del mood. `songArtVars(mood, title, photo)` (app.js) hashea `moodId + título` para el recorte y el ángulo del velo de color sobre esa foto. **La foto manda**: encima va sólo un velo suave con la tinta del estado y, en una esquina, el ícono del mood (`.songart-glyph` / `.cover-glyph`) como firma — nada de iniciales ni texto tapando la imagen (se probaron y las portadas se leían como una etiqueta, no como la canción). Ese arte se dibuja como cuadrado (`.songart`, `songArtHTML`) en las filas de tracklist, en la cola del player y en grande apoyado sobre la banda de ondas (`.player-art`, `.songart--lg`), y como fondo de la funda en las tarjetas de grilla (`.cover--art`). Determinístico: la misma canción se ve siempre igual.

## localStorage keys
- `mm_profile` — `{ name }`
- `mm_ani` — `{ ani, validatedAt }`, la suscripción verificada (ver abajo). `resetLocalData()` **no** la borra: no es un dato del usuario sino la prueba de que su línea está activa.

El saludo de la home (`.js-greet-title`, lo escribe `greetingText()` en app.js) es **"¿Cómo te sentís hoy?"** a secas mientras la persona no haya cargado su nombre en ajustes, y **"¿Cómo te sentís hoy, <nombre>?"** cuando sí. `Invitado` es el placeholder del perfil, no un nombre: `customName()` lo descarta.

## Chequeo de suscripción (ANI)

> ⏸️ **Hoy está apagado** (`ANI_CHECK_ENABLED = false` en `app.js`): la app entra directo, sin pantalla de verificación. Es momentáneo — para reactivarlo alcanza con volver la constante a `true` (y cargar el `ANI_CLUB_ID` real). `checkAniInUrl()` sigue corriendo igual, así un `?ani=` de la operadora se guarda y se limpia de la URL. Lo que sigue describe el sistema cuando está prendido.

Mismo sistema que Retofit y Mis Gastos en Orden. **No hay login ni cuenta**: lo único que habilita la app es que el ANI (el número de la línea) esté suscripto al club en el sistema de Playtown. Todo vive en la sección `VALIDACIÓN DE ANI` de `app.js` + el bloque `.ani-gate` de `styles.css`.

- **Camino operadora**: si la red redirige con `?ani=...`, ese número ya viene validado — `checkAniInUrl()` lo guarda y lo saca de la URL con `history.replaceState` (el resto de los query params se conservan).
- **Camino manual**: si no hay ANI válido, `showAniGate()` inyecta una pantalla bloqueante (`position:fixed`, `z-index:200`, sin botón de cerrar, con `body { overflow:hidden }`). La página se inicializa igual detrás del velo, así queda lista apenas la API confirma.
- **Vigencia por mes calendario**, no por 30 días (`isAniValidThisMonth()`): si cambió el mes se vuelve a pedir. Una baja del servicio se refleja como máximo al mes siguiente, que es el ciclo con el que factura la operadora.
- **Endpoint**: `GET {ANI_VALIDATE_BASE}/{ani}/{ANI_CLUB_ID}` con `Authorization: Bearer`. Suscripto = `data.result` es un objeto con `ANI`. Tarda varios segundos, por eso el fetch corta a los 20s.
- ⚠️ **`ANI_CLUB_ID` está en `'TODO'`** — hay que poner el club ID de MindMusic antes de deployar (Retofit usa `35`). Mientras esté en `'TODO'` la API responde "no suscripto" y no entra nadie; `initAniGuard()` avisa por consola.
- Único mercado: Chile. `ANI_PREFIX = '56'` es fijo (no hay selector de país, a diferencia de Retofit que ofrece AR/PY); `normalizeAniInput()` tolera `0` inicial, `+56` escrito a mano, espacios y guiones.

## Navegación entre páginas
- Nav bottom (mobile) / sidebar (desktop) en `index.html`, `explorar.html`, `perfil.html` y `player.html` (el player se escucha largo rato: tiene nav **y** "← Volver").
- `mood.html` y `playlist.html` son pantallas de detalle (sin nav, con "← Volver" → `history.back()`), mismo criterio que `article.html`/`challenge.html` de Retofit.
- Estado tocado → `mood.html?id=XXX`. Ahí hay dos caminos: la playlist (`.playlist-hero` → `playlist.html?id=XXX`) o un tema suelto de la tracklist de abajo (→ `player.html?playlist=XXX&t=N`, con la cola de esa playlist). Un track propio del mood (cuando existan) va a `player.html?id=XXX`.
- El nav activo se resuelve en `initNav()` (app.js) según `location.pathname`.

## Convenciones
- No usar frameworks, no agregar build steps.
- CSS custom properties en `:root` (`--bg`, `--violet`, `--cyan`, `--card`, etc.), dark UI, radios grandes (`--rl: 24px`).
- Íconos de estado en `MOOD_ICONS` (app.js, SVG inline) — no tocar sin necesidad.
- El `app.js` detecta en qué página está por la presencia de IDs únicos en el DOM (`home-container`, `explorar-container`, `mood-container`, `player-container`, `perfil-container`).
- Skeletons/spinner mientras se fetchea WordPress; si falla, `showContentError()`. Sin fallback a datos estáticos embebidos en el HTML.
- El buscador de `explorar.html` filtra en el cliente sobre los estados ya cargados en memoria — no hay backend de búsqueda. (`renderHomeTracks()` acepta un `query` pero hoy la home no tiene input de búsqueda.)
