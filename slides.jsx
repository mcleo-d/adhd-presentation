/* global React */
/* ============================================================================
 * ADHD — Late Diagnosis · Slides (v2 · Linear-style)
 * ----------------------------------------------------------------------------
 * Seven slides for a workplace Men's Health session.
 *
 * House style (v2): Linear-style precision. Near-black cool-tinted base,
 * single indigo/violet accent used sparingly, crisp off-white text. Hairline
 * rules, faint surfaces, no heavy glows. Type is tight, mono eyebrows are
 * small and wide-tracked.
 *
 * Architecture mirrors mcleo-d/london-js-slides: each slide is a React
 * component exported on window.Slides; play order is fixed by <section>
 * order in the entry HTML.
 *
 * Privacy: this deck contains no reference to family. The "wall" slide
 * is now de-personalised; the previous photo-of-son slide has been
 * replaced with "What good support looks like".
 * ========================================================================= */

const { useEffect, useState } = React;

// --- Type, spacing, colour systems ------------------------------------------
const TYPE = {
  display: 176,
  title: 88,
  subtitle: 56,
  lead: 40,
  body: 28,
  small: 24,
};

const SPACE = {
  padX: 140,
  padY: 120,
  padBottom: 110,
};

const C = {
  // Colours read live from CSS custom properties on :root so the Tweaks panel
  // can swap them at runtime without re-rendering every slide. tokens.css owns
  // the defaults; tweaks-panel.jsx + the App wrapper in the entry HTML mutate
  // them on the document element.
  bg:        'var(--bg)',
  bgQuiet:   'var(--bg-quiet)',
  bgLift:    'var(--bg-lift)',
  bgLift2:   'var(--bg-lift-2)',

  ink:       'var(--ink)',
  inkSoft:   'var(--ink-soft)',
  inkMute:   'var(--ink-mute)',

  rule:        'var(--rule)',
  ruleStrong:  'var(--rule-strong)',
  ruleBright:  'var(--rule-bright)',

  accent:      'var(--accent)',
  accentDeep:  'var(--accent-deep)',
  accentSoft:  'var(--accent-soft)',
  accentGlow:  'var(--accent-glow)',
};

// Display sans + mono are loaded from Google Fonts in the entry HTML.
const FONT_DISPLAY = '"Inter", system-ui, -apple-system, sans-serif';
const FONT_MONO    = '"JetBrains Mono", ui-monospace, monospace';

// --- Atoms -------------------------------------------------------------------

const Frame = ({ bg = C.bg, ink = C.ink, children, label = '' }) => (
  <div style={{
    position: 'absolute', inset: 0,
    background: bg, color: ink,
    fontFamily: FONT_DISPLAY,
    fontFeatureSettings: '"ss01", "cv11"',
    overflow: 'hidden',
  }}>
    <Chrome ink={ink} label={label} />
    {children}
  </div>
);

// Minimal slide-counter chrome in the top-right.
const Chrome = ({ ink, label }) => (
  <div style={{
    position: 'absolute', top: 56, right: SPACE.padX,
    fontFamily: FONT_MONO,
    fontSize: 24, letterSpacing: '0.22em',
    color: ink, opacity: 0.32,
    textTransform: 'uppercase',
  }}>
    {label}
  </div>
);

const Mono = ({ children, style }) => (
  <span style={{
    fontFamily: FONT_MONO,
    letterSpacing: '0.16em',
    ...style,
  }}>{children}</span>
);

// Small, wide-tracked, uppercase mono — used for column eyebrows and section
// labels. Linear leans on this convention heavily.
const Eyebrow = ({ children, color = C.inkMute, style }) => (
  <Mono style={{
    fontSize: 24,
    color,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    fontWeight: 500,
    ...style,
  }}>{children}</Mono>
);

// Hairline rule — Linear's structural workhorse.
const Hairline = ({ color = C.ruleStrong, style }) => (
  <div style={{
    height: 1, width: '100%',
    background: color,
    ...style,
  }} />
);

