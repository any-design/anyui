# AStep

`AStep` 是横向步骤指示器，适用于结账、引导等多步骤流程。通过 `steps`（数量或标签数组）设置步骤，用 `current`（从 1 开始）跟踪进度。

## 引入

```ts
import { Step } from '@any-design/anyui/vue';
// React:  import { Step } from '@any-design/anyui/react';
// Svelte: import { Step } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AStep :steps="4" :current="2" />
</template>
```

## 示例

### 带标签

传入字符串数组为每步添加标签。

```vue
<template>
  <AStep :steps="['账号', '资料', '支付', '完成']" :current="3" />
</template>
```

### 跟踪进度

将 `current` 绑定到 ref，随用户推进流程而更新。

```vue
<template>
  <AStep :steps="3" :current="current" />
  <AButton @click="current = Math.min(3, current + 1)">下一步</AButton>
</template>

<script setup>
import { ref } from 'vue';
const current = ref(1);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `steps` | Number \| String[] | 2 | 步骤数量，或标签数组。 |
| `current` | Number | 1 | 当前步骤（从 1 开始）。 |
