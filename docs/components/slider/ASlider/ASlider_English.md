# ASlider

`ASlider` is a numeric range slider. Bind the value with `v-model`, constrain it with `min`, `max`, and `step`, and show a live tooltip while dragging. Use it for volume, opacity, price ranges, or any bounded numeric input.

## Import

```ts
import { Slider } from '@any-design/anyui/vue';
// React:  import { Slider } from '@any-design/anyui/react';
// Svelte: import { Slider } from '@any-design/anyui/svelte';
```

## Basic usage

Bind a number with `v-model`; the default range is 0–100.

```vue
<template>
  <ASlider v-model="volume" />
  <p>Volume: {{ volume }}</p>
</template>

<script setup>
import { ref } from 'vue';
const volume = ref(30);
</script>
```

## Examples

### Custom range and step

Set `min`, `max`, and `step` for granular control — here a 0–1000 price slider that snaps by 50.

```vue
<template>
  <ASlider v-model="price" :min="0" :max="1000" :step="50" />
</template>

<script setup>
import { ref } from 'vue';
const price = ref(250);
</script>
```

### Disabled and tooltip off

Use `disabled` to make the slider read-only, and `showTooltip` to hide the dragging tooltip.

```vue
<template>
  <ASlider v-model="opacity" :show-tooltip="false" disabled />
</template>

<script setup>
import { ref } from 'vue';
const opacity = ref(80);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | Number | 0 | Current value (`v-model`). |
| `min` | Number | 0 | Minimum. |
| `max` | Number | 100 | Maximum. |
| `step` | Number | 1 | Step size. |
| `disabled` | Boolean | false | Disabled. |
| `showTooltip` | Boolean | true | Show the value tooltip while dragging. |
| `width` | String \| Number | undefined | Width of the slider. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | Number | Value change. |
| `change` | Number | Committed value change. |
