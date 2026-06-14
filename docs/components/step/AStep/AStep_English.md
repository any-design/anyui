# AStep

`AStep` is a horizontal step indicator for multi-step flows like checkout or onboarding. Set `steps` (a count, or an array of labels) and track progress with `current` (1-based).

## Import

```ts
import { Step } from '@any-design/anyui/vue';
// React:  import { Step } from '@any-design/anyui/react';
// Svelte: import { Step } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AStep :steps="4" :current="2" />
</template>
```

## Examples

### With labels

Pass an array of strings to label each step.

```vue
<template>
  <AStep :steps="['Account', 'Profile', 'Payment', 'Done']" :current="3" />
</template>
```

### Tracking progress

Bind `current` to a ref to advance the indicator as the user moves through the flow.

```vue
<template>
  <AStep :steps="3" :current="current" />
  <AButton @click="current = Math.min(3, current + 1)">Next</AButton>
</template>

<script setup>
import { ref } from 'vue';
const current = ref(1);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `steps` | Number \| String[] | 2 | Number of steps, or an array of labels. |
| `current` | Number | 1 | Current step (1-based). |
