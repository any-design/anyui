# ARadio

`ARadio` 是独立的单选框控件。设置 `label` 与 `checked` 即可使用 —— 它通常放在 `ARadioGroup` 内，但当你需要自行管理选中状态时，也可以单独用于简单的二选一场景。

## 引入

```ts
import { Radio } from '@any-design/anyui/vue';
// React:  import { Radio } from '@any-design/anyui/react';
// Svelte: import { Radio } from '@any-design/anyui/svelte';
```

## 基础用法

渲染单个单选框，并响应 `change` 事件。

```vue
<template>
  <ARadio label="选项 A" :checked="true" @change="onChange" />
</template>

<script setup>
const onChange = (checked) => console.log('选中：', checked);
</script>
```

## 示例

### 带标签

`label` 属性会渲染在单选圆点旁边。

```vue
<template>
  <ARadio label="送货上门" :checked="ship" @change="ship = $event" />
</template>

<script setup>
import { ref } from 'vue';
const ship = ref(true);
</script>
```

### 两个独立单选框

在分组之外使用时，自行管理 `checked` 来保证单选。

```vue
<template>
  <div class="demo-col">
    <ARadio label="信用卡" :checked="method === 'card'" @change="method = 'card'" />
    <ARadio label="PayPal" :checked="method === 'paypal'" @change="method = 'paypal'" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const method = ref('card');
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `label` | String | '' | 标签文本。 |
| `checked` | Boolean | false | 选中状态。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `change` | Boolean | 切换时触发（通常在分组内使用）。 |
