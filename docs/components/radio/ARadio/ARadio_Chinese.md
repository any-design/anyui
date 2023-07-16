# ARadio 组件文档

这个组件是一个单选框。

## 基本用法和示例

使用 `ARadio` 组件，可以创建一个单选框：

```vue
<template>
  <ARadio label="选项一" :checked="true" @change="handleChange"></ARadio>
</template>

<script>
import { ARadio } from '@any-design/anyui';

export default {
  components: {
    ARadio,
  },
  methods: {
    handleChange(value) {
      console.log('选项一的值此时为：', value);
    },
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名  | 类型    | 默认值 | 说明                     |
| ------- | ------- | ------ | ------------------------ |
| label   | String  | ''     | 单选框的文本数据         |
| checked | Boolean | false  | 是否被选中，true 表示选中 |

示例：

```vue
<template>
  <ARadio label="选项二"></ARadio>
</template>
```

## Events

该组件会发出以下事件：

| 事件名 | 回调函数 |
| ------ | -------- |
| change | 选中状态变化的回调函数 |

示例：

```vue
<template>
  <ARadio label="选项三" @change="handleChange"></ARadio>
</template>

<script>
export default {
  methods: {
    handleChange(value) {
      console.log('选项三的值此时为：', value);
    },
  },
};
</script>
```

## 值

该组件没有暴露任何值。