# ADrawer

`ADrawer` 是从视口左 / 右边缘滑入的侧边面板。通过 `v-model` 控制显隐，用 `position` 选择停靠边，并控制遮罩与滚动锁定行为。

## 引入

```ts
import { Drawer } from '@any-design/anyui/vue';
// React:  import { Drawer } from '@any-design/anyui/react';
// Svelte: import { Drawer } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AButton @click="open = true">打开抽屉</AButton>
  <ADrawer v-model="open" title="筛选">
    <p>在这里精炼你的结果。</p>
  </ADrawer>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
```

## 示例

### 右侧、自定义宽度

`position="right"` 让面板停靠在右侧；`width` 接受任意 CSS 长度。

```vue
<template>
  <ADrawer v-model="open" position="right" width="420px">
    <h3>账户设置</h3>
    <AInput placeholder="显示名" />
  </ADrawer>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

### 无遮罩

设置 `with-mask="false"` 可在抽屉打开时保持页面可交互。

```vue
<template>
  <ADrawer v-model="open" :with-mask="false">
    <p>背后的页面仍可操作。</p>
  </ADrawer>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | Boolean | false | 是否可见（`v-model`）。 |
| `position` | 'left' \| 'right' | 'left' | 抽屉滑出的边缘。 |
| `width` | String \| Number | '30%' | 宽度。 |
| `withMask` | Boolean | true | 显示遮罩。 |
| `appendToBody` | Boolean | true | 挂载到 body。 |
| `lockScroll` | Boolean | true | 打开时锁定滚动。 |
| `lockTarget` | String | 'document.body' | 锁定元素的 CSS 选择器（传给 querySelector）。 |
| `zIndex` | Number | 100 | 面板的 z-index。 |
| `maskZIndex` | Number | undefined | 遮罩的 z-index。 |
| `drawerClass / maskClass / bodyClass` | String | undefined | 额外的类名钩子。 |
| `transitionName` | String | undefined | 覆盖过渡名。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | Boolean | 可见性变化。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 抽屉内容。 |
