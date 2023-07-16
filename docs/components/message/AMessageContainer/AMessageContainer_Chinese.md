# @any-design/anyui 消息提示组件（Message）文档

## 简介

这个组件提供了消息提示功能，它可以在页面中创建一个浮动的消息提示框。

## 基本用法和示例

使用 `Message` 组件，需要在页面上引入它，并使用 `addMessage` 方法添加消息提示。示例：

```vue
<template>
  <div>
    <button @click="showMessage">显示消息</button>
    <Message />
  </div>
</template>

<script>
import { Message } from '@any-design/anyui';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    Message,
  },
  setup() {
    const msg = ref("");

    function showMessage() {
      Message.addMessage({
        type: "success",
        content: msg.value,
        duration: 3000,
      });
    }

    return {
      showMessage,
      msg,
    };
  },
});
</script>
```

## Props

该组件接受以下 props：

| 属性名    | 类型   | 默认值 | 说明                 |
| --------- | ------ | ------ | -------------------- |
| zIndex    | Number | -1     | 消息提示框的层级深度 |
| key       | Any    | -      | 唯一标识符           |
| type      | String | -      | 消息提示框的类型     |
| content   | String | -      | 消息提示框的内容     |
| icon      | String | -      | 消息提示框的图标     |
| showIcon  | Any    | -      | 是否显示图标         |
| round     | Any    | -      | 是否应用圆角边框到消息提示框 |
| duration  | Number | 3000   | 消息提示框的显示时长 |

## Events

该组件需要将以下事件暴露出来：

| 事件名    | 参数类型 | 说明                            |
| --------- | -------- | ------------------------------- |
| addMessage| Function | 添加一条新的消息提示            |
| emitter   | Any      | 用于管理当前组件内部的消息事件 |

## 注意事项

1. 在使用该组件时，必须先在页面上引入它。
2. 在使用 `addMessage` 方法添加新的消息提示时，需要按照示例中的格式传入参数。
3. 组件定位在界面正中央，不会受到页面元素的影响。
4. 组件需要在父组件中设置显示与否的逻辑，例如监听 `addMessage` 事件来控制显示。