# ASlider

`ASlider` 是数值滑块。通过 `v-model` 绑定值，用 `min`、`max`、`step` 进行约束，并在拖动时显示实时提示。可用于音量、透明度、价格区间或任何有界的数值输入。

## 引入

```ts
import { Slider } from '@any-design/anyui/vue';
// React:  import { Slider } from '@any-design/anyui/react';
// Svelte: import { Slider } from '@any-design/anyui/svelte';
```

## 基础用法

用 `v-model` 绑定数值，默认范围为 0–100。

```vue
<template>
  <ASlider v-model="volume" />
  <p>音量：{{ volume }}</p>
</template>

<script setup>
import { ref } from 'vue';
const volume = ref(30);
</script>
```

## 示例

### 自定义范围与步长

通过 `min`、`max`、`step` 实现更精细的控制 —— 这里是一个 0–1000、步长为 50 的价格滑块。

```vue
<template>
  <ASlider v-model="price" :min="0" :max="1000" :step="50" />
</template>

<script setup>
import { ref } from 'vue';
const price = ref(250);
</script>
```

### 禁用与隐藏提示

使用 `disabled` 让滑块只读，用 `show-tooltip` 隐藏拖动时的数值提示。

```vue
<template>
  <ASlider v-model="opacity" :show-tooltip="false" disabled />
</template>

<script setup>
import { ref } from 'vue';
const opacity = ref(80);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | Number | 0 | 当前值（`v-model`）。 |
| `min` | Number | 0 | 最小值。 |
| `max` | Number | 100 | 最大值。 |
| `step` | Number | 1 | 步长。 |
| `disabled` | Boolean | false | 禁用。 |
| `showTooltip` | Boolean | true | 拖动时显示数值提示。 |
| `width` | String \| Number | undefined | 滑块宽度。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | Number | 值变化。 |
| `change` | Number | 提交后的值变化。 |
