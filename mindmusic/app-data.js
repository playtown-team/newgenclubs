// APP_DATA — catálogo local atado al código de la UI.
//
// TODO el contenido (estados de ánimo, playlists con su tracklist, audios
// sueltos) vive en WordPress: `contenidos.vip/mindmusic`. Acá sólo queda lo que
// no es contenido editable sino estructura de la app.
//
// Antes este archivo era `mock-data.js` con toda la base mockeada.
const APP_DATA = {
  // Categorías de contenido de la home. Hoy es una sola (playlists), así que
  // `renderContentTabs()` esconde la barra de tabs; vuelve sola cuando haya dos
  // o más. Las otras categorías previstas —cápsulas de sonido, audio mensajes,
  // música guiada— entran acá el día que tengan audio grabado, junto con sus
  // posts en la categoría `audios` de WordPress.
  contentTypes: [
    { id: 'playlists', name: 'Playlists Emocionales' },
  ],
};
