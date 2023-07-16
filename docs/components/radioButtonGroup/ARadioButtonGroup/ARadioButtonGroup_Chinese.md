# ARadioButtonGroup 组件文档

这个组件是一个单选按钮组。

## 基本用法和示例

使用 `ARadioButtonGroup` 组件，可以创建一个单选按钮组：

```vue
<template>
  <ARadioButtonGroup
    :items="[
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' },
    ]"
    v-model="selectedValue"
    :round="false"
  />
</template>
```

## Props

该组件接受以下 props：

| 属性名     | 类型                               | 默认值 | 说明                                                           |
| ---------- | ---------------------------------- | ------ | -------------------------------------------------------------- |
| items      | Array<{label: string, value: any}> | -      | 单选按钮组中每个选项的信息，必须用 `label` 和 `value` 属性表示 |
| modelValue | String/Number                      | -      | 绑定单选按钮组的值                                             |
| round      | Boolean                            | false  | 是否应用圆角边框到单选按钮组                                   |

## 事件

该组件会触发以下事件：

| 事件名            | 参数                 | 说明                                           |
| ----------------- | -------------------- | ---------------------------------------------- |
| update:modelValue | value: String/Number | 单选按钮组选择改变时触发，会把新值作为参数传递 |

## 作用域插槽

该组件没有作用域插槽。

## 内部属性和方法

该组件没有暴露任何内部属性或方法。

## ARadioButton 组件

单选按钮组内部使用了 `ARadioButton` 组件，该组件可以单独使用，也可以在单选按钮组内部使用。

### Props

`ARadioButton` 组件接受以下 props：

| 属性名   | 类型            | 默认值 | 说明           |
| -------- | --------------- | ------ | -------------- |
| item     | Object          | -      | 单选按钮的信息 |
| selected | Boolean         | -      | 是否被选中     |
| onClick  | Function(value) | -      | 点击事件回调   |

其中，`item` 对象必须含有 `label` 和 `value` 属性。

示例：

```vue
<template>
  <ARadioButton :item="{ label: '选项1', value: '1' }" :selected="true" :onClick="handleClick" />
</template>

<script>
import { ARadioButton } from '@any-design/anyui';

export default {
  components: {
    ARadioButton,
  },
  methods: {
    handleClick(value) {
      console.log('clicked:', value);
    },
  },
};
</script>
```
