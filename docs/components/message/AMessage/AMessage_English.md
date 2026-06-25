# AMessage

`AMessage` renders a transient top-center notification. The primary way to use it is the imperative `message` API (`message.info` / `.success` / `.warning` / `.error`), which pops a notification without adding markup. The declarative `<AMessage>` component is available too, but most apps reach for the imperative calls.

## Import

```ts
import { Message, message } from '@any-design/anyui/vue';
// React:  import { Message, message } from '@any-design/anyui/react';
// Svelte: import { Message, message } from '@any-design/anyui/svelte';
```

## Basic usage

Call `message.success` imperatively — no template needed.

```vue
<template>
  <AButton type="primary" @click="save">Save</AButton>
</template>

<script setup>
import { message } from '@any-design/anyui/vue';
const save = () => message.success('Saved!');
</script>
```

## Examples

### Imperative with options

Pass an options object to set `content`, `duration`, and animation behavior.

```vue
<template>
  <AButton @click="notify">Notify</AButton>
</template>

<script setup>
import { message } from '@any-design/anyui/vue';
const notify = () => {
  message.warning({ content: 'Storage almost full', duration: 5000 });
};
</script>
```

### Each status type

Use the matching helper for each severity.

```vue
<template>
  <div class="demo-row">
    <AButton @click="message.info('Info')">Info</AButton>
    <AButton @click="message.success('Done')">Success</AButton>
    <AButton @click="message.warning('Careful')">Warning</AButton>
    <AButton @click="message.error('Failed')">Error</AButton>
  </div>
</template>

<script setup>
import { message } from '@any-design/anyui/vue';
</script>
```

### Declarative usage

For static, in-flow banners use the component directly.

```vue
<template>
  <AMessage type="success" content="Profile updated" />
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | 'info' \| 'success' \| 'warning' \| 'error' | undefined | Status type. |
| `content` | String | undefined | Message text. |
| `icon` | String \| IconifyIcon | '' | Custom icon. |
| `showIcon` | Boolean | true | Show the type icon. |
| `enterAnim` | Boolean | true | Enable the enter animation. |
| `leaveAnim` | Boolean | true | Enable the leave animation. |
| `round` | Boolean | false | Rounded corners. |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `message.info / .success / .warning / .error` | (content \| options) => void | Imperative helpers; options also accept `duration`, `zIndex`, and animation toggles. |

## Notes

Install globally to also expose `$message` on Vue app instance. `duration`, `zIndex`, and animation toggles are only available on the imperative API, not as component props.
