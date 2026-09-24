#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// MINDMUSIC — Suma melodías nuevas a las playlists de wp-import/mindmusic-content.xml
//
// El contenido original ya no vive en el repo (ver generate-wp-import.js), así
// que una tanda nueva de música se agrega editando el WXR en el lugar: este
// script abre el JSON de cada playlist, le suma los temas AL FINAL del array
// `tracks` (la posición es el `t=N` del player: no se reordena lo que ya está)
// y vuelve a escribir el XML.
//
// Es idempotente: un tema cuyo `audioUrl` ya está en la playlist se saltea, así
// que se puede correr dos veces sin duplicar nada.
//
// Uso:  node tools/add-tracks.js
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');

const XML_FILE = path.join(__dirname, '..', 'wp-import', 'mindmusic-content.xml');
const AUDIO_BASE = 'https://ptown-wap-ar.s3.sa-east-1.amazonaws.com/mindmusic/music';
const PHOTO_BASE = 'https://images.unsplash.com/photo-';

// ── Tanda "melodias 2" ───────────────────────────────────────────────────────
// A diferencia de la primera tanda (`<titulo-kebab>.m4a`), estos archivos se
// subieron a S3 con su nombre original: el `file` va tal cual, mayúsculas
// incluidas (S3 distingue mayúsculas). La carpeta es la del repertorio, la
// misma de la primera tanda — los temas entregados como "concentracion" están
// en `foco/`.
// [archivo, título, duración en segundos, foto de Unsplash]
const BATCH = {
  relax: [
    ['A_Gentle_Place_to_Land.mp3',   'A Gentle Place to Land',   177, '1601276174812-63280a55656e'],
    ['Beneath_the_Amber_Canopy.mp3', 'Beneath the Amber Canopy', 172, '1542961870-4dc1dfe0986c'],
    ['Between_Two_Breaths.mp3',      'Between Two Breaths',      178, '1518708909080-704599b19972'],
    ['Holding_The_Quiet.mp3',        'Holding the Quiet',        177, '1568961248350-742799cdc67a'],
    ['Where_Water_Meets_Willow.mp3', 'Where Water Meets Willow', 168, '1629040082543-4e999cd0aa45'],
  ],
  alegria: [
    ['A_Place_to_Leave_Your_Coat.mp3',  'A Place to Leave Your Coat',  179, '1561334112-5cc34885f22f'],
    ['Linen_and_Slow_Light.mp3',        'Linen and Slow Light',        180, '1682421938316-4b186e25174c'],
    ['Sunlight_Through_The_Leaves.mp3', 'Sunlight Through the Leaves', 150, '1489644484856-f3ddc0adc923'],
    ['The_Gravity_of_Morning.mp3',      'The Gravity of Morning',      174, '1662038271111-5b1c0b4157e8'],
  ],
  foco: [
    ['Midnight_Ink_and_Rain.mp3', 'Midnight Ink and Rain', 174, '1587736891536-beb1e48bb22b'],
    ['Room_at_Sundown.mp3',       'Room at Sundown',       178, '1643865420909-2462d84339af'],
    ['The_Clear_Meridian.mp3',    'The Clear Meridian',    168, '1673369824122-e150258b9862'],
    ['The_Quiet_Horizon.mp3',     'The Quiet Horizon',     177, '1511458206431-afcf3cebe562'],
  ],
  superacion: [
    ['First_Light_Over_the_Ridge.mp3',  'First Light Over the Ridge',  179, '1723480999424-6489823dc6a6'],
    ['Porch_Lights_and_Heavy_Rain.mp3', 'Porch Lights and Heavy Rain', 175, '1594087588915-6aa3c388474f'],
    ['The_Measured_Breath.mp3',         'The Measured Breath',         177, '1528656707959-c9dc050e4841'],
    ['Where_The_Weight_Lifts.mp3',      'Where the Weight Lifts',      178, '1598601065215-751bf8798a2c'],
  ],
};

// Qué repertorio alimenta a cada playlist, y en qué orden entran los temas
// nuevos. Los estados sin repertorio propio siguen reusando el de su estado
// afín (mismos archivos, otro orden): Calma ← Relax, Energía ← Alegría, y
// Flujo ← Foco.
const PLAYLISTS = {
  'rel-pl': ['relax',      [0, 1, 2, 3, 4]],
  'cal-pl': ['relax',      [2, 4, 0, 3, 1]],
  'ale-pl': ['alegria',    [0, 1, 2, 3]],
  'ene-pl': ['alegria',    [2, 3, 0, 1]],
  'flu-pl': ['foco',       [0, 1, 2, 3]],
  'foc-pl': ['foco',       [2, 0, 3, 1]],
  'sup-pl': ['superacion', [0, 1, 2, 3]],
};

const toTrack = (folder, [file, title, duration, photo]) => ({
  title,
  duration,
  audioUrl: `${AUDIO_BASE}/${folder}/${file}`,
  photo: PHOTO_BASE + photo,
});

// ── Patch del XML ────────────────────────────────────────────────────────────
let added = 0, songs = 0;
const seen = new Set();
const xml = fs.readFileSync(XML_FILE, 'utf8').replace(
  /(<content:encoded><!\[CDATA\[)([\s\S]*?)(\]\]><\/content:encoded>)/g,
  (all, open, body, close) => {
    const post = JSON.parse(body);
    const plan = PLAYLISTS[post.id];
    if (!plan || !Array.isArray(post.tracks)) return all;
    seen.add(post.id);
    const [folder, order] = plan;
    const have = new Set(post.tracks.map((t) => t.audioUrl));
    order.map((i) => toTrack(folder, BATCH[folder][i])).forEach((t) => {
      if (have.has(t.audioUrl)) return;
      post.tracks.push(t);
      added++;
    });
    songs += post.tracks.length;
    console.log(`   ${post.id.padEnd(7)} ${String(post.tracks.length).padStart(2)} temas  (${post.title})`);
    return open + JSON.stringify(post, null, 2) + close;
  }
);

const missing = Object.keys(PLAYLISTS).filter((id) => !seen.has(id));
if (missing.length) {
  console.error(`\n❌  No encontré estas playlists en el XML: ${missing.join(', ')}\n`);
  process.exit(1);
}

fs.writeFileSync(XML_FILE, xml, 'utf8');
console.log(`\n✓  ${added} temas agregados — ${songs} canciones en total en las playlists\n`);
