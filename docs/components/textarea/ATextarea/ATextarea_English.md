# ATextarea

`ATextarea` is a multiline text field that can grow with its content or expose the native drag handle for manual resizing. It supports `v-model`, Ctrl/Cmd+Enter to submit, and `before` / `after` slots for surrounding content.

## Import

```ts
import { Textarea } from '@any-design/anyui/vue';
// React:  import { Textarea } from '@any-design/anyui/react';
// Svelte: import { Textarea } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <ATextarea
    v-model="msg"
    auto-match-height
    :min-rows="2"
    :max-rows="6"
    placeholder="Write a message…"
  />
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('This textarea grows with the content.');
</script>
```

## Examples

### Manual resize

Set `resizable` to let the user drag the native resize handle. `minRows` and `maxRows` still provide sensible bounds.

```vue
<template>
  <ATextarea
    v-model="msg"
    resizable
    :min-rows="3"
    :max-rows="8"
    placeholder="Drag the corner to resize"
  />
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('Manual resizing is useful for notes, prompts, and long comments.');
</script>
```

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
| `resizable` | Boolean | false | Enables the native vertical resize handle. |
| `disableResizeCorner` | Boolean | false | Hides the native resize handle when manual resizing is enabled. |
| `autoMatchHeight` | Boolean | false | Continuously match content height up to `maxRows`. |
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
