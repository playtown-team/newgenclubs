# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Miembros del club Playtown, rango etario amplio (no sólo adultos jóvenes) — la app debe ser accesible y legible para toda esa franja, no diseñada pensando en un único segmento de edad. Es gente sin necesariamente un hábito de seguimiento financiero estructurado, que usa la app sin login ni fricción de cuenta.

Situación que dispara el uso: se olvidan de vencimientos de suscripciones/gastos fijos recurrentes (streaming, servicios, tarjeta, alquiler) y quieren un aviso a tiempo, sin que eso se sienta como una alarma o un reto de gamificación urgente.

## Product Purpose

Bienestar financiero para el club Playtown (app hermana de MindMusic y Retofit, mismo patrón de arquitectura). Combina contenido educativo (tips, alertas, ahorro, educación financiera) con un motor de vencimientos/suscripciones recurrentes que avisa antes de que algo venza y se resetea solo cada mes, sin timers/cron — el estado de cada vencimiento se recalcula como función pura de (suscripción, hoy) en cada carga de página.

Éxito = el usuario llega a fin de mes sin sorpresas de cobros olvidados, y sin que la app le genere ansiedad en el proceso.

## Positioning

El diferencial no es sólo el contenido educativo (eso lo tienen otras apps de finanzas) sino el motor de vencimientos que se auto-resetea sin backend ni cron, comunicado con una gramática visual propia ("Fases"): la plata se mira como un ciclo natural (fase lunar real del día en la marca, anillo de progreso por vencimiento) en vez de badges rojos de alarma. Ninguna otra app del ecosistema Playtown tiene este mecanismo.

## Operating Context

- Sin registro ni login — experiencia directa, todo local al dispositivo (localStorage).
- Multi-página estática, sin build tools, sin framework — mismo patrón que MindMusic.
- Moneda: pesos chilenos, formato simple `$12.500`, sin selector de moneda.
- Carga de registros por formulario estructurado (nombre, monto, fecha/categoría) — sin parsing de lenguaje natural ni IA.
- Alcance actual de Registros: sólo Gasto Fijo (suscripciones/vencimientos recurrentes) existe hoy en la UI. Gasto Variable, Ingreso y Ahorro no están implementados — no asumir que existen al tocar `registros.html`/`app.js`.

## Capabilities and Constraints

- Datos del usuario (movimientos, vencimientos, perfil) 100% en `localStorage`, sin backend — se pierden si el usuario borra caché o cambia de dispositivo (aceptado por ahora, no hay plan de backend todavía).
- Contenido educativo (notas, retos semanales, tip de la semana, dosis de calma) vive en WordPress (`contenidos.vip/misgastoseo`) y se trae por REST — ver "API de contenido" en CLAUDE.md.
- El motor de vencimientos clampea el día de vencimiento al último día del mes cuando corresponde, y sólo escribe `lastPaidPeriod` al marcar como pagado (sin lógica de reset explícita).
- Sin buscadores en esta app (a diferencia de MindMusic) — no hay campo de búsqueda en ninguna pantalla.

## Brand Commitments

No hay un sistema de marca Playtown compartido que esta app deba importar (sin logo/paleta/tipografía del club aplicados directamente, más allá de compartir el patrón de arquitectura con MindMusic y Retofit). Existe un logo propio de "Mis Gastos en Orden" (distinto del de Playtown) pero no hay un archivo del mismo en el repo todavía — no fabricar un logo gráfico por ahora; el header usa texto ("Mis Gastos en Orden" + "by PLAYTOWN") y la marca lunar (`renderMoonGlyphs()`) como mark hasta que ese asset exista.

Libertad de diseño total confirmada por el usuario (2026-08-22): el sistema visual "Fases" ya no calca ninguna referencia externa (se descartó `gastos-en-orden.vercel.app` como referencia) — es una identidad propia.

## Evidence on Hand

Fuera del isotipo (`assets/brand/`) y las fotos de las notas (`assets/tips/`), no hay assets gráficos propios; el contenido educativo es texto editorial cargado en WordPress, sin testimonios, casos ni prensa reales. No fabricar evidencia (testimonios, benchmarks, logos) en trabajo futuro; si se necesita un logo gráfico de "Mis Gastos en Orden", pedirlo al usuario en vez de inventarlo.

## Product Principles

- La plata se comunica como un ciclo, no como una alarma: nada de gamificación de urgencia ni badges rojo-pánico (rojo ladrillo, no rojo-alarma).
- Cero fricción de entrada: sin login, sin cuentas, sin parsing inteligente — formularios estructurados simples.
- El motor de vencimientos es la seña de identidad del producto: cualquier cambio visual debe seguir contando la misma historia que el anillo de progreso y la luna del header.
- Diseñar para un rango etario amplio del club, no sólo para el segmento más joven o más financieramente alfabetizado.
- No asumir funcionalidad que no existe (Gasto Variable/Ingreso/Ahorro) sólo porque el modelo de datos dejó el campo abierto.

## Accessibility & Inclusion

Sin requisito de accesibilidad específico establecido más allá de buenas prácticas generales (contraste, tamaños de touch target) — pero el rango etario amplio de usuarios pesa a favor de legibilidad y tamaños de toque generosos por defecto, no sólo cumplimiento mínimo.
