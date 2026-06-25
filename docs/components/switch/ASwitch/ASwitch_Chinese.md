# ASwitch

`ASwitch` 是紧凑的布尔开关，用于启用或关闭某个设置。通过 `v-model` 绑定状态，需要响应用户操作时监听 `change`。

## 引入

```ts
import { Switch } from '@any-design/anyui/vue';
// React:  import { Switch } from '@any-design/anyui/react';
// Svelte: import { Switch } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <ASwitch v-model="enabled" />
</template>

<script setup>
import { ref } from 'vue';
const enabled = ref(true);
</script>
```

## 示例

### 禁用

使用 `disabled` 展示不可切换的只读开关。

```vue
<template>
  <ASwitch v-model="enabled" disabled />
</template>

<script setup>
import { ref } from 'vue';
const enabled = ref(true);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | Boolean | false | 选中状态（`v-model`）。 |
| `disabled` | Boolean | false | 禁止交互。 |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | Boolean | 值变化时触发。 |
| `change` | Boolean | 用户操作改变值后触发。 |
