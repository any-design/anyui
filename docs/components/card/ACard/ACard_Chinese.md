# ACard

`ACard` 是用于聚合相关内容的卡片容器。它提供可选的标题、正文以及可选的底部区域，并在开启液态玻璃风格时自动适配。

## 引入

```ts
import { Card } from '@any-design/anyui/vue';
// React:  import { Card } from '@any-design/anyui/react';
// Svelte: import { Card } from '@any-design/anyui/svelte';
```

在 Vue 中通过 `app.use(AnyUI)` 全局注册后，可直接使用 `<ACard>`。

## 基础用法

一个全功能卡片：自定义 `header` 插槽、正文内容、带操作的 `footer` 插槽、`link` 让整张卡片可点击导航，以及 `clean` 让正文图片贴边显示。

```vue
<template>
  <ACard width="320" link="/docs/getting-started" clean>
    <template #header>
      <strong>通知</strong>
    </template>
    <div
      style="height:120px;background:linear-gradient(135deg,var(--primary),var(--info));"
    ></div>
    <template #footer>
      <AButton type="primary" size="small">保存设置</AButton>
    </template>
  </ACard>
</template>
```

用 `title` 属性显示普通标题，用 `header`/`footer` 插槽自定义这两个区域，`link` 让卡片渲染为 `<a>`，`clean` 移除默认正文内边距。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | String | '' | 标题。 |
| `width` | Number \| String | 240 | 宽度。 |
| `clean` | Boolean | false | 移除默认内边距。 |
| `link` | String | '' | 使卡片成为链接（`<a href>`）。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 主体。 |
| `header` | — | 覆盖标题区域。 |
| `footer` | — | 底部区域。 |
