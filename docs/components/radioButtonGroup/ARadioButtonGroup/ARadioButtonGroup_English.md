# ARadioButtonGroup

`ARadioButtonGroup` is a button-styled radio group. It behaves like `ARadioGroup` — bind one value with `v-model` and render options from `items` — but each option renders as a segmented button, with an optional `round` pill shape. The package also exports `ARadioButton` for hand-placed button radios.

## Import

```ts
import { RadioButtonGroup } from '@any-design/anyui/vue';
// React:  import { RadioButtonGroup } from '@any-design/anyui/react';
// Svelte: import { RadioButtonGroup } from '@any-design/anyui/svelte';
```

## Basic usage

Bind the selected value and pass `items`.

```vue
<template>
  <ARadioButtonGroup v-model="view" :items="items" />
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: 'List', value: 'list' },
  { label: 'Grid', value: 'grid' },
  { label: 'Map', value: 'map' },
];
const view = ref('list');
</script>
```

## Examples

### Variants and sizes

Use `round` for a pill-shaped segmented control, and set `size` (`small`, `default`, `large`) to match dense toolbars or larger controls.

```vue
<template>
  <div class="demo-row">
    <ARadioButtonGroup v-model="density" :items="items" size="small" />
    <ARadioButtonGroup v-model="density" :items="items" round />
    <ARadioButtonGroup v-model="density" :items="items" size="large" round />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: 'S', value: 's' },
  { label: 'M', value: 'm' },
  { label: 'L', value: 'l' },
  { label: 'XL', value: 'xl' },
];
const density = ref('m');
</script>
```

### Reacting to change

Use `change` to react when the user switches segments.

```vue
<template>
  <ARadioButtonGroup v-model="range" :items="items" @change="onChange" />
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { label: 'Today', value: 'today' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];
const range = ref('week');
const onChange = (val) => console.log('range:', val);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | String \| Number | undefined | Selected value (`v-model`). |
| `items` | Array<{ label, value }> | undefined | Options. |
| `round` | Boolean | false | Pill-shaped group. |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Group density. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | value | Selection change. |
| `change` | value | Selection change. |

## Notes

The package also registers `ARadioButton` (exported as `RadioButton`) for use as individual button radios.
