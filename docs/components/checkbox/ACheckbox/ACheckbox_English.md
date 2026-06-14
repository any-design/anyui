# ACheckbox

`ACheckbox` is a standalone checkbox control. Bind its checked state with `v-model`, give it a descriptive `label`, and optionally swap the check icon. It is the building block behind `ACheckboxGroup` but works perfectly on its own for boolean toggles like "remember me" or "agree to terms".

## Import

```ts
import { Checkbox } from '@any-design/anyui/vue';
// React:  import { Checkbox } from '@any-design/anyui/react';
// Svelte: import { Checkbox } from '@any-design/anyui/svelte';
```

## Basic usage

Bind a boolean with `v-model` and listen to `change`.

```vue
<template>
  <ACheckbox v-model="checked">Remember me</ACheckbox>
</template>

<script setup>
import { ref } from 'vue';
const checked = ref(false);
</script>
```

## Examples

### With a label

Set `label` for the text next to the box, or just put text in the default slot.

```vue
<template>
  <ACheckbox label="Subscribe to newsletter" v-model="sub" />
</template>

<script setup>
import { ref } from 'vue';
const sub = ref(true);
</script>
```

### Checked by default and custom icon

Pre-set `model-value` to `true` and override `checkIcon` with any Iconify name.

```vue
<template>
  <ACheckbox v-model="agree" checkIcon="ri:check-line">
    I accept the terms of service
  </ACheckbox>
</template>

<script setup>
import { ref } from 'vue';
const agree = ref(true);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | Boolean | false | Checked state (`v-model`). |
| `label` | String \| Number | undefined | Label shown next to the box. |
| `checkIcon` | String \| IconifyIcon | 'si-glyph:checked' | Icon used for the checked state. |
| `iconTransition` | String | 'a-trans-check-icon' | Transition name for the check icon. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | Boolean | Checked state change. |
| `change` | Boolean | Same as update. |
