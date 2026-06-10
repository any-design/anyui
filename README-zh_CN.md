# AnyUI

<br>

<div align="center">
<img src="./assets/logo.png" width="240">

[English](README.md) | [中文](README-zh_CN.md)

一款拥有萌系设计风格的多框架设计系统与 UI 组件库，支持 Vue、React 和 Svelte。

警告：本项目仍然处于快速迭代阶段，我们不完全保证稳定性，请勿用于重要项目。

</div>

<br>

## 安装

```bash
pnpm add @any-design/anyui
```

AnyUI 现在以一个 npm 包发布，并通过框架 scope 提供入口：

```ts
import AnyUI from '@any-design/anyui/vue';
import { Button as ReactButton } from '@any-design/anyui/react';
import { Button as SvelteButton } from '@any-design/anyui/svelte';
import '@any-design/anyui/styles/index.css';
```

默认入口仍然指向 Vue 构建以保持兼容；新项目建议显式使用 `@any-design/anyui/vue`。

## Vue

```ts
import { createApp } from 'vue';
import AnyUI from '@any-design/anyui/vue';
import '@any-design/anyui/styles/index.css';

const app = createApp(App);

app.use(AnyUI);
app.mount('#app');
```

### 按需导入

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

## Monorepo 开发

AnyUI 使用 pnpm workspace 和 Turbo 管理大仓。

```bash
pnpm install
pnpm run dev
pnpm run generate
pnpm run dist
pnpm run typecheck
```

工作区包位于 `packages/vue`、`packages/react` 和 `packages/svelte`。React 与 Svelte 的源码由 `scripts/generate-framework-packages.mjs` 根据共享组件清单幂等生成；修改组件清单或共享 API 后请重新执行生成命令。

## 自定义主题

详见 [Theme Customization](./docs/theme/customization.md)。

## 组件预览

你可以在 Testground 内预览现有组件：

[https://anyui-testground.pwp.app](https://anyui-testground.pwp.app)

## 许可协议

[MIT](LICENSE)
