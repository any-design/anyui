---
name: anyui-author-component
description: "Create, modify, or port AnyUI components inside this repository. Use when adding a component, changing component props, slots, events, styles, React or Svelte implementations, Vue package exports, shared type surfaces, demos, generation safety, or cross-framework behavior."
---

# AnyUI Author Component

## Overview

Use this skill for component work in the AnyUI monorepo. Vue components are the primary API reference, but React and Svelte implementations may be either generator-owned or already hand-completed. Decide ownership before running generation.

## Source Ownership

- Canonical component implementation: `packages/vue/src/packages/<folder>/`.
- Component styles: Vue single-file component `<style lang="scss">` blocks. The build extracts them into `styles/components/*`.
- Shared theme and token source: `packages/vue/src/styles/`.
- React and Svelte package sources: `packages/react/src/` and `packages/svelte/src/`.
- Cross-framework generator: `scripts/generate-framework-packages.mjs`.
- Testground demos: `packages/testground/src/demos/{vue,react,svelte}/`.

Treat `pnpm run generate` as destructive for React and Svelte sources. It rewrites generated package files. If a component already has a complete, maintained React or Svelte implementation, do not use generation to recreate it. Patch the complete implementation directly and keep its behavior aligned with Vue.

Only update `scripts/generate-framework-packages.mjs` and run `pnpm run generate` when the target React/Svelte implementation is clearly generator-owned, incomplete, or intentionally being regenerated.

## Generation Safety Rule

Before running `pnpm run generate`:

1. Inspect the relevant React and Svelte implementation files.
2. Check whether they are placeholders, obviously generated, incomplete, or already complete.
3. If they are already complete, do not run generation for that change.
4. If generation is still needed for another component, protect or restore unrelated complete implementations before finishing.
5. After generation, inspect the diff carefully and revert unintended overwrites only for files changed by that generation step.

## Naming Contract

Components use an `A` prefix in Vue component names and docs, with non-prefixed package exports:

- Vue file: `AButton.vue`.
- Folder: `button` or lower camel case such as `radioButtonGroup`.
- Export: `Button` and `AButton`.
- CSS namespace: `a-button`, with BEM-like elements such as `a-button__inner` and modifiers such as `a-button--primary`.
- Docs path: `docs/components/button/AButton/AButton_English.md` and `AButton_Chinese.md`.
- Testground demo id: lower camel case, for example `button.vue`, `radioButtonGroup.tsx`, `otpInput.svelte`.

New component names must start with `A` and use PascalCase.

## Adding a Component

Prefer the scaffold:

```bash
pnpm run new
```

The scaffold creates the Vue package files, a Vue testground stub, updates `packages/vue/src/index.ts`, and adds a placeholder to the framework generator.

After scaffolding:

1. Implement the Vue component in `packages/vue/src/packages/<folder>/`.
2. Keep props, slots, and events portable across Vue, React, and Svelte.
3. Decide whether the new React and Svelte implementations should be generator-owned or hand-completed.
4. If generator-owned, add or update the templates in `scripts/generate-framework-packages.mjs`, then run `pnpm run generate` and inspect the diff.
5. If hand-completed, create or patch `packages/react/src` and `packages/svelte/src` directly and do not run generation for those implementations.
6. Add demos for all supported frameworks in `packages/testground/src/demos/*`.
7. Add docs and website metadata using `$anyui-docs-website`.
8. Run `pnpm run typecheck` and use `/testground/` for visual behavior checks.

If the scaffold is not practical, mirror the same outputs manually and keep the index, ownership decision, demos, and docs in sync.

## Updating a Component

Start from the Vue source, then trace the API outward:

1. Update `A<Component>.vue`, nearby `types.ts`, and package `index.ts`.
2. Inspect React and Svelte ownership for the same component before editing.
3. If the implementation is generator-owned, update `scripts/generate-framework-packages.mjs`, run `pnpm run generate`, and inspect the diff.
4. If the implementation is already complete, patch `packages/react/src` or `packages/svelte/src` directly and do not regenerate it.
5. Update shared type generation only when the public type surface is actually generator-owned.
6. Update testground demos and docs examples.

Use model-style APIs consistently:

- Vue: `v-model`, `modelValue`, and `update:modelValue`.
- React: `modelValue`, `onUpdateModelValue`, and `onChange`.
- Svelte: keep exported props and callback names aligned with the generated package conventions.

## Styling Rules

Keep styling in the component SFC style block and rely on shared tokens:

- Use `var(--a-radius*)`, `var(--a-shadow*)`, `var(--a-focus-ring)`, `var(--a-surface*)`, and color tokens such as `var(--primary)` or `var(--bg-bright)`.
- Provide fallbacks for new CSS variables when a component consumes them.
- Add `:focus-visible` where keyboard interaction exists.
- Keep disabled and loading states non-interactive and visually distinct.
- Avoid hard-coded one-off colors when a theme token can express the state.
- Use small transform-based motion for hover, press, enter, and leave states.

The root `styles/` directory is a build output copied from Vue styles and compiled by `scripts/afterBuild.mjs`. Make source changes under `packages/vue/src/styles` or in component SFC styles.

## Cross-Framework Checks

The testground renders Vue, React, and Svelte demos side by side from source aliases:

```bash
pnpm run dev
```

Open `/testground/`, enable all frameworks, and compare:

- visual spacing and state parity;
- controlled and uncontrolled value behavior;
- keyboard and pointer interaction;
- dark mode and liquid glass mode;
- docs examples against the live component API.
