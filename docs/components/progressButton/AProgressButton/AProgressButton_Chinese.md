# AProgressButton

`AProgressButton` 是一个背景为进度条的按钮——填充会随着 `value` 的增加从左向右延伸。非常适合用在下载 / 上传 / 安装等需要直接在按钮上展示进度的场景。

## 引入

```ts
import { ProgressButton } from '@any-design/anyui/vue';
// React:  import { ProgressButton } from '@any-design/anyui/react';
// Svelte: import { ProgressButton } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AProgressButton :value="40">下载中…</AProgressButton>
</template>
```

## 示例

### 状态色

通过 `status` 切换进度条颜色：`primary`（默认）、`secondary`、`success`、`warn`、`danger`、`info`。

```vue
<template>
  <AProgressButton :value="80" status="success">完成</AProgressButton>
</template>
```

### 圆角与填充

`round` 将按钮变为胶囊形；`fill` 让按钮撑满父容器宽度。

```vue
<template>
  <AProgressButton :value="60" round fill>安装</AProgressButton>
</template>
```

### 条纹与动画

同时设置 `striped` 与 `active`，可在进度条上叠加滑动的斜纹纹理。

```vue
<template>
  <AProgressButton :value="45" striped active>上传中…</AProgressButton>
</template>
```

### 不确定状态

当无法确定具体进度时，使用 `indeterminate` 显示横穿按钮的滑动光带。

```vue
<template>
  <AProgressButton indeterminate>连接中…</AProgressButton>
</template>
```

### 尺寸

通过 `size`（`small`、`default`、`large`）调整按钮粗细。

```vue
<template>
  <AProgressButton :value="40" size="small">小</AProgressButton>
  <AProgressButton :value="40" size="large">大</AProgressButton>
</template>
```

### 禁用

```vue
<template>
  <AProgressButton :value="40" disabled>禁用</AProgressButton>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | Number | 0 | 当前进度（0–100，自动夹取）。 |
| `status` | `'primary' \| 'secondary' \| 'success' \| 'warn' \| 'danger' \| 'info'` | `'primary'` | 进度条颜色。 |
| `round` | Boolean | false | 胶囊圆角。 |
| `fill` | Boolean | false | 撑满父容器宽度。 |
| `disabled` | Boolean | false | 禁用交互。 |
| `striped` | Boolean | false | 在进度条上叠加斜纹纹理。 |
| `active` | Boolean | false | 让斜纹滑动（需配合 `striped`）。 |
| `indeterminate` | Boolean | false | 持续滑动动画。 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 按钮粗细。 |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `click` | MouseEvent | 点击时触发（禁用时不触发）。 |