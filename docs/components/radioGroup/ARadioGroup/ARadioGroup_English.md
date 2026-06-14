# ARadioGroup

`ARadioGroup` binds a single selected value to a set of radios generated from an `items` list. Each option is `{ label, value }`; the group keeps `modelValue` in sync and enforces single selection — perfect for choosing a plan, a shipping method, or a theme.

## Import

```ts
import { RadioGroup } from '@any-design/anyui/vue';
// React:  import { RadioGroup } from '@any-design/anyui/react';
// Svelte: import { RadioGroup } from '@any-design/anyui/svelte';
```

## Basic usage

Bind the chosen value with `v-model` and pass `items`.

```vue
<template>
  <ARadioGroup v-model="plan" :items="items" />
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
];
const plan = ref('pro');
</script>
```

## Examples

### Reacting to change

Listen to `change` to run logic when the user picks a new option.

```vue
<template>
  <ARadioGroup v-model="color" :items="items" @change="onChange" />
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];
const color = ref('system');
const onChange = (val) => console.log('theme:', val);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | String \| Number | undefined | Selected value (`v-model`). |
| `items` | Array<{ label, value }> | undefined | Radio options. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | value | Selection change. |
| `change` | value | Selection change. |
