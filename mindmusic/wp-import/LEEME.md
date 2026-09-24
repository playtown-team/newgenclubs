# Import de contenido a WordPress — MindMusic

`mindmusic-content.xml` trae **todo el contenido** de la app listo para cargar
en `contenidos.vip/mindmusic`:

| Categoría en WP | Qué trae | Cantidad |
|---|---|---|
| `estados-de-animo` | Los 7 estados (Calma → Superación) | 7 |
| `playlists` | Las 7 playlists, con su tracklist completo adentro | 7 (67 canciones) |
| `audios` | Audios sueltos (cápsulas, audio mensajes, música guiada) | 0 — todavía no hay grabado |

## La API que usa la app

Este sitio expone el plugin **`content/v2`** (no el `api/v3` de Retofit y Mis
Gastos en Orden). Ya está activo — se chequea así:

```bash
curl -s "https://contenidos.vip/mindmusic/wp-json/content/v2/categories"
```

Después de importar, ahí tienen que aparecer `estados-de-animo`, `playlists` y
`audios`.

**Ojo:** el endpoint de lista del plugin (`articles?category=…`) devuelve 404
para todo en el sitio real, así que **no sirve para chequear si el import
entró**. La app lee por la REST estándar de WordPress (`wp/v2`) y deja
`content/v2` de respaldo. Para ver qué hay cargado:

```bash
curl -s "https://contenidos.vip/mindmusic/wp-json/wp/v2/posts?per_page=100&_fields=id,slug,modified"
```

## Antes de importar

Conviene **borrar el post de prueba** que hoy está en "Sin categoría"
("¡Hola mundo!") y vaciar la papelera: no rompe nada (no está en ninguna de las
tres categorías que la app lee) pero deja el admin limpio.

## Importar

1. WP Admin → **Herramientas → Importar → WordPress** (instalar el plugin
   "WordPress Importer" si lo pide).
2. Subir `mindmusic-content.xml`.
3. Asignar los posts a tu usuario.
4. **NO hace falta marcar "Descargar e importar los archivos adjuntos"**: este
   import no trae adjuntos (ver "Las fotos" abajo). Son 14 posts, entra de una.
5. Importar.

## Las fotos

Las 52 fotos (7 de estados + 7 de playlists + 38 de canciones) **viajan como URL
dentro del JSON**. No se suben a la biblioteca de medios, y es a propósito:

- **Cada canción tiene su foto propia**, y las canciones **no son posts**: viven
  dentro del JSON de su playlist. Una imagen destacada de WordPress no puede
  llegar hasta ahí.
- Sin adjuntos, el import no se puede cortar a la mitad por `max_execution_time`
  (a Mis Gastos en Orden le pasó con 30 imágenes).

Para **estados y playlists** sí se puede poner imagen destacada desde WP Admin:
si el post tiene una, **gana sobre la del JSON** (`wpThumbnail()` en `app.js`
descarta el placeholder que el plugin manda cuando no hay destacada). Es la
forma de cambiar una portada sin tocar el JSON.

## El audio

Las 38 melodías viven en S3 y **ya no están en el repo**:

```
https://ptown-wap-ar.s3.sa-east-1.amazonaws.com/mindmusic/music/<mood>/<archivo>
```

Hay dos tandas, con dos criterios de nombre — **el `audioUrl` tiene que calcar
el nombre real del archivo, mayúsculas incluidas** (S3 las distingue):

- Primera tanda (21): `<titulo-en-kebab-case>.m4a` (`Golden Hour` →
  `golden-hour.m4a`).
- Segunda tanda (17, "melodias 2"): el nombre original del archivo, `.mp3`
  (`Room at Sundown` → `Room_at_Sundown.mp3`). Carpetas: `relax/`, `alegria/`,
  `superacion/` y `foco/` (los temas entregados como "concentracion").

El `audioUrl` de cada canción en el JSON es esa URL absoluta. Si se sube una
melodía nueva, el archivo va a esa carpeta y la URL completa al JSON.

## Cómo se guarda cada cosa

El JSON va **en el cuerpo del post, en texto plano** (nada de bloques ni
formato). El título y la categoría del post son los de WordPress; el JSON manda
para todo lo demás.

WordPress devuelve ese cuerpo **tipografiado y envuelto en HTML** (las comillas
rectas salen como `&#8220;`, el texto viene en `<p>`/`<br />`); la app lo
deshace sola (`parsePostJson()` en `app.js`). Lo que **sí** hay que respetar al
editar un post a mano:

- No usar comillas dobles dentro de los textos (romperían el JSON).
- Evitar `...` y `--` dentro de los valores: WordPress los convierte a `…` y `–`.
  Con acentos y `¿ ¡` no hay problema.
- El **extracto** del post es texto humano, no el JSON: la app pide el cuerpo
  completo (`article?id=`) justamente porque el extracto automático de WordPress
  se corta a 55 palabras.

### Estado de ánimo (`estados-de-animo`)
```json
{
  "id": "calma",
  "name": "Calma",
  "subtitle": "Paz inmediata",
  "cta": "CALMAR",
  "icon": "leaf",
  "ink": "#4FB8C4",
  "grad": "linear-gradient(135deg,#5FCBD6,#2E7D8C)",
  "photo": "https://images.unsplash.com/photo-...",
  "order": 0
}
```
- `id` es el que viaja en `mood.html?id=…` y el que referencian las playlists en
  su `moodId`: **si lo cambiás, la playlist queda huérfana**.
- `icon` tiene que ser una clave de `MOOD_ICONS` en `app.js`
  (`leaf`, `bolt`, `target`, `infinity`, `sun`, `moon`, `mountain`). Un ícono
  nuevo se agrega ahí primero.
- `ink` tiñe todas las portadas del estado; `grad` es su degradé.
- `order` fija el orden del catálogo (Explorar y los 4 destacados de la home).
  La fecha del post no se usa para ordenar.

### Playlist (`playlists`)
```json
{
  "id": "cal-pl",
  "moodId": "calma",
  "contentType": "playlists",
  "title": "Silencio Interior",
  "desc": "Una selección de pistas suaves...",
  "photo": "https://images.unsplash.com/photo-...",
  "order": 0,
  "tracks": [
    {
      "title": "Ease",
      "duration": 174,
      "audioUrl": "https://ptown-wap-ar.s3.sa-east-1.amazonaws.com/mindmusic/music/relax/ease.m4a",
      "photo": "https://images.unsplash.com/photo-..."
    }
  ]
}
```
- `id` viaja en `playlist.html?id=…` y en `player.html?playlist=…`.
- `moodId` tiene que ser el `id` de un estado existente.
- `photo` de la playlist es **su portada propia**: del mismo clima que la del
  estado, pero nunca la misma imagen.
- `photo` de cada canción es la suya: distinta de las otras canciones de la
  playlist y de la foto del mood/playlist, pero del mismo clima temático. Si
  falta, la app cae en la foto de la playlist.
- `duration` en **segundos** (entero).
- **El orden del array `tracks` es el orden de reproducción.** La canción N de
  una playlist es `player.html?playlist=<id>&t=N` (empezando en 0), así que
  reordenar el array cambia a qué canción apunta un link ya compartido.
- Hoy cuatro estados tienen repertorio propio (Foco, Relax, Alegría,
  Superación) y tres reusan el de un estado afín: **Flujo usa las de Foco,
  Calma las de Relax, Energía las de Alegría** (mismos archivos, otro orden).
  La segunda tanda siguió el mismo criterio: cada tema nuevo entró al final de
  la playlist de su estado y de la del estado que lo reusa.

### Audio suelto (`audios`)
Todavía no hay ninguno. Cuando exista contenido de cápsulas / audio mensajes /
música guiada, cada uno es un post en esta categoría:
```json
{
  "id": "cap-respiracion-01",
  "moodId": "calma",
  "contentType": "capsulas",
  "title": "...",
  "desc": "...",
  "duration": 180,
  "photo": "https://...",
  "audioUrl": "https://ptown-wap-ar.s3.sa-east-1.amazonaws.com/mindmusic/music/...",
  "order": 0
}
```
- `contentType` tiene que existir también en `APP_DATA.contentTypes`
  (`app-data.js`): de ahí sale el nombre visible y los tabs de la home, que se
  muestran solos cuando hay dos categorías o más.
- Estos sí van directo a `player.html?id=…`.

## Ver la app sin WordPress

Para levantarla en local con este mismo XML como fuente de datos (sirve para
probar antes de importar, o sin internet en el WP):

```bash
node tools/serve-local.js
```

Sirve la app en `http://localhost:4180` y responde los endpoints de la API con
el contenido del XML. **No toca `app.js`**: reescribe el `API_BASE` al vuelo al
entregarlo. El audio se sigue trayendo de S3, así que hace falta internet.

## Sumar música nueva

`tools/add-tracks.js` agrega una tanda de temas al XML **en el lugar**: abre el
JSON de cada playlist y suma los temas al final de `tracks` (no reordena lo que
ya está, así los `t=N` compartidos siguen apuntando a la misma canción). Es
idempotente. Para otra tanda: subir los audios a S3, reemplazar `BATCH` y
`PLAYLISTS` en la cabecera del script y correr:

```bash
node tools/add-tracks.js
```

Si las playlists **ya están importadas** en WordPress, el importador saltea los
posts que ya existen (mismo título y fecha): en ese caso, o se borran las 7
playlists (y se vacía la papelera) antes de reimportar, o se pega a mano el JSON
nuevo en el cuerpo de cada post.

## Regenerar el XML

El contenido original ya no vive en el repo (está en WordPress). Para volver a
armarlo desde cero:

```bash
git show ab15193:mock-data.js > tools/content-source.js
node tools/generate-wp-import.js
node tools/add-tracks.js
```

(`generate-wp-import.js` sólo conoce la primera tanda; `add-tracks.js` le suma
la segunda.)
