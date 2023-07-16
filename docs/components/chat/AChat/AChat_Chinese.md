# AChat 组件文档

这个组件是一个聊天框。

## 基本用法和示例

使用 `AChat` 组件，可以创建一个聊天框。

```vue
<template>
  <AChat :messages="messages" :enableDeepWatch="true" />
</template>

<script>
import { AChat } from '@any-design/anyui';

export default {
  components: {
    AChat,
  },
  data() {
    return {
      messages: [
        { id: '1', content: '你好！', role: 'self' },
        { id: '2', content: '你好！', role: 'target' },
      ],
    };
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名           | 类型              | 默认值 | 说明                         |
| ---------------- | ----------------- | ------ | ---------------------------- |
| messages         | `AChatMessage[]`  | `[]`   | 聊天信息数组                 |
| enableDeepWatch  | Boolean           | false  | 是否深度监听聊天信息         |

`AChatMessage` 对象包含以下属性:

| 属性名    | 类型             | 说明         |
| --------- | ---------------- | ------------ |
| id        | `string|number`  | 消息 id      |
| content   | string           | 消息内容     |
| role      | `self|target`    | 消息是否为自己发送 |

示例：

```vue
<template>
  <AChat :messages="messages" :enableDeepWatch="true" />
</template>

<script>
import { AChat } from '@any-design/anyui';

export default {
  components: {
    AChat,
  },
  data() {
    return {
      messages: [
        { id: '1', content: '你好！', role: 'self' },
        { id: '2', content: '你好！', role: 'target' },
      ],
    };
  },
};
</script>
```

## Events

该组件没有定义事件。

## 暴露的方法或值

该组件没有暴露的方法或值。