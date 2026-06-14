# ACollapse

`ACollapse` 是在展开与收起状态之间过渡的包装器。通过 `visible` 切换展开 / 收起。设置 `direction` 可横向收起，`alwaysRender` 可在隐藏时仍保留内容在 DOM 中。

## 引入

```ts
import { Collapse } from '@any-design/anyui/vue';
// React:  import { Collapse } from '@any-design/anyui/react';
// Svelte: import { Collapse } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AButton @click="open = !open">切换</AButton>
  <ACollapse :visible="open">
    <p>这段内容会平滑地展开与收起。</p>
  </ACollapse>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

## 示例

### 横向

设置 `direction="horizontal"` 改为按宽度收起。

```vue
<template>
  <AButton @click="open = !open">切换</AButton>
  <ACollapse :visible="open" direction="horizontal">
    <div style="width: 300px">横向收起。</div>
  </ACollapse>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

### 始终保留

默认收起后内容会从 DOM 移除。设置 `alwaysRender` 可保留挂载（适合不应丢失状态的表单）。

```vue
<template>
  <ACollapse :visible="open" always-render>
    <AInput placeholder="状态会被保留" />
  </ACollapse>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | Boolean | false | 是否展开。 |
| `direction` | 'horizontal' \| 'vertical' | 'vertical' | 收起方向。 |
| `alwaysRender` | Boolean | false | 收起时仍保留内容在 DOM 中。 |
| `renderWaitTime` | Number | 100 | 收起后移除内容的延迟（ms）。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 可折叠内容。 |
