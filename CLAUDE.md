# CLAUDE.md

Agent instructions for the **ADHD – Late Diagnosis** deck.

## Project overview

A 7-slide browser-based presentation (no build step) for a workplace Men's
Health session about a late ADHD diagnosis. Personal talk delivered to
~50 colleagues on a video call.

**Stack:** HTML + React 18 (CDN) + Babel standalone
**Dev server:** `python3 -m http.server 8765` from project root
**Entry point:** `ADHD Talk - Late Diagnosis.html`

### Key files

| File | Purpose |
|---|---|
| `slides.jsx` | All 7 slide components (`S00_Title` … `S06_Resources`). Slide 6 is `S05_GoodSupport`, the climax of the deck. |
| `deck-stage.js` | Web component: keyboard nav, scaling, **speaker notes (S key)**, PDF print |
| `reveals.js` | Staggered entry animations |
| `tokens.css` | Design tokens (Linear-style near-black + indigo) |
| `ADHD Talk - Late Diagnosis.html` | Entry HTML; embeds speaker notes JSON |

## House style: apply consistently to every slide

- **Palette (v2 · Linear-style):** near-black cool-tinted base (`var(--bg)` /
  `var(--bg-quiet)`), raised surfaces (`var(--bg-lift)`), crisp off-white text
  (`var(--ink)`), muted grey for secondary (`var(--ink-soft)`). Single accent:
  indigo/violet (`var(--accent)` = `#6C5CE7`) used sparingly: pivots, anchors,
  the slide's "moment". Do not introduce a second accent hue.
- **Type:** Inter (Google Fonts); humanist grotesk, tight letter-spacing
  (-0.025em on display). JetBrains Mono is reserved for small, wide-tracked
  eyebrows and structural labels. Large type. This is viewed on a video
  call, so prioritise legibility over density.
- **Whitespace:** generous. Few words per slide. One idea per slide.
- **Structural rhythm:** hairline 1px rules + faint card surfaces are
  on-brand. Avoid heavy glows. Motion is crisp (500ms slow, 80ms stagger),
  not floaty.
- **No clichés:** no cartoon brains, puzzle pieces, lightbulbs, no stock photos.
- **Contrast:** must pass WCAG AA against the background.

## Privacy

The deck contains **no reference to family**. The "wall" slide (S02) uses
de-personalised wording ("someone close to me was diagnosed"); the photo-of-son
slide from v1 is gone, replaced by `S05_GoodSupport`. If editing the deck or
the speaker notes, scan for "son / my boy / child / him" tied to family and
neutralise. This rule overrides all aesthetic concerns.

## Speaker notes

Embedded **verbatim** from `adhd-talk-speaking-notes.md` in the
`<script type="application/json" id="speaker-notes">` tag in the entry
HTML. The notes overlay supports lightweight markdown:
- `**bold**` → highlighted (verbatim quote lines)
- `*italic*` → soft (cue / stage direction)
- `` `code` `` → mono (Spotify episode ID, clip times)
- `[PAUSE]` → amber pill

When editing the deck, keep the notes array exactly aligned to slide order
(index 0 = slide 1). The `[PAUSE]` markers and the clip cue MUST remain.

## Known issues & lessons learned (inherited from london-js-slides)

### Curly/smart quotes break Babel standalone JSX parsing
**Symptom:** Slides go blank. Browser console shows
`Uncaught SyntaxError: Unexpected character '"'`.

**Cause:** The Edit tool can silently substitute Unicode curly quotes
(`"` U+201C, `"` U+201D) in place of straight ASCII double quotes
(`"` U+0022) when writing JSX string attribute values.

**Prevention:** For abstract/bio content containing double quotes, always
use JSX expression syntax with a template literal (e.g.
``abstract={`text with "quotes" inside`}``); never escaped `\"` inside a
double-quoted attribute.

### Cache-bust on every slides.jsx edit
Bump the `?v=N` cache-bust on the `<script>` tag in
`ADHD Talk - Late Diagnosis.html` after every edit to `slides.jsx` so the
browser fetches the updated file.

## Slide order (v2)

Play order is the document order of the `<section>` elements inside
`<deck-stage>` in `ADHD Talk - Late Diagnosis.html`, NOT the `slides.jsx`
`window.Slides` key order. The current order is:

1. `S00_Title`: Title / Montage
2. `S01_TwoVersions`: Two versions of me
3. `S02_TheWall`: The wall (de-personalised, no family reference)
4. `S03_OperatingSystem`: A different operating system (+ Spotify clip cue)
5. `S04_WhatChanged`: Understanding / Medication / The difference
6. `S05_GoodSupport`: What good support looks like (climax)
7. `S06_Resources`: If any of this resonated

When adding/removing slides, update every component's `label="NN / 7"` prop
to reflect the new total.

## Acceptance checks before any release

1. Opens and runs from a local static server with no build step.
2. All 7 slides present, in order, with correct wording.
3. Keyboard navigation works (`←`/`→`/`Space`/`Home`/`End`/digits).
4. `S` key opens speaker-notes overlay for every slide, with verbatim
   content from `adhd-talk-speaking-notes.md` (privacy-scrubbed), including
   `[PAUSE]` markers and the Spotify clip cue.
5. `P` exports a clean PDF (one slide per page, no chrome).
6. **No reference to family anywhere**: slides, captions, or notes.
7. NHS Right to Choose carries no URL (it is not adhduk.co.uk).
