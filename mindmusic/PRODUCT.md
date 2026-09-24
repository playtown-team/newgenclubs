# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

End subscribers of a mobile carrier that has licensed MindMusic as a VAS (Value Added Services) offering. They open it on their personal phone, mobile-first — this is the dominant real-world usage pattern, not a secondary case. There is no separate club-premises/kiosk use case; "club" is Playtown's internal branding term for each product line it builds (MindMusic, Retofit, etc.), not a literal physical club or gym membership. A user reaches for MindMusic to match a specific momentary mood (tired, sad, wanting to focus, content, etc.) and get straight to matching audio, without creating an account.

## Product Purpose

MindMusic is mood-based audio "first aid": the user taps a mood card and lands directly on matching content (guided audio, short capsules, voice messages, playlists) and plays it — no free text, no AI, no login. Success is a fast, low-friction path from "how I feel right now" to "sound that matches it."

## Positioning

MindMusic's mechanism (tap-a-mood, no login, no search-first UX) is not claimed to be unique versus Spotify/Calm/Headspace — the differentiator is distribution, not feature novelty. Playtown is a company that builds VAS products and sells them to mobile carriers, who in turn offer MindMusic to their own subscribers as part of a carrier-branded/bundled service. The product is positioned to be carrier-distributed rather than independently marketed and acquired by end users; open question whether a given carrier deployment is white-labeled under the carrier's own branding versus shown as "MindMusic by Playtown" (current UI shows the latter).

## Operating Context

- Personal smartphone, mobile-first web (mobile-first is the primary target; desktop/tablet layouts exist but are secondary).
- No user registration or login flow of any kind; entitlement is assumed to come from the carrier relationship, not from an in-app account system.
- Entry point is always a mood chosen by tapping a card — never free-text search or an AI-driven mood description.

## Capabilities and Constraints

- Multi-page static site: no build tooling, no JS framework. Shared `styles.css` and `app.js`; the API layer (`fetchMoodList`, `fetchTracksByMood`, `fetchAllPlaylists`, etc.) is the only code that knows about the backend.
- Data comes from WordPress REST (`contenidos.vip/mindmusic`), same pattern as the sibling products Retofit and Mis Gastos en Orden: one post per item, with its JSON carried in the post body. This install exposes the `content/v2` plugin rather than the `api/v3` one the siblings use, so the client reads the list endpoint and then each post's full body, and un-mangles WordPress's HTML wrapping and smart quotes before parsing. Categories: `estados-de-animo`, `playlists`, `audios`. There is no mock and no static fallback — if the API fails, the screen says so.
- Cover images travel as URLs inside the JSON rather than as WordPress media attachments, because every song has its own photo and songs are not posts — they live inside their playlist's JSON. Moods and playlists can still be given a WordPress featured image, which wins over the JSON value.
- Audio is real (native `<audio>`) and the tracks are the product's own final music: 38 files hosted on S3 (21 `.m4a` + a second batch of 17 `.mp3`) (`ptown-wap-ar/mindmusic/music/<mood-id>/`), no longer in the repo. Because the bucket sends no CORS headers, the player's waveform runs in synthetic mode; enabling CORS on the bucket plus `MM_AUDIO_CORS = true` restores real spectrum analysis.
- Local device state only: `localStorage` holds a `mm_profile` (display name), no auth, no streak/stats/history.
- 7 fixed mood states (Calma, Energía, Foco, Flujo, Alegría, Relax, Superación) are current product structure, authored as posts in the `estados-de-animo` category. Of the 4 content types originally planned, only Playlists Emocionales has recorded content; Cápsulas de Sonido, Audio Mensajes and Música Guiada remain in the model but are absent from the catalog until audio exists for them.
- PWA installability/offline support: **undecided**. "PWA" in current docs/branding is not yet confirmed to mean "installable with manifest + offline," and no `manifest.json` or service worker exists yet. Do not assume installability is a hard requirement; do not assume it is out of scope either.

## Brand Commitments

- Product name "MindMusic", tagline element "by Playtown" shown in the header/nav across all pages.
- "Club" is Playtown's internal name for a product line (this app is one "club"), not evidence of a physical club/gym — do not design around a literal on-premises club experience.
- Sibling products Retofit and Mis Gastos en Orden share the same overall architecture pattern (static pages reading WordPress `mobile_content` over REST); no confirmed requirement that MindMusic share their visual identity.

## Evidence on Hand

- Real audio content on hand: 38 final tracks in two batches, delivered grouped by mood folder — 9 for Foco, 10 for Relax, 10 for Alegría, 9 for Superación. No tracks were supplied for Calma, Energía or Flujo; per product decision those moods reuse an adjacent repertoire (Flujo takes Foco's, Calma takes Relax's, Energía takes Alegría's) rather than sitting empty.
- No case studies, testimonials, carrier names, or real usage data on hand; do not fabricate any of these.
- Existing implemented visual system (disc/vinyl-cover metaphor, ink-tinted mood covers, Fraunces/Work Sans/IBM Plex Mono type system) is documented separately as incumbent design authority, not product truth.

## Product Principles

- Zero friction to sound: mood card tap → matching audio, no login, no search-first flow, no free text, no AI mood description.
- Distribution, not novelty, is the business differentiator — design should not chase "unlike Spotify/Calm" feature claims.
- Mobile phone, one-handed, is the default and dominant context — design and test mobile-first.
- Data shape is written for an eventual WordPress swap; keep `fetch*` functions as the only seam that should need to change.
- Never assume a literal physical club/kiosk experience; "club" is a product-line label only.

## Accessibility & Inclusion

No product-specific accessibility requirement has been confirmed yet; treat as an open decision rather than assuming a specific standard (e.g. WCAG level) is mandated.
