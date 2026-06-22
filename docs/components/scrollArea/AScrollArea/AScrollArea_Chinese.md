# AScrollArea

`AScrollArea` 是固定高度或最大高度的滚动区域。用于将长内容 —— 侧边栏、日志面板、选项列表 —— 约束在有限区域内。

## 引入

```ts
import { ScrollArea } from '@any-design/anyui/vue';
// React:  import { ScrollArea } from '@any-design/anyui/react';
// Svelte: import { ScrollArea } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AScrollArea height="240">
    <p v-for="i in 50" :key="i">第 {{ i }} 行</p>
  </AScrollArea>
</template>
```

## 示例

### 最大高度与填充

`maxHeight` 让区域增长到上限为止；`fill` 将其拉伸以填充父容器高度。

```vue
<template>
  <AScrollArea max-height="320" fill>
    <p v-for="i in 100" :key="i">第 {{ i }} 行</p>
  </AScrollArea>
</template>
```

### 横向滚动

设置 `horizontal` 以允许宽内容的横向滚动。

```vue
<template>
  <AScrollArea height="120" horizontal>
    <div style="width: 1600px">很宽的内容…</div>
  </AScrollArea>
</template>
```

### 滚动行为

`scrollBehavior` 控制轨道点击翻页和程序化滚动时的滚动行为。默认使用 `smooth`，也可以设置为 `auto` 以关闭平滑滚动。

```vue
<template>
  <AScrollArea height="240" scroll-behavior="auto">
    <p v-for="i in 50" :key="i">第 {{ i }} 行</p>
  </AScrollArea>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `height` | String \| Number | undefined | 固定高度。 |
| `maxHeight` | String \| Number | undefined | 最大高度。 |
| `fill` | Boolean | false | 撑满父容器高度。 |
| `horizontal` | Boolean | false | 允许横向滚动。 |
| `scrollBehavior` | `'auto' \| 'smooth'` | `'smooth'` | 轨道点击翻页和程序化滚动时的滚动行为。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 可滚动内容。 |
