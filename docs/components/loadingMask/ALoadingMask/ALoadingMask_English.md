# ALoadingMask

`ALoadingMask` overlays a translucent loading state on top of its content. Toggle the `loading` prop to show a spinner (and optional `text`) while keeping the underlying content visible but non-interactive.

## Import

```ts
import { LoadingMask } from '@any-design/anyui/vue';
// React:  import { LoadingMask } from '@any-design/anyui/react';
// Svelte: import { LoadingMask } from '@any-design/anyui/svelte';
```

## Basic usage

Wrap any content; flip `loading` to overlay the mask.

```vue
<template>
  <ALoadingMask :loading="loading" text="Saving…">
    <ACard title="Settings">
      <AInput placeholder="Display name" />
    </ACard>
  </ALoadingMask>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
```

## Examples

### Fullscreen

Set `fullscreen` to cover the entire viewport — useful for initial app load or blocking operations.

```vue
<template>
  <ALoadingMask :loading="loading" fullscreen text="Loading app…" />
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
```

### With a toggle

```vue
<template>
  <AButton @click="run">Fetch data</AButton>
  <ALoadingMask :loading="loading">
    <div class="content">{{ result || 'No data yet' }}</div>
  </ALoadingMask>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(false);
const result = ref('');
const run = async () => {
  loading.value = true;
  result.value = await fetch('/api/data').then((r) => r.text());
  loading.value = false;
};
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `loading` | Boolean | false | Whether the mask is shown. |
| `text` | String | '' | Optional text under the spinner. |
| `fullscreen` | Boolean | false | Cover the whole viewport. |
| `zIndex` | Number | 2000 | z-index of the mask. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | The content to overlay. |
