# AVirtualListItem

AVirtualListItem 是 AVirtualList 内部使用的默认行渲染组件。

## 引入

```ts
import { VirtualListItem } from '@any-design/anyui/vue';
```

React 与 Svelte 的引入路径分别是 `@any-design/anyui/react` 和 `@any-design/anyui/svelte`，组件 API 保持一致。

## 基础用法

```vue
<template>
  <AVirtualListItem />
</template>

<script setup>
import { VirtualListItem } from '@any-design/anyui/vue';
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `label` | String | undefined | 可选文本标签。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 自定义行内容。 |

## 说明

通常不直接使用 —— 推荐通过 AVirtualList 的 `default` 插槽来渲染行。
