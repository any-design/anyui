# Design Tokens

AnyUI's visual language ("cute, fresh, modern") is built on a small set of CSS custom properties. Every component reads them with a fallback, so you can re-skin the library globally — or per subtree — by overriding a handful of variables.

All tokens are defined in `packages/vue/src/styles/theme/tokens.scss` and shipped inside `@any-design/anyui/styles/index.css` (or `theme.css`).

## Radius scale

Generous roundness is the core of the cute tone.

| Token | Default | Typical usage |
| --- | --- | --- |
| `--a-radius-xs` | `6px` | tiny indicators, sliding highlights |
| `--a-radius-sm` | `10px` | inputs, menu items, small controls |
| `--a-radius` | `14px` | buttons, messages, dropdown panels |
| `--a-radius-lg` | `18px` | large buttons, drawers |
| `--a-radius-xl` | `22px` | cards, panels |
| `--a-radius-full` | `999px` | pills, dots, round controls |

## Motion

| Token | Default | Usage |
| --- | --- | --- |
| `--anim-duration` | `200ms` | standard transitions |
| `--anim-duration-quick` | `120ms` | hover / press feedback |
| `--anim-duration-slow` | `320ms` | pop-in entrances |
| `--a-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | springy overshoot for presses and pop-ins |
| `--a-ease-soft` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | gentle ease-out for focus / color changes |

## Elevation

Soft, diffuse, never harsh. Each tier is a two-layer shadow built on the theme's `--shadow-*` alpha colors, so it adapts to dark mode automatically.

| Token | Usage |
| --- | --- |
| `--a-shadow-xs` | inline elements (tags, checkboxes) |
| `--a-shadow-sm` | buttons, raised inputs |
| `--a-shadow-md` | cards, dropdowns, messages |
| `--a-shadow-lg` | overlays, hovering cards |

Colored fills (primary buttons, colored messages) additionally use a same-hue tinted shadow via `color-mix()`, which you get for free when you change the theme colors.

## Focus ring

`--a-focus-ring` (default `0 0 0 3px var(--primary-18)`) is applied on focused inputs and textareas.

## Surface indirection layer

These tokens power the optional [liquid glass style](#liquid-glass). Components never hard-code their surface; they read:

| Token | Default | Meaning |
| --- | --- | --- |
| `--a-surface` | `var(--bg-bright)` | raised surface background (buttons, cards, menus) |
| `--a-surface-input` | `var(--bg-semi-light)` | form field background |
| `--a-surface-border-color` | `transparent` | hairline border around surfaces |
| `--a-surface-backdrop` | `none` | `backdrop-filter` value |
| `--a-surface-highlight` | `0 0 #0000` | inner specular highlight (first box-shadow layer) |

## Menu item states

Hovered and selected items in menus and lists (popup menu, select dropdown, list menu) read another set of indirection tokens. They are intentionally **undefined by default** — each component falls back to its own classic style — and are only set by the liquid glass theme, which turns them into floating frosted pills with a specular rim:

| Token | Glass behavior |
| --- | --- |
| `--a-item-hover-bg` | translucent white wash on hover |
| `--a-item-selected-bg` | frosted pill background |
| `--a-item-selected-gradient` | set to `none` (disables the classic gradient pill) |
| `--a-item-selected-color` | selected text color |
| `--a-item-selected-text-shadow` | set to `none` under glass |
| `--a-item-selected-highlight` | inset specular rim |
| `--a-item-selected-shadow` | soft drop shadow lifting the pill |

## Liquid glass

Enable globally:

```html
<html data-anyui-style="glass">
```

Or scope to a subtree:

```html
<div class="a-glass">...</div>
```

The glass theme overrides only the surface tokens above (using `color-mix()` over your theme colors plus `backdrop-filter`), so it composes with any custom theme and with dark mode out of the box. Floating elements teleported to `<body>` (popper, message, select dropdown) only pick the style up in global mode.

## Overriding tokens

Tokens are plain CSS custom properties — override them anywhere after the AnyUI stylesheet:

```css
:root {
  /* chubbier corners and snappier presses */
  --a-radius: 16px;
  --a-radius-xl: 26px;
  --anim-duration-quick: 100ms;
}
```

For SCSS-level theme color customization (which feeds the `--primary-*` / `--shadow-*` colors the tokens build on), see [Theme Customization](./customization.md).
