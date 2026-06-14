# ASelect

`ASelect` 是下拉选择器。传入 `{ text, value }` 形式的 `items` 选项数组，用 `v-model` 绑定已选值。开启 `multiple` 即可多选。

## 引入

```ts
import { Select } from '@any-design/anyui/vue';
// React:  import { Select } from '@any-design/anyui/react';
// Svelte: import { Select } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <ASelect v-model="city" :items="cities" placeholder="选择城市" />
</template>

<script setup>
import { ref } from 'vue';
const city = ref('');
const cities = [
  { text: '东京', value: 'tokyo' },
  { text: '巴黎', value: 'paris' },
  { text: '纽约', value: 'ny' },
];
</script>
```

## 示例

### 尺寸与圆角

```vue
<template>
  <div class="demo-col">
    <ASelect size="small" :items="items" placeholder="Small" />
    <ASelect :items="items" placeholder="Default" />
    <ASelect round :items="items" placeholder="Round" />
  </div>
</template>
```

### 多选

开启 `multiple` 后，绑定的值为数组。

```vue
<template>
  <ASelect v-model="tags" :items="items" multiple placeholder="选择标签" />
  <p>已选：{{ tags }}</p>
</template>

<script setup>
import { ref } from 'vue';
const tags = ref([]);
const items = [
  { text: 'Vue', value: 'vue' },
  { text: 'React', value: 'react' },
  { text: 'Svelte', value: 'svelte' },
];
</script>
```

### 禁用

```vue
<template>
  <ASelect :items="items" disabled placeholder="禁用" />
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | String \| Number \| Array \| null | '' | 绑定值（多选时为数组）。 |
| `items` | Array<{ text, value }> | undefined | 选项列表。 |
| `placeholder` | String | '' | 占位文本。 |
| `width` | String \| Number | '100%' | 选择器宽度。 |
| `size` | 'default' \| 'small' \| 'large' | 'default' | 尺寸。 |
| `round` | Boolean | false | 圆角样式。 |
| `multiple` | Boolean | false | 开启多选。 |
| `disabled` | Boolean | false | 禁用。 |
| `expandIcon` | String \| IconifyIcon | 'ic:outline-expand-more' | 尾部展开图标。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | value | 值变化。 |
| `change` | value | 提交时触发。 |
| `blur` | FocusEvent | 原生 blur。 |
