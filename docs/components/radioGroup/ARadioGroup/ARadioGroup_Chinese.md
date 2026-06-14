# ARadioGroup

`ARadioGroup` 将单个选中值绑定到由 `items` 列表生成的一组单选框。每个选项为 `{ label, value }`；分组会保持 `modelValue` 同步并保证单选 —— 非常适合选择套餐、配送方式或主题。

## 引入

```ts
import { RadioGroup } from '@any-design/anyui/vue';
// React:  import { RadioGroup } from '@any-design/anyui/react';
// Svelte: import { RadioGroup } from '@any-design/anyui/svelte';
```

## 基础用法

用 `v-model` 绑定已选值，并传入 `items`。

```vue
<template>
  <ARadioGroup v-model="plan" :items="items" />
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: '免费版', value: 'free' },
  { label: '专业版', value: 'pro' },
  { label: '企业版', value: 'enterprise' },
];
const plan = ref('pro');
</script>
```

## 示例

### 监听变化

监听 `change` 事件，在用户选择新选项时执行逻辑。

```vue
<template>
  <ARadioGroup v-model="color" :items="items" @change="onChange" />
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
  { label: '跟随系统', value: 'system' },
];
const color = ref('system');
const onChange = (val) => console.log('主题：', val);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | String \| Number | undefined | 已选值（`v-model`）。 |
| `items` | Array<{ label, value }> | undefined | 单选项。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | value | 选择变化。 |
| `change` | value | 选择变化。 |
