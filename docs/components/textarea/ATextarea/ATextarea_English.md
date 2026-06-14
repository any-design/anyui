# ATextarea

`ATextarea` is a multiline text field that grows with its content, clamped between a minimum and maximum number of rows. It supports `v-model`, Ctrl/Cmd+Enter to submit, and `before` / `after` slots for surrounding content.

## Import

```ts
import { Textarea } from '@any-design/anyui/vue';
// React:  import { Textarea } from '@any-design/anyui/react';
// Svelte: import { Textarea } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <ATextarea v-model="msg" placeholder="Write a message…" />
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('');
</script>
```

## Examples

### Controlling height

`minRows` sets the resting height; `maxRows` is the threshold past which the field starts scrolling instead of growing.

```vue
<template>
  <ATextarea v-model="msg" :min-rows="2" :max-rows="6" placeholder="2–6 rows" />
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('');
</script>
```

### Submit on Ctrl/Cmd + Enter

The `submit` event fires with the current value when the user presses Ctrl/Cmd + Enter — handy for chat or comment boxes.

```vue
<template>
  <ATextarea v-model="msg" placeholder="Press ⌘/Ctrl + Enter to send" @submit="onSend" />
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('');
const onSend = (value) => { console.log('sent:', value); msg.value = ''; };
</script>
```

### States and slots

Use `disabled`, `readonly`, and `borderless` for different modes. The `after` slot is a convenient place for a toolbar.

```vue
<template>
  <ATextarea v-model="msg" placeholder="Add a note">
    <template #after>
      <AButton type="primary" size="small" @click="save">Save</AButton>
    </template>
  </ATextarea>
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('');
const save = () => console.log(msg.value);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | String | '' | Bound value (`v-model`). |
| `placeholder` | String | '' | Placeholder text. |
| `minRows` | Number | 3 | Minimum height in rows. |
| `maxRows` | Number | 10 | Maximum height in rows (scrolls past it). |
| `lineHeight` | Number | 1.5 | Line-height used for height math. |
| `readonly` | Boolean | false | Read-only. |
| `disabled` | Boolean | false | Disabled. |
| `disableResizeCorner` | Boolean | false | Hides the native resize handle. |
| `autoMatchHeight` | Boolean | false | Continuously match content height (no max). |
| `borderless` | Boolean | false | Removes the border. |
| `maxlength / minlength` | Number | undefined | Native length constraints. |
| `autocomplete` | String | 'off' | Native autocomplete. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | String | Value change. |
| `input / change` | InputEvent | Native events. |
| `blur` | FocusEvent | Native blur. |
| `submit` | String | On Ctrl/Cmd + Enter. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `before` | — | Content above the textarea. |
| `after` | — | Content below the textarea. |
