# AListMenu

`AListMenu` is a selectable vertical menu. Pass a flat `menu` array of items, or an object keyed by section header for grouped menus. Bind the selected value with `v-model`. The package also registers `AListMenuItem`.

## Import

```ts
import { ListMenu } from '@any-design/anyui/vue';
// React:  import { ListMenu } from '@any-design/anyui/react';
// Svelte: import { ListMenu } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <div class="list-menu-preview">
    <AListMenu v-model="active" :menu="groups" selected-variant="solid" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const active = ref('profile');
const groups = {
  Account: [
    { label: 'Profile', value: 'profile' },
    { label: 'Security', value: 'security' },
  ],
  Preferences: [
    { label: 'Theme', value: 'theme' },
    { label: 'Language', value: 'language' },
  ],
};
</script>

<style scoped>
.list-menu-preview {
  max-width: 280px;
}
</style>
```

## Examples

### Grouped menu

Pass an object whose keys are section headers and values are item arrays.

```vue
<template>
  <AListMenu v-model="active" :menu="groups" />
</template>

<script setup>
import { ref } from 'vue';
const active = ref('profile');
const groups = {
  Account: [
    { label: 'Profile', value: 'profile' },
    { label: 'Security', value: 'security' },
  ],
  Preferences: [
    { label: 'Theme', value: 'theme' },
    { label: 'Language', value: 'language' },
  ],
};
</script>
```

### Plain string items

Items can be plain strings — their value defaults to the label.

```vue
<template>
  <AListMenu v-model="active" :menu="['Vue', 'React', 'Svelte']" />
</template>

<script setup>
import { ref } from 'vue';
const active = ref('Vue');
</script>
```

### Solid selected state

Use `selectedVariant="solid"` when the selected item should keep the gradient, filled, tactile style.

```vue
<template>
  <AListMenu v-model="active" :menu="groups" selected-variant="solid" />
</template>

<script setup>
import { ref } from 'vue';
const active = ref('profile');
const groups = {
  Account: [
    { label: 'Profile', value: 'profile' },
    { label: 'Security', value: 'security' },
  ],
};
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | String \| Number | undefined | Selected value (`v-model`). |
| `menu` | Array \| Object | undefined | Flat array of items, or a grouped object keyed by header. |
| `selectedVariant` | `'soft' \| 'solid'` | `'soft'` | Visual style for the selected item. Use `solid` for the gradient filled state. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | String \| Number | Selection change. |

## Notes

The package also registers `AListMenuItem` (exported as `ListMenuItem`).
