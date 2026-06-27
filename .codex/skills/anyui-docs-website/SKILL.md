---
name: anyui-docs-website
description: "Update AnyUI documentation, examples, website pages, component metadata, SEO data, or testground demos. Use when adding or editing docs/components Markdown pairs, packages/website Astro or Vue files, localized docs, component listings, migration guides, theme docs, shadcn registry docs, or the multi-framework testground."
---

# AnyUI Docs Website

## Overview

Use this skill when changing AnyUI's docs site, component reference docs, or testground. The website is an Astro app with Vue islands, and component pages are driven by metadata plus Markdown files.

## Important Paths

- Website app: `packages/website/`.
- Component metadata: `packages/website/src/data/components.ts`.
- SEO and sitemap data: `packages/website/src/data/seo.ts`.
- Component page route: `packages/website/src/pages/components/[slug].astro`.
- Docs layouts: `packages/website/src/layouts/`.
- Component docs: `docs/components/<folder>/A<Name>/A<Name>_English.md` and `_Chinese.md`.
- Theme docs: `docs/theme/` plus `packages/website/src/pages/docs/`.
- Migration docs: `docs/migration/`.
- Testground: `packages/testground/`.

## Component Docs Workflow

For every component docs update:

1. Update both English and Chinese Markdown files.
2. Keep the `# A<Component>` heading and examples aligned across languages.
3. Use Vue examples as the primary examples unless the topic is framework-specific.
4. Mention React and Svelte differences only when they are real.
5. Keep prop, event, and slot tables synchronized with the actual component API.
6. Update `packages/website/src/data/components.ts` when a component is added, renamed, recategorized, or its blurb changes.

Docs paths use the Vue `A`-prefixed public name:

```text
docs/components/button/AButton/AButton_English.md
docs/components/button/AButton/AButton_Chinese.md
```

Subcomponents live under the same component folder when that is how the package is organized, for example `ARadioButtonGroup` and `ARadioButton`.

## Website Copy and Structure

Keep the website practical and component-led:

- Show actual AnyUI components instead of abstract marketing blocks.
- Keep first-screen copy short and product-specific.
- Prefer docs, component grids, code examples, and playground links over decorative filler.
- Preserve bilingual behavior and language preference handling.
- Use site-local Vue islands for interactive pieces already implemented in `packages/website/src/components/vue`.

When updating navigation or docs routes, check `SiteNav.vue`, docs layouts, sitemap entries, and localized labels.

## Testground Workflow

The testground compares Vue, React, and Svelte implementations side by side:

```bash
pnpm run dev
```

It mounts at `/testground/` from the root dev server.

Add demos by filename:

```text
packages/testground/src/demos/vue/button.vue
packages/testground/src/demos/react/button.tsx
packages/testground/src/demos/svelte/button.svelte
```

Use lower camel case for multi-word ids, such as `radioButtonGroup` or `otpInput`. The registry auto-loads demo files with `import.meta.glob`.

Demo conventions:

- Default export one component.
- Use a plain `<div>` root.
- Group examples with `demo-block`, `demo-block__label`, `demo-row`, and `demo-col`.
- Keep tall demos bounded with fixed heights so the three framework panels remain comparable.
- Include dark mode and liquid glass cases when the component has surface styling.

## Docs Style

Use a reference tone: concise, concrete, and API-first.

- Start with what the component is for.
- Add import guidance.
- Provide small runnable examples.
- Document props, events, and slots in tables.
- Call out framework limitations precisely.
- Avoid promising parity when React or Svelte support is intentionally narrower.

## Verification

Run the relevant checks before finishing:

```bash
pnpm run typecheck
pnpm run dev
pnpm run build:website
```

Use `/components/<slug>` for docs rendering and `/testground/` for multi-framework behavior checks.
