# AAccordion

`AAccordion` is a stack of collapsible panels built on top of `ACollapse`. Compose it with `AAccordionItem` (a header + collapsible body). Use `mode="single"` for classic accordion behavior (one panel open at a time), or `mode="multiple"` to keep several open. Bind `v-model:modelValue` to control which panels are open.

## Import

```ts
import { Accordion, AccordionItem } from '@any-design/anyui/vue';
// React:  import { Accordion, AccordionItem } from '@any-design/anyui/react';
// Svelte: import { Accordion, AccordionItem } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AAccordion v-model="open">
    <AAccordionItem :value="1" title="What is AnyUI?">
      AnyUI is a cross-framework component library.
    </AAccordionItem>
    <AAccordionItem :value="2" title="Is it themeable?">
      Yes — every component ships with CSS variables.
    </AAccordionItem>
  </AAccordion>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Accordion, AccordionItem } from '@any-design/anyui/vue';
const open = ref(1);
</script>
```

## Examples

### Multiple mode

Set `mode="multiple"` to allow several panels open at once. `modelValue` becomes an array of values.

```vue
<template>
  <AAccordion v-model="open" mode="multiple">
    <AAccordionItem :value="1" title="First">Several panels can stay open.</AAccordionItem>
    <AAccordionItem :value="2" title="Second">Toggle each independently.</AAccordionItem>
  </AAccordion>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Accordion, AccordionItem } from '@any-design/anyui/vue';
const open = ref([1]);
</script>
```

### Custom header & icons

Use the `header` slot to render a custom header instead of `title`. Pass `icon` for a leading icon, and `expandIcon` to customize the expand / collapse chevron.

### Disabled & round

Set `disabled` on an item to prevent toggling it. Set `round` on `AAccordion` for rounded corners, and `border={false}` for a borderless look.

### Non-collapsible single

In `single` mode, set `collapsible={false}` to always keep one panel open (clicking the open panel won't close it).

## AAccordion Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | String \| Number \| Array | — | Open item value(s). Single mode: one value; multiple mode: array. |
| `mode` | 'single' \| 'multiple' | 'single' | Opening behavior. |
| `collapsible` | Boolean | true | In single mode, allow all panels to be closed. |
| `border` | Boolean | true | Show a border around the accordion. |
| `round` | Boolean | false | Rounded corners. |

## AAccordionItem Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | String \| Number | — | Value identifying this item. When omitted, the index is used. |
| `title` | String | `''` | Header text (ignored when the `header` slot is used). |
| `icon` | String | `''` | Leading icon name (iconify). |
| `expandIcon` | String | `'ic:round-keyboard-arrow-down'` | Expand / collapse icon. |
| `disabled` | Boolean | false | Disable this item. |

## AAccordionItem Slots

| Slot | Description |
| --- | --- |
| `default` | Collapsible body content. |
| `header` | Custom header content (replaces `title`). |