# PULSE

Niche habit tracker. Daily check-in + per-habit consistency graph. Cyan-on-near-black LED Jarvis aesthetic. Built to live on your home screen.

## What it does
- Add 3–5 habits
- Tap each one daily — current streak appears next to it
- Long-press a habit to open the detail view: 12-month GitHub-style consistency heatmap + smooth 30-day rolling-completion area chart + 4 stats (current streak / best streak / total days / 30-day %)

## Stack
- Single-file vanilla PWA (HTML/CSS/JS, no build step, no framework)
- localStorage only — never leaves the device
- Service worker for offline + add-to-home-screen install
- Inter + Instrument Serif (italic accent) + JetBrains Mono via Google Fonts

## Run locally
Open `index.html` directly, or:
```bash
python -m http.server 5052
```

## Install on phone
1. Deploy somewhere (GitHub Pages, Vercel, anywhere static)
2. Open the URL on phone
3. Share menu → Add to Home Screen
4. Opens fullscreen, works offline

## Files
- `index.html` — entire app (HTML + CSS + JS)
- `manifest.json` — PWA install metadata
- `service-worker.js` — offline cache
- `icon.svg` — pulse-line app icon
- `README.md` / `CLAUDE.md`

## Privacy
All data lives in your browser's localStorage. Same URL on two devices = separate data on each. To back up: DevTools → Application → Local Storage → copy the `pulse.habits` JSON.

## Aesthetic
Single-color theme. Cyan `#00e0ff` accent on `#020510` near-black background. Aurora drift + scanline overlay + HUD corner brackets. Display serif for habit names, mono for numerics. Subtle haptic + amber burst + chord on streak milestones (7d / 30d / 100d).
