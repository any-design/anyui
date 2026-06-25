# APagination

`APagination` navigates paged data. Bind a `pagination` object (`{ current, pageSize, total }`) with `v-model:pagination`, and listen to `change` to fetch the next page. `siblingCount` and `boundaryCount` control how many page numbers appear around the current page and at the edges.

## Import

```ts
import { Pagination } from '@any-design/anyui/vue';
// React:  import { Pagination } from '@any-design/anyui/react';
// Svelte: import { Pagination } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <APagination v-model:pagination="meta" @change="fetchPage" />
</template>

<script setup>
import { ref } from 'vue';
const meta = ref({ current: 1, pageSize: 20, total: 200 });
const fetchPage = (m) => console.log('fetch page', m.current);
</script>
```

## Examples

### More page numbers

Increase `siblingCount` to show more pages around the current one, and `boundaryCount` to show more at the start and end.

```vue
<template>
  <APagination v-model:pagination="meta" :sibling-count="2" :boundary-count="2" />
</template>

<script setup>
import { ref } from 'vue';
const meta = ref({ current: 5, pageSize: 10, total: 500 });
</script>
```

### Custom nav icons

Swap the prev/next arrow icons via `prevIcon` and `nextIcon` (any [Iconify](https://iconify.design/) name).

```vue
<template>
  <APagination
    v-model:pagination="meta"
    prev-icon="ri:arrow-left-s-line"
    next-icon="ri:arrow-right-s-line"
  />
</template>

<script setup>
import { ref } from 'vue';
const meta = ref({ current: 1, pageSize: 20, total: 100 });
</script>
```

### Selected indicator shape

The selected-page background can be a rounded rectangle (`rounded`, default), a squircle (`squircle`, a continuous superellipse close to iOS' rounded corners), or a full circle (`circle`). The indicator slides between pages with a spring transition.

```vue
<template>
  <APagination v-model:pagination="meta" shape="squircle" />
  <APagination v-model:pagination="meta" shape="circle" />
</template>

<script setup>
import { ref } from 'vue';
const meta = ref({ current: 3, pageSize: 10, total: 200 });
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pagination` | { current, pageSize, total } | undefined | Pagination metadata (`v-model:pagination`). |
| `siblingCount` | Number | 1 | Pages shown on each side of the current. |
| `boundaryCount` | Number | 1 | Pages shown at the start and end. |
| `prevIcon` | String \| IconifyIcon | 'uil:angle-left' | Previous button icon. |
| `nextIcon` | String \| IconifyIcon | 'uil:angle-right' | Next button icon. |
| `shape` | 'rounded' \| 'squircle' \| 'circle' | 'rounded' | Shape of the selected-page indicator background. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `change` | { current, pageSize, total } | Page changed. |
| `update:pagination` | meta | Pagination update. |
