<div align="center">

# `● PULSE`

**Niche habit tracker with a per-habit consistency graph.**
Single-file PWA · cyan-on-black LED Jarvis aesthetic · offline-first · installable.

[**Live demo →**](https://zachwenger.github.io/pulse/) &nbsp; · &nbsp; [Source](https://github.com/zachwenger/pulse) &nbsp; · &nbsp; [Roadmap](#roadmap)

</div>

---

## Why I built this

I bounced between five habit-tracker apps over the past year and uninstalled every one for the same reason: **they all bury the streak under dashboards**. A habit tracker only has to do two things — let me tap a habit fast, and show me whether I'm actually consistent. Everything else is theater.

PULSE is the version I wanted. Three to five habits, one tap each, a 12-month consistency graph per habit, nothing else.

Built as a single `index.html` PWA in a weekend. No build step, no framework, no backend, no analytics, no auth, no servers. The app is the file.

## Features

- **One-tap daily check-in.** 36px tap circle, haptic feedback, cyan particle burst on streak milestones (7d / 30d / 100d).
- **21-day inline trail** on every habit row — a smoothed 3-day intensity window so you can read the rhythm without opening anything.
- **Per-habit detail view** (long-press a row): 12-month GitHub-style heatmap + 30-day rolling-7-day completion area chart + 4 stats (current streak / best streak / total days / 30-day %).
- **Adaptive headline** — `Run the list.` → `2 left.` → `Locked in.` based on today's progress.
- **Single-file offline PWA.** Install to home screen, works on a plane.
- **Local-only data.** Nothing leaves your device. No accounts.
- **Adds to home screen.** Standalone display, splash-screen, app icon.

## See it live

> Hit the [**live demo**](https://zachwenger.github.io/pulse/) on your phone. Add to home screen. Done.

Three seed habits drop in on first run so the consistency trails aren't empty. Tap a row to mark today done, long-press for the per-habit graph. Reset anytime from the `?` menu.

## Stack

| | |
|---|---|
| Language | Vanilla HTML / CSS / JS — **no build step** |
| Runtime | Browser + Service Worker |
| Storage | `localStorage` |
| Fonts | Inter (body) · Instrument Serif (display italic accents) · JetBrains Mono (numerics) |
| Bundle | Single 24KB `index.html` |
| Dependencies | None |

The whole point was to demonstrate that you don't need React + Tailwind + Vite + Vercel to ship something polished. The constraint is the design.

## Design philosophy

- **One accent color, used with discipline.** `#00e0ff` electric cyan on `#020510` near-black. No gradients fighting each other, no five-color icon system.
- **Mobile-first.** 520px max container, 16px base font, 36px tap targets, ADHD-friendly hierarchy.
- **Motion as status, not decoration.** Animations communicate state changes (200–500ms windows), nothing loops for the sake of looping.
- **Adaptive language.** Headlines, streak captions, and the day-meta pill all shift based on real state.
- **HUD aesthetic.** Corner brackets at viewport edges, scanline overlay, mono caps for system metadata, serif for the human-readable headlines.

## Run locally

```bash
git clone https://github.com/zachwenger/pulse.git
cd pulse
python -m http.server 5052
```

Open `http://localhost:5052`.

## Install on phone

1. Open the [live URL](https://zachwenger.github.io/pulse/) on your phone (Safari iOS or Chrome Android)
2. Share menu → **Add to Home Screen**
3. Opens fullscreen, works offline, syncs nothing

## File structure

```
pulse/
├── index.html        — entire app (HTML + CSS + JS)
├── manifest.json     — PWA install metadata
├── service-worker.js — offline cache (network-first w/ fallback)
├── icon.svg          — pulse-line app icon
├── README.md         — this file
├── LICENSE           — MIT
└── CLAUDE.md         — project notes for AI pair-programming
```

## Privacy

All data lives in `localStorage` on your device. There is no server, no telemetry, no analytics. Same URL on two devices = independent data on each.

To back up: DevTools → Application → Local Storage → copy the `pulse.habits` JSON.

To reset: open the **?** in the header → **Reset data**.

## Roadmap

Possible next, not commitments:

- [ ] Per-habit categories with color tagging
- [ ] Weekly recap PNG export (share to socials)
- [ ] Optional local reminder notifications (PWA push)
- [ ] CSV / JSON export + import
- [ ] Custom heatmap intensity windows
- [ ] Themes (the current cyan stays default)

## Forking this

This is structured as a **baseline template** anyone can fork:

1. Fork the repo
2. Update `manifest.json` (name + short_name)
3. Edit the `:root` CSS variables to pick your own single-color theme
4. Replace the seed habits in `index.html` (search for `Train or move`)
5. Push to GitHub, enable Pages

That's the whole deploy. No CI, no build, no env vars.

## License

[MIT](LICENSE) — do whatever, no warranty.

---

<div align="center">

Built by [Zach Wenger](https://github.com/zachwenger) · [zachwenger.dev@gmail.com](mailto:zachwenger.dev@gmail.com) · [Portfolio](https://zachwenger.github.io/portfolio/)

</div>
