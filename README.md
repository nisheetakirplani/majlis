# Majlis

Design prototypes plus the Majlis design-token pipeline.

## Design tokens → CSS → Tailwind

```
Figma variables ──export──▶ tokens/*.json ──npm run tokens──▶ build/css/*.css ──npm run css──▶ demo/app.css
```

| Folder / file | What it is |
| --- | --- |
| `tokens/` | W3C design-token JSON exported from Figma (see `tokens/README.md`). |
| `build-tokens.js` | Style Dictionary build: one CSS file per layer and per brand, plus the Tailwind theme. |
| `build/css/` | Generated CSS variables. Do not edit by hand; run `npm run tokens`. |
| `src/app.css` | Tailwind entry: imports the generated CSS. |
| `demo/index.html`, `demo/assets/` | The Glass Bento Home screen from Figma, with a **Majlis / Brand1 / Both** switch. |
| `scripts/serve.js` | Local server for the demo (`npm run serve`). |

### Commands

```bash
npm install
npm run build   # tokens + Tailwind CSS
npm run dev     # same, then rebuild CSS on change
npm run serve   # open http://localhost:4173
```

Open the demo through `npm run serve`, not by double-clicking the file: icons are drawn with CSS masks, which browsers block on `file://`.

The demo is a code version of the Figma screen **Set 2 / I · Glass Bento — Home** (node `824:2330`). Icons come from Figma and are filled with token colours, so they follow the brand.

### How brand switching works

- `build/css/brands/<brand>.css` defines the `--brand-*` variables inside `[data-brand="<brand>"]`. Majlis is also the `:root` default.
- `build/css/semantic.css` defines roles such as `--color-action-primary-bg-default: var(--brand-primary-600)`.
- Tailwind utilities point at the semantic variables, for example `bg-action-primary-bg`, `text-text-secondary` and `font-heading`.

Set `data-brand="brand1"` on `<html>` or on any container, and everything inside switches colours and fonts. No class changes are needed.

### Tailwind class names

Every semantic colour token becomes a Tailwind colour. The name is the token path without `color/` and without a trailing `/default`:

| Token | Tailwind colour | Example class |
| --- | --- | --- |
| `color/action/primary/bg/default` | `action-primary-bg` | `bg-action-primary-bg` |
| `color/text/secondary` | `text-secondary` | `text-text-secondary` |
| `color/border/default` | `border` | `border-border` |
| `color/icon/brand` | `icon-brand` | `text-icon-brand` |
| `color/gradient/aurora-green/*` | (utility) | `bg-gradient-aurora-green` |

Tailwind's default colour palette is switched off, so only Majlis semantic colours can be used.

### Adding a client

1. In Figma, add a mode to the **Brand** collection and fill in the client's colours and fonts.
2. Re-export so `tokens/brands/<client>.json` appears.
3. Run `npm run build`. `build/css/brands/<client>.css` is generated automatically.
4. Import it in `src/app.css` and use `data-brand="<client>"`.
