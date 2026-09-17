#!/usr/bin/env python3
"""
MGO — Sube a WordPress las fotos de las notas que quedaron sin imagen destacada.

Por qué hace falta: al importar el WXR, WordPress baja los 30 adjuntos uno por
uno y se queda sin `max_execution_time` a mitad de camino. Los posts quedan
apuntando a adjuntos que nunca se crearon.

Este script hace lo mismo que haría el import, pero desde acá y de a una:
sube la foto a la biblioteca de medios y la asigna como imagen destacada.
Es idempotente — saltea las notas que ya la tienen, así que podés correrlo las
veces que haga falta.

CÓMO USAR
  1. En WP Admin → Usuarios → tu perfil → "Contraseñas de aplicación",
     creá una nueva (nombre: "subida de imágenes"). WordPress te muestra una
     clave de 24 caracteres tipo `abcd EFGH ijkl MNOP qrst UVWX`.
  2. python3 tools/subir-imagenes-wp.py
  3. Pegá tu usuario de WP y esa clave cuando te los pida (no se guardan en
     ningún lado ni quedan en el historial de la terminal).
  4. Cuando termine, borrá la contraseña de aplicación desde tu perfil.

No necesita instalar nada: sólo Python 3, que ya viene en la Mac.
"""

import base64
import getpass
import json
import mimetypes
import os
import sys
import urllib.error
import urllib.request

SITE = 'https://contenidos.vip/misgastoseo'
API = f'{SITE}/wp-json'
CATEGORIA = 'tips-educativos'
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# El plugin devuelve este placeholder cuando el post no tiene destacada válida.
PLACEHOLDER = 'default_image.png'


def pedir(url, auth=None, data=None, headers=None, method=None):
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header('Accept', 'application/json')
    if auth:
        req.add_header('Authorization', f'Basic {auth}')
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    with urllib.request.urlopen(req, timeout=120) as res:
        return json.loads(res.read().decode('utf8'))


def main():
    print(__doc__.split('CÓMO USAR')[0].strip())
    print('─' * 70)
    usuario = input('Usuario de WordPress: ').strip()
    clave = getpass.getpass('Contraseña de aplicación (no se ve al tipear): ').strip()
    if not usuario or not clave:
        sys.exit('Falta el usuario o la clave.')
    auth = base64.b64encode(f'{usuario}:{clave}'.encode()).decode()

    # Chequeo de credenciales antes de tocar nada.
    try:
        yo = pedir(f'{API}/wp/v2/users/me?context=edit', auth=auth)
    except urllib.error.HTTPError as e:
        sys.exit(f'\n❌ No pude autenticarme ({e.code}). Revisá el usuario y la contraseña de aplicación.')
    print(f'\n✓ Conectado como "{yo.get("name")}"\n')

    notas = pedir(f'{API}/api/v3/articles/fulldata/category/{CATEGORIA}?limit=100&page=1').get('data') or []
    print(f'{len(notas)} notas en "{CATEGORIA}".\n')

    subidas = salteadas = fallidas = 0
    for nota in notas:
        post_id = nota['id']
        titulo = nota.get('title', '')
        thumb = nota.get('thumbnail') or ''
        if thumb and PLACEHOLDER not in thumb:
            salteadas += 1
            continue

        try:
            datos = json.loads(nota.get('mobile_content') or '{}')
        except json.JSONDecodeError:
            datos = {}
        rel = (datos.get('image') or '').lstrip('/')
        archivo = os.path.join(REPO, rel)
        if not rel or not os.path.isfile(archivo):
            print(f'  ⚠️  {titulo[:50]:<52} sin foto en el repo ({rel or "—"})')
            fallidas += 1
            continue

        nombre = os.path.basename(archivo)
        tipo = mimetypes.guess_type(nombre)[0] or 'image/jpeg'
        with open(archivo, 'rb') as f:
            cuerpo = f.read()

        try:
            media = pedir(
                f'{API}/wp/v2/media', auth=auth, data=cuerpo, method='POST',
                headers={'Content-Type': tipo, 'Content-Disposition': f'attachment; filename="{nombre}"'},
            )
            pedir(
                f'{API}/wp/v2/posts/{post_id}', auth=auth, method='POST',
                data=json.dumps({'featured_media': media['id']}).encode(),
                headers={'Content-Type': 'application/json'},
            )
        except urllib.error.HTTPError as e:
            print(f'  ❌ {titulo[:50]:<52} {e.code} {e.read().decode("utf8", "replace")[:120]}')
            fallidas += 1
            continue

        print(f'  ✅ {titulo[:50]:<52} adjunto #{media["id"]}')
        subidas += 1

    print(f'\n─────────────\nSubidas: {subidas} | Ya tenían: {salteadas} | Con problemas: {fallidas}')
    if subidas:
        print('\nAcordate de borrar la contraseña de aplicación desde tu perfil de WordPress.')


if __name__ == '__main__':
    main()
