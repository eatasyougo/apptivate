# Apptivate.uk — Website Build Spec

This is an implementation spec for building the `apptivate.uk` marketing site. It is written
so a smaller model (or junior dev) can build the whole thing without further decisions. Where a
real-world value is still missing (email address, booking URL, company number), it is listed in
**§13 Placeholders** — use the placeholder token exactly as written and do not invent values.

---

## 1. Goal & audience

- **Product:** A single-page marketing site for Apptivate Ltd, a UK software consultancy.
- **Primary audience:** Founders of UK seed-stage startups and SMEs with some funding, who need
  experienced technical leadership they can't afford to hire full-time.
- **Primary conversion goal:** Get the visitor to **book a free intro call** (booking link) or
  **submit the contact form**. Everything on the page should push toward one of these two actions.
- **Tone:** Credible, senior, plain-spoken. Not a flashy agency; a trusted operator. British English.

## 2. Positioning & core message

The one-line pitch (use as the hero headline, or a close variant):

> **Senior engineering leadership for startups — plus a team to build it.**

Supporting sub-head:

> I'm Ajay Prince. I've spent 20 years building trading and risk systems for banks like Citi,
> Man Group and BNP Paribas. Apptivate gives early-stage founders that same senior guidance —
> as your fractional CTO and technical partner — backed by a cost-effective delivery team.

Key value props to weave in:
- UK-based senior lead (trust, timezone, accountability).
- Fractional CTO / technical partner — architecture, hiring, de-risking, AI strategy.
- A Chennai-based delivery team that builds the product cost-effectively.
- Modern stack: React/TypeScript, .NET, Node, plus hands-on AI/LLM (RAG, conversational UI).

## 3. Tech stack

