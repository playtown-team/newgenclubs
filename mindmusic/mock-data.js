// MOCK_DB — datos de ejemplo con la misma forma que tendrá la futura API REST
// de WordPress (mobile_content-equivalente ya parseado como objeto plano).
// Cuando exista el endpoint real, sólo cambian las funciones fetch* en app.js —
// esta forma de datos (moods / contentTypes / tracks / playlists) se mantiene igual.

const MOCK_DB = {
  // `photo` = paisaje real (Unsplash) asociado al estado, usado como ambientación
  // de pantalla completa (hero, fondo de detalle) — no reemplaza el sistema de
  // disco/funda de las portadas de contenido, que sigue dibujándose en CSS.
  moods: [
    { id: 'calma',      name: 'Calma',      subtitle: 'Paz inmediata',      cta: 'CALMAR',   icon: 'leaf',     ink: '#4FB8C4', grad: 'linear-gradient(135deg,#5FCBD6,#2E7D8C)', photo: 'https://images.unsplash.com/photo-1580920824014-54845d91a8ad' },
    { id: 'energia',    name: 'Energía',    subtitle: 'Activa tu cuerpo',   cta: 'ELEVAR',   icon: 'bolt',     ink: '#E2703A', grad: 'linear-gradient(135deg,#F0924F,#C6491F)', photo: 'https://images.unsplash.com/photo-1489493512598-d08130f49bea' },
    { id: 'foco',       name: 'Foco',       subtitle: 'Claridad mental',    cta: 'ENFOCAR',  icon: 'target',   ink: '#8C6BD6', grad: 'linear-gradient(135deg,#A088E3,#5B3DA8)', photo: 'https://images.unsplash.com/photo-1744040982238-867d6a3f907f' },
    { id: 'flujo',      name: 'Flujo',      subtitle: 'Fluye sin esfuerzo', cta: 'FLUIR',    icon: 'infinity', ink: '#33A893', grad: 'linear-gradient(135deg,#4DBFA8,#1F7A69)', photo: 'https://images.unsplash.com/photo-1660613964716-12b8a0223e9a' },
    { id: 'alegria',    name: 'Alegría',    subtitle: 'Sube tu ánimo',      cta: 'CELEBRAR', icon: 'sun',      ink: '#E8AB3E', grad: 'linear-gradient(135deg,#F3C15E,#D98A22)', photo: 'https://images.unsplash.com/photo-1558306961-3e9e4ae532f6' },
    { id: 'relax',      name: 'Relax',      subtitle: 'Cero estrés',        cta: 'RELAJAR',  icon: 'moon',     ink: '#6F7FD1', grad: 'linear-gradient(135deg,#8B98E0,#4A56A8)', photo: 'https://images.unsplash.com/photo-1477840539360-4a1d23071046' },
    { id: 'superacion', name: 'Superación', subtitle: 'Fortaleza interior', cta: 'SUPERAR',  icon: 'mountain', ink: '#D1553C', grad: 'linear-gradient(135deg,#E17454,#A83A24)', photo: 'https://images.unsplash.com/photo-1550952953-b21b952780e1' },
  ],

  // Hoy todo el catálogo son playlists. Las otras categorías (cápsulas, audio
  // mensajes, música guiada) siguen previstas en el modelo pero no tienen
  // contenido grabado todavía — cuando exista, se vuelven a agregar acá.
  contentTypes: [
    { id: 'playlists', name: 'Playlists Emocionales' },
  ],

  // Ítems individuales (no playlists): cápsulas, audio mensajes, música guiada.
  // Vacío hasta que haya audio real de esas categorías; la capa fetch* y el
  // player siguen soportando el caso (`player.html?id=XXX`).
  tracks: [],

  // Playlists: varias canciones agrupadas una atrás de otra (tracklist), no ítems sueltos.
  // Cada una tiene su propia `photo` de portada: del mismo clima que la del
  // estado (`mood.photo`) pero nunca la misma imagen — el estado y su playlist
  // no se pueden ver como la misma cosa.
  // Los `audioUrl` son archivos propios servidos desde `audio/<mood>/` (mismo
  // origen que la app). Los estados sin melodías propias reusan el repertorio de
  // un estado afín: calma toma las de relax, flujo las de foco, energía las de alegría.
  // Superación no comparte repertorio con nadie.
  playlists: [
    {
      id: 'cal-pl', moodId: 'calma', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1634023233766-0c16b151bfb0', // lago con niebla
      title: 'Silencio Interior',
      desc: 'Una selección de pistas suaves para acompañar momentos de introspección.',
      tracks: [
        { title: 'Ease',       duration: 174, audioUrl: 'audio/relax/ease.m4a',       photo: 'https://images.unsplash.com/photo-1532979772520-f2763956cce0' }, // muelle en la niebla
        { title: 'Unwind',     duration: 181, audioUrl: 'audio/relax/unwind.m4a',     photo: 'https://images.unsplash.com/photo-1445112098124-3e76dd67983c' }, // flotando bajo el agua
        { title: 'Drift',      duration: 119, audioUrl: 'audio/relax/drift.m4a',      photo: 'https://images.unsplash.com/photo-1734830186361-6001d1a7ae37' }, // pequeño bote en agua calma
        { title: 'Quiet Hour', duration: 162, audioUrl: 'audio/relax/quiet-hour.m4a', photo: 'https://images.unsplash.com/photo-1614640672303-537679057c33' }, // luna reflejada en lago nocturno
        { title: 'Slow Down',  duration: 168, audioUrl: 'audio/relax/slow-down.m4a',  photo: 'https://images.unsplash.com/photo-1503891617560-5b8c2e28cbf6' }, // ondas de agua en primer plano
      ],
    },
    {
      id: 'ene-pl', moodId: 'energia', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1643724763266-a34c85397d1d', // ruta al amanecer
      title: 'Activación Total',
      desc: 'Ritmos que suben la energía antes de entrenar o encarar el día.',
      tracks: [
        { title: 'Sunrise',     duration: 176, audioUrl: 'audio/alegria/sunrise.m4a',     photo: 'https://images.unsplash.com/photo-1774252338397-167cef2c68fd' }, // globo aerostático en cielo despejado
        { title: 'Lightness',   duration: 155, audioUrl: 'audio/alegria/lightness.m4a',   photo: 'https://images.unsplash.com/photo-1611244806964-91d204d4a2a7' }, // confeti y manos arriba
        { title: 'Bright Side', duration: 175, audioUrl: 'audio/alegria/bright-side.m4a', photo: 'https://images.unsplash.com/photo-1541417904950-b855846fe074' }, // isla tropical desde el aire
        { title: 'Glow',        duration: 182, audioUrl: 'audio/alegria/glow.m4a',        photo: 'https://images.unsplash.com/photo-1532028205213-4c4fa81306d4' }, // campo de verano al viento
        { title: 'Uplift',      duration: 173, audioUrl: 'audio/alegria/uplift.m4a',      photo: 'https://images.unsplash.com/photo-1520206444322-d2df0dd4e78e' }, // caminata al sol de mañana
        { title: 'Golden Hour', duration: 173, audioUrl: 'audio/alegria/golden-hour.m4a', photo: 'https://images.unsplash.com/photo-1593264787646-f07221d3b7de' }, // amanecer entrando por la ventana
      ],
    },
    {
      id: 'foc-pl', moodId: 'foco', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1583606638441-b9c746100447', // pinar en la bruma
      title: 'Zona de Trabajo',
      desc: 'Música instrumental pensada para trabajar sin distracciones.',
      tracks: [
        { title: 'Clarity',     duration: 178, audioUrl: 'audio/foco/clarity.m4a',     photo: 'https://images.unsplash.com/photo-1473893604213-3df9c15611c0' },
        { title: 'Focus Point', duration: 166, audioUrl: 'audio/foco/focus-point.m4a', photo: 'https://images.unsplash.com/photo-1655815226187-113f3b3d7510' },
        { title: 'Deep Work',   duration: 179, audioUrl: 'audio/foco/deep-work.m4a',   photo: 'https://images.unsplash.com/photo-1694636775862-c35027446a0f' },
        { title: 'Still Mind',  duration: 171, audioUrl: 'audio/foco/still-mind.m4a',  photo: 'https://images.unsplash.com/photo-1613578519724-22fdb5d06388' },
        { title: 'Sharp Edge',  duration: 159, audioUrl: 'audio/foco/sharp-edge.m4a',  photo: 'https://images.unsplash.com/photo-1561921348-89b3db247320' },
      ],
    },
    {
      id: 'flu-pl', moodId: 'flujo', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1504202252096-09abfa127db7', // agua corriendo entre piedras
      title: 'Concentración',
      desc: 'Una selección larga para sostener el estado de flujo creativo.',
      tracks: [
        { title: 'Still Mind',  duration: 171, audioUrl: 'audio/foco/still-mind.m4a',  photo: 'https://images.unsplash.com/photo-1613578519724-22fdb5d06388' },
        { title: 'Deep Work',   duration: 179, audioUrl: 'audio/foco/deep-work.m4a',   photo: 'https://images.unsplash.com/photo-1694636775862-c35027446a0f' },
        { title: 'Sharp Edge',  duration: 159, audioUrl: 'audio/foco/sharp-edge.m4a',  photo: 'https://images.unsplash.com/photo-1561921348-89b3db247320' },
        { title: 'Focus Point', duration: 166, audioUrl: 'audio/foco/focus-point.m4a', photo: 'https://images.unsplash.com/photo-1655815226187-113f3b3d7510' },
        { title: 'Clarity',     duration: 178, audioUrl: 'audio/foco/clarity.m4a',     photo: 'https://images.unsplash.com/photo-1473893604213-3df9c15611c0' },
      ],
    },
    {
      id: 'ale-pl', moodId: 'alegria', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1475656106224-d72c2ab53e8d', // pasto a contraluz
      title: 'Sube el Ánimo',
      desc: 'Canciones para recuperar la sonrisa en cualquier momento.',
      tracks: [
        { title: 'Golden Hour', duration: 173, audioUrl: 'audio/alegria/golden-hour.m4a', photo: 'https://images.unsplash.com/photo-1593264787646-f07221d3b7de' }, // amanecer entrando por la ventana
        { title: 'Uplift',      duration: 173, audioUrl: 'audio/alegria/uplift.m4a',      photo: 'https://images.unsplash.com/photo-1520206444322-d2df0dd4e78e' }, // caminata al sol de mañana
        { title: 'Lightness',   duration: 155, audioUrl: 'audio/alegria/lightness.m4a',   photo: 'https://images.unsplash.com/photo-1611244806964-91d204d4a2a7' }, // confeti y manos arriba
        { title: 'Bright Side', duration: 175, audioUrl: 'audio/alegria/bright-side.m4a', photo: 'https://images.unsplash.com/photo-1541417904950-b855846fe074' }, // isla tropical desde el aire
        { title: 'Glow',        duration: 182, audioUrl: 'audio/alegria/glow.m4a',        photo: 'https://images.unsplash.com/photo-1532028205213-4c4fa81306d4' }, // campo de verano al viento
        { title: 'Sunrise',     duration: 176, audioUrl: 'audio/alegria/sunrise.m4a',     photo: 'https://images.unsplash.com/photo-1774252338397-167cef2c68fd' }, // globo aerostático en cielo despejado
      ],
    },
    {
      id: 'rel-pl', moodId: 'relax', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1507502707541-f369a3b18502', // luna entre nubes
      title: 'Cero Estrés',
      desc: 'Música ambiental para bajar el estrés acumulado.',
      tracks: [
        { title: 'Drift',      duration: 119, audioUrl: 'audio/relax/drift.m4a',      photo: 'https://images.unsplash.com/photo-1734830186361-6001d1a7ae37' }, // pequeño bote en agua calma
        { title: 'Unwind',     duration: 181, audioUrl: 'audio/relax/unwind.m4a',     photo: 'https://images.unsplash.com/photo-1445112098124-3e76dd67983c' }, // flotando bajo el agua
        { title: 'Slow Down',  duration: 168, audioUrl: 'audio/relax/slow-down.m4a',  photo: 'https://images.unsplash.com/photo-1503891617560-5b8c2e28cbf6' }, // ondas de agua en primer plano
        { title: 'Quiet Hour', duration: 162, audioUrl: 'audio/relax/quiet-hour.m4a', photo: 'https://images.unsplash.com/photo-1614640672303-537679057c33' }, // luna reflejada en lago nocturno
        { title: 'Ease',       duration: 174, audioUrl: 'audio/relax/ease.m4a',       photo: 'https://images.unsplash.com/photo-1532979772520-f2763956cce0' }, // muelle en la niebla
      ],
    },
    {
      id: 'sup-pl', moodId: 'superacion', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1760363958141-82cc82c2f46c', // cordón de montaña en ascenso
      title: 'Supera Cualquier Reto',
      desc: 'Música motivacional para acompañar procesos de superación.',
      tracks: [
        { title: 'Breakthrough', duration: 172, audioUrl: 'audio/superacion/breakthrough.m4a', photo: 'https://images.unsplash.com/photo-1601224748193-d24f166b5c77' },
        { title: 'New Ground',   duration: 173, audioUrl: 'audio/superacion/new-ground.m4a',   photo: 'https://images.unsplash.com/photo-1586022045497-31fcf76fa6cc' },
        { title: 'Momentum',     duration: 175, audioUrl: 'audio/superacion/momentum.m4a',     photo: 'https://images.unsplash.com/photo-1507553156678-fd07e00a106b' },
        { title: 'Rise Up',      duration: 173, audioUrl: 'audio/superacion/rise-up.m4a',      photo: 'https://images.unsplash.com/photo-1775334006478-865fa1b777de' },
        { title: 'Steady Climb', duration: 172, audioUrl: 'audio/superacion/steady-climb.m4a', photo: 'https://images.unsplash.com/photo-1559208722-abb22e0e918e' },
      ],
    },
  ],
};

// Completa cada ítem con los campos derivados que vendrían de la API real:
// thumbnail (foto stock, hoy sin uso visual — la portada se dibuja en CSS a partir
// del mood), short_description y template. Los `audioUrl` ya vienen declarados
// arriba: son archivos propios, no placeholders.
(function hydrateContent() {
  MOCK_DB.tracks.forEach((t, i) => {
    t.template = 'audio';
    t.short_description = t.desc.split('.')[0] + '.';
    t.thumbnail = `https://picsum.photos/seed/${t.moodId}-${i}/800/600`;
  });

  MOCK_DB.playlists.forEach((p, i) => {
    p.template = 'playlist';
    p.short_description = p.desc.split('.')[0] + '.';
    p.thumbnail = `https://picsum.photos/seed/pl-${p.moodId}-${i}/800/600`;
    p.tracks.forEach((song, si) => {
      song.id = `${p.id}-${si}`;
    });
  });
})();
