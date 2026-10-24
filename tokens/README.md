# Majlis design tokens

Exported from the Figma file **Majlis (Copy)** on 24 Oct 2026, in the [W3C Design Tokens format](https://www.designtokens.org/tr/drafts/format/) (`$type` / `$value`), which Style Dictionary reads directly.

## Files

| File | Figma collection | What it holds |
| --- | --- | --- |
| `primitives.json` | Primitives | Raw palette, spacing, radius, sizes, type scale. Never used directly by components. |
| `brands/majlis.json` | Brand · Majlis mode | Brand ramps (`brand.primary`, `secondary`, `tint`, `accent`, 50–900) and `brand.font.heading` / `body`, pointing at the Majlis primitives. |
| `brands/brand1.json` | Brand · Brand1 mode | Same token names with Brand1's values (orange `#E4572E`, Poppins + Manrope). |
| `semantic/color.json` | Semantic - Color | Colour roles: `color.action.*`, `color.text.*`, `color.brand.*`, `color.gradient.*`, … |
| `semantic/base.json` | Semantic | Icon colours and sizes, spacing, radius, border widths, opacity, shadow colours. |
| `executive-dashboard/light.json`, `dark.json` | Executive Dashboard | `dash.*` tokens for the Executive AI Chat screens, per theme. |

## How the layers connect

```
primitives  ←  brands/<client>.json  ←  semantic/*.json  ←  components
```

Semantic tokens reference brand tokens (for example `color.action.primary.bg.default` → `{brand.primary.600}`), so **one semantic file serves every client**. To build a client's CSS, combine `primitives.json` + **one** brand file + the semantic files.

## Adding a client

Add a mode to the **Brand** collection in Figma, re-export, and a new `brands/<client>.json` appears with the same token names.

## Notes

- The CSS variable name Figma uses for each token is kept in `$extensions["com.figma"].codeSyntax.WEB`.
- Dimensions, including letter-spacing, are in `px` (Figma applies letter-spacing variables as pixels).
- Font weights are CSS numbers. The original Figma style name is kept in `figmaFontStyle`.
- Chart and map data colours (`color.data.*`, `dash.c1`–`c5`) deliberately do not change per brand.
