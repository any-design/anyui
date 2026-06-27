---
name: anyui-design-language
description: "Apply AnyUI's global design direction to components, docs examples, demos, and website UI. Use when making visual design choices, styling components, choosing colors, radius, motion, shadows, dark mode, liquid glass behavior, icon usage, spacing, typography, or deciding whether a UI feels like AnyUI."
---

# AnyUI Design Language

## Overview

AnyUI's design voice is cute, fresh, and modern. It should feel friendly and tactile, but still useful as a real multi-framework component library.

## Visual Direction

Design toward these traits:

- Rounded controls with soft geometry.
- Bright primary blue with cyan secondary accents.
- Airy spacing and readable component density.
- Soft elevation with diffuse shadows.
- Small springy motion on hover, press, and entrance states.
- Clear focus, disabled, loading, selected, hover, and active states.
- Components as the hero: real controls, real states, and real examples.

Avoid these traits:

- Sharp enterprise gray surfaces.
- Harsh black shadows or heavy borders.
- One-note blue-only screens.
- Decorative visuals that compete with the components.
- Motion that changes layout or feels bouncy for its own sake.

## Token System

Use the shared tokens instead of one-off values:

- Radius: `--a-radius-xs`, `--a-radius-sm`, `--a-radius`, `--a-radius-lg`, `--a-radius-xl`, `--a-radius-full`.
- Motion: `--anim-duration-quick`, `--anim-duration`, `--anim-duration-slow`, `--a-ease-spring`, `--a-ease-soft`.
- Elevation: `--a-shadow-xs`, `--a-shadow-sm`, `--a-shadow-md`, `--a-shadow-lg`.
- Focus: `--a-focus-ring`.
- Surfaces: `--a-surface`, `--a-surface-control`, `--a-surface-input`, `--a-surface-border-color`, `--a-surface-backdrop`, `--a-surface-highlight`.

Source token files live under `packages/vue/src/styles/theme/`. Root `styles/` files are build outputs.

## Component Styling

Style components with the `a-*` class namespace and BEM-like structure:

```scss
.a-button {}
.a-button__inner {}
.a-button--primary {}
```

Prefer these patterns:

- Surface backgrounds read from `--a-surface*` tokens.
- Primary and status states use theme colors, alpha tokens, and `color-mix()`.
- Press states use slight `scale()` or `translateY()` transforms.
- Hover states lift subtly and brighten only when it improves feedback.
- `:focus-visible` uses `--a-focus-ring`.
- Disabled states remove hover and active transforms.
- Loading states block interaction and preserve layout.

Do not bake theme decisions into a single component unless the value is component-specific and has a documented fallback.

## Liquid Glass

Liquid glass is optional and should compose through surface tokens.

Enable globally:

```html
<html data-anyui-style="glass">
```

Enable on a subtree:

```html
<div class="a-glass">...</div>
```

Rules for glass:

- Large surfaces may use translucent fills, blur, subtle borders, and specular highlights.
- Small controls should stay crisp; avoid animated blurred regions on buttons and compact controls.
- Teleported floating elements need global glass mode because scoped `.a-glass` does not reach `body`.
- Glass must work in both light and dark themes.

## Dark Mode

Dark mode uses `html[theme="dark"]` by default. Keep dark UI luminous rather than black:

- Use deeper ambient shadows plus faint light hairlines.
- Preserve primary color clarity.
- Make text contrast explicit.
- Check glass surfaces against dark backgrounds.

## Website and Demo Aesthetic

The website should sell the component library by showing the component library.

- Use real AnyUI controls in hero and demo sections.
- Keep copy short, concrete, and bilingual where needed.
- Favor compact, scannable docs and playground layouts.
- Use Iconify icons when an icon helps identify an action or state.
- Avoid generic landing-page filler, oversized decorative cards, and abstract illustrations.

## Quality Bar

Before finishing visual work, inspect:

- default, hover, active, disabled, focus, loading, selected, and error states;
- small, default, and large sizes when supported;
- light and dark themes;
- solid and liquid glass styles;
- responsive behavior in docs and testground panels;
- text overflow inside buttons, tabs, tags, cards, and menu items.
