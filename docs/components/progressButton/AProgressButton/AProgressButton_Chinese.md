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

### 实色与框线

默认为**框线**样式——在透明底上有一条浅色进度条延伸。设置 `type="solid"` 后，按钮不再显示边框，而是通过随进度改变尺寸的渐变背景图，从左到右填充真实状态色。文字会渲染为一层状态色底字和一层按进度裁切的填充区文字，在未填充底面与饱和填充上都保持清晰。`status` 切换进度条颜色（`primary`、`secondary`、`success`、`warn`、`danger`、`info`）；`round` / `fill` 胶囊形与撑满宽度。

```vue
<template>
  <div class="demo-row">
    <AProgressButton :value="55">框线</AProgressButton>
    <AProgressButton :value="55" type="solid" status="success" round>实色</AProgressButton>
  </div>
</template>
```

### 不确定状态

当无法确定具体进度时，使用 `indeterminate` 显示横穿按钮的滑动光带；`striped` + `active` 叠加滑动斜纹。

```vue
<template>
  <div class="demo-row">
    <AProgressButton :value="45" striped active>上传中…</AProgressButton>
    <AProgressButton indeterminate>连接中…</AProgressButton>
  </div>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | Number | 0 | 当前进度（0–100，自动夹取）。变化时平滑过渡。 |
| `type` | `'outline' \| 'solid'` | `'outline'` | 视觉风格。`solid` 使用无边框、按进度裁切的渐变背景，并用裁切文字层保证可读性。 |
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
