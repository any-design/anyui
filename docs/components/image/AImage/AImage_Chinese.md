# AImage

`AImage` 是支持懒加载的图片组件。它将 `src` 作为背景图渲染，可控制 `size`、`position` 与 `repeat`，并提供 `loading` 与 `error` 插槽以自定义这些状态。

## 引入

```ts
import { Image } from '@any-design/anyui/vue';
// React:  import { Image } from '@any-design/anyui/react';
// Svelte: import { Image } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AImage src="/og-image.png" width="320" height="200" />
</template>
```

## 示例

### 固定尺寸与 cover

`size`、`position`、`repeat` 分别对应 `background-*` CSS 属性。`cover`（默认）填充区域且不变形。

```vue
<template>
  <AImage src="/og-image.png" width="400" height="240" size="cover" />
</template>
```

### 自定义加载态

`loading` 插槽在图片加载过程中渲染。

```vue
<template>
  <AImage src="/og-image.png" width="320" height="200">
    <template #loading>
      <div style="display:flex;justify-content:center;padding:80px">
        <ASpinner />
      </div>
    </template>
  </AImage>
</template>
```

### 自定义错误态

`error` 插槽在图片加载失败时渲染。

```vue
<template>
  <AImage src="/this-image-does-not-exist.jpg" width="320" height="200">
    <template #error>
      <AEmpty text="图片未找到" />
    </template>
  </AImage>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `src` | String | undefined | 图片地址。 |
| `width` | String \| Number | '100%' | 宽度。 |
| `height` | String \| Number | '100%' | 高度。 |
| `size` | String | 'cover' | background-size 值。 |
| `position` | String | 'center' | background-position 值。 |
| `repeat` | String | 'no-repeat' | background-repeat 值。 |
| `threshold` | Number | — | IntersectionObserver 阈值（使用库默认值）。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `loading` | — | 加载中显示。 |
| `error` | — | 出错时显示。 |
