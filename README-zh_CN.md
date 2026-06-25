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

### shadcn 无头安装

AnyUI 同时提供兼容 shadcn 的 GitHub registry，可无交互安装：

```bash
pnpm dlx shadcn@latest add any-design/anyui/vue --yes --silent
pnpm dlx shadcn@latest add any-design/anyui/react --yes --silent
pnpm dlx shadcn@latest add any-design/anyui/svelte --yes --silent
```

这些命令会安装对应依赖，把 AnyUI 样式写入 shadcn 配置的 CSS 文件，并在项目内添加
`@/lib/anyui-vue`、`@/lib/anyui-react` 或 `@/lib/anyui-svelte` 框架入口文件。

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

`pnpm run dev` 会同时启动官网和多框架 Testground，并把 Testground 挂载到 `/testground/`，本地开发时文档和组件预览就是同一个站点。Testground 会直接基于库源码同时渲染 Vue / React / Svelte 三套组件——详见[它的 README](./packages/testground/README.md)。

## 自定义主题

详见 [Theme Customization](./docs/theme/customization.md) 与[设计 Token 参考](./docs/theme/tokens.md)。

## Liquid Glass 风格

AnyUI 提供可选的液态玻璃（Liquid Glass）风格。开启后，按钮、卡片、输入框、下拉菜单、消息提示、抽屉等表面组件会变为带背景模糊与高光描边的半透明质感，并自动适配亮色与暗色主题。

全局开启：

```html
<html data-anyui-style="glass">
```

或只作用于某个局部区域：

```html
<div class="a-glass">
  <a-card>...</a-card>
</div>
```

注意：传送（teleport）到 `<body>` 的浮层组件（popper、message、select 下拉等）只在全局模式下生效。

## 组件预览

你可以在 Testground 内预览现有组件：

[https://anyui.pwp.sh/testground/](https://anyui.pwp.sh/testground/)

## 许可协议

[MIT](LICENSE)
