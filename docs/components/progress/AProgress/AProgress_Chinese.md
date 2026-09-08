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

### 状态色 &amp; 标签

通过 `status` 切换填充色（`primary`、`success`、`warn`、`danger`、`info`），`showLabel` 显示百分比，`format` 自定义文本。

```vue
<template>
  <AProgress :value="70" status="success" show-label :format="formatProgress" />
</template>

<script setup>
const formatProgress = (value) => `${value} / 100`;
</script>
```

### 不确定状态

当无法确定具体进度时，使用 `indeterminate` 显示持续滑动的光带；`striped` + `active` 叠加滑动斜纹。

```vue
<template>
  <AProgress :value="55" striped active />
  <AProgress indeterminate />
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