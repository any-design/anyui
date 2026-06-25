# ASelect

`ASelect` is a dropdown picker. Pass an `items` array of `{ text, value }` options and bind the chosen value with `v-model`. Flip on `multiple` to let users pick more than one.

## Import

```ts
import { Select } from '@any-design/anyui/vue';
// React:  import { Select } from '@any-design/anyui/react';
// Svelte: import { Select } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <ASelect v-model="city" :items="cities" placeholder="Pick a city" />
</template>

<script setup>
import { ref } from 'vue';
const city = ref('');
const cities = [
  { text: 'Tokyo', value: 'tokyo' },
  { text: 'Paris', value: 'paris' },
  { text: 'New York', value: 'ny' },
];
</script>
```

## Examples

### Sizes and round

```vue
<template>
  <div class="demo-col">
    <ASelect v-model="small" size="small" :items="items" placeholder="Small" />
    <ASelect v-model="regular" :items="items" placeholder="Default" />
    <ASelect v-model="rounded" round :items="items" placeholder="Round" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const small = ref('');
const regular = ref('');
const rounded = ref('');
const items = [
  { text: 'Design', value: 'design' },
  { text: 'Build', value: 'build' },
  { text: 'Ship', value: 'ship' },
];
</script>
```

### Multiple selection

With `multiple`, the bound value is an array.

```vue
<template>
  <ASelect v-model="tags" :items="items" multiple placeholder="Pick tags" />
  <p>Selected: {{ tags }}</p>
</template>

<script setup>
import { ref } from 'vue';
const tags = ref([]);
const items = [
  { text: 'Vue', value: 'vue' },
  { text: 'React', value: 'react' },
  { text: 'Svelte', value: 'svelte' },
];
</script>
```

### Disabled

```vue
<template>
  <div class="demo-col">
    <ASelect :items="items" disabled placeholder="Disabled" />
    <ASelect model-value="design" :items="items" disabled />
  </div>
</template>

<script setup>
const items = [
  { text: 'Design', value: 'design' },
  { text: 'Build', value: 'build' },
  { text: 'Ship', value: 'ship' },
];
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | String \| Number \| Array \| null | '' | Bound value (array when `multiple`). |
| `items` | Array<{ text, value }> | undefined | Options list. |
| `placeholder` | String | '' | Placeholder text. |
| `width` | String \| Number | '100%' | Width of the select. |
| `size` | 'default' \| 'small' \| 'large' | 'default' | Size. |
| `round` | Boolean | false | Rounded control. |
| `multiple` | Boolean | false | Enable multi-select. |
| `disabled` | Boolean | false | Disabled. |
| `expandIcon` | String \| IconifyIcon | 'ic:outline-expand-more' | Trailing expand icon. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | value | Value change. |
| `change` | value | Fires on commit. |
| `blur` | FocusEvent | Native blur. |
