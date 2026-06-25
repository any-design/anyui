# AForm

`AForm` 是带校验能力的表单容器，协调内部的 `AFormItem`。传入 `modelValue` 数据对象与按字段名配置的 `rules` 规则，再通过模板 ref 调用暴露的 `validate()` 方法在提交前执行校验。

## 引入

```ts
import { Form, FormItem } from '@any-design/anyui/vue';
// React:  import { Form, FormItem } from '@any-design/anyui/react';
// Svelte: import { Form, FormItem } from '@any-design/anyui/svelte';
```

## 基础用法

一个含两个必填项的登录表单。`validate()` 返回 Promise<boolean>。

```vue
<template>
  <AForm ref="formRef" :model-value="model" :rules="rules">
    <AFormItem prop="email" label="邮箱">
      <AInput v-model="model.email" placeholder="you@anyui.dev" />
    </AFormItem>
    <AFormItem prop="password" label="密码">
      <AInput v-model="model.password" type="password" />
    </AFormItem>
    <AButton type="primary" @click="onSubmit">登录</AButton>
  </AForm>
</template>

<script setup>
import { ref } from 'vue';
const formRef = ref();
const model = ref({ email: '', password: '' });
const rules = {
  email: [{ required: true, message: '请填写邮箱' }],
  password: [{ required: true, message: '请填写密码' }],
};
const onSubmit = async () => {
  const ok = await formRef.value.validate();
  if (ok) console.log('提交', model.value);
};
</script>
```

## 示例

### 行内布局

设置 `layout="inline"` 让表单项横向排列 —— 适合筛选条。

```vue
<template>
  <AForm :model-value="model" :rules="rules" layout="inline">
    <AFormItem prop="keyword" label="搜索">
      <AInput v-model="model.keyword" />
    </AFormItem>
    <AButton type="primary">应用</AButton>
  </AForm>
</template>

<script setup>
import { ref } from 'vue';
const model = ref({ keyword: '' });
const rules = { keyword: [{ required: true, message: '必填' }] };
</script>
```

### 命令式校验与重置

使用暴露的方法可以校验单个字段、清除校验信息或清除值。

```vue
<template>
  <div class="demo-col">
    <AForm ref="formRef" :model-value="model" :rules="rules">
      <AFormItem prop="name" label="姓名">
        <AInput v-model="model.name" />
      </AFormItem>
    </AForm>
    <div class="demo-row">
      <AButton @click="formRef.validateField('name')">校验姓名</AButton>
      <AButton @click="formRef.clearValidation()">清除错误</AButton>
      <AButton @click="formRef.clearFields()">清空值</AButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const formRef = ref();
const model = ref({ name: '' });
const rules = { name: [{ required: true, message: '请填写姓名' }] };
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | Object | undefined | 表单数据对象。 |
| `rules` | Record<string, FormRuleItem[]> | undefined | 按字段名配置的校验规则。 |
| `layout` | 'default' \| 'inline' | 'default' | 堆叠或行内布局。 |
| `labelWidth` | String \| Number | '20%' | 标签列宽度。 |

## 方法

| 方法 | 签名 | 说明 |
| --- | --- | --- |
| `validate` | () => Promise<boolean> | 校验整个表单，返回整体是否通过。 |
| `validateField` | (field) => Promise<boolean> | 校验单个字段。 |
| `clearField / clearFields` | (field?) => void | 清除值与校验状态。 |
| `clearValidation` | (field?) => void | 仅清除校验信息。 |
