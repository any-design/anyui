# ADialog

`ADialog` is a centered modal overlay. Toggle it with `v-model`, set a `title`, and use the `default` slot for the body. Override the `header` and `footer` slots when the defaults don't fit.

## Import

```ts
import { Dialog } from '@any-design/anyui/vue';
// React:  import { Dialog } from '@any-design/anyui/react';
// Svelte: import { Dialog } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AButton type="primary" @click="open = true">Open dialog</AButton>
  <ADialog v-model="open" title="Welcome">
    <p>Thanks for trying AnyUI!</p>
  </ADialog>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
```

## Examples

### Custom footer

The default footer renders Cancel/OK buttons that emit `cancel` / `confirm`. Provide a `footer` slot to swap in your own actions.

```vue
<template>
  <ADialog v-model="open" title="Delete workspace" @confirm="onDelete">
    <p>This action cannot be undone.</p>
    <template #footer>
      <AButton @click="open = false">Cancel</AButton>
      <AButton type="primary" @click="onDelete">Delete</AButton>
    </template>
  </ADialog>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
const onDelete = () => { console.log('deleted'); open.value = false; };
</script>
```

### Custom header

Use the `header` slot to replace the title row entirely — useful for tabs or rich headers.

```vue
<template>
  <ADialog v-model="open" width="560">
    <template #header>
      <div class="demo-row" style="justify-content: space-between">
        <strong>Settings</strong>
        <AButton size="small" @click="open = false">Close</AButton>
      </div>
    </template>
    <p>Pick your preferences below.</p>
  </ADialog>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

### Disable mask close

By default clicking the mask closes the dialog. Set `maskClosable="false"` to force an explicit choice.

```vue
<template>
  <ADialog v-model="open" title="Confirm" :mask-closable="false">
    <p>You must choose an option.</p>
  </ADialog>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | Boolean | false | Visibility (`v-model`). |
| `title` | String | '' | Header title. |
| `width` | Number \| String | 420 | Dialog width. |
| `showClose` | Boolean | true | Show the close button. |
| `maskClosable` | Boolean | true | Close on mask click. |
| `appendToBody` | Boolean | true | Append to body. |
| `zIndex` | Number | 1000 | z-index. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | Boolean | Visibility change. |
| `confirm` | — | Default confirm button. |
| `cancel` | — | Default cancel button. |
| `open / close` | — | Lifecycle hooks. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Body content. |
| `header` | — | Overrides the title + close area. |
| `footer` | — | Overrides the default footer buttons. |
