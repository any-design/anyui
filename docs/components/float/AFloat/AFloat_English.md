# AFloat

`AFloat` is a floating panel that docks to a viewport edge. Toggle it with `v-model:visible`, position it with `top`, and optionally `center` it instead of docking. Useful for command palettes, notification stacks, or helper panels.

## Import

```ts
import { Float } from '@any-design/anyui/vue';
// React:  import { Float } from '@any-design/anyui/react';
// Svelte: import { Float } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AButton @click="visible = true">Open panel</AButton>
  <AFloat v-model:visible="visible" :top="80" width="480">
    <div style="padding: 16px">
      <AInput placeholder="Search commands…" />
    </div>
  </AFloat>
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>
```

## Examples

### Centered

Set `centered` for a modal-like centered panel instead of a docked one.

```vue
<template>
  <AFloat v-model:visible="visible" centered width="560">
    <div style="padding: 24px">
      <h3>Quick actions</h3>
    </div>
  </AFloat>
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(true);
</script>
```

### Rounded

Add `round` for pill-shaped corners.

```vue
<template>
  <AFloat v-model:visible="visible" round :top="60" width="420">
    <div style="padding: 16px">Rounded floating panel</div>
  </AFloat>
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(true);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `visible` | Boolean | false | Visibility (`v-model:visible`). |
| `top` | Number \| String | undefined | Offset from the top. |
| `width` | String \| Number | 800 | Panel width. |
| `padding` | String \| Number | undefined | Inner padding. |
| `round` | Boolean | false | Rounded corners. |
| `roundRadius` | Number \| String | undefined | Custom radius. |
| `centered` | Boolean | false | Center the panel instead of docking. |
| `lockScroll` | Boolean | true | Lock scroll while open. |
| `scrollLockTarget` | String | 'html' | Selector of the element to lock. |
| `zIndex` | Number | 1000 | z-index. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:visible` | Boolean | Visibility change. |
| `close` | — | Closed. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Panel content. |
