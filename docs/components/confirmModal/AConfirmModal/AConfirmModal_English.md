# AConfirmModal

`AConfirmModal` is a confirmation dialog with OK/Cancel buttons. Toggle it declaratively with `v-model`, or use the imperative `confirmModal()` helper which returns a Promise. Set `type="danger"` for destructive actions like delete.

## Import

```ts
import { ConfirmModal, confirmModal } from '@any-design/anyui/vue';
// React:  import { ConfirmModal, confirmModal } from '@any-design/anyui/react';
// Svelte: import { ConfirmModal, confirmModal } from '@any-design/anyui/svelte';
```

## Basic usage

Declarative: drive visibility with `v-model` and listen to `confirm` / `cancel`.

```vue
<template>
  <AButton @click="open = true">Delete account</AButton>
  <AConfirmModal
    v-model="open"
    type="danger"
    title="Delete account?"
    content="This permanently removes your account and all data."
    @confirm="onDelete"
  />
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
const onDelete = () => console.log('deleted');
</script>
```

## Examples

### Imperative helper

`confirmModal()` returns a Promise that resolves `true` on confirm — no template needed.

```vue
<template>
  <AButton @click="ask">Remove file</AButton>
</template>

<script setup>
import { confirmModal } from '@any-design/anyui/vue';
const ask = async () => {
  const ok = await confirmModal({
    title: 'Remove file?',
    content: 'It will be moved to trash.',
    type: 'danger',
  });
  if (ok) console.log('removed');
};
</script>
```

### Custom button text

Override `confirmText` and `cancelText` for non-English UIs or clearer labels.

```vue
<template>
  <AConfirmModal
    v-model="open"
    title="Publish?"
    confirmText="Publish"
    cancelText="Not yet"
    @confirm="onPublish"
  />
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
const onPublish = () => console.log('published');
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | Boolean | false | Visibility (`v-model`). |
| `title` | String | '' | Dialog title. |
| `content` | String | '' | Body text. |
| `confirmText` | String | 'OK' | Confirm button label. |
| `cancelText` | String | 'Cancel' | Cancel button label. |
| `type` | 'primary' \| 'danger' | 'primary' | Confirm button style. |
| `loading` | Boolean | false | Show loading state on confirm. |
| `closeOnConfirm` | Boolean | true | Close the modal after confirm. |
| `width` | Number \| String | 420 | Modal width. |
| `maskClosable` | Boolean | true | Close when clicking the mask. |
| `appendToBody` | Boolean | true | Append to document.body. |
| `zIndex` | Number | 1000 | z-index. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | Boolean | Visibility change. |
| `confirm` | — | Confirm clicked. |
| `cancel` | — | Cancel clicked. |
| `close` | — | Modal closed. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Overrides the body content. |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `confirmModal` | (options) => Promise<boolean> | Imperative helper; resolves true on confirm. |
