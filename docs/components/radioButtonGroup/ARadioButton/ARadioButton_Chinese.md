# ARadioButton 组件文档

这个组件是一个单选按钮。

## 基本用法和示例

使用 `ARadioButton` 组件，可以创建一个单选按钮：

```vue
<template>
  <ARadioButton :item="{ label: '选项1', value: 'option1' }" :selected="false" @click="handleClick"
    >选项1</ARadioButton
  >
</template>

<script>
import { ARadioButton } from '@any-design/anyui';

export default {
  components: {
    ARadioButton,
  },
  methods: {
    handleClick(e) {
      console.log('clicked: ', e);
    },
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名   | 类型    | 默认值 | 说明                                                |
| -------- | ------- | ------ | --------------------------------------------------- |
| item     | Object  | null   | 以 `{ label, value }` 形式的 object，将会渲染为按钮 |
| selected | Boolean | false  | 指定该单选按钮是否被选中                            |

## Events

该组件包含以下事件：

| 事件名 | 说明                                                                                                                                    |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| click  | 单选按钮被点击时触发，返回一个包含当前单选按钮的值和其位置信息的对象，例如 `{ value: 'option1', position: { width: 100, left: 20 } }`。 |
