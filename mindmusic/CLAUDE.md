# MINDMUSIC — Contexto del proyecto

## Qué es
PWA de música asociada a estados de ánimo, para un club de Playtown (hermana de RETOFIT, mismo patrón de arquitectura). El usuario elige un estado de ánimo puntual tocando una tarjeta (sin texto libre ni IA), navega por categorías de contenido y reproduce audio en un player dedicado. Sin registro ni login — experiencia directa.

## Stack
- **Multi-página estática**: sin build tools, sin framework.
- **CSS compartido**: `styles.css`.
- **JS compartido**: `app.js` (íconos, utils, estado, capa de datos, init de páginas).
- **Datos**: hoy **mock local** (`mock-data.js`). WordPress todavía no existe para este proyecto — cuando se cree (mismo patrón que Retofit: REST API con `mobile_content` como JSON string), sólo cambia el cuerpo de las funciones `fetch*` en `app.js`; las páginas que las llaman no cambian.
- **Audio**: real y propio. Las 21 melodías finales viven en `audio/<mood-id>/*.m4a` dentro del repo (el nombre del archivo es el título de la canción en kebab-case: `Golden Hour` → `golden-hour.m4a`; si se renombra un tema, se renombra el archivo) y se sirven desde el mismo origen que la app; los `audioUrl` de `mock-data.js` son rutas relativas a esos archivos. Cuando el contenido pase a WordPress, esas mismas melodías se suben al servidor y sólo cambia el prefijo de la URL.
- **Ondas del player**: como las melodías se sirven desde el mismo origen, las ondas corren en modo **real** (`AnalyserNode` siguiendo el espectro). El modo "oleaje" (movimiento sintético atado a play/pausa) queda como fallback para pistas remotas: conectar un `MediaElementSource` a un audio cross-origin sin CORS devuelve **silencio**, así que `audioIsAnalysable()` no lo intenta a ciegas. Si algún día el audio pasa a otro dominio con CORS habilitado, poner `MM_AUDIO_CORS = true` en `app.js` y vuelve el modo real, sin tocar nada más.
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
| `app.js` | TODO el JS (íconos, utils, mock-API, nav, init de cada página) |
| `mock-data.js` | Datos mock con la forma que tendrá la futura respuesta de WordPress |
| `audio/<mood>/` | Melodías finales del proyecto (`.m4a`), servidas desde el mismo origen |
| `styles.css` | TODO el CSS (design system, nav, componentes) |
| `favicon.svg` | Favicon / apple-touch-icon: la onda del logo de marca sobre teja oscura, linkeado desde las 6 páginas |

## Modelo de datos (`mock-data.js` → `MOCK_DB`)

- **`moods`** (7 estados): `{ id, name, subtitle, cta, icon, grad }` — Calma, Energía, Foco, Flujo, Alegría, Relax, Superación.
- **`contentTypes`**: hoy sólo **Playlists Emocionales**. Cápsulas de Sonido, Audio Mensajes y Música Guiada siguen previstas en el modelo pero no tienen audio grabado todavía, así que no están en el catálogo. Con una sola categoría, `renderContentTabs()` oculta la barra de tabs de la home (vuelve sola cuando haya dos o más).
- **`tracks`**: ítems de audio sueltos (cápsulas, audio mensajes, música guiada) — **hoy el array está vacío**, a la espera de contenido real; la capa `fetch*` y el modo `player.html?id=XXX` siguen soportando el caso. Cada uno con `moodId` + `contentType` + `duration` + `desc` + `thumbnail` + `audioUrl`. Forma pensada para mapear 1:1 a un futuro artículo de WP (`title`/`thumbnail`/`short_description` a nivel lista, resto dentro de un `mobile_content`-equivalente a nivel detalle). Tocar un track lleva directo a `player.html?id=XXX`.
- **`playlists`**: una por estado de ánimo (7), con las melodías reales (`{ id, moodId, title, desc, photo, tracks: [{ title, duration, audioUrl }] }`). La playlist de Flujo se llama **Concentración** (antes "Estado de Flow"); el estado sigue llamándose Flujo. `photo` es la **imagen propia de la playlist**: del mismo clima que la del estado (`mood.photo`) pero nunca la misma foto, para que el estado y su playlist no se vean como lo mismo. Sólo cuatro estados tienen repertorio propio grabado — Foco, Relax, Alegría y Superación; **Flujo reusa las melodías de Foco, Calma las de Relax, y Energía las de Alegría** (mismos archivos, otro orden); Superación no comparte repertorio con nadie — hasta que existan pistas propias para Calma, Flujo y Energía. En `mood.html` la playlist va sola arriba, como pieza ancha (`.playlist-hero`: funda + título/desc/cantidad al costado) en vez de una tarjeta de grilla, y debajo sus canciones aparecen como **temas sueltos**: `renderMoodSongs` las dibuja en `.track-grid`, una tarjeta al lado de la otra con su propio arte (`coverHTML('track', ...)`), **no** como tracklist apilada — ahí se leerían como "la playlist otra vez" en vez de como temas eligibles de a uno. Dentro de `mood.html` esas tarjetas esconden el badge del estado (la página entera ya es ese estado). No son un ítem más del grid — tocar una playlist lleva a `playlist.html?id=XXX`, que muestra el tracklist completo apilado (una canción atrás de la otra, en el flujo normal de la página, no un carrusel/selector). Tocar una canción del tracklist lleva a `player.html?playlist=XXX&t=N`, donde la cola de reproducción (anterior/siguiente) recorre esa playlist en vez de las del mood. En ese modo el player muestra debajo de la tarjeta la **cola** (`#player-queue`): la misma tracklist rotada para empezar por el tema que suena y seguir con los próximos (dando la vuelta al final, igual que `stepTrack`). Tocar una fila cambia de canción in situ (`jumpToTrack`, sin recargar la página); tocar la fila que ya suena hace play/pausa. Con `?id=XXX` (ítem suelto) la cola no se muestra.

