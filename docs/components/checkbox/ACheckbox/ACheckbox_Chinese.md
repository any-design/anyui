# ACheckbox

`ACheckbox` 是独立的复选框控件。通过 `v-model` 绑定选中状态，用 `label` 设置描述文字，还可以自定义勾选图标。它是 `ACheckboxGroup` 的基础单元，但同样适合单独用于 "记住我"、"同意条款" 等布尔开关。

## 引入

```ts
import { Checkbox } from '@any-design/anyui/vue';
// React:  import { Checkbox } from '@any-design/anyui/react';
// Svelte: import { Checkbox } from '@any-design/anyui/svelte';
```

## 基础用法

用 `v-model` 绑定布尔值，并监听 `change` 事件。

```vue
<template>
  <ACheckbox v-model="checked">记住我</ACheckbox>
</template>

<script setup>
import { ref } from 'vue';
const checked = ref(false);
</script>
```

## 示例

### 带标签

设置 `label` 属性作为复选框旁的文字，也可以直接用默认插槽。

```vue
<template>
  <ACheckbox label="订阅邮件通知" v-model="sub" />
</template>

<script setup>
import { ref } from 'vue';
const sub = ref(true);
</script>
```

### 默认选中与自定义图标

将 `model-value` 设为 `true` 预先勾选，并通过 `checkIcon` 替换为任意 Iconify 图标名。

```vue
<template>
  <ACheckbox v-model="agree" checkIcon="ri:check-line">
    我接受服务条款
  </ACheckbox>
</template>

<script setup>
import { ref } from 'vue';
const agree = ref(true);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | Boolean | false | 选中状态（`v-model`）。 |
| `label` | String \| Number | undefined | 显示在复选框旁的标签。 |
| `checkIcon` | String \| IconifyIcon | 'si-glyph:checked' | 选中状态的图标。 |
| `iconTransition` | String | 'a-trans-check-icon' | 勾选图标的过渡名。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | Boolean | 选中状态变化。 |
| `change` | Boolean | 同 update。 |
