# AClickableText 组件文档

这个组件是一个可点击的文本。

## 基本用法和示例

使用 `AClickableText` 组件，可以创建一个可点击的文本：

```vue
<template>
  <AClickableText @click="handleClick">点击这里</AClickableText>
</template>

<script>
import { AClickableText } from '@any-design/anyui';

export default {
  components: {
    AClickableText,
  },
  methods: {
    handleClick() {
      console.log('点击了可点击的文本');
    },
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名 | 类型   | 默认值 | 说明           |
| ------ | ------ | ------ | -------------- |
| type   | String | ''     | 文本的样式类型 |

## Events

该组件会触发以下事件：

| 事件名 | 说明                                       |
| ------ | ------------------------------------------ |
| click  | 当文本被点击时触发，会调用 `handleClick` 方法 |

示例：

```vue
<template>
  <AClickableText type="primary" @click="handleClick">提交</AClickableText>
</template>

<script>
import { AClickableText } from '@any-design/anyui';

export default {
  components: {
    AClickableText,
  },
  methods: {
    handleClick() {
      console.log('点击了提交按钮');
    },
  },
};
</script>
```