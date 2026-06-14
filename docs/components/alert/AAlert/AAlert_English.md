# AAlert

`AAlert` is an inline contextual banner for status messages. Pick a `type` (info, success, warn, danger) to drive its color and icon, add an optional `title`, and make it `closable` so users can dismiss it.

## Import

```ts
import { Alert } from '@any-design/anyui/vue';
// React:  import { Alert } from '@any-design/anyui/react';
// Svelte: import { Alert } from '@any-design/anyui/svelte';
```

## Basic usage

A default info banner with body content in the default slot.

```vue
<template>
  <AAlert>A new version is available — refresh to update.</AAlert>
</template>
```

## Examples

### Success with a title

Add `title` and switch `type` to `success` for positive feedback.

```vue
<template>
  <AAlert type="success" title="Payment received">
    Your receipt has been emailed to you.
  </AAlert>
</template>
```

### Closable

Set `closable` to render a dismiss button; listen to `close` to react.

```vue
<template>
  <AAlert v-if="show" type="warn" closable @close="show = false">
    Your trial ends in 3 days.
  </AAlert>
</template>

<script setup>
import { ref } from 'vue';
const show = ref(true);
</script>
```

### Danger

Use `type="danger"` for errors or destructive warnings.

```vue
<template>
  <AAlert type="danger" title="Upload failed">
    The file exceeds the 10 MB limit. Please choose a smaller file.
  </AAlert>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | 'info' \| 'success' \| 'warn' \| 'danger' | 'info' | Status type, drives color and icon. |
| `title` | String | '' | Optional title. |
| `closable` | Boolean | false | Show a close button. |
| `showIcon` | Boolean | true | Show the type icon. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `close` | — | Emitted when the close button is clicked. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Body content. |
| `icon` | — | Overrides the type icon. |