- **Framework:** [Astro](https://astro.build) (latest stable), static output (`output: 'static'`).
- **Language:** TypeScript for any component logic; `.astro` components for markup.
- **Styling:** Plain CSS with CSS custom properties (design tokens in §6). Do **not** add Tailwind
  or a UI kit — keep dependencies minimal. Scoped `<style>` blocks in `.astro` files are fine.
- **Images:** Use Astro's `astro:assets` `<Image />` for the portfolio screenshots so they are
  optimised and lazy-loaded.
- **No client JS framework.** A tiny amount of vanilla JS (mobile nav toggle, form submit) only.
- **Node:** v22 is installed locally.

Rationale: a static site is fastest, cheapest, best for SEO, and trivial to deploy behind Caddy.

## 4. Project structure

Build inside this repo (`/home/ajay/apptivate`). Target tree:

```
apptivate/
  package.json
  astro.config.mjs
  tsconfig.json
  .gitignore            # node_modules, dist, .astro
  public/
    favicon.svg
    robots.txt
    CNAME-note.txt      # (optional) not needed for Caddy
  src/
    assets/
      work/             # portfolio screenshots copied from the media folder (see §7)
      logos/            # client wordmarks/SVGs if available, else text fallbacks
    components/
      Nav.astro
      Hero.astro
      TrustBar.astro
      Services.astro
      HowItWorks.astro
      SelectedWork.astro
      About.astro
      Contact.astro
      Footer.astro
    layouts/
      Base.astro        # <html>, <head> meta, slot
    pages/
      index.astro       # assembles the components in order
    styles/
      global.css        # design tokens + base styles
```

## 5. Page sections (single page, in this order)

All sections live on `index.astro`. Nav links scroll to in-page anchors.

### 5.1 Nav (`Nav.astro`)
- Sticky top bar, transparent over hero then solid on scroll (simple: solid background always is fine).
- Left: "Apptivate" wordmark (text, weight 700, letter-spacing tight). Right: anchor links
  `Services`, `How it works`, `Work`, `About`, `Contact`, plus a primary button **"Book a call"**
  linking to `{{BOOKING_URL}}`.
- Mobile: collapse links into a hamburger toggle (vanilla JS, no framework).

### 5.2 Hero (`Hero.astro`) — `#top`
- Full-width, generous vertical padding. Dark (ink) background, light text.
- H1 = the headline from §2. Sub-head paragraph below.
- Two CTAs: primary **"Book a free intro call"** → `{{BOOKING_URL}}`; secondary
  **"See how I work"** → `#how`.
- Optional: a subtle right-side visual — the Velocity screenshot (see §7) shown small/angled, or
  omit on mobile. Keep text readable; don't let the image dominate.

### 5.3 Trust bar (`TrustBar.astro`)
- A quiet strip: "Experience delivering for" followed by client names:
  **Citi · Man Group · BNP Paribas · Virtuetech**.
- Render as styled text wordmarks (greyscale). Only use real logo images if supplied in
  `src/assets/logos/`; otherwise text is fine and avoids trademark/asset issues.

### 5.4 Services (`Services.astro`) — `#services`
- Section heading: "How Apptivate helps".
- Four cards (icon optional, inline SVG only — no icon library):
  1. **Fractional CTO & Technical Advisory** — architecture, tech strategy, hiring, code/vendor
     review, de-risking your roadmap.
  2. **MVP & Product Build** — from idea to shipped product, built by a focused delivery team.
  3. **AI & LLM Integration** — practical AI: natural-language querying, RAG, conversational UI,
     LLM-assisted features that actually ship.
  4. **Team Augmentation** — a cost-effective Chennai-based engineering team, led and quality-
     controlled from the UK.

### 5.5 How it works (`HowItWorks.astro`) — `#how`
- The engagement model, 3 steps:
  1. **Intro call** — a free 30-minute call to understand where you are and what you need.
  2. **Plan** — a clear technical plan, scope and estimate. No jargon.
  3. **Build & guide** — the UK-led, Chennai-delivered team builds it; you get senior oversight
     throughout.

### 5.6 Selected work (`SelectedWork.astro`) — `#work`
- Heading: "Selected work".
- **Case study 1 (hero):** *Citi Velocity* — global commodities & FX trading platform. Contributed
  to migrating a desktop/web hybrid to a pure web app (React, Recoil, WAMP, Python). Use image
  `work/velocity.png`. (Client confirmed OK to show this screenshot.)
- **Case study 2:** *Virtuetech — AI financial-products platform* (no screenshot available; text
  card). Natural-language querying and conversational grid customisation over structured financial
  data; React/TypeScript/MUI/AG Grid front end; Node/Express BFF; Elasticsearch; RAG.
- **Earlier work strip (optional, small):** a muted row of thumbnails from the e-commerce/CMS era
  with a caption "20 years of delivery — selected earlier web & e-commerce work". Use a few of:
  `iceland-tours.png`, `designtorget.png`, `ecshopping.png`. Keep these small and secondary — they
  are dated and should not dominate. See §7 for which to omit.

### 5.7 About (`About.astro`) — `#about`
- Short bio of Ajay Prince: 20 years across BNP Paribas, Man Group, Citi (VP) and current AI
  fintech work at Virtuetech; founded Apptivate Ltd in 2015. Based in London. Full-stack across
  React/TypeScript, .NET/C#, Node, and hands-on AI/LLM.
- Keep it to ~120 words, first person, confident but not boastful.
- Optional headshot: none supplied — leave a placeholder slot, do not fabricate an image.

### 5.8 Contact (`Contact.astro`) — `#contact`
- Two options side by side:
  - **Book a call** — button/embed to `{{BOOKING_URL}}` (Calendly). If embedding, use the
    official Calendly inline embed; otherwise a button link is fine for v1.
  - **Send a message** — the contact form (see §8).
- Show the business email `{{CONTACT_EMAIL}}` as a `mailto:` fallback.

### 5.9 Footer (`Footer.astro`)
- "Apptivate Ltd" + company number `{{COMPANY_NUMBER}}` + registered in England & Wales.
- Links: `Privacy`, `Cookies` (can be simple anchored sections or separate `/privacy` page — v1
  may stub these; see §13). Copyright year (dynamic).
- Optional phone `{{CONTACT_PHONE}}` — only include if owner confirms using it (see §13).

## 6. Design system (tokens in `src/styles/global.css`)

Clean, modern, trustworthy. Lots of whitespace, strong typography, restrained colour.

```css
:root {
  /* Colour */
  --ink:        #0b1220;   /* near-black navy, hero + footer bg */
  --ink-2:      #121a2b;
  --paper:      #ffffff;
  --muted:      #5b6472;   /* secondary text */
  --line:       #e6e9ef;   /* hairlines/borders */
  --accent:     #2f6bff;   /* primary blue CTA */
  --accent-600: #1f54d6;
  --surface:    #f6f8fc;   /* alt section background */

  /* Type */
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --h1: clamp(2.2rem, 4vw + 1rem, 3.6rem);
  --h2: clamp(1.6rem, 2vw + 0.8rem, 2.4rem);
  --maxw: 1120px;          /* content container max width */
  --radius: 14px;
}
```

- **Typography:** system font stack (no web-font download needed; keeps it fast). Tight line-height
  on headings (~1.1), comfortable body (~1.6).
- **Layout:** centered container at `--maxw`, horizontal padding `clamp(1rem, 4vw, 2.5rem)`.
  Section vertical padding ~`5rem` desktop / `3rem` mobile. Alternate white / `--surface` backgrounds.
- **Buttons:** primary = `--accent` bg, white text, `--radius`, bold; hover → `--accent-600`.
  Secondary = transparent with `--line` border.
- **Cards:** white, `1px solid --line`, `--radius`, soft shadow, padding ~`1.5rem`.
- **Responsive:** mobile-first; grids collapse to 1 column below ~720px. Test 360px, 768px, 1280px.
- **Accessibility:** semantic landmarks (`header/main/section/footer`), one `<h1>`, visible focus
  states, colour contrast ≥ 4.5:1, all images have `alt`, form inputs have `<label>`s.

## 7. Assets

Source screenshots live at: `/home/ajay/Downloads/Apptivate website media/media/`.

**Copy into `src/assets/work/` and use** (rename as shown):
- `Velocity.png`  → `velocity.png`  — **hero case study**, confirmed OK to show.
- `IcelandTours.png` → `iceland-tours.png` — optional "earlier work" thumb.
- `designtorget.png` → `designtorget.png` — optional "earlier work" thumb.
- `ecshopping.png` → `ecshopping.png` — optional "earlier work" thumb.

**Do NOT use:**
- `namastejs.png` — this is a third-party YouTube course thumbnail (Akshay Saini's "Namaste
  JavaScript"), not Apptivate's work. Excluded for copyright/brand reasons.
- `Brim.png`, `Berling.png`, `skolavefurinn.png`, `Farthegavefurinn.png`, `snae.png`, `FLE.png`
  — dated placeholder-content screenshots; leave out of v1 (can revisit later). Only the three
  optional thumbs above are needed if the "earlier work" strip is built.

**Optimisation:** serve via `astro:assets` `<Image />` with explicit `width`/`height` and
`loading="lazy"` (except the hero image which may be eager). Provide descriptive `alt` text.

**Favicon/logo:** no brand asset supplied. Create a simple `favicon.svg` — an "A" monogram or the
"Apptivate" wordmark mark in `--accent`. Keep it generic and easily replaceable.

## 8. Contact form

- Fields: **Name** (required), **Email** (required, type=email), **Company** (optional),
  **Message** (required, textarea), and a **GDPR consent checkbox** (required): "I consent to
  Apptivate storing my details to respond to this enquiry."
- **Submission backend (pick the simplest that works for a static site):**
  - **Preferred for v1:** [Formspree](https://formspree.io) (or similar) — set the form `action`
    to `{{FORM_ENDPOINT}}` and `method="POST"`. No server code needed.
  - **Alternative (if self-hosting the handler):** a tiny endpoint on the host that emails
    `{{CONTACT_EMAIL}}`. Only do this if the owner prefers not to use a third party.
- Add a honeypot hidden field for spam, and client-side required-field validation. On success,
  show an inline thank-you message; on error, show a retry message.
- Do not log or store submissions client-side.

## 9. Booking

- CTA buttons and the contact section link to `{{BOOKING_URL}}` (expected: a Calendly link).
- If embedding, use Calendly's official inline widget; otherwise a styled button link is acceptable
  for v1. Open external booking in a new tab (`rel="noopener"`).

## 10. SEO & meta (`Base.astro` layout)

- `<title>`: "Apptivate — Fractional CTO & product build for UK startups".
- `<meta name="description">`: ~150 chars summarising the value prop (§2).
- Open Graph + Twitter card tags (title, description, `og:image` — generate a simple 1200×630 OG
  image or reuse the hero; a placeholder is fine but include the tags).
- `lang="en-GB"`, viewport meta, theme-color = `--ink`.
- `public/robots.txt` allowing all + `Sitemap:` line. Add `@astrojs/sitemap` integration.
- Canonical URL `https://apptivate.uk/`.

## 11. Analytics (optional, privacy-first)

- If analytics is wanted, use a cookieless, GDPR-friendly option (e.g. Plausible) via a single
  script tag with the domain set to `apptivate.uk`. Otherwise omit. Do not add Google Analytics
  without a cookie banner.

## 12. Hosting & deployment

### 12.1 Recommended host — the dedicated box (198.244.235.95)
- `apptivate.uk` and `www.apptivate.uk` **already resolve to `198.244.235.95`** (DNS on IONOS).
- That box already runs **Caddy** (with Kestrel behind it) and **port 443 is free**.
- Plan: build the static site (`dist/`), copy it to the server, and point Caddy at it.
- **Blocker:** this laptop's SSH key is not yet authorised on that box (login returns
  `Permission denied (publickey)`). The public key to add is `~/.ssh/id_ed25519.pub` (comment
  `laptop`). This must be added via the OVH console or an already-authorised machine before deploy.
- Example Caddyfile:
  ```
  apptivate.uk, www.apptivate.uk {
      root * /var/www/apptivate
      encode zstd gzip
      file_server
      # If keeping a .NET API on this box, reverse_proxy /api/* 127.0.0.1:<kestrel-port>
  }
  ```
- Deploy = `npm run build` then `rsync -az dist/ user@198.244.235.95:/var/www/apptivate/` then
  `caddy reload`.

### 12.2 Can we use the existing travel-VPN VPS (198.244.189.5 / vps-644c6f96)? — Assessment
- We **do** have working SSH to this box (the `lonvps` key), it's Ubuntu 24.04, lightly loaded
  (1.9 GB RAM, ~23% of a 19 GB disk), and `ubuntu` has sudo.
- **The conflict:** `443/TCP` on this box is **already held by OpenVPN** (`openvpn` pid 782). The
  VPN is deliberately on 443 so it tunnels out through restrictive hotel/airport firewalls. A public
  website also needs 443, so they collide. There is **no web server installed** (no Caddy/nginx/
  Docker) and nothing on port 80.
- **Options if you insist on this box:**
  1. **Not recommended:** put the site on 80/443 and move OpenVPN off 443 — this breaks the whole
     point of the travel VPN (firewall traversal).
  2. **Possible but complex:** run a TLS/protocol demultiplexer on 443 (e.g. `sslh` or Caddy's
     `layer4` app) that routes OpenVPN vs HTTPS by protocol detection, so both share 443. Adds moving
     parts and a failure point in front of both your VPN and your public site.
  3. Host the site only on port 80 — not acceptable for a professional site (no HTTPS).
- **Downsides regardless:** mixing a public web server onto your personal travel-VPN box increases
  its attack surface, and publicly associates your VPN endpoint IP with the business (anyone
  resolving `apptivate.uk` would see your VPN IP). DNS would also need repointing from
  `198.244.235.95` to `198.244.189.5`.
- **Recommendation:** host on the dedicated `198.244.235.95` box (§12.1). It's already provisioned,
  DNS already points there, and 443 is free. Keep the VPN box doing just the VPN.

## 13. Placeholders the owner must supply

Replace every token below before go-live. Until supplied, keep the literal token in the code and
list it in a top-of-file `TODO`.

| Token | Meaning | Known candidate (confirm) |
|---|---|---|
| `{{BOOKING_URL}}` | Calendly / booking link | none yet |
| `{{CONTACT_EMAIL}}` | Business email for the form + mailto | `info@apptivate.uk` (confirm it exists) |
| `{{FORM_ENDPOINT}}` | Formspree (or similar) POST URL | none yet |
| `{{COMPANY_NUMBER}}` | Apptivate Ltd company number (Companies House) | none yet |
| `{{CONTACT_PHONE}}` | Public phone, only if desired | `07792 138407` is a **personal** number from the CV — confirm before publishing |

Also needed eventually: a real logo/favicon, an OG share image, and Privacy/Cookies page copy
(a standard UK GDPR privacy notice — stub for v1, finalise before launch).

## 14. Build & run

```
npm create astro@latest .        # or set up the files manually per §4
npm install
npm run dev                      # local dev at http://localhost:4321
npm run build                    # outputs static site to dist/
npm run preview                  # preview the production build
```

Add `@astrojs/sitemap` and `astro:assets` is built in.

## 15. Acceptance checklist

- [ ] Single page renders all sections from §5 in order, responsive at 360/768/1280px.
- [ ] Every CTA points to `{{BOOKING_URL}}` or the contact form; no dead links.
- [ ] Contact form validates, has GDPR consent + honeypot, posts to `{{FORM_ENDPOINT}}`, shows
      success/error states.
- [ ] Only approved images used (velocity + optional earlier-work thumbs); `namastejs.png` absent.
- [ ] Lighthouse: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95 on the built site.
- [ ] Meta/OG/sitemap/robots present; `lang="en-GB"`; one `<h1>`.
- [ ] No placeholder tokens left unresolved at go-live (§13).
- [ ] Builds cleanly with `npm run build`; deploys to `/var/www/apptivate` behind Caddy (§12.1).
