# AForm 组件

AForm 组件用于呈现一个可以作为整体提交的表单。用户可以使用 props 中提供的数据对组件进行填充和校验。

## 基本用法

你可以通过如下方式使用 AForm 组件：

````html
<template>
  <AForm :modelValue="formValues" :rules="formRules">
    <!-- 要提交到AForm的表单项目 -->
    <AFormItem label="用户名" name="username">
      <input v-model="formValues.username" />
    </AFormItem>
    <AFormItem label="密码" name="password">
      <input type="password" v-model="formValues.password" />
    </AFormItem>
    <AFormItem label="确认密码" name="confirmPassword">
      <input type="password" v-model="formValues.confirmPassword" />
    </AFormItem>
    <!-- 部署提交按钮 -->
    <AFormItem>
      <button type="submit" @click.prevent="handleSubmit()">提交</button>
    </AFormItem>
  </AForm>
</template>

<script>
  import { ref } from 'vue';
  import { AForm, AFormItem } from '@any-design/anyui';

  export default {
    components: {
      AForm,
      AFormItem,
    },
    setup() {
      const formValues = ref({
        username: '',
        password: '',
        confirmPassword: '',
      });
      const formRules = ref({
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur, change' },
          { min: 5, max: 10, message: '用户名请输入5~10个字符', trigger: 'blur, change' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur, change' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur, change' },
        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur, change' },
          { min: 6, message: '确认密码长度最少为6位', trigger: 'blur, change' },
          {
            validator: (rule, value, callback) => {
              if (value !== formValues.password) {
                callback(new Error('两次输入的密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur, change',
          },
        ],
      });

      const handleSubmit = () => {
        // 在这里提交表单数据
      };

      return {
        formValues,
        formRules,
        handleSubmit,
      };
    },
  };
</script>

## Props | Name | Type | Default | Description | | --- | --- | --- | --- | | modelValue | `Object` |
`{}` | 表单项的值，以及将这些值绑定到form上。 | | rules | `Object` | `{}` |
以async-validator的规则校验表单项。具体请查看下一栏。 | | layout | `String` | `'default'` |
form的布局样式。可以是一个字符串'inline'或'default'。默认为'default'。 | | labelWidth |
`String/Number` | `'20%'` | label的宽度。可以是一个百分比或者是一个数字。默认值是'20%'。 | ### rules
规则对象可以是以下三种构造之一： - RuleObject： `{ validator: ... }` - RuleArray: `[{ validator: ...
}, { validator: ... }, ...]` - Nested RuleArray: `{ propertyName: [{ validator: ... }, { validator:
... }, ...] }` rule object的validator可以是一个自定义的函数，来自validatejs或async-validator。
validate要求所有异步的自定义validator都应返回一个Promise是undefined的保证。
常见的自定义isValid函数： ```ts const myCustomValidator = ( rule: RuleObject, value: unknown,
callback: (error?: string) => void, ) => { if (/* 校验通过 */) { // 调用回调函数 callback()。
callback(); } else { // 调用回调函数 callback('error message')。如果提供了error
message，校验不通过将会返回这个message。 callback('校验失败的错误信息'); } };
````

## Events

### setValid

当使用 async-validator 校验时候，AForm 组件会发出"setValid"事件。这个事件允许上级组件在每次校验之后，从一个统一的位置获取表单校验信息。

在表单项校验通过或者失败时，event 将会包括如下信息：

```ts
{
  field: 'username',  //指定的校验字段
  message: '用户名不能为空',           //失败的错误信息，为空是校验通过
  isValid: false,                 //记录校验是否通过。
}
```

## Methods

### validate()

验证表单项以及组件中的所有项目。如果都验证成功，可以向后端发送数据并返回 true。如果校验失败，则返回 false。请注意，这个方法将发出一些事件以通知子计件完成了验证。实现的 handler 可以通过 AForm.emitter 访问该 handler。

```ts
const success = await AFormRef.validate();
if (success) {
  // 发送表单
}
```

### validateField(field: string)

验证特定的表单项。如果这个表单项目的**规则对象**出现在 rules 中，则验证通过并返回 true。否则返回 true。请注意，这个方法将发出一些事件以通知子函数完成了验证。实现的 handler 可以通过 AForm.emitter 访问该 handler。

```ts
const success = await AFormRef.validateField('username');
if (success) {
  // 发送表单
}
```

### clearField(field: string)

清除表单项中的值。如果 field 未定义，则清除整个 form 中的所有数据。

```ts
await AFormRef.clearField('username');
// 数据已清除
```

### clearFields()

清除表单项中的值。如果 field 未定义，则清除整个 form 中的所有数据。

```ts
await AFormRef.clearFields();
// 数据已清除
```

### clearValidation(field: string)

清除某一特定表单项的验证结果。如果 field 未定义，则清除整个 form 中的所有数据。

```ts
await AFormRef.clearValidation('username');
// 验证已清除
```