La capa de "API" en `app.js` (`fetchMoodList`, `fetchTracksByMood`, `fetchTracksByType`, `fetchTrackById`, `fetchAllPlaylists`, `fetchPlaylistsByMood`, `fetchPlaylistById`) lee de `MOCK_DB` — son funciones `async` con la misma firma que tendrían pegándole a un endpoint real, para que el swap futuro sea interno a esas funciones.

## Sistema visual
Identidad basada en el objeto físico del disco/funda de vinilo (encaja con "tu pausa emocional"): cada estado de ánimo tiene una tinta sólida (`mood.ink`) que tiñe su portada; tanto los temas sueltos (`.cover--art`) como las playlists (`.cover--stack`: dos lomos asomando arriba de la funda de adelante) van **sin disco adelante** — ahí manda la imagen. El disco de vinilo ya no se dibuja en ninguna portada (tapaba la foto de cada tema): el objeto sigue siendo la funda. El reproductor (`player.html`) no dibuja el disco: arriba de la tarjeta hay una banda de **ondas** a sangre (canvas, `waveViz` en `app.js`) teñidas con la tinta del mood, que se mueven mientras suena y bajan a un latido mínimo en pausa — la idea es calma, no un ecualizador de barras. Tipografía: `Fraunces` (display), `Work Sans` (cuerpo), `IBM Plex Mono` (duraciones, contadores, datos tipo "etiqueta de disco").

**Portadas.** Toda portada lleva imagen, y sale de los datos del propio proyecto — nunca del campo `thumbnail` (que se mantiene sólo para el futuro swap a WordPress) ni de bancos genéricos tipo picsum:
- **Playlists** (`.cover--stack`): su foto propia (`playlist.photo`, con `mood.photo` como fallback) llenando la funda, teñida con `mood.ink`, sin disco ni nada que la tape (los lomos de la pila asoman arriba, fuera de la imagen). Abajo, la palabra **PLAYLIST** en un chip sólido con la tinta del mood (`.cover-foot` / `.cover-kind`), y en `playlist.html` además como antetítulo grande sobre el nombre (`.playlist-kind`). El player, entrando desde una playlist, ya lo dice en el badge (`PLAYLIST · <título>`).
- **Temas sueltos**: cada canción tiene su propia foto real (`song.photo` en `mock-data.js`, elegida a mano por tema — distinta de las demás canciones de su playlist y de la foto del mood/playlist, pero del mismo clima temático: p. ej. dentro de Foco cada tema tiene su propia escena de calma/trabajo, dentro de Superación cada uno su propia escena de montaña/ascenso). Si a algún tema le faltara `photo` (caso hoy inexistente, pero soportado), `songArtVars`/`moodSongList` caen en la foto de la playlist y, para un track suelto, en la del mood. `songArtVars(mood, title, photo)` (app.js) hashea `moodId + título` para el recorte y el ángulo del velo de color sobre esa foto. **La foto manda**: encima va sólo un velo suave con la tinta del estado y, en una esquina, el ícono del mood (`.songart-glyph` / `.cover-glyph`) como firma — nada de iniciales ni texto tapando la imagen (se probaron y las portadas se leían como una etiqueta, no como la canción). Ese arte se dibuja como cuadrado (`.songart`, `songArtHTML`) en las filas de tracklist, en la cola del player y en grande apoyado sobre la banda de ondas (`.player-art`, `.songart--lg`), y como fondo de la funda en las tarjetas de grilla (`.cover--art`). Determinístico: la misma canción se ve siempre igual.

## localStorage keys
- `mm_profile` — `{ name }`

El saludo de la home (`.js-greet-title`, lo escribe `greetingText()` en app.js) es **"¿Cómo te sentís hoy?"** a secas mientras la persona no haya cargado su nombre en ajustes, y **"¿Cómo te sentís hoy, <nombre>?"** cuando sí. `Invitado` es el placeholder del perfil, no un nombre: `customName()` lo descarta.

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
- Skeletons/spinner mientras se "fetchea" el mock. Sin fallback a datos estáticos embebidos en el HTML.
- Buscadores (home y explorar) filtran en el cliente sobre los datos ya cargados en memoria — no hay backend de búsqueda.
