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
  <AListMenu v-model="active" :menu="items" />
</template>

<script setup>
import { ref } from 'vue';
const active = ref('inbox');
const items = [
  { label: 'Inbox', value: 'inbox' },
  { label: 'Sent', value: 'sent' },
  { label: 'Drafts', value: 'drafts' },
];
</script>
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | String | undefined | Selected value (`v-model`). |
| `menu` | Array \| Object | undefined | Flat array of items, or a grouped object keyed by header. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | String | Selection change. |

## Notes

The package also registers `AListMenuItem` (exported as `ListMenuItem`).
