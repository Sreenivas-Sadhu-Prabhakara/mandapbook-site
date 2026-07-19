# MandapBook — explainer site

A standalone marketing / explainer page for **MandapBook**, booking software for
wedding and event vendors (caterers, tent houses, decorators, photographers).

> **No double-booked dates, ever.** Catch date collisions the moment a booking is
> entered, and track advance vs balance for every event. **Rs 799/mo.**

This is **not** the product itself — it is a single-page site whose only job is to
make the idea instantly clear to (a) a non-technical Indian SMB owner and
(b) an investor skimming for 30 seconds.

## Run it

No build step, no dependencies. Open the file directly:

```
open index.html
```

Or serve the folder with any static server:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Fully self-contained and static. Upload the folder as-is to any static host
(Netlify, Cloudflare Pages, GitHub Pages, S3). No environment variables, no CDNs,
no external fonts, images or scripts — every asset is inline.

## Files

| File          | Purpose                                                             |
|---------------|---------------------------------------------------------------------|
| `index.html`  | All page content and structure                                      |
| `styles.css`  | All styling (design tokens at the top of the file)                  |
| `app.js`      | Sticky-nav elevation, smooth scroll, animated stat counters, and the interactive date-collision widget in the hero |
| `favicon.svg` | Inline SVG mandap mark                                               |

## Design notes

- **Accent:** `#9F1239` (maroon-rose — a wedding palette), warm near-black ink
  `#1C1A17`, warm off-white paper `#FBF7F2`, blush-sand tint `#F0E3D6`, and a
  restrained marigold `#E8A33D` reserved for the collision / over-capacity warning.
- System font stack throughout; hierarchy carried by weight, width and letter-spacing
  plus tabular numerals for rupee figures.
- **Signature element:** the hero's live date-collision tile — add a third booking to
  12 Dec and the over-capacity warning fires, which is exactly the product's wedge.
- Responsive down to mobile; no horizontal page scroll (wide tables scroll inside their
  own container); visible keyboard focus; `prefers-reduced-motion` respected.

---

A **KARYA** studio build · sreeni.nintendo@gmail.com
