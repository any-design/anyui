# AChat

`AChat` 渲染自动滚动的聊天记录，基于 `AVirtualList` 实现。传入 `{ id, content, role }` 形式的 `messages` 数组，`role` 为 `'self'` 或 `'target'`。新消息到达时列表会自动滚动到底部。

## 引入

```ts
import { Chat } from '@any-design/anyui/vue';
// React:  import { Chat } from '@any-design/anyui/react';
// Svelte: import { Chat } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AChat :messages="messages" style="height: 400px" />
</template>

<script setup>
import { ref } from 'vue';
const messages = ref([
  { id: 1, content: '你好！', role: 'target' },
  { id: 2, content: '嗨！', role: 'self' },
]);
</script>
```

## 示例

### 添加消息

向数组中添加新消息 —— 聊天记录会自动滚动到最新一条。

```vue
<template>
  <AChat :messages="messages" style="height: 400px" />
  <AInput v-model="text" @submit="send" placeholder="输入后按回车发送" />
</template>

<script setup>
import { ref } from 'vue';
const text = ref('');
const messages = ref([
  { id: 1, content: '嘿！', role: 'target' },
]);
const send = () => {
  if (!text.value) return;
  messages.value.push({ id: Date.now(), content: text.value, role: 'self' });
  text.value = '';
};
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `messages` | Array<{ id, content, role }> | [] | 消息列表；`role` 为 `self` 或 `target`。 |
| `enableDeepWatch` | Boolean | false | 深度监听 `messages`。 |
