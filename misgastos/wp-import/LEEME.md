# Import de contenido a WordPress — Mis Gastos en Orden

`misgastoseo-content.xml` trae **todo el contenido editorial** de la app listo
para cargar en `contenidos.vip/misgastoseo`:

| Categoría en WP | Qué trae | Cantidad |
|---|---|---|
| `tips-educativos` (+ su categoría temática) | Las notas de la home y el detalle | 30 |
| `retos-semanales` | El pool del reto de la semana | 30 |
| `tips-de-la-semana` | El "Tip de la Semana" destacado | 1 |
| `dosis-de-calma` | Las frases de la card de calma | 30 |

Además incluye las **30 imágenes** de las notas: el importador las baja de
`https://mis-gastos-en-orden.vercel.app/assets/tips/…` y las deja como imagen
destacada de cada nota.

## Antes de importar

**Borrá los 3 posts de prueba** (`La Regla 50/30/20`, `Sin gastos hormiga`,
`El "bencinazo"…`) y vaciá la papelera. Si no, quedan duplicados: dos "Sin
gastos hormiga" en el pool correrían toda la rotación de retos una posición.

## Importar

1. WP Admin → **Herramientas → Importar → WordPress** (instalar el plugin
   "WordPress Importer" si lo pide).
2. Subir `misgastoseo-content.xml`.
3. Asignar los posts a tu usuario.
4. **Marcar "Descargar e importar los archivos adjuntos"** — es lo que trae las
   fotos de las notas.
5. Importar.

## Si las fotos no entraron todas

WordPress descarga los 30 adjuntos uno por uno y con esa cantidad **el import se
corta por `max_execution_time`**: los posts quedan apuntando a adjuntos que
nunca se crearon y la API devuelve su imagen por defecto.

Para completarlas sin instalar nada:

```bash
python3 tools/subir-imagenes-wp.py
```

Sube las que falten a la biblioteca de medios y las asigna como destacada, una
por una. Pide usuario y una **contraseña de aplicación** de WordPress (Usuarios
→ tu perfil → "Contraseñas de aplicación"); no se guarda en ningún lado y
conviene borrarla al terminar. Es idempotente: saltea las notas que ya la
tienen, así que se puede correr las veces que haga falta.

La alternativa a mano: subir las fotos de `assets/tips/` en **Medios → Añadir
nuevo** (se pueden arrastrar todas juntas) y después asignar la destacada nota
por nota.

Mientras tanto la app no se rompe: si el post no tiene destacada, usa la foto
del repo (`assets/tips/…`).

## Cómo se guarda cada nota

El JSON va **en el cuerpo del post, en texto plano** (nada de bloques ni
formato). La API lo devuelve tal cual en `mobile_content` y la app lo lee de
ahí. El título y la categoría del post son los de WordPress; el JSON manda para
todo lo demás.

### Nota educativa (`tips-educativos` + su categoría)
```json
{
  "id": "regla-50-30-20",
  "category": "tips-financieros",
  "badge": "Tips Financieros",
  "title": "La Regla 50/30/20",
  "excerpt": "50% a necesidades, 30% a gustos, 20% a ahorro o deudas...",
  "image": "assets/tips/regla-50-30-20.jpg",
  "publishedAt": "2026-07-05",
  "body": ["párrafo 1", "párrafo 2"]
}
```
- `id` es el que viaja en `contenido.html?id=…` y con el que se guarda el estado
  "Visto / Entendido" en el dispositivo: **si lo cambiás, el usuario pierde el
  estado de lectura de esa nota**.
- `category` tiene que coincidir con el slug de la categoría temática en WP.
- `image` es sólo respaldo: si el post tiene imagen destacada, **gana la de
  WordPress**.
- `publishedAt` (`YYYY-MM-DD`) es la fecha que se muestra y la que ordena la
  lista — la fecha del post en WP no se usa.

### Reto semanal (`retos-semanales`)
```json
{ "id": "sin-gastos-hormiga", "title": "Sin gastos hormiga", "description": "Evitá gastos chicos…", "order": 0 }
```
- `order` **es** la rotación: el reto de cada semana sale de esa posición.
  Agregar retos al final es seguro; reordenar cambia qué reto toca cada semana
  (el historial ya finalizado se resuelve por `id` y no se rompe).

### Tip de la semana (`tips-de-la-semana`)
```json
{
  "id": "bencinazo-agosto-2026",
  "title": "…",
  "excerpt": "…",
  "publishedAt": "2026-08-25",
  "body": ["…"],
  "actions": ["…", "…"],
  "source": "Emol",
  "sourceUrl": "https://…"
}
```
- La home muestra **siempre el más nuevo** de la categoría: publicar uno nuevo
  alcanza para reemplazar el destacado, los viejos quedan de historial.

### Dosis de calma (`dosis-de-calma`)
```json
{ "id": "calma-01-ir-despacio-tambien-es-avanzar", "quote": "Ir despacio también es avanzar.", "order": 0 }
```
- Rota por día según `order`. Si la categoría queda vacía, la card no se muestra.

## Regenerar el XML

El contenido original ya no vive en el repo (está en WordPress). Para volver a
armarlo desde cero:

```bash
git show d98435e:mock-data.js > tools/content-source.js
node tools/generate-wp-import.js
```
