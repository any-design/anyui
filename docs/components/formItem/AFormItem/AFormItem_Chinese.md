# AFormItem 组件文档

这个组件是一个表单项。

## 基本用法和示例

使用 `AFormItem` 组件，可以创建一个表单项。

```vue
<template>
  <AFormItem 
    label="用户名"
    prop="username"
  >
    <input type="text" v-model="formData.username">
  </AFormItem>
</template>

<script>
import { AFormItem } from '@any-design/anyui';

export default {
  components: {
    AFormItem,
  },
  data() {
    return {
      formData: {
        username: '',
      },
    };
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名 | 类型   | 默认值 | 说明       |
| ------ | ------ | ------ | ---------- |
| prop   | String | -      | 表单项在表单数据中的名称 |
| label  | String | -      | 表单项的标签文本         |

示例：

```vue
<template>
  <AFormItem 
    label="用户名"
    prop="username"
  >
    <input type="text" v-model="formData.username">
  </AFormItem>
</template>
```

## Events

该组件会发出以下事件：

### clear

当父表单需要清空表单项时，该事件会发出。

## 暴露的属性和方法

该组件暴露以下属性和方法：

### emitter

在参数对象 `expose` 中可访问，该属性是组件自身的事件发射器实例，用于表单内部通信。