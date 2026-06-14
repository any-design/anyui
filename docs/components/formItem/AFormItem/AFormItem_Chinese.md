# AFormItem

`AFormItem` 是 `AForm` 内部使用的带标签字段容器。用 `label` 设置标题，用 `prop` 将该项绑定到表单模型的某个键 —— 父级 `AForm` 正是通过 `prop` 来对该字段执行校验并显示错误信息。

## 引入

```ts
import { FormItem } from '@any-design/anyui/vue';
// React:  import { FormItem } from '@any-design/anyui/react';
// Svelte: import { FormItem } from '@any-design/anyui/svelte';
```

## 基础用法

包裹一个控件，设置 `label`，并将 `prop` 指向对应的模型键。

```vue
<template>
  <AFormItem label="邮箱" prop="email">
    <AInput v-model="model.email" placeholder="you@example.com" />
  </AFormItem>
</template>

<script setup>
import { reactive } from 'vue';
const model = reactive({ email: '' });
</script>
```

## 示例

### 在表单上下文中使用

将多个 `AFormItem` 放入 `AForm`，并传入共享的 `model`；每个项上的 `prop` 把字段与校验关联起来。

```vue
<template>
  <AForm :model="model">
    <AFormItem label="用户名" prop="username">
      <AInput v-model="model.username" />
    </AFormItem>
    <AFormItem label="密码" prop="password">
      <AInput v-model="model.password" type="password" />
    </AFormItem>
  </AForm>
</template>

<script setup>
import { reactive } from 'vue';
const model = reactive({ username: '', password: '' });
</script>
```

### 插槽中放置任意控件

默认插槽可以放任意输入控件 —— 选择器、多行文本、滑块等。

```vue
<template>
  <AFormItem label="国家" prop="country">
    <AInput v-model="model.country" placeholder="选择国家" />
  </AFormItem>
</template>

<script setup>
import { reactive } from 'vue';
const model = reactive({ country: '' });
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `prop` | String | undefined | 该字段绑定的模型键（用于校验）。 |
| `label` | String | undefined | 标签文本。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 表单控件。 |
