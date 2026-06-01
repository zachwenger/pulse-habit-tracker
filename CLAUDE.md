# PULSE — Project Notes for Claude

Zach's niche habit tracker. Daily check + per-habit consistency graph in a
cyan-on-black LED Jarvis aesthetic. Built to live on his phone home screen.

Lives at `D:\Projects\pulse\` → private repo `github.com/zachwenger/pulse`.

## Why this exists
Spinoff from the CORE dashboard. CORE got too big — Zach wanted something
focused on the ONE thing: tracking habit consistency with a beautiful
per-habit graph. Daily phone use. ADHD-friendly, instant, no friction.

## Stack
Single-file vanilla PWA. `index.html` has all HTML + CSS + JS. No build,
no framework, no dependencies beyond Google Fonts.

## Design language (locked)
- **Palette**: pure cyan-on-near-black, single accent
  - `--cy: #00e0ff` electric cyan
  - `--cy-hi: #80f0ff` bright cyan
  - `--bg: #020510` near-black
  - text: `#fff` / `#c8d4f0` / `#7a89b8` ladder
- **Fonts**: Inter body 16px (ADHD-friendly), Instrument Serif for habit
  names + italic accents in the headline, JetBrains Mono for streak nums,
  date meta, stat values
- **Aesthetic effects**: aurora orb drift (24s), scanline overlay (4%
  opacity), HUD corner brackets at viewport edges, cyan glow on done
  habits, cyan border-glow on hover, subtle particle burst (14 cyan dots)
  on streak milestones
- **Mobile-first**: max-width 520px container, 16px+ font, 36px tap
  targets on habit check circles, 56px FAB

## Layout
1. **Header**: `● PULSE` logo (left) + `SAT MAY 31 · SYS LIVE` (right)
2. **Hero**: adaptive headline (`Hold the line` / `Run the list` / `N left` / `Locked in`) + 3 meta pills (N active / N done / Nd best)
3. **Habits list**: each row = 36px tap-circle + serif name + streak badge + 21-day inline trail (3-day window smoothed intensity)
4. **Add row**: input + amber-cyan gradient ADD button
5. **FAB** bottom-right: focuses the add input

## Detail view (long-press a habit row OR tap the streak text)
- Title in 48px serif
- 4-stat grid: Current / Best / Total / 30-day %
- Smooth 30-day rolling-7-day completion area chart (gradient line + glow + filled area)
- 12-month GitHub-style heatmap (52×7) with intensity bands
- Heat range label + less→more legend
- Rename + Delete buttons (top right)
- Back button (top left)
- Esc closes

## Streak logic
- `streak()` counts consecutive days ending today (or yesterday if today
  not done — so live streak doesn't appear broken mid-day)
- `bestStreak()` walks sorted log, tracks longest consecutive run
- `pct30()` counts unique done days in last 30
- Heat intensity bands: 3-day window — `done && win3=l4`, `done && win2=l3`,
  `done && win1=l2`, `!done && win≥1=l1`, else empty

## Run locally
Launch config in `~/.claude/launch.json` as `"pulse"` on port 5052.
```bash
python -m http.server 5052
```

## Deploy
Static. Drop on GitHub Pages, Vercel, anywhere. Private repo per CLAUDE.md
(personal app, not cybersec → private).

## Memory pointers
- Global CLAUDE.md: `~/.claude/CLAUDE.md`
- CORE (sibling project, the bigger dashboard): `D:\Projects\core\CLAUDE.md`
- This was spun off from CORE on 2026-05-31 when Zach asked for a focused
  habit tracker after CORE got too feature-heavy
