# ARadioButtonGroup

`ARadioButtonGroup` 是按钮样式的单选组。它的行为与 `ARadioGroup` 一致 —— 用 `v-model` 绑定单个值，并通过 `items` 渲染选项 —— 但每个选项渲染为分段按钮，并支持 `round` 胶囊外形。该包还导出 `ARadioButton`，可手动放置按钮式单选项。

## 引入

```ts
import { RadioButtonGroup } from '@any-design/anyui/vue';
// React:  import { RadioButtonGroup } from '@any-design/anyui/react';
// Svelte: import { RadioButtonGroup } from '@any-design/anyui/svelte';
```

## 基础用法

绑定已选值并传入 `items`。

```vue
<template>
  <ARadioButtonGroup v-model="view" :items="items" />
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: '列表', value: 'list' },
  { label: '网格', value: 'grid' },
  { label: '地图', value: 'map' },
];
const view = ref('list');
</script>
```

## 示例

### 变体与尺寸

添加 `round` 可获得胶囊形分段控件，并使用 `size`（`small`、`default`、`large`）适配紧凑工具栏或更醒目的控件。

```vue
<template>
  <div class="demo-row">
    <ARadioButtonGroup v-model="density" :items="items" size="small" />
    <ARadioButtonGroup v-model="density" :items="items" round />
    <ARadioButtonGroup v-model="density" :items="items" size="large" round />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: 'S', value: 's' },
  { label: 'M', value: 'm' },
  { label: 'L', value: 'l' },
  { label: 'XL', value: 'xl' },
];
const density = ref('m');
</script>
```

### 监听变化

使用 `change` 事件响应用户切换分段。

```vue
<template>
  <ARadioButtonGroup v-model="range" :items="items" @change="onChange" />
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: '今天', value: 'today' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
];
const range = ref('week');
const onChange = (val) => console.log('范围：', val);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | String \| Number | undefined | 已选值（`v-model`）。 |
| `items` | Array<{ label, value }> | undefined | 选项。 |
| `round` | Boolean | false | 胶囊形圆角组。 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 分段组尺寸。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | value | 选择变化。 |
| `change` | value | 选择变化。 |

## 说明

该包还注册了 `ARadioButton`（以 `RadioButton` 导出），可作为独立的按钮式单选项使用。
