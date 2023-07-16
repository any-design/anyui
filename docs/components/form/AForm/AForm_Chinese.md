# AForm 组件文档

## 介绍

`AForm` Component 是一个帮助开发者更方便地构建表单的组件。该组件采用 async-validator 进行表单验证，支持布局（或暂不支持）。

使用此组件，您可以通过绑定`modelValue`，并通过设置`rules`验证表单。

## 基本使用

您可以使用该组件作为 vue 组件：

```vue
<template>
  <AForm v-model="formValues" :rules="formRules">
    <AFormItem name="username" label="请输入名字：">
      <AInput v-model="formValues.username" />
    </AFormItem>
    <AFormItem name="gender" label="请选择性别：">
      <ASelect v-model="formValues.gender">
        <ASelectOption value="male">男</ASelectOption>
        <ASelectOption value="female">女</ASelectOption>
      </ASelect>
    </AFormItem>
    <AFormItem>
      <AButton type="primary" @click="submitForm">提交</AButton>
    </AFormItem>
  </AForm>
</template>
```

## Props

`AForm` 组件接受以下 props：

- **modelValue**: 表单的值，要求为一个 Object 类型。默认值为 `{}`。
- **rules**: 规定表单验证规则的对象，要求为一个 Object 类型。默认为 `{}`。
- **layout**: 表单布局类型。可以是 `'default'` 或 `'inline'`。默认为 `'default'`。
- **labelWidth**：表单标签的宽度，可以是百分比或者数字(munber)。默认为 `'20%'`。

## 方法

此组件将以下方法暴露给其父组件：

- **emitter**: 表单的事件总线。
- **formattedLabelWidth**: 经过格式化的表单标签宽度。
- **validate**: 对表单进行整体验证。
- **validatefield**: 对表单的单个值进行验证。参数：field(string)。
- **clearField**: 清空表单项的值。参数：field(string)。
- **clearFields**: 清空全部表单项的值和验证状态。
- **clearValidation**: 清空表单项的验证状态。

示例：

```vue
<template>
  <AForm v-model="formValues" :rules="formRules" ref="formRef">
    <AFormItem name="username" label="请输入名字：">
      <AInput v-model="formValues.username" />
    </AFormItem>
    <AFormItem name="gender" label="请选择性别：">
      <ASelect v-model="formValues.gender">
        <ASelectOption value="male">男</ASelectOption>
        <ASelectOption value="female">女</ASelectOption>
      </ASelect>
    </AFormItem>
    <AFormItem>
      <AButton type="primary" @click="handleSubmit">提交</AButton>
    </AFormItem>
  </AForm>
</template>

<script>
import { ref } from 'vue';
import { AForm, AFormItem, AInput, ASelect, ASelectOption, AButton } from '@any-design/anyui';
export default {
  components: { AForm, AFormItem, AInput, ASelect, ASelectOption, AButton },
  setup() {
    const formValues = ref({ username: '', gender: '' });
    const formRules = ref({ username: { required: true, message: '请输入名字' } });
    const formRef = ref(null);

    // 提交表单
    const handleSubmit = async () => {
      if (await formRef.value.validate()) {
        console.log(formValues.value);
      }
    };

    return {
      formValues,
      formRules,
      formRef,
      handleSubmit,
    };
  },
};
</script>
```
