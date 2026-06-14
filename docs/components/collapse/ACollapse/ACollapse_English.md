# ACollapse

`ACollapse` is a transition wrapper that animates its content between expanded and collapsed states. Toggle `visible` to expand or collapse. Set `direction` for horizontal collapse, and `alwaysRender` to keep content in the DOM when hidden.

## Import

```ts
import { Collapse } from '@any-design/anyui/vue';
// React:  import { Collapse } from '@any-design/anyui/react';
// Svelte: import { Collapse } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AButton @click="open = !open">Toggle</AButton>
  <ACollapse :visible="open">
    <p>This content expands and collapses smoothly.</p>
  </ACollapse>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

## Examples

### Horizontal

Set `direction="horizontal"` to collapse width instead of height.

```vue
<template>
  <AButton @click="open = !open">Toggle</AButton>
  <ACollapse :visible="open" direction="horizontal">
    <div style="width: 300px">Collapses horizontally.</div>
  </ACollapse>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

### Always render

By default the content is removed from the DOM after collapsing. Set `alwaysRender` to keep it mounted (useful for forms that shouldn't lose state).

```vue
<template>
  <ACollapse :visible="open" always-render>
    <AInput placeholder="State is preserved" />
  </ACollapse>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `visible` | Boolean | false | Whether content is expanded. |
| `direction` | 'horizontal' \| 'vertical' | 'vertical' | Collapse direction. |
| `alwaysRender` | Boolean | false | Keep content in the DOM when collapsed. |
| `renderWaitTime` | Number | 100 | Delay (ms) before removing content after collapse. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Collapsible content. |
