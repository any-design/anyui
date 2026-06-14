# ASplit

`ASplit` 是横向分割线，用于分隔内容区块。它没有插槽 —— 只渲染一条线，可配置 `height`、`color`、`margin` 与 `round`。

## 引入

```ts
import { Split } from '@any-design/anyui/vue';
// React:  import { Split } from '@any-design/anyui/react';
// Svelte: import { Split } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <p>第一部分</p>
  <ASplit />
  <p>第二部分</p>
</template>
```

## 示例

### 自定义颜色

向 `color` 传入任意 CSS 颜色。

```vue
<template>
  <ASplit color="var(--primary)" />
</template>
```

### 圆角与间距

`round` 柔化线条两端；`margin` 设置纵向间距。

```vue
<template>
  <ASplit round :margin="24" />
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `height` | String \| Number | 2 | 线条粗细。 |
| `color` | String | 'var(--line)' | 颜色。 |
| `margin` | String \| Number | 12 | 纵向间距（px）。 |
| `round` | Boolean | false | 圆角线条。 |
