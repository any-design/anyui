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
    <ASelect size="small" :items="items" placeholder="Small" />
    <ASelect :items="items" placeholder="Default" />
    <ASelect round :items="items" placeholder="Round" />
  </div>
</template>
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
  <ASelect :items="items" disabled placeholder="Disabled" />
</template>
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
