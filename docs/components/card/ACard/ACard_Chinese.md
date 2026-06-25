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

带标题的卡片，正文内容通过默认插槽传入。

```vue
<template>
  <ACard title="账户">
    <p>管理你的资料、密码与已连接的服务。</p>
  </ACard>
</template>
```

## 示例

### 自定义头部与底部

使用 `header` 与 `footer` 插槽可以完全自定义这两个区域，而不必依赖 `title` 属性与默认布局。

```vue
<template>
  <ACard width="320">
    <template #header>
      <strong>通知</strong>
    </template>
    <p>选择你希望接收的通知类型。</p>
    <template #footer>
      <AButton type="primary" size="small">保存设置</AButton>
    </template>
  </ACard>
</template>
```

### 链接卡片

设置 `link` 后，卡片会渲染为 `<a>`，整个卡片变为可点击的导航元素。

```vue
<template>
  <ACard title="文档" link="/docs/getting-started">
    阅读快速上手指南 →
  </ACard>
</template>
```

### 贴边内容

传入 `clean` 可移除默认的正文内边距 —— 当正文本身是列表、表格或图片等需要贴边的元素时很有用。

```vue
<template>
  <ACard title="图库" clean>
    <div
      style="height:120px;background:linear-gradient(135deg,var(--primary),var(--info));"
    ></div>
  </ACard>
</template>
```

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
