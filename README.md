# ADHD – Late Diagnosis

A 7-slide deck for a workplace Men's Health session about a late ADHD
diagnosis at 49. Personal, true story, told to ~50 colleagues on a video call.

Mirrors the methodology of [`mcleo-d/london-js-slides`](https://github.com/mcleo-d/london-js-slides):
**no build step**, React 18 + Babel standalone from CDN, JSX transpiled in
the browser. Same `deck-stage.js` web component (slightly extended for
`S`-key speaker notes), same `reveals.js` staggered entry animations, same
`tokens.css` design-tokens pattern.

## Stack

| Technology | Role |
|---|---|
| React 18 (CDN) + Babel standalone | UI / JSX transpiled in-browser |
| `deck-stage.js` | Web component: keyboard nav, viewport scaling, **speaker notes**, PDF print |
| `reveals.js` | MutationObserver-based staggered entry animations |
| `tokens.css` | Design tokens (Linear-style near-black, indigo accent) |
| Google Fonts | Inter (display) · JetBrains Mono (mono accents only) |

## Running locally

```bash
python3 -m http.server 8765
```

Then open: <http://localhost:8765/ADHD%20Talk%20-%20Late%20Diagnosis.html>

> **Why a server?** Babel standalone fetches the `.jsx` file via XHR; it
> cannot run from `file://`. Any static HTTP server works.

## Navigation

| Key | Action |
|---|---|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `S` | Toggle speaker notes overlay |
| `P` | Print / export to PDF |
| `R` | Reset to first slide |
| `Home` / `End` | First / last slide |
| `1`–`7` | Jump to slide |

## Slides

| # | Label | Content |
|---|---|---|
| 01 | Title / Montage | Placeholder for photo montage; one line of framing copy |
| 02 | Two versions of me | Two-column comparison; the right column carries the cost |
| 03 | The wall | Typography-only, deepest tone, three lines that breathe (de-personalised) |
| 04 | A different operating system | Before/after reframe; small audio-clip cue |
| 05 | What changed | Understanding / Medication / The difference |
| 06 | What good support looks like | Three asks of the room + the closing anchor |
| 07 | If any of this resonated | Disclaimer + resources list + human closing line |

## Speaker notes

The `S` key opens a notes overlay anchored to the bottom of the viewport.
Notes are embedded **verbatim** from `adhd-talk-speaking-notes.md`. All
bold-quote markers, `[PAUSE]` cues, and the Spotify clip cue
(`2WwEe8tImYLtlPScYzK5db`, 1:30 → ~14:50) are preserved.

The overlay supports lightweight markdown rendering for the bold-quote and
italic-cue conventions used in the source notes file: `**bold**`,
`*italic*`, `` `code` ``, and `[PAUSE]` markers.

## Placeholders to fill in before delivery

- **Slide 01:** drop in the photo montage (full bleed behind the title text).
- **Slide 04:** the audio clip itself; the slot is wired in the lower-right.
- **Slide 07:** verify each charity link and re-check the current NHS Right to Choose position before delivery.

## Brand assets

There are none. The London.js version of this deck had partner logos
(Motorway / Omnea) that are not MIT-licensed; those have been dropped, as
have the meetup-specific `tweaks-panel.jsx` controls. Everything in this
repo is original to this talk.

## Licence

This deck is personal content. Released under MIT in line with the parent
deck system, but the photos / speaker notes / talk content remain the
author's own.
