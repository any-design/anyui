# ASelect 组件文档

这个组件是一个带下拉框的选择器。

## 基本用法和示例

使用 `ASelect` 组件，可以创建一个带下拉框的选择器：

```vue
<template>
  <ASelect v-model="selectedValue" :items="items" />
</template>

<script>
import { ASelect } from '@any-design/anyui';

export default {
  components: {
    ASelect,
  },
  data() {
    return {
      selectedValue: '',
      items: [
        { text: '选项1', value: 'value1' },
        { text: '选项2', value: 'value2' },
        { text: '选项3', value: 'value3' },
      ],
    };
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名      | 类型                         | 默认值                   | 说明                       |
| ----------- | ---------------------------- | ------------------------ | -------------------------- |
| width       | String/Number                | '100%'                   | 组件宽度                   |
| size        | String                       | 'default'                | 组件尺寸                   |
| round       | Boolean                      | false                    | 是否应用圆角边框到选择器   |
| modelValue  | String/Number/undefined/null | ''                       | 绑定的值                   |
| placeholder | String                       | ''                       | 未选中时的占位符           |
| disabled    | Boolean                      | false                    | 是否禁用选择器             |
| items       | Object                       | undefined                | 选择器的选项列表           |
| expandIcon  | String                       | 'ic:outline-expand-more' | 选择器展开按钮的 icon 类型 |

## Events

该组件会发出以下 Events：

| 事件名               | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| update:modelValue    | 选中选项的 value 发生变化时触发，传递变化后的 value          |
| popup-status-changed | 下拉框的显示状态发生变化时触发，传递变化后的状态：true/false |

## 提供的插槽

该组件提供以下插槽：

| 插槽名  | 说明                           |
| ------- | ------------------------------ |
| default | 选择器文本区域的插槽，接受内容 |
| popup   | 下拉框的插槽，接受内容         |
