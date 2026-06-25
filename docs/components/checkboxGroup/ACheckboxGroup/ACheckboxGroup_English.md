# ACheckboxGroup

`ACheckboxGroup` binds an array of selected values to a set of checkboxes rendered from an `items` list. Pass each option as `{ label, value }`, and the group keeps `modelValue` in sync as users toggle boxes — ideal for multi-select filters, permission pickers, and tag choosers.

## Import

```ts
import { CheckboxGroup } from '@any-design/anyui/vue';
// React:  import { CheckboxGroup } from '@any-design/anyui/react';
// Svelte: import { CheckboxGroup } from '@any-design/anyui/svelte';
```

## Basic usage

Bind an array with `v-model` and pass `items`.

```vue
<template>
  <ACheckboxGroup v-model="picked" :items="items" />
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];
const picked = ref(['apple']);
</script>
```

## Examples

### Pre-selected values and spacing

Seed `modelValue` with the values that should start checked, and adjust the spacing with `gap` when the group needs more room.

```vue
<template>
  <ACheckboxGroup v-model="roles" :items="items" :gap="32" />
  <p>Selected: {{ roles }}</p>
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: 'Read', value: 'read' },
  { label: 'Write', value: 'write' },
  { label: 'Admin', value: 'admin' },
];
const roles = ref(['read', 'write']);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | Array<string \| number> | undefined | Selected values (`v-model`). |
| `items` | Array | undefined | Required. Checkbox options. |
| `gap` | Number | 16 | Gap (px) between items. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | Array | Selection change. |
