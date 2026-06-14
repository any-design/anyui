# AGradientText

`AGradientText` 用渐变填充文字。默认使用品牌 `--primary` 与 `--secondary` 颜色，你也可以传入完整的 CSS 渐变字符串、调整分割位置、添加柔光并控制字号。

## 引入

```ts
import { GradientText } from '@any-design/anyui/vue';
// React:  import { GradientText } from '@any-design/anyui/react';
// Svelte: import { GradientText } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AGradientText size="32">AnyUI</AGradientText>
</template>
```

## 示例

### 自定义颜色

通过 `primaryColor` 与 `secondaryColor` 覆盖（任意 CSS 颜色）。

```vue
<template>
  <AGradientText :primary-color="'#ff6b6b'" :secondary-color="'#7c3aed'" size="28">
    自定义渐变
  </AGradientText>
</template>
```

### 完整 CSS 渐变

向 `gradient` 传入完整渐变以获得完全控制 —— 它会覆盖颜色属性。

```vue
<template>
  <AGradientText gradient="linear-gradient(90deg, #f093fb, #f5576c)" size="36">
    线性扫光
  </AGradientText>
</template>
```

### 柔光与分割

`glow` 添加柔和的文字阴影；`splitPercent` 调整第二种颜色的起始位置。

```vue
<template>
  <AGradientText glow :split-percent="50" size="40">柔光</AGradientText>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `gradient` | String | '' | 自定义 CSS 渐变（覆盖颜色）。 |
| `primaryColor` | String | 'var(--primary)' | 主渐变色。 |
| `secondaryColor` | String | 'var(--secondary)' | 次渐变色。 |
| `reverseGradient` | Boolean | false | 交换颜色顺序。 |
| `splitPercent` | Number | 30 | 颜色分割位置（百分比）。 |
| `glow` | Boolean | false | 添加柔光。 |
| `size` | String \| Number | '' | 字号。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 文本内容。 |
