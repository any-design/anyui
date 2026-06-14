# AOtpInput

`AOtpInput` 是用于验证码 / 一次性密码的输入框。它将验证码拆分为 `length`（默认 6）个格子，支持粘贴、自动跳格，以及用于敏感场景的掩码模式，并在所有格子填满后触发 `complete` 事件 —— 非常适合短信 / 验证器登录流程。

## 引入

```ts
import { OtpInput } from '@any-design/anyui/vue';
// React:  import { OtpInput } from '@any-design/anyui/react';
// Svelte: import { OtpInput } from '@any-design/anyui/svelte';
```

## 基础用法

用 `v-model` 绑定验证码，默认长度为 6。

```vue
<template>
  <AOtpInput v-model="code" />
  <p>验证码：{{ code }}</p>
</template>

<script setup>
import { ref } from 'vue';
const code = ref('');
</script>
```

## 示例

### 掩码模式

设置 `masked` 可将输入的数字以圆点遮蔽，适合 PIN 输入。

```vue
<template>
  <AOtpInput v-model="pin" :length="4" masked />
</template>

<script setup>
import { ref } from 'vue';
const pin = ref('');
</script>
```

### 自动聚焦与完成回调

`autoFocus` 在挂载时聚焦首个格子；`complete` 在所有格子填满后触发，适合自动提交验证码。

```vue
<template>
  <AOtpInput v-model="code" :length="6" autoFocus @complete="onComplete" />
</template>

<script setup>
import { ref } from 'vue';
const code = ref('');
const onComplete = (val) => {
  console.log('正在校验：', val);
  // 在此调用校验接口
};
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | String | '' | 当前验证码（`v-model`）。 |
| `length` | Number | 6 | 输入格数量。 |
| `disabled` | Boolean | false | 禁用。 |
| `masked` | Boolean | false | 将数字以圆点遮蔽。 |
| `autoFocus` | Boolean | false | 挂载时自动聚焦首个格子。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | String | 验证码变化。 |
| `complete` | String | 所有格子填满后触发。 |
