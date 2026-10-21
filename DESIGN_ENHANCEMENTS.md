# Apptivate.uk — Design & Appeal Enhancements

Ideas to make the site (https://eatasyougo.github.io/apptivate/) more appealing and higher-converting.
This is a **spec of ideas only** — nothing here is built yet. It extends `BUILD_SPEC.md`; keep the
same stack (Astro, plain CSS, minimal JS) and the same tokens unless a change is called out below.

Current state (v1): clean but generic — system fonts, flat cards, a bare rotated screenshot, a
text-only trust bar, and a dashed "photo to follow" box. The moves below lift perceived quality and
trust without adding heavy dependencies.

---

## 0. Priority order (do these first)

**Tier 1 — biggest lift, low effort**
1. Real typeface pairing (§1).
2. Hero depth: mesh/gradient glow + screenshot in a browser frame (§3).
3. Service & step cards: icons, hover lift, accent detail (§4, §5).
4. A final full-width CTA band before the footer + sticky mobile "Book a call" (§8).

**Tier 2 — strong trust lift, needs content/assets**
5. Testimonials section (§6) — needs 1–3 quotes.
6. About: real headshot + credentials row (§7) — needs a photo.
7. Case studies: device framing, tech-tag pills, an impact line each (§5).

**Tier 3 — brand & finish**
8. Proper logo/wordmark + designed OG image + favicon (§9).
9. Scroll-reveal motion + micro-interactions (§10).
10. Client logos as greyscale SVGs instead of text (§2) — check trademark use.

---

## 1. Typography (single biggest visual upgrade)

- Replace the system font stack with a **display + body pairing**, self-hosted via
  [Fontsource](https://fontsource.org) (npm packages, no external request, stays fast):
  - **Headings:** a modern grotesk — `Space Grotesk`, `General Sans`, `Satoshi`, or `Inter Tight`.
  - **Body:** `Inter` (or `Geist`), 400/500/600.
- Tokens to add in `global.css`:
  ```css
  --font-display: "Space Grotesk", var(--font-sans);
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  ```
- Apply `--font-display` to `h1,h2,h3,.wordmark`. Tighten hero `letter-spacing` to `-0.04em`.
- Bump hero H1 scale: `clamp(2.6rem, 5vw + 1rem, 4.4rem)`.
- Only load the weights you use (e.g. 500/700 display, 400/600 body) to keep it light.

## 2. Colour, depth & texture

- Keep `--ink` navy but introduce an **accent gradient** and one warm secondary for highlights:
  ```css
  --accent-grad: linear-gradient(135deg, #2f6bff 0%, #6a5cff 100%);
  --accent-2: #ff8a3d;      /* sparingly, for a single highlighted word / underline */
  --glow: rgba(47, 107, 255, 0.35);
  ```
- Add subtle depth so sections don't look flat:
  - Hero: a soft **radial glow / mesh gradient** behind the headline (blurred `::before` blobs
    using `--glow`), plus an ultra-faint dot or grid pattern at ~4% opacity.
  - Cards: a two-layer shadow (tight + soft) and a 1px top border that becomes `--accent-grad` on hover.
  - Optional faint noise overlay (base64 SVG) over dark sections to avoid banding.
- Introduce a **gradient text** treatment for one key phrase in the H1 (e.g. "plus a team to build it")
  using `background: var(--accent-grad); -webkit-background-clip: text; color: transparent;`.

## 3. Hero section

- **Frame the screenshot** in a browser/mac window (rounded top bar with 3 dots) instead of a bare
  rotated PNG — reads as a real product, not a floating image. Add a soft reflection/shadow.
- Background: layered mesh gradient + glow blobs; keep text contrast AA.
- Add a **credibility stat strip** under the CTAs:
  `20+ yrs` · `ex-Citi · Man Group · BNP Paribas` · `UK-led, Chennai-built`.
- Tighten to one dominant CTA (primary "Book a free intro call"); keep "See how I work" as a quiet
  text link with an arrow.
- Optional: very subtle entrance animation on load (fade/slide-up), reduced-motion safe.

## 4. Services ("How Apptivate helps")

- Add a distinct **inline line-icon** per card (hand-rolled SVG, ~24px, `stroke=currentColor`):
  advisory = compass/chart, build = cursor/blocks, AI = sparkle/node, team = people.
- Card hover: lift (`translateY(-4px)`), stronger shadow, accent top-border reveal, 150ms transition.
- Add a one-line "best for…" sub-label per card to help founders self-select.
- Consider a 2×2 grid on desktop with a bit more padding and an accent number in the corner.

## 5. How it works + Selected work

**How it works**
- Replace plain cards with **accent-circle numbered badges** (01/02/03) and a thin connector line
  (horizontal on desktop, vertical on mobile) to show flow.

**Selected work**
- Put each screenshot in the same **browser frame** component as the hero.
- Add **tech-tag pills** under each case (e.g. `React` `Recoil` `WAMP` `Python`; `RAG` `AG Grid`
  `Node BFF` `Elasticsearch`). Small, rounded, `--surface` background.
- Add a short **impact line** to each case (qualitative is fine: "Globally deployed to trading desks",
  "Natural-language querying over structured financial data"). No invented metrics.
- Earlier-work strip: keep muted, but frame as a tidy horizontal scroller with captions on hover.

## 6. Testimonials (new section — high trust ROI)

- Add a short section between Work and About: 1–3 quotes with name, role, company (or "Founder,
  stealth fintech" if anonymised). Big quotation mark, display font, generous spacing.
- If none exist yet, build the component with placeholder quotes marked `TODO` and a note to collect
  real ones. **Needs: 1–3 testimonials** (even informal LinkedIn recommendations repurposed).

## 7. About

- Replace the dashed "photo to follow" box with a **real headshot** (rounded, soft shadow, subtle
  accent ring). **Needs: a professional photo of Ajay.**
- Add a compact **credentials row**: years, ex-employers, location, and a LinkedIn link/button.
- Optional pull-quote / one-liner philosophy to add personality.

## 8. Conversion & CTA

- Add a **full-width CTA band** just before the footer: `--accent-grad` background, white text,
  headline like "Building something? Let's talk." + primary booking button.
- **Sticky mobile CTA bar**: a slim fixed bottom bar on small screens with "Book a call" (appears
  after scrolling past the hero). Desktop keeps the nav button.
- Repeat a soft CTA after Services and after Work so there's always a next step in view.

## 9. Brand assets

- Commission/create a proper **logo + wordmark** (an "A" mark with the gradient, not plain text).
  Update `favicon.svg` to match and add a 512px PNG for richer previews.
- Design a real **OG share image** (1200×630): wordmark + tagline on the ink/gradient background,
  not a cropped Velocity screenshot. Improves link unfurls on LinkedIn/Slack.
- Define a tiny **icon set** (consistent stroke width) reused across Services and How-it-works.

## 10. Motion & micro-interactions

- **Scroll reveal**: fade + 12px slide-up as sections enter, via `IntersectionObserver` (no library).
  Stagger cards ~60ms. Always wrap in `@media (prefers-reduced-motion: no-preference)`.
- Smooth-scroll already on; add `scroll-margin-top` to anchor targets so the sticky nav doesn't cover
  headings.
- Button/link transitions (background, transform) at 150–200ms ease.
- Optional: hero visual slight parallax on scroll (transform only, reduced-motion safe).

## 11. Guardrails (keep it fast & accessible)

- No UI framework, no animation library — vanilla CSS/JS only.
- Self-host fonts; subset to used weights; keep total new JS trivial.
- Maintain contrast ≥ 4.5:1 on gradient backgrounds (test the gradient CTA band and gradient text).
- Keep Lighthouse targets from `BUILD_SPEC.md` §15 (Perf/A11y/SEO ≥ 95).

## 12. Assets still needed from the owner

| Asset | For | Notes |
|---|---|---|
| Professional headshot | About (§7) | rounded crop, ~800×800+ |
| 1–3 testimonials | Testimonials (§6) | name, role, company (or anonymised) |
| Logo / brand mark | Brand (§9) | else keep the gradient "A" wordmark |
| Client logos (optional) | Trust bar (§2) | greyscale SVG; confirm trademark use is OK |
| LinkedIn URL | About (§7) | for the credentials row |
