# AButton

`AButton` 是 AnyUI 的核心操作组件。它支持多种视觉风格、三种尺寸、前/后图标、加载态，以及 AnyUI 标志性的弹簧按压动画。

该组件在 **Vue**、**React** 和 **Svelte** 三端共享同一套 props，仅各框架的绑定语法略有不同。

## 引入

```ts
import { Button } from '@any-design/anyui/vue';
// React:  import { Button } from '@any-design/anyui/react';
// Svelte: import { Button } from '@any-design/anyui/svelte';
```

在 Vue 中通过 `app.use(AnyUI)` 全局注册后，可直接在模板里使用 `<AButton>`，无需手动引入。

## 基础用法

最简单的按钮 —— 默认样式、默认尺寸，内容通过默认插槽传入。

```vue
<template>
  <AButton>点我</AButton>
</template>
```

## 示例

### 样式类型

`type` 属性决定整体外观。Vue 支持九种取值；React 与 Svelte 当前支持 `default`、`primary`、`gradient`、`gradient-reverse`。

```vue
<template>
  <div class="demo-row">
    <AButton>Default</AButton>
    <AButton type="primary">Primary</AButton>
    <AButton type="secondary">Secondary</AButton>
    <AButton type="gradient">Gradient</AButton>
    <AButton type="gradient-reverse">Gradient reverse</AButton>
    <AButton type="depth">Depth</AButton>
  </div>
</template>
```

### 尺寸

提供三种尺寸：`small`、`default`、`large`。

```vue
<template>
  <div class="demo-row">
    <AButton size="small">Small</AButton>
    <AButton>Default</AButton>
    <AButton size="large">Large</AButton>
  </div>
</template>
```

### 圆角、动画与撑满

`round` 生成胶囊形，`anim` 添加悬停上移动画，`fill` 让按钮撑满父容器宽度。

```vue
<template>
  <AButton type="primary" round anim fill>圆角主按钮 + 动画</AButton>
</template>
```

### 带图标

通过 `icon` 传入 [Iconify](https://iconify.design/) 图标名，配合 `iconPosition` 控制图标位于文字前（`leading`，默认）或后（`trailing`）。

```vue
<template>
  <div class="demo-row">
    <AButton type="primary" icon="ri:download-line">下载</AButton>
    <AButton icon="ri:arrow-right-line" iconPosition="trailing">下一步</AButton>
  </div>
</template>
```

### 加载与禁用

`loading` 会用 spinner 替换文字，且加载期间不会触发点击；`disabled` 会置灰并完全阻止交互。

```vue
<template>
  <div class="demo-row">
    <AButton type="primary" loading>保存中…</AButton>
    <AButton disabled>禁用</AButton>
  </div>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `'default' \| 'primary' \| 'secondary' \| 'info' \| 'warn' \| 'danger' \| 'depth' \| 'gradient' \| 'gradient-reverse'` | `'default'` | 视觉样式。React/Svelte 当前支持 `default`、`primary`、`gradient`、`gradient-reverse`。 |
| `size` | `'default' \| 'small' \| 'large'` | `'default'` | 按钮尺寸。 |
| `round` | `Boolean` | `false` | 胶囊形圆角。 |
| `anim` | `Boolean` | `false` | 悬停上移动画。 |
| `disabled` | `Boolean` | `false` | 禁用按钮。 |
| `fill` | `Boolean` | `false` | 撑满父容器宽度。 |
| `loading` | `Boolean` | `false` | 显示加载图标并屏蔽点击。 |
| `loadingIcon` | `String \| IconifyIcon` | `'quill:loading-spin'` | 加载态图标。 |
| `icon` | `String \| IconifyIcon` | `''` | 前 / 后图标。 |
| `iconPosition` | `'leading' \| 'trailing'` | `'leading'` | 图标相对文字的位置。 |
| `textShadow` | `Boolean` | `false` | 添加细微的文字阴影。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `click` | `MouseEvent` | 原生点击事件。React/Svelte 使用 `onClick`。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 按钮文字（React/Svelte 为 `children` / snippet）。 |
