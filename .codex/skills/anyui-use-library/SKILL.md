---
name: anyui-use-library
description: "Use AnyUI correctly in consuming applications. Use when integrating @any-design/anyui into Vue, React, or Svelte apps; choosing package entrypoints, global or on-demand imports, shadcn registry commands, peer dependencies, CSS or SCSS styles, theme overrides, dark mode, or liquid glass setup."
---

# AnyUI Use Library

## Overview

Use this skill when adding AnyUI to an app or explaining how another project should consume it. AnyUI publishes one package with framework-scoped entrypoints and a shared stylesheet.

## Package Entry Points

Install the package once:

```bash
pnpm add @any-design/anyui
```

Always import a framework-specific runtime:

```ts
import AnyUI from '@any-design/anyui/vue';
import { Button as ReactButton } from '@any-design/anyui/react';
import { Button as SvelteButton } from '@any-design/anyui/svelte';
import '@any-design/anyui/styles/index.css';
```

The package root currently resolves to the Vue build for compatibility. Prefer `@any-design/anyui/vue` in new Vue code so the intent is explicit.

## Vue Usage

For full installation:

```ts
import { createApp } from 'vue';
import AnyUI from '@any-design/anyui/vue';
import '@any-design/anyui/styles/index.css';

createApp(App).use(AnyUI).mount('#app');
```

For on-demand component resolution, use the resolver exported by the Vue package:

```ts
import { AnyUIResolver } from '@any-design/anyui/vue/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ resolvers: [AnyUIResolver()] }),
    Components({ resolvers: [AnyUIResolver()] }),
  ],
});
```

Vue exports both non-prefixed and `A`-prefixed names. In templates and docs, prefer the public component spelling such as `<AButton>` or `<a-button>` after global install.

## React Usage

Import components from the React entrypoint and include the shared stylesheet once in the app:

```tsx
import { Button } from '@any-design/anyui/react';
import '@any-design/anyui/styles/index.css';

export function Example() {
  return <Button type="primary">Button</Button>;
}
```

Install React peer dependencies as usual, and install `@iconify/react` when using icon props. React components try to keep the same prop surface as Vue; model-style APIs commonly expose `modelValue`, `onUpdateModelValue`, and `onChange`.

## Svelte Usage

Import components from the Svelte entrypoint and include the shared stylesheet once:

```svelte
<script lang="ts">
  import { Button } from '@any-design/anyui/svelte';
  import '@any-design/anyui/styles/index.css';
</script>

<Button type="primary">Button</Button>
```

Use Svelte 5 conventions. Install `@iconify/svelte` when icon props are used. Imperative helpers such as `message`, `toast`, `confirmModal`, and `loadingMask` are exported from the Svelte package when available.

## shadcn Registry

AnyUI ships shadcn-compatible registry entries:

```bash
pnpm dlx shadcn@latest add any-design/anyui/vue --yes --silent
pnpm dlx shadcn@latest add any-design/anyui/react --yes --silent
pnpm dlx shadcn@latest add any-design/anyui/svelte --yes --silent
```

These commands install dependencies, add the AnyUI stylesheet to the target CSS file, and create a framework entry file under `@/lib/anyui-vue`, `@/lib/anyui-react`, or `@/lib/anyui-svelte`.

## Styles and Themes

Use CSS for the default theme:

```ts
import '@any-design/anyui/styles/index.css';
```

Use SCSS when overriding theme maps or variables. Define overrides before importing AnyUI:

```scss
$colors: (
  primary: #4f7cff,
);

@use '@any-design/anyui/styles/index.scss' as *;
```

Dark mode defaults to `html[theme="dark"]`. The SCSS variable `$dark-theme-selector` can change that selector when building a custom theme.

Enable the optional liquid glass style globally:

```html
<html data-anyui-style="glass">
```

Or scope it to a subtree:

```html
<div class="a-glass">
  <AButton>Glass</AButton>
</div>
```

Floating elements teleported to `body` only inherit glass styling when glass is enabled globally.

## Verification

When changing this repo, run the narrowest relevant checks:

```bash
pnpm run typecheck
pnpm run dev
```

Use `/testground/` during local development to compare Vue, React, and Svelte behavior side by side.
