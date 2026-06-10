# AnyUI

<br>

<div align="center">
<img src="./assets/logo.png" width="240">

[English](README.md) | [中文](README-zh_CN.md)

AnyUI is a cute multi-framework design system and UI component library for Vue, React, and Svelte.

IMPORTANT: This project is still a work in progress.

</div>

<br>

## Install

```bash
pnpm add @any-design/anyui
```

AnyUI publishes one package with framework-scoped entrypoints:

```ts
import AnyUI from '@any-design/anyui/vue';
import { Button as ReactButton } from '@any-design/anyui/react';
import { Button as SvelteButton } from '@any-design/anyui/svelte';
import '@any-design/anyui/styles/index.css';
```

The default package entry remains the Vue build for compatibility, but new Vue code should prefer `@any-design/anyui/vue`.

## Vue

```ts
import { createApp } from 'vue';
import AnyUI from '@any-design/anyui/vue';
import '@any-design/anyui/styles/index.css';

const app = createApp(App);

app.use(AnyUI);
app.mount('#app');
```

### Import On Demand

```bash
pnpm add -D unplugin-vue-components unplugin-auto-import
```

```ts
import { AnyUIResolver } from '@any-design/anyui/vue/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [AnyUIResolver()],
    }),
    Components({
      resolvers: [AnyUIResolver()],
    }),
  ],
});
```

## React

```tsx
import { Button } from '@any-design/anyui/react';
import '@any-design/anyui/styles/index.css';

export function Example() {
  return <Button type="primary">Button</Button>;
}
```

## Svelte

```svelte
<script lang="ts">
  import { Button } from '@any-design/anyui/svelte';
  import '@any-design/anyui/styles/index.css';
</script>

<Button type="primary">Button</Button>
```

## Monorepo Development

AnyUI uses pnpm workspaces and Turbo.

```bash
pnpm install
pnpm run dev
pnpm run generate
pnpm run dist
pnpm run typecheck
```

Workspace packages live under `packages/vue`, `packages/react`, and `packages/svelte`. React and Svelte sources are generated from the shared component manifest in `scripts/generate-framework-packages.mjs`, so regenerate them after changing the manifest or shared component API.

## Custom Theme

See [Theme Customization](./docs/theme/customization.md) for more details.

## Testground

We've deployed a testground where you can explore the UI components:

[https://anyui-testground.pwp.app](https://anyui-testground.pwp.app)

## License

[MIT](LICENSE)
