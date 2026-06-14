# APopup

`APopup` is a centered modal popup with an optional mask. Use it for custom overlays that don't fit `ADialog`'s structure — image lightboxes, custom panels, or full custom content. Toggle with `v-model`.

## Import

```ts
import { Popup } from '@any-design/anyui/vue';
// React:  import { Popup } from '@any-design/anyui/react';
// Svelte: import { Popup } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AButton @click="open = true">Open popup</AButton>
  <APopup v-model="open" width="480">
    <div style="padding: 24px">
      <h3>Custom panel</h3>
      <p>Any content goes here.</p>
    </div>
  </APopup>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
```

## Examples

### Without mask

Set `show-mask="false"` for a maskless overlay.

```vue
<template>
  <APopup v-model="open" :show-mask="false">
    <div class="floating-panel">Floating content</div>
  </APopup>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

### Disable mask close

Set `mask-closable="false"` to require an explicit close action.

```vue
<template>
  <APopup v-model="open" :mask-closable="false">
    <div style="padding: 24px">
      <p>Click the button to close.</p>
      <AButton @click="open = false">Close</AButton>
    </div>
  </APopup>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | Boolean | false | Visibility (`v-model`). |
| `width` | Number \| String | undefined | Popup width. |
| `showMask` | Boolean | true | Show the mask. |
| `maskClosable` | Boolean | true | Close on mask click. |
| `appendToBody` | Boolean | true | Append to body. |
| `zIndex` | Number | 1000 | z-index. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | Boolean | Visibility change. |
| `open / close` | — | Lifecycle hooks. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Popup content. |
