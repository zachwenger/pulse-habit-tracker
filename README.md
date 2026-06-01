<div align="center">

# `● PULSE`

**Minimal habit tracker with a per-habit consistency graph.**
Single-file vanilla PWA · offline · installable · MIT.

[**Live demo →**](https://zachwenger.github.io/pulse-habit-tracker/) &nbsp; · &nbsp; [Source](https://github.com/zachwenger/pulse-habit-tracker) &nbsp; · &nbsp; [Roadmap](#roadmap)

</div>

---

## What it is

A focused habit tracker. Three to five habits, one tap per habit per day, a beautiful per-habit consistency graph behind every row. Optional measurement targets (water, pages, time, distance) with smart tap-to-tally. No accounts, no servers, no telemetry. The whole app is one `index.html` file (~28KB) plus a service worker and an icon.

Built as a portfolio-grade open-source habit tracker. Forkable as a baseline template — pick your accent color, edit the seed habits, drop on GitHub Pages, done.

## Live demo

[`zachwenger.github.io/pulse-habit-tracker`](https://zachwenger.github.io/pulse-habit-tracker/)

Open on your phone → Share menu → **Add to Home Screen** → installs as a real PWA: standalone display, custom splash, offline-first.

---

## Features

### Habit modes

| Mode | Use it for | How it works |
|---|---|---|
| **Yes / No** *(default)* | Simple daily checks — "Train", "Sleep by 12", "Meditate" | Tap the check circle = mark today done. Tap again = undo. |
| **Quantitative** | Things you measure — "Drink 64 oz", "Read 20 pages", "Walk 10k steps" | Pick a unit when adding the habit. Tap the circle = adds **one step** toward the target (silently). When today's total crosses the target, the day marks done + streak ticks up. |
| **Negative** ("Avoid it") | Things you're trying to *not* do — "Phone in bed", "Soda", "Doomscroll" | Pick "Avoid it" when adding the habit. Tap the circle = "I stayed clean today". Streak label flips to **"Xd clean"**. Row gets a red border accent + cyan→green check on success, red glow if broken. |

### Time-of-day groups

Every habit gets assigned to a group when you add it — **Morning**, **Afternoon**, **Evening**, or **Anytime**. The home screen auto-sorts habits under section headers (`MORNING · 2`, `EVENING · 3`, `ANYTIME · 1`). Skips empty groups. Removes mental load — no manual reorder.

### Per-habit color

Each habit can pick its own accent from a 6-color palette: **cyan · pink · lime · amber · violet · rose**. The check circle, progress bar, intensity trail, and detail-view glow all use that habit's color. The active theme still controls the overall vibe (background, header, hunter pill) — habits just tag with their personal accent.

### Reminder notifications

Tap the **bell icon** next to any time-of-day group header to enable PWA push notifications for that slot. Default reminder hours: **Morning 8:00 · Afternoon 13:00 · Evening 19:00**.

- First time → prompts for browser notification permission
- When the hour hits, a notification fires: `PULSE — Morning · 2 habits waiting: Train, Read…`
- Tapping the notification focuses (or opens) the app
- Dedup'd per day so it never fires twice
- Background notifications require the PWA installed to home screen (Chrome / Edge / Safari iOS 16.4+)
- A subtle "Enable reminders" banner appears once if you haven't dismissed it

### Unit dropdown (when adding a habit)

10 categorized presets, each with a smart default target + per-tap step:

```
Count    ·  reps          100 / +10
Count    ·  pages         20  / +5
Count    ·  steps         10000 / +1000
Time     ·  min           30  / +5
Time     ·  hrs           1   / +0.25
Volume   ·  glasses       8   / +1
Volume   ·  oz            64  / +8
Volume   ·  ml            2000 / +250
Distance ·  km            5   / +1
Distance ·  mi            3   / +1
```

Pick a unit → a **Daily goal** card materializes with the target prefilled and editable + per-tap step preview + clear button.

Skip the dropdown for a simple yes/no habit.

### Per-habit visualization

- **21-day inline trail** on every yes/no row — smoothed 3-day intensity window shows your rhythm at a glance without opening anything. Today cell outlined in the active theme color.
- **Live progress bar** on every quantitative row — animated cyan-gradient bar fills as you tap. Pulses when target hits. Shows `24 / 64 oz` + `TAP +8 oz` hint inline.

### Detail view (one tap)

Tap the habit name OR the `›` chevron on the right of any row to open:

- **Habit title** (rename via the **Rename** button top right)
- **Target line** if it's a quantitative habit (e.g. `TARGET 64 oz / DAY`)
- **4-stat grid**: Current streak / Best streak / Total days / 30-day %
- **Best days** — 7-bar weekday consistency chart for the last 90 days. Peak weekday gets the bright accent.
- **12-month heatmap** — GitHub-style 52×7 grid with 4 intensity bands + today outline + less→more legend
- **30-day rolling-7-day completion area chart** — smoothed cyan line + glow + filled gradient
- **Rename / Delete** buttons top right
- **Esc** or the **←** back button closes

### Themes

Tap a colored dot in the header to switch the entire palette live:

| Dot | Theme | Accent |
|---|---|---|
| 🔵 Cyan *(default)* | Electric LED blue | `#00e0ff` on `#020510` |
| 🩷 Pink | Neon hot pink | `#ff3ea0` on `#0f0512` |
| ⚪ Mono | Pure white LED | `#ffffff` on `#050505` |

Selection persists. PWA `theme-color` meta updates live so your phone status bar tints with the chosen theme.

### Hunter system (Solo Leveling layer)

Silent gamification — doesn't interrupt the daily flow.

- **XP per action** — habit check = `+10 XP`. Streak milestones layer on `+50` at 7 days, `+200` at 30, `+1000` at 100.
- **Level system** — level `n` needs `floor(80 × n^1.5)` XP cumulative.
- **Ranks** — `E` (LV 1–7) → `D` (8–14) → `C` (15–24) → `B` (25–39) → `A` (40–59) → `S` (60+).
- **Codenames evolve with rank** — `Initiate` → `Steady Hand` → `Pattern Holder` → `Iron Will` → `Discipline Sage` → `Shadow Monarch`.
- **Header pill** — always shows `E LV.5` (rank badge + level). Tap to open the full status overlay.
- **Status overlay** — hexagonal rank badge, level + rank caption, codename, animated XP bar with shimmer, 3-stat grid (Total XP / Top streak / Days logged).
- **Level-up popup** — fullscreen Solo Leveling-style system window with corner brackets, particle burst, haptic pattern, "Acknowledge" close. Rank-ups get a special "Hunter Rank Up" header.

### Adaptive headline

The hero text shifts based on today's progress:
- No active habits → `Hold the line.`
- Nothing done yet → `Run the list.`
- Some done, some left → `N left.`
- All done → `Locked in.`

### Premium polish layer

Every interaction has motion. Designed to feel like a paid app, not a side project.

- **Spring physics on every tap** — check circle bounces, FAB depresses, theme dots punch in/out (cubic-bezier `.34, 1.56, .64, 1`)
- **Staggered entrance animations** — habit rows fade up in waves (50ms apart) on first paint, stat cards stagger in on detail open, weekday bars grow up sequentially, heatmap cells animate per index
- **Number tick-up** — current streak, best streak, total days, and 30-day % all count up smoothly from 0 to their value (800ms cubic ease-out) when the detail view opens
- **Live SVG line draw** — the 30-day completion chart draws progressively from left to right with stroke-dashoffset trick (1.4s ease), the dot pops in at the end
- **Card depth on hover** — habit rows lift 1px + show a soft shadow + accent inner border glow
- **Tap ripple** — checking off a habit fires a radial accent-color pulse outward from the circle
- **Progress bar shimmer** — quantitative habits' progress bars have a moving sheen overlay
- **Logo dot breathe** — pulses scale + opacity + glow on a 3s loop
- **Hero sheen** — italicized accent words on the headline get a periodic 14s gradient sweep
- **Bell ring animation** — toggling a time-of-day reminder makes the bell shake side to side before re-rendering
- **Glass top highlight** — every card has a faint glossy 1px top edge for material depth
- **Smooth scroll** + **text-rendering: optimizeLegibility** + antialiased fonts
- **Respects `prefers-reduced-motion`** — all animations collapse to instant for users with vestibular sensitivity

### Auto-update

PWAs cached aggressively are a real problem — installed users can keep running stale code for weeks. PULSE handles this automatically:

1. On every page load, the page asks the registered service worker to check the server for a newer build (`registration.update()`)
2. If a newer `service-worker.js` is found, the new worker installs in the background
3. The page asks the new worker to `skipWaiting` so it activates immediately instead of waiting for every tab to close
4. The new worker `clients.claim()`s every open page on activate + broadcasts a `pulse-updated` message
5. The page listens for either `controllerchange` or the `pulse-updated` broadcast and reloads silently

Result: **you never need incognito or a manual hard refresh to see the latest version**. Open the app, give it a second, you'll be on the newest code. No "Version A vs Version B" drift between installed PWAs.

The HTML itself is fetched **network-first** (with `cache: 'no-store'`) so even the very first page load on a return visit pulls fresh markup whenever possible. Static assets (icon, manifest, font CSS) use stale-while-revalidate — instant from cache, refreshed in the background.

### About / intro overlay

First-time visitors see a one-shot intro explaining the gestures. The `?` button next to the PULSE logo reopens it anytime. The intro also has a `Reset data` button that wipes localStorage.

---

## All interactions (reference)

| Gesture | Where | Action |
|---|---|---|
| Tap | habit check circle | Mark today done (yes/no) OR add one step (quantitative) |
| Tap | habit name / trail / `›` chevron | Open detail view (chart + stats + rename + delete) |
| Tap | header `?` | Open the About / How-to intro |
| Tap | theme dot | Switch the entire palette + status bar tint |
| Tap | header rank pill | Open Hunter status overlay |
| Tap | FAB `+` bottom-right | Focus the new-habit input |
| Tap | unit dropdown | Pick a measurement unit when adding a habit |
| Tap | goal card `×` | Clear the unit selection (back to yes/no) |
| Tap | tod pills (Morning/etc.) | Assign new habit to a time-of-day group |
| Tap | polarity pills (Do it / Avoid it) | Switch new habit to negative tracking |
| Tap | color swatch | Pick a per-habit accent color |
| Tap | bell next to group header | Toggle reminder notifications for that group |
| Tap | notification banner | Grant notification permission + enable all 3 groups |
| Tap | detail view `←` back | Close the detail |
| **Shift-click** | habit check (quant) | Open custom-amount prompt (desktop) |
| **Long-press 500ms** | habit check (quant) | Open custom-amount prompt (mobile) |
| `Esc` | anywhere | Close the topmost overlay |
| `Enter` | new-habit input | Add the habit |

---

## Streak math

- **`streak(log)`** — consecutive days ending today (or yesterday if today not done — so a live streak doesn't read broken mid-day).
- **`bestStreak(log)`** — walks the sorted log, returns longest consecutive run ever.
- **`pct30(log)`** — unique done days in last 30, as percent.
- **Heat intensity bands** (used on row trail, detail heatmap, weekday bars):
  - `l4` — done today + 3 of the last 3 days were done (peak streak window)
  - `l3` — done + 2 of last 3
  - `l2` — done + 1 of last 3
  - `l1` — not done today but recent activity in the window
  - `(empty)` — no recent activity

---

## Stack

| | |
|---|---|
| Language | Vanilla HTML / CSS / JS — **no build step** |
| Runtime | Browser + Service Worker |
| Storage | `localStorage` only — `pulse.*` namespace |
| Fonts | Inter (body) · Space Grotesk (display) · JetBrains Mono (numerics + UI caps) |
| Bundle | One ~28KB `index.html` + tiny SW + manifest + 1KB SVG icon |
| Dependencies | None (Google Fonts loaded async) |
| License | MIT |

Single-file is the point. No framework, no bundler, no env vars, no CI.

---

## Run locally

```bash
git clone https://github.com/zachwenger/pulse-habit-tracker.git
cd pulse-habit-tracker
python -m http.server 5052
```

Open `http://localhost:5052`.

## Install on phone

1. Open the [live URL](https://zachwenger.github.io/pulse-habit-tracker/) in mobile Safari or Chrome
2. Share menu → **Add to Home Screen**
3. Opens fullscreen, works offline. Same standalone PWA experience as a native app.

---

## File structure

```
pulse-habit-tracker/
├── index.html        — entire app (HTML + CSS + JS)
├── manifest.json     — PWA install metadata (name, theme color, icon)
├── service-worker.js — offline cache (network-first w/ fallback to cache)
├── icon.svg          — pulse-line app icon (cyan SVG with glow)
├── README.md         — this file
├── LICENSE           — MIT
├── CLAUDE.md         — project notes for AI pair-programming
└── .gitignore
```

---

## Privacy

All data lives in `localStorage` on your device under the `pulse.*` namespace. No server, no telemetry, no analytics, no accounts. Same URL on two devices = independent log on each.

**Back up:** DevTools → Application → Local Storage → copy the `pulse.habits` and `pulse.xp` JSON values.

**Reset everything:** Open the `?` → **Reset data** button.

## Security

Full threat model + hardening checklist in [SECURITY.md](SECURITY.md). TL;DR:

- **Strict CSP** meta tag: `default-src 'self'`, no remote scripts, no `eval`, no `unsafe-eval`, fonts only from Google Fonts CDN
- **`frame-ancestors 'none'`** — clickjacking blocked
- **`Permissions-Policy`** denies geolocation / mic / camera / payment / USB / accelerometer
- **`Referrer-Policy: no-referrer`** — never leaks current URL on outbound requests
- **Single `esc()` chokepoint** — every user-string rendered through one HTML-entity escape (the single XSS chokepoint)
- **`validateHabit()` on every load** — drops malformed entries from tampered storage, clamps numeric fields to hard limits (30 habits max, 60 char name, 4000 log entries, etc.), restricts color/tod/polarity to enum values
- **Storage-blowup-proof** — `HARD_LIMITS` cap every user-influenced size
- **No `eval`, no `Function()`, no remote scripts**
- **Type-check on JSON.parse** — `Store.get` rejects parsed payloads that don't match the default's typeof (prototype-pollution-style defense)

To report a vulnerability, email `zachwenger.dev@gmail.com` with `[PULSE security]` in the subject. Don't open a public issue with exploit details.

---

## Roadmap

Possible next moves — not commitments:

- [x] **Negative habits** ✓
- [x] **Per-habit color** ✓
- [x] **Time-of-day grouping** ✓
- [x] **Reminder notifications** ✓ (per-group bell toggles, foreground tick fires + SW notificationclick focuses app)
- [ ] **Quality rating on check** (1-tap good day / neutral / bad day)
- [ ] **"Why" note per habit** (small line under the name explaining motivation)
- [ ] **Cross-habit correlation insights** (e.g. "you hit your reading goal 87% of the time when you also sleep by 12")
- [ ] **Streak insurance** (designate N rest days/month that don't break streak)
- [ ] **Year-in-review PNG export** (annual share card)
- [ ] **CSV / JSON export + import**

---

## Forking this

This is structured as a **baseline template**:

1. Fork the repo
2. Update `manifest.json` (`name`, `short_name`, `theme_color`)
3. Edit the `:root` CSS variables to pick your accent (`--cy`, `--cy-hi`, `--cy-dim`, `--cy-rgb`, `--cy-hi-rgb`, `--bg`) — or add a new theme block
4. Replace the seed habits in `index.html` (search for `Train or move`)
5. Optionally trim the `UNIT_PRESETS` list to just the units you care about
6. Push to GitHub, enable Pages

That's the whole deploy. No CI, no build, no env vars.

---

## License

[MIT](LICENSE) — do whatever, no warranty.

---

<div align="center">

Built by [Zach Wenger](https://github.com/zachwenger) · [zachwenger.dev@gmail.com](mailto:zachwenger.dev@gmail.com)

</div>
