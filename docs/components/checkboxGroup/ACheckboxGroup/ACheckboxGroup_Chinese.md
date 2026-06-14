# ACheckboxGroup

`ACheckboxGroup` 将一个选中值数组绑定到由 `items` 列表渲染的一组复选框。每个选项传 `{ label, value }`，用户切换时 `modelValue` 会自动同步 —— 非常适合多选筛选、权限选择和标签选择等场景。

## 引入

```ts
import { CheckboxGroup } from '@any-design/anyui/vue';
// React:  import { CheckboxGroup } from '@any-design/anyui/react';
// Svelte: import { CheckboxGroup } from '@any-design/anyui/svelte';
```

## 基础用法

用 `v-model` 绑定数组，并传入 `items`。

```vue
<template>
  <ACheckboxGroup v-model="picked" :items="items" />
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '樱桃', value: 'cherry' },
];
const picked = ref(['apple']);
</script>
```

## 示例

### 预选值

在 `modelValue` 中放入初始需要选中的值即可。

```vue
<template>
  <ACheckboxGroup v-model="roles" :items="items" />
  <p>已选：{{ roles }}</p>
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: '读取', value: 'read' },
  { label: '写入', value: 'write' },
  { label: '管理员', value: 'admin' },
];
const roles = ref(['read', 'write']);
</script>
```

### 自定义间距

通过 `gap`（像素）调整选项之间的间距。

```vue
<template>
  <ACheckboxGroup v-model="tags" :items="items" :gap="32" />
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
];
const tags = ref([]);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | Array<string \| number> | undefined | 已选值（`v-model`）。 |
| `items` | Array | undefined | 必填。复选框选项。 |
| `gap` | Number | 16 | 各项之间的间距（px）。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | Array | 选择变化。 |
