# Security policy

PULSE is a fully client-side, offline-first PWA. There is no server, no
auth, no backend storage. All data lives in your device's `localStorage`
under the `pulse.*` namespace. Nothing leaves the device.

## Threat model

What the app actually has to defend against:
- **XSS via user-controlled habit names / units / qty values** — single-
  origin app, but a sloppy `innerHTML` could let a habit name like
  `<img src=x onerror=…>` execute. Mitigated by the single `esc()`
  HTML-entity chokepoint that every user-controlled string passes
  through before render.
- **Storage tampering** — anyone with devtools can edit `localStorage`.
  `validateHabit()` runs on every load, drops malformed entries,
  clamps numeric fields, restricts enum fields (color / tod / polarity)
  to the allowed values, and rejects log-date strings that don't match
  the `YYYY-MM-DD` format.
- **Storage blowup / DoS** — bounded everywhere: max 30 habits, max
  60 chars per name, max 12 chars per unit, max 4000 log entries per
  habit, max 1,000,000 per qty cell. Hard limits in `HARD_LIMITS`.
- **Cross-origin attacks** — strict `Content-Security-Policy` meta tag
  blocks loading anything off-origin except Google Fonts CSS/woff2 +
  `data:` images. `frame-ancestors 'none'` prevents clickjacking.
  `form-action 'none'` blocks form-action hijacking. `base-uri 'self'`
  blocks `<base>` injection.
- **Permission abuse** — explicit `Permissions-Policy` meta denies
  geolocation, microphone, camera, payment, USB, accelerometer.
  Notifications still require an explicit user permission prompt.
- **Referrer leakage** — `<meta name="referrer" content="no-referrer">`
  + `referrerpolicy="no-referrer"` on the Google Fonts link.
- **Subresource tampering** — Google Fonts CSS rotates so SRI hashes
  aren't practical; the CSP `font-src` allowlist limits the blast
  radius if Google Fonts ever serves malicious CSS.
- **Service-worker hijack** — only `'self'` workers allowed per CSP
  `worker-src`. The SW itself only caches same-origin assets.
- **Prototype-pollution-style storage swaps** — `Store.get` type-checks
  the parsed value against the default's typeof before returning.

## What's out of scope

- **Local malware on your device** — if something else can read your
  browser storage, this app can't protect against that
- **Browser bugs** — fully a browser-vendor problem
- **Physical access to your unlocked device** — same
- **Network-level attacks** — TLS is the host's job (GitHub Pages does
  HTTPS by default)

## Reporting a vulnerability

If you find a security issue, open a private email to
`zachwenger.dev@gmail.com` with `[PULSE security]` in the subject.
Don't open a public issue with exploit details. Will respond inside
one week.

## Hardening checklist (already shipped)

- [x] CSP meta tag with `default-src 'self'`, no inline `eval`, no
      `unsafe-eval`, no remote scripts
- [x] `X-Content-Type-Options: nosniff` meta
- [x] `Permissions-Policy` meta blocking unused powerful features
- [x] `Referrer-Policy: no-referrer`
- [x] `frame-ancestors 'none'` (anti-clickjack)
- [x] Single `esc()` chokepoint for all user-string render
- [x] `Store.get` type-checks parsed payload against default type
- [x] `validateHabit()` on every load — drops/repairs malformed
- [x] `HARD_LIMITS` cap on habits, name length, log length, qty value,
      target, step
- [x] `safeStr()` strips control bytes `\x00-\x1f` + DEL `\x7f` from
      every string field
- [x] Date strings validated against `^\d{4}-\d{2}-\d{2}$` regex
- [x] Color / tod / polarity restricted to enum values on load + save
- [x] Service worker scope locked to `./`
- [x] No `eval`, no `Function()`, no `innerHTML` without `esc()`
- [x] No external API calls (`connect-src 'self'`)
- [x] Notifications require explicit user permission