// Striped placeholder for the photo montage the speaker drops in themselves.
const PhotoSlot = ({ caption = 'photo', style, captionPosition = 'corner' }) => (
  <div style={{
    position: 'relative',
    background: `repeating-linear-gradient(135deg,
      rgba(237,238,242,0.03) 0 12px,
      rgba(237,238,242,0.05) 12px 24px)`,
    border: `1px solid ${C.rule}`,
    color: C.inkMute,
    overflow: 'hidden',
    ...style,
  }}>
    <div style={{
      position: 'absolute',
      ...(captionPosition === 'center'
        ? { inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        : { bottom: 18, left: 22 }),
    }}>
      <Mono style={{
        fontSize: 24,
        color: C.inkMute,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        opacity: 0.7,
      }}>[ {caption} ]</Mono>
    </div>
  </div>
);

// =============================================================================
// S00 — Title / Montage
// Photo montage placeholder dominates. One line of framing copy along the
// bottom. Designed to be unobtrusive so the photos do the work.
// =============================================================================
function S00_Title() {
  return (
    <Frame label="01 / 07">
      {/* Full-bleed montage — the user's own collage of life-spanning photos.
          object-fit: cover crops to fill the landscape slide (the source is
          portrait), centering vertically. A bottom-anchored gradient fades
          into the page bg so the title block stays legible. */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          src="assets/montage.png"
          alt="A lifetime of photos"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            // Slight desaturation + gentle warmth bridges the disparate
            // colour casts in the original snapshots.
            filter: 'saturate(0.92) contrast(1.02)',
          }}
        />
        {/* Bottom-to-top dark gradient overlay for text legibility. Pure black
            with alpha so it works under either the cool or warm theme tone;
            the very bottom resolves to var(--bg) so the slide bleeds clean. */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.15) 35%,
            rgba(0, 0, 0, 0.55) 60%,
            rgba(0, 0, 0, 0.88) 80%,
            ${C.bg} 100%)`,
        }} />
      </div>

      {/* Title text block — sits on top of the gradient, anchored bottom-left. */}
      <div style={{
        position: 'absolute',
        left: SPACE.padX, right: SPACE.padX, bottom: SPACE.padBottom,
      }}>
        <div data-reveal style={{ ['--reveal-i']: 0 }}>
          <h1 style={{
            margin: 0,
            fontSize: 64, lineHeight: 1.2,
            fontWeight: 600, letterSpacing: '-0.025em',
            color: C.ink, textWrap: 'balance',
            maxWidth: 1500,
            // Soft drop shadow so the type holds against any photo behind it.
            textShadow: '0 2px 24px rgba(0, 0, 0, 0.6)',
          }}>
            ADHD was in every one of these photos.
            <br />
            <span style={{ color: C.accent }}>I just didn't know it yet.</span>
          </h1>
        </div>
        <div data-reveal style={{ ['--reveal-i']: 1, marginTop: 40, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <span style={{ fontSize: TYPE.body, fontWeight: 500, color: C.ink, letterSpacing: '-0.005em' }}>
            James McLeod
          </span>
          <span style={{
            width: 1, height: 22,
            background: C.ruleStrong, display: 'inline-block',
          }} />
          <span style={{
            fontSize: 24, fontWeight: 400,
            color: C.inkSoft, letterSpacing: '-0.005em',
          }}>
            Men's Health Support Circle &ndash; Understanding ADHD
          </span>
        </div>
      </div>
    </Frame>
  );
}

// =============================================================================
// S01 — Two versions of me
// Two-column comparison. Left column is the bland mask (one line). Right
// column is the cost (three lines, weighted). Centred anchor line beneath.
// =============================================================================
function S01_TwoVersions() {
  return (
    <Frame label="02 / 07">
      <div style={{
        position: 'absolute',
        left: SPACE.padX, right: SPACE.padX,
        top: 200, bottom: SPACE.padBottom,
        display: 'flex', flexDirection: 'column',
      }}>
        <h2 data-reveal style={{
          margin: 0,
          fontSize: TYPE.title, lineHeight: 1.05,
          fontWeight: 600, letterSpacing: '-0.03em',
          color: C.ink,
        }}>
          Two versions of me.
        </h2>

        <div style={{
          marginTop: 80, flex: 1,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
        }}>
          {/* LEFT — "what people saw". Light, unshaded, one line + a generous
              placeholder slot beneath for an image or illustration. The slot
              flexes to match the right column's height. */}
          <div data-reveal style={{ ['--reveal-i']: 1, display: 'flex', flexDirection: 'column' }}>
            <Eyebrow color={C.inkMute}>What people saw</Eyebrow>
            <Hairline color={C.rule} style={{ marginTop: 28 }} />
            <div style={{ marginTop: 36 }}>
              <p style={{
                margin: 0,
                fontSize: 40, lineHeight: 1.35,
                fontWeight: 400, letterSpacing: '-0.015em',
                color: C.inkSoft,
              }}>
                Capable. Calm. Creative. Dependable.
              </p>
            </div>
            {/* Real image — three people, faces centered in the framing.
                Fixed height (rather than flex:1) so the slide's centred
                anchor quote below the columns stays in view; the image is
                cropped via object-fit instead of stretching the column. */}
            <div style={{
              marginTop: 36, height: 320,
              border: `1px solid ${C.rule}`,
              overflow: 'hidden',
              background: C.bgLift,
            }}>
              <img
                src="assets/people-saw.png"
                alt="Three friends, smiling"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 42%',
                  display: 'block',
                  // Push saturation + contrast harder — against the dark slide
                  // the photo otherwise reads muted; this brings it back to
                  // roughly the vibrancy of the original file.
                  filter: 'saturate(1.6) contrast(1.12) brightness(1.06)',
                }}
              />
            </div>
          </div>

          {/* RIGHT — "what it actually took". Shaded card, accent rule, weighted. */}
          <div
            data-reveal
            style={{
              ['--reveal-i']: 2,
              background: C.bgLift,
              border: `1px solid ${C.rule}`,
              borderTop: `1px solid ${C.accent}`,
              padding: '40px 48px',
            }}
          >
            <Eyebrow color={C.accent}>What it actually took</Eyebrow>
            <Hairline color={C.rule} style={{ marginTop: 28 }} />
            <ul style={{
              margin: '36px 0 0', padding: 0,
              listStyle: 'none',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}>
              {[
                'Swimming upstream.',
                'Hiding the effort from everyone.',
                'Relentless effort to participate.',
              ].map((line, i) => (
                <li
                  key={i}
                  data-reveal
                  style={{
                    ['--reveal-i']: 3 + i,
                    display: 'grid', gridTemplateColumns: '36px 1fr',
                    alignItems: 'baseline', gap: 12,
                    fontSize: 36, lineHeight: 1.3,
                    fontWeight: 500, letterSpacing: '-0.015em',
                    color: C.ink,
                  }}
                >
                  <Mono style={{
                    fontSize: 14, color: C.accent,
                    letterSpacing: '0.16em',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </Mono>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quiet centred anchor in the accent. */}
        <div data-reveal style={{
          ['--reveal-i']: 7,
          marginTop: 60, textAlign: 'center',
        }}>
          <span style={{
            fontSize: 36,
            color: C.accent,
            letterSpacing: '-0.015em',
            lineHeight: 1.3, fontWeight: 500,
          }}>
            &ldquo;Everyone found work easy. It was like they got a manual I never received.&rdquo;
          </span>
        </div>
      </div>
    </Frame>
  );
}

// =============================================================================
// S02 — The wall (de-personalised, no family reference)
// THE QUIETEST SLIDE. Two big typographic lines on the left, paired with a
// generous image placeholder on the right (creative-commons asset goes here).
// Slow, weighted reveal cadence. Deepest bg.
// =============================================================================
function S02_TheWall() {
  return (
    <Frame bg={C.bgQuiet} label="03 / 07">
      <div style={{
        position: 'absolute', inset: 0,
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: 96,
        alignItems: 'center',
        padding: `${SPACE.padY}px ${SPACE.padX}px`,
      }}>
        {/* LEFT — primary line as the slide's h2 title (matching the
            sizing/weight pattern used on the other slides), with the second
            sentence as a softer subtitle beneath. This restores the
            "one heading + supporting copy" rhythm the rest of the deck uses. */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: 32,
        }}>
          <h2
            data-reveal-quiet
            style={{
              ['--reveal-i']: 0,
              margin: 0,
              fontSize: TYPE.title, lineHeight: 1.05,
              fontWeight: 600, letterSpacing: '-0.03em',
              color: C.ink, textWrap: 'balance',
            }}
          >
            I hit a wall at work.
          </h2>
          <p
            data-reveal-quiet
            style={{
              ['--reveal-i']: 1,
              margin: 0,
              fontSize: 44, lineHeight: 1.3,
              fontWeight: 400, letterSpacing: '-0.015em',
              color: C.inkSoft, textWrap: 'pretty',
            }}
          >
            Then someone close to me was diagnosed with ADHD.
          </p>
          {/* The decision — bridges the dip into the next slide's reframe.
              Same size as the subtitle but in the accent so it reads as the
              turn rather than more context. */}
          <p
            data-reveal-quiet
            style={{
              ['--reveal-i']: 2,
              margin: '8px 0 0',
              fontSize: 44, lineHeight: 1.3,
              fontWeight: 500, letterSpacing: '-0.015em',
              color: C.accent, textWrap: 'pretty',
            }}
          >
            I decided to explore my own diagnosis.
          </p>
        </div>

        {/* RIGHT — wall image (CC BY-SA 2.0, attribution overlaid at bottom). */}
        <div
          data-reveal-quiet
          style={{
            ['--reveal-i']: 2,
            alignSelf: 'stretch',
            display: 'flex', flexDirection: 'column',
          }}
        >
          <div style={{
            position: 'relative',
            height: 850,
            border: `1px solid ${C.rule}`,
            overflow: 'hidden',
            background: C.bgLift,
          }}>
            <img
              src="assets/wall.jpg"
              alt="A spray-painted heart on a graffitied wall with the letters ADHD above it"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 40%',
                display: 'block',
              }}
            />
            {/* CC BY-SA 2.0 attribution — overlaid at the bottom edge of the
                image. Soft dark gradient backing keeps the mono line legible
                against whatever pixels happen to be behind it. */}
            <div style={{
              position: 'absolute',
              left: 0, right: 0, bottom: 0,
              padding: '32px 20px 14px',
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85) 100%)',
              display: 'flex', justifyContent: 'flex-end',
            }}>
              <Mono style={{
                fontSize: 18, color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.08em',
              }}>
                Photo:&nbsp;
                <a
                  href="https://www.flickr.com/photos/leesean/"
                  style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}
                  target="_blank" rel="noopener noreferrer"
                >leesean</a>
                &nbsp;·&nbsp;
                <a
                  href="https://creativecommons.org/licenses/by-sa/2.0/"
                  style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}
                  target="_blank" rel="noopener noreferrer"
                >CC BY-SA 2.0</a>
              </Mono>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// =============================================================================
// S03 — A different operating system
// The pivot — labels-given to a different OS. Quiet relief line beneath the
// after. Small audio-clip cue bottom-right.
// =============================================================================
function S03_OperatingSystem() {
  return (
    <Frame label="04 / 07">
      <div style={{
        position: 'absolute',
        left: SPACE.padX, right: SPACE.padX,
        top: 180, bottom: SPACE.padBottom,
        display: 'grid',
        gridTemplateColumns: '0.7fr 1.3fr',
        gap: 72,
        alignItems: 'start',
      }}>

        {/* LEFT — the reframe (BEFORE / AFTER / relief line). */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* BEFORE — small, faded */}
          <div data-reveal style={{ ['--reveal-i']: 0, marginBottom: 48 }}>
            <Eyebrow color={C.inkMute}>Before</Eyebrow>
            <p style={{
              margin: '20px 0 0',
              fontSize: 26, lineHeight: 1.5,
              fontWeight: 400, letterSpacing: '-0.01em',
              color: C.inkMute,
              textWrap: 'pretty',
            }}>
              For years it felt as if I were running on the wrong operating system: overloaded, slow to start, easily knocked off course by anything unexpected. I assumed the machine was faulty. I assumed it was me.
            </p>
          </div>

          {/* AFTER — large, dominant, accent. The reframe. */}
          <div data-reveal style={{ ['--reveal-i']: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
              <Eyebrow color={C.accent} style={{ fontWeight: 600 }}>After</Eyebrow>
              <span style={{
                flex: 1, height: 1,
                background: `linear-gradient(90deg, ${C.accent}, transparent)`,
                maxWidth: 320,
              }} />
            </div>
            <h2 style={{
              margin: 0,
              fontSize: 88, lineHeight: 1.05, fontWeight: 600,
              letterSpacing: '-0.04em', textWrap: 'balance',
              color: C.accent,
            }}>
              A different operating system.
            </h2>
            <p style={{
              margin: '24px 0 0',
              fontSize: 24, lineHeight: 1.5,
              fontWeight: 400, letterSpacing: '-0.005em',
              color: C.inkSoft,
              textWrap: 'pretty',
            }}>
              Same hardware, running differently. When I finally understood that, the constant background noise began to settle, and so did the shame I'd carried for not being able to think the way everyone else seemed to.
            </p>
          </div>
        </div>

        {/* RIGHT — Spotify episode embed. Cued to 1:30 via &t=90 in the src.
            Pre-loaded eagerly (overrides the default lazy) so the player is
            ready the instant the slide is reached on the day. */}
        <div
          data-reveal
          style={{
            ['--reveal-i']: 3,
            display: 'flex', flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: C.accent,
            }} />
            <Mono style={{
              fontSize: 22, color: C.inkSoft,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>
              Audio clip · 14:24
            </Mono>
          </div>
          <iframe
            data-testid="embed-iframe"
            title="ADHD podcast clip"
            // Timestamp `t=864` (14:24) placed first so Spotify's embed
            // parser reliably honours the start position. The video embed
            // may still begin at 0:00 on some browsers — if so, the speaker
            // scrubs to 14:24 once before the talk.
            src="https://open.spotify.com/embed/episode/2WwEe8tImYLtlPScYzK5db/video?t=864&utm_source=generator"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="eager"
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: 12,
              border: `1px solid ${C.ruleStrong}`,
              background: C.bgLift,
              display: 'block',
            }}
          />
          {/* Podcast attribution — small mono line beneath the embed,
              identifies the source show and links out to it on Spotify. */}
          <div style={{
            marginTop: 14,
            display: 'flex', alignItems: 'baseline', gap: 12,
            flexWrap: 'wrap',
          }}>
            <Mono style={{
              fontSize: 18, color: C.inkMute,
              letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              From
            </Mono>
            <a
              href="https://open.spotify.com/show/371UdLohffgSlWAEuQ55Hi?si=fd5e2302ccf54654"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 20, color: C.inkSoft, fontWeight: 500,
                letterSpacing: '-0.005em', textDecoration: 'underline',
                textUnderlineOffset: 4,
              }}
            >
              ADHD Chatter with Alex Partridge
            </a>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// =============================================================================
// S04 — What changed
// Three equal columns. Footer line points outward to the next slide
// (the climax has moved to S05_GoodSupport).
// =============================================================================
function S04_WhatChanged() {
  const sections = [
    {
      n: '01',
      label: 'Understanding',
      body: `For most of my life I'd assumed the problem was me: that I wasn't trying hard enough. The diagnosis didn't change who I was. It changed the story I'd been telling myself about why things were hard.`,
    },
    {
      n: '02',
      label: 'Medication',
      body: `Medication is part of it, and I'm still finding the right balance with my clinician. It isn't a switch that fixes everything. It's one piece of a bigger picture, alongside understanding myself and being honest about what I need.`,
    },
    {
      n: '03',
      label: 'The difference',
      body: `What changed most was the noise. For years there was a constant background hum I could never name. As it settled, I could finally think clearly, and began to make sense of why so much had felt so hard for so long.`,
    },
  ];

  return (
    <Frame label="05 / 07">
      <div style={{
        position: 'absolute',
        left: SPACE.padX, right: SPACE.padX,
        top: 200, bottom: SPACE.padBottom,
        display: 'flex', flexDirection: 'column',
      }}>
        <h2 data-reveal style={{
          margin: 0,
          fontSize: TYPE.title, lineHeight: 1.05,
          fontWeight: 600, letterSpacing: '-0.03em',
          color: C.ink,
        }}>
          What changed.
        </h2>

        <div style={{
          marginTop: 88, flex: 1,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48,
        }}>
          {sections.map(({ n, label, body }, i) => (
            <div
              key={n}
              data-reveal
              style={{
                ['--reveal-i']: i + 1,
                background: C.bgLift,
                border: `1px solid ${C.rule}`,
                borderTop: `1px solid ${C.accent}`,
                padding: '40px 40px 44px',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <Mono style={{
                fontSize: 14, color: C.accent,
                letterSpacing: '0.18em', fontWeight: 600,
              }}>
                {n}
              </Mono>
              <div style={{
                marginTop: 18,
                fontSize: 44, lineHeight: 1.1,
                fontWeight: 600, letterSpacing: '-0.025em',
                color: C.ink,
                textWrap: 'balance',
              }}>
                {label}
              </div>
              <Hairline color={C.rule} style={{ marginTop: 24 }} />
              <p style={{
                marginTop: 22,
                fontSize: 22, lineHeight: 1.5,
                color: C.inkSoft, fontWeight: 400,
                textWrap: 'pretty',
              }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer line — points outward to the next slide. The "superpower"
            climax has moved to S05_GoodSupport. */}
        <div
          data-reveal
          style={{
            ['--reveal-i']: 5,
            marginTop: 64,
            paddingTop: 36,
            borderTop: `1px solid ${C.rule}`,
            display: 'flex', alignItems: 'baseline', gap: 24,
          }}
        >
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: C.accent, flexShrink: 0,
            transform: 'translateY(-6px)',
          }} />
          <p style={{
            margin: 0,
            fontSize: 38, lineHeight: 1.25,
            fontWeight: 500,
            letterSpacing: '-0.015em',
            color: C.ink, textWrap: 'balance',
          }}>
            &ldquo;Understanding it changed everything.
            <span style={{ color: C.accent }}> But it can't stop with me.</span>&rdquo;
          </p>
        </div>
      </div>
    </Frame>
  );
}

// =============================================================================
// S05 — What good support looks like (NEW)
// The climax. Matches the visual structure of S04_WhatChanged (sibling layout)
// but with three items + a context line + the anchor. This is the ask of the
// room — the "superpower" reframe lands here.
// =============================================================================
function S05_GoodSupport() {
  const items = [
    {
      n: '01',
      label: 'Notice before someone has to ask',
      body: `Many of us learned to hide the struggle long before we understood it. A quiet, genuine question about how someone works best can matter more than waiting for them to ask for help, because often we never will.`,
    },
    {
      n: '02',
      label: 'Make room for a different mind',
      body: `A different way of thinking is only an asset if there's space for it. When an idea doesn't fit the usual shape, staying with it for a moment, rather than moving briskly on, is often where the real value is found.`,
    },
    {
      n: '03',
      label: 'Reduce the noise, not the expectations',
      body: `Clear priorities and fewer interruptions help far more than being told to try harder. The effort was never the thing in short supply, and recognising that is a kindness that costs very little.`,
    },
  ];

  return (
    <Frame label="06 / 07">
      <div style={{
        position: 'absolute',
        left: SPACE.padX, right: SPACE.padX,
        top: 200, bottom: SPACE.padBottom,
        display: 'flex', flexDirection: 'column',
      }}>
        <h2 data-reveal style={{
          margin: 0,
          fontSize: TYPE.title, lineHeight: 1.05,
          fontWeight: 600, letterSpacing: '-0.03em',
          color: C.ink,
          textWrap: 'balance',
        }}>
          What good support looks like.
        </h2>

        <div style={{
          marginTop: 64,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32,
        }}>
          {items.map(({ n, label, body }, i) => (
            <div
              key={n}
              data-reveal
              style={{
                ['--reveal-i']: i + 1,
                background: C.bgLift,
                border: `1px solid ${C.rule}`,
                borderTop: `1px solid ${C.accent}`,
                padding: '32px 32px 36px',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <Mono style={{
                fontSize: 14, color: C.accent,
                letterSpacing: '0.18em', fontWeight: 600,
              }}>
                {n}
              </Mono>
              <div style={{
                marginTop: 16,
                fontSize: 30, lineHeight: 1.2,
                fontWeight: 600, letterSpacing: '-0.02em',
                color: C.ink,
                textWrap: 'balance',
              }}>
                {label}
              </div>
              <Hairline color={C.rule} style={{ marginTop: 22 }} />
              <p style={{
                marginTop: 20,
                fontSize: 21, lineHeight: 1.5,
                color: C.inkSoft, fontWeight: 400,
                textWrap: 'pretty',
              }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Context line — sets up the anchor. Quiet, muted, set apart. */}
        <div data-reveal style={{ ['--reveal-i']: 5, marginTop: 56 }}>
          <p style={{
            margin: 0,
            fontSize: 28, lineHeight: 1.45,
            fontWeight: 400, letterSpacing: '-0.01em',
            color: C.inkSoft, textWrap: 'pretty',
            maxWidth: 1500,
          }}>
            &ldquo;Superpower&rdquo; sounds kind. But it hides the daily graft and piles on the pressure.
          </p>
        </div>

        {/* Anchor — the final line of the slide, in the accent. */}
        <div
          data-reveal
          style={{
            ['--reveal-i']: 6,
            marginTop: 28,
            paddingTop: 28,
            borderTop: `1px solid ${C.rule}`,
            display: 'flex', alignItems: 'baseline', gap: 24,
          }}
        >
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: C.accent, flexShrink: 0,
            transform: 'translateY(-6px)',
          }} />
          <p style={{
            margin: 0,
            fontSize: 44, lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: C.accent, textWrap: 'balance',
          }}>
            It's a responsibility we share.
          </p>
        </div>
      </div>
    </Frame>
  );
}

// =============================================================================
// S06 — If any of this resonated
// Friendly disclaimer + clear resources list + human closing line in the accent.
// NHS Right to Choose carries NO URL (the previous adhduk.co.uk attribution
// was wrong — that's ADHD UK's own site).
// =============================================================================
function S06_Resources() {
  const resources = [
    {
      name: 'NHS Right to Choose',
      note: 'England only: ask your GP / check availability',
      url: '',
    },
    {
      name: 'Aviva health scheme',
      note: 'for those on the corporate plan',
      url: '',
    },
    {
      name: 'ADHD UK',
      note: '',
      url: 'adhduk.co.uk',
    },
    {
      name: 'ADHDadultUK',
      note: '',
      url: 'adhdadult.uk',
    },
    {
      name: 'AADD-UK',
      note: '',
      url: 'aadduk.org',
    },
  ];

  return (
    <Frame label="07 / 07">
      <div style={{
        position: 'absolute',
        left: SPACE.padX, right: SPACE.padX,
        top: 180, bottom: SPACE.padBottom,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Friendly disclaimer — top, soft. */}
        <div data-reveal style={{
          ['--reveal-i']: 0,
          paddingBottom: 24,
          borderBottom: `1px solid ${C.rule}`,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: C.accent, flexShrink: 0,
          }} />
          <span style={{
            fontSize: 26, lineHeight: 1.4,
            color: C.inkSoft,
            textWrap: 'pretty',
          }}>
            I'm not a medical professional. This is my own experience only.
          </span>
        </div>

        <h2 data-reveal style={{
          ['--reveal-i']: 1,
          margin: '44px 0 0',
          fontSize: TYPE.title, lineHeight: 1.05,
          fontWeight: 600, letterSpacing: '-0.03em',
          color: C.ink,
        }}>
          If any of this resonated.
        </h2>

        <div style={{
          marginTop: 44,
          display: 'flex', flexDirection: 'column',
        }}>
          {resources.map(({ name, note, url }, i) => (
            <div
              key={name}
              data-reveal
              style={{
                ['--reveal-i']: i + 2,
                display: 'grid',
                gridTemplateColumns: '44px 1fr auto',
                alignItems: 'baseline',
                gap: 28,
                padding: '20px 0',
                borderTop: i === 0 ? `1px solid ${C.ruleStrong}` : 'none',
                borderBottom: `1px solid ${C.ruleStrong}`,
              }}
            >
              <Mono style={{
                fontSize: 24, color: C.accent,
                letterSpacing: '0.18em', fontWeight: 600,
              }}>
                {String(i + 1).padStart(2, '0')}
              </Mono>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 36, fontWeight: 600,
                  letterSpacing: '-0.02em', color: C.ink, lineHeight: 1.15,
                }}>
                  {name}
                </span>
                {note && (
                  <span style={{
                    fontSize: 24, color: C.inkSoft,
                    lineHeight: 1.25,
                  }}>
                    {note}
                  </span>
                )}
              </div>
              {url && (
                <Mono style={{
                  fontSize: 24, color: C.inkMute,
                  letterSpacing: '0.06em',
                }}>
                  {url}
                </Mono>
              )}
            </div>
          ))}
        </div>

        {/* Human closing line in the accent. */}
        <div data-reveal style={{
          ['--reveal-i']: 8,
          marginTop: 40,
          display: 'flex', alignItems: 'baseline', gap: 24,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: C.accent, flexShrink: 0,
            transform: 'translateY(-6px)',
          }} />
          <p style={{
            margin: 0,
            fontSize: 32, lineHeight: 1.3,
            fontWeight: 500, letterSpacing: '-0.015em',
            color: C.accent, textWrap: 'balance',
          }}>
            &ldquo;You're not broken. You might just be wired differently. And it's never too late to find out.&rdquo;
          </p>
        </div>
      </div>
    </Frame>
  );
}

// --- Export ------------------------------------------------------------------
// Label-to-component registry only. Play order is set by <section> order in
// `ADHD Talk - Late Diagnosis.html`.
window.Slides = {
  S00_Title,
  S01_TwoVersions,
  S02_TheWall,
  S03_OperatingSystem,
  S04_WhatChanged,
  S05_GoodSupport,
  S06_Resources,
};
