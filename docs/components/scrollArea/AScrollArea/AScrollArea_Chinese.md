# AScrollArea

`AScrollArea` 是固定高度或最大高度的滚动区域。用于将长内容 —— 侧边栏、日志面板、选项列表 —— 约束在有限区域内。

## 引入

```ts
import { ScrollArea, ScrollFade } from '@any-design/anyui/vue';
// React:  import { ScrollArea, ScrollFade } from '@any-design/anyui/react';
// Svelte: import { ScrollArea, ScrollFade } from '@any-design/anyui/svelte';
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

### 滚动渐隐

设置 `scrollFade` 可以为可滚动边缘添加渐隐遮罩。它采用与 shadcn scroll-fade 工具相同的 CSS mask 思路：支持的浏览器会只在对应方向还有内容时显示顶部 / 底部 / 左右渐隐，旧浏览器则退化为固定边缘渐隐。

```vue
<template>
  <AScrollArea height="240" scroll-fade>
    <p v-for="i in 50" :key="i">第 {{ i }} 行</p>
  </AScrollArea>
</template>
```

传入对象可以调整渐隐尺寸或显隐距离。

```vue
<template>
  <AScrollArea
    height="120"
    horizontal
    :scroll-fade="{ size: 32, reveal: 96 }"
  >
    <div style="width: 1600px">很宽的内容…</div>
  </AScrollArea>
</template>
```

### ScrollFade 包装器

`AScrollFade` 是一个高阶滚动容器，适合只需要渐隐遮罩和原生滚动的内容。

```vue
<template>
  <AScrollFade height="240" size="40">
    <p v-for="i in 50" :key="i">第 {{ i }} 行</p>
  </AScrollFade>
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
| `scrollFade` | Boolean \| Object | false | 为视口开启边缘渐隐。对象形式支持 `axis`、`size`、`topSize`、`bottomSize`、`startSize`、`endSize` 与 `reveal`。 |

## AScrollFade 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `axis` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | 哪些边缘启用渐隐。 |
| `size` | String \| Number | undefined | 通用渐隐尺寸。 |
| `topSize` | String \| Number | undefined | 覆盖顶部渐隐尺寸。 |
| `bottomSize` | String \| Number | undefined | 覆盖底部渐隐尺寸。 |
| `startSize` | String \| Number | undefined | 覆盖行内起始边渐隐尺寸。 |
| `endSize` | String \| Number | undefined | 覆盖行内结束边渐隐尺寸。 |
| `reveal` | String \| Number | undefined | 渐隐显隐使用的滚动距离。 |
| `height` | String \| Number | undefined | 包装器固定高度。 |
| `maxHeight` | String \| Number | undefined | 包装器最大高度。 |
| `fill` | Boolean | false | 撑满父容器尺寸。 |
| `scrollBehavior` | `'auto' \| 'smooth'` | `'smooth'` | 原生滚动行为。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 可滚动内容。 |
