# ATag

`ATag` 是用于分类、状态或简短元数据的紧凑标签胶囊。它支持三种尺寸、胶囊形圆角，以及完全自定义的文字 / 背景颜色。

## 引入

```ts
import { Tag } from '@any-design/anyui/vue';
// React:  import { Tag } from '@any-design/anyui/react';
// Svelte: import { Tag } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <ATag>新</ATag>
</template>
```

## 示例

### 尺寸

```vue
<template>
  <div class="demo-row">
    <ATag size="small">Small</ATag>
    <ATag>Default</ATag>
    <ATag size="large">Large</ATag>
  </div>
</template>
```

### 圆角

```vue
<template>
  <ATag round>精选</ATag>
</template>
```

### 自定义颜色

通过 `color`（文字）与 `bgColor`（背景）传入任意 CSS 颜色 —— 适用于无法映射到主题 token 的状态徽标。

```vue
<template>
  <div class="demo-row">
    <ATag color="#fff" bgColor="#16a34a">success</ATag>
    <ATag color="#fff" bgColor="#dc2626">error</ATag>
    <ATag color="#1e293b" bgColor="#fde68a">warning</ATag>
  </div>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `round` | Boolean | false | 胶囊形。 |
| `size` | 'default' \| 'small' \| 'large' | 'default' | 尺寸。 |
| `color` | String | '' | 文字颜色。 |
| `bgColor` | String | '' | 背景颜色。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 标签内容。 |
