# @any-design/anyui AChat Component

The AChat component is used to display a chat interface. It is built using Vue3 and contains a single child component named AVirtualList which enables the use of a virtual list to optimize the performance of rendering the list of messages.

## Basic Usage

```html
<template>
  <a-chat :messages="messages" :enable-deep-watch="false"></a-chat>
</template>

<script setup>
  import { reactive } from 'vue';
  import AChat from '@any-design/anyui/AChat.vue';

  const messages = reactive([
    { id: 1, content: 'Hello', role: 'self' },
    { id: 2, content: 'Hi', role: 'target' },
  ]);
</script>
```

## Props

### messages

Type: `Array<AChatMessage>`

An array of objects that contains messages to be displayed in the chat. Each object has the following AChatMessage type: `{ id: string | number; content: string; role: AChatMessageRole; }`.

Tip: Each message should have an unique id.

Default: `[]`

Usage:

```html
<a-chat
  :messages="[
  { id: 1, content: 'Hello', role: 'self' },
  { id: 2, content: 'Hi', role: 'target' },
]"
></a-chat>
```

### enableDeepWatch

Type: `Boolean`

Enable or disable deep watching of the changes in the messages array.

Default: `false`

Usage:

```html
<a-chat :messages="data.messages" :enable-deep-watch="true"></a-chat>
```
