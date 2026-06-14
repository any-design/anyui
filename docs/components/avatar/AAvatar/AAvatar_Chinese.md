# AAvatar

`AAvatar` 根据图片地址渲染用户头像。它支持五种预设尺寸（或自定义 `width`）、可选的圆形 `round` 模式，以及 `name` 属性 —— 当图片加载失败时用于生成首字母兜底。

## 引入

```ts
import { Avatar } from '@any-design/anyui/vue';
// React:  import { Avatar } from '@any-design/anyui/react';
// Svelte: import { Avatar } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AAvatar src="/users/ada.png" size="medium" />
</template>
```

## 示例

### 预设尺寸

提供五种尺寸：`xsmall`（16px）、`small`（24px）、`medium`（32px）、`large`（48px）、`xlarge`（64px）。

```vue
<template>
  <div class="demo-row">
    <AAvatar src="/users/ada.png" size="xsmall" />
    <AAvatar src="/users/ada.png" size="small" />
    <AAvatar src="/users/ada.png" size="medium" />
    <AAvatar src="/users/ada.png" size="large" />
    <AAvatar src="/users/ada.png" size="xlarge" />
  </div>
</template>
```

### 圆形与自定义宽度

`round` 让头像变为圆形；`width` 用任意值覆盖预设尺寸。

```vue
<template>
  <AAvatar src="/users/ada.png" round :width="72" />
</template>
```

### 首字母兜底

图片加载失败时，`name` 属性会生成首字母。也可以用 `fallback` 插槽自定义兜底内容。

```vue
<template>
  <AAvatar src="/broken.png" name="Ada Lovelace" size="large" round />
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `src` | String | undefined | 必填。图片地址。 |
| `size` | 'xlarge' \| 'large' \| 'medium' \| 'small' \| 'xsmall' | undefined | 预设尺寸。 |
| `width` | Number \| String | undefined | 自定义宽度（覆盖 `size`）。 |
| `round` | Boolean | undefined | 圆形头像。 |
| `name` | String | undefined | 用于首字母兜底。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `error` | Event | 图片加载失败。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `fallback` | — | 图片加载失败时的内容。 |
