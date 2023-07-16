# AMessage 组件文档

AMessage 组件是一个带有图标和文本内容的提示信息框，可用于展示各种类型的提示信息。

## 基本用法和示例

使用 `AMessage` 组件，可以创建一个提示信息框：

```vue
<template>
  <AMessage type="success" content="提交成功" icon="check-circle" />
</template>

<script>
import { AMessage } from '@any-design/anyui';

export default {
  components: {
    AMessage,
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名   | 类型                                                     | 默认值    | 说明                                 |
| -------- | -------------------------------------------------------- | --------- | ------------------------------------ |
| type     | String: 'default', 'info', 'warning', 'success', 'error' | 'default' | 消息框的类型                         |
| content  | String                                                   |           | 提示信息的文本内容                   |
| icon     | String                                                   | ''        | 指定提示信息框的图标，为空则没有图标 |
| showIcon | Boolean                                                  | true      | 是否显示提示信息框的图标             |
| round    | Boolean                                                  | false     | 是否使用圆角边框                     |
