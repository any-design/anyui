# AClickableText

`AClickableText` is a themed, link-styled text trigger. Set a `type` to color it (primary, secondary, danger, warn, info), and listen to `click`. Use it for inline actions like "Edit", "View all", or "Delete".

## Import

```ts
import { ClickableText } from '@any-design/anyui/vue';
// React:  import { ClickableText } from '@any-design/anyui/react';
// Svelte: import { ClickableText } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AClickableText type="primary" @click="onClick">View details</AClickableText>
</template>

<script setup>
const onClick = () => console.log('clicked');
</script>
```

## Examples

### Danger action

Use `type="danger"` for destructive inline actions like delete.

```vue
<template>
  <AClickableText type="danger" @click="onDelete">Remove</AClickableText>
</template>

<script setup>
const onDelete = () => console.log('delete');
</script>
```

### In a sentence

Mix it into body text for inline links.

```vue
<template>
  <p>
    New here?
    <AClickableText type="primary" @click="goSignup">Create an account</AClickableText>
  </p>
</template>

<script setup>
const goSignup = () => console.log('signup');
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | 'primary' \| 'secondary' \| 'danger' \| 'warn' \| 'info' | '' | Theme color (empty = default text color). |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `click` | MouseEvent | Native click. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Text content. |
