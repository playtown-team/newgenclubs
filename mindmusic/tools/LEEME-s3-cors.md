# Ondas reales en el player — habilitar CORS en S3

Hoy el bucket `ptown-wap-ar` **no manda headers CORS**. Sin ellos, conectar un
`MediaElementSource` al `<audio>` devuelve **silencio** (es lo que hace el
navegador con audio cross-origin sin permiso), así que `audioIsAnalysable()` ni
lo intenta y las ondas del player corren en modo **"oleaje"**: se mueven atadas
a play/pausa, sin seguir el espectro. Funciona bien, pero no es lo que suena.

Para recuperar el modo **real** (`AnalyserNode` siguiendo el espectro):

1. AWS Console → S3 → bucket **`ptown-wap-ar`** → pestaña **Permissions** →
   sección **Cross-origin resource sharing (CORS)** → **Edit**.
2. Pegar el contenido de `tools/s3-cors.json` y guardar.
   - Si el bucket ya tiene una política CORS, **agregar** este bloque al array
     en vez de reemplazar lo que haya (el bucket lo comparte con otros
     proyectos de Playtown).
   - Si el dominio de producción no es `mindmusic.vercel.app`, cambiarlo en
     `AllowedOrigins` antes de guardar.
3. Verificar (tiene que aparecer `access-control-allow-origin`):

```bash
curl -sI -H "Origin: https://mindmusic.vercel.app" "https://ptown-wap-ar.s3.sa-east-1.amazonaws.com/mindmusic/music/alegria/bright-side.m4a" | grep -i access-control
```

4. Recién ahí, en `app.js`, poner `MM_AUDIO_CORS = true`. No hay que tocar nada
   más: el flag ya fija `crossOrigin` antes del primer `src` y `waveViz` cambia
   solo de modo.

**Ojo con el orden**: si se pone `MM_AUDIO_CORS = true` *antes* de habilitar
CORS, el `<audio>` pasa a pedir el archivo con `crossOrigin="anonymous"`, S3 lo
rechaza y **el audio deja de sonar**. Primero el bucket, después el flag.
