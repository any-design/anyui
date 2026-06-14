# AChat

`AChat` renders an auto-scrolling chat transcript built on `AVirtualList`. Pass a `messages` array of `{ id, content, role }` where `role` is `'self'` or `'target'`. The list automatically scrolls to the bottom when new messages arrive.

## Import

```ts
import { Chat } from '@any-design/anyui/vue';
// React:  import { Chat } from '@any-design/anyui/react';
// Svelte: import { Chat } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AChat :messages="messages" style="height: 400px" />
</template>

<script setup>
import { ref } from 'vue';
const messages = ref([
  { id: 1, content: 'Hi there!', role: 'target' },
  { id: 2, content: 'Hello!', role: 'self' },
]);
</script>
```

## Examples

### Adding messages

Push new messages to the array — the transcript auto-scrolls to show the latest.

```vue
<template>
  <AChat :messages="messages" style="height: 400px" />
  <AInput v-model="text" @submit="send" placeholder="Type and press Enter" />
</template>

<script setup>
import { ref } from 'vue';
const text = ref('');
const messages = ref([
  { id: 1, content: 'Hey!', role: 'target' },
]);
const send = () => {
  if (!text.value) return;
  messages.value.push({ id: Date.now(), content: text.value, role: 'self' });
  text.value = '';
};
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `messages` | Array<{ id, content, role }> | [] | Messages; `role` is `self` or `target`. |
| `enableDeepWatch` | Boolean | false | Deep-watch `messages`. |
