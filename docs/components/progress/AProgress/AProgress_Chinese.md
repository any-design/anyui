# AProgress

`AProgress` 是一个水平进度条。将 `value` 设为 0–100 之间的数值即可填充进度条，或在无法确定百分比时开启 `indeterminate` 让滑块持续滑动。适用于下载、上传、表单完成度等有界任务。

## 引入

```ts
import { Progress } from '@any-design/anyui/vue';
// React:  import { Progress } from '@any-design/anyui/react';
// Svelte: import { Progress } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AProgress :value="40" />
</template>
```

## 示例

### 状态色

通过 `status` 切换填充色：`primary`（默认）、`success`、`warn`、`danger`、`info`。

```vue
<template>
  <AProgress :value="70" status="success" />
</template>
```

### 标签与自定义格式

设置 `showLabel` 在进度条后显示百分比，传入 `format` 函数自定义文本。

```vue
<template>
  <AProgress :value="63" show-label :format="(v) => `${v} / 100`" />
</template>
```

### 条纹与动画

同时设置 `striped` 与 `active`，即可在填充上叠加滑动的斜纹纹理。

```vue
<template>
  <AProgress :value="55" striped active />
</template>
```

### 不确定状态

当无法确定具体进度时，使用 `indeterminate` 显示持续滑动的光带，而非静态填充。

```vue
<template>
  <AProgress indeterminate />
</template>
```

### 尺寸

通过 `size`（`small`、`default`、`large`）调整粗细。

```vue
<template>
  <AProgress :value="40" size="small" />
  <AProgress :value="40" size="large" />
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | Number | 0 | 当前进度（0–100，自动夹取）。 |
| `status` | `'primary' \| 'success' \| 'warn' \| 'danger' \| 'info'` | `'primary'` | 填充颜色。 |
| `height` | String \| Number | undefined | 进度条高度。 |
| `width` | String \| Number | undefined | 进度条宽度。 |
| `striped` | Boolean | false | 在填充上叠加斜纹纹理。 |
| `active` | Boolean | false | 让斜纹滑动（需配合 `striped`）。 |
| `showLabel` | Boolean | false | 在进度条后显示百分比标签。 |
| `indeterminate` | Boolean | false | 持续滑动动画。 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 进度条粗细。 |
| `format` | (value: number) => string | undefined | 自定义标签格式化函数。 |