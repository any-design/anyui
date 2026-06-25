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
  <div class="demo-col">
    <AButton type="primary" @click="loading = !loading">
      {{ loading ? 'Stop loading' : 'Start loading' }}
    </AButton>
    <ALoadingMask :loading="loading" text="Saving…">
      <ACard title="Settings">
        <AInput placeholder="Display name" />
      </ACard>
    </ALoadingMask>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(false);
</script>
```

## Examples

### Fullscreen

Set `fullscreen` to cover the entire viewport — useful for initial app load or blocking operations.

```vue
<template>
  <AButton @click="showFullscreen">Show fullscreen for 1.5s</AButton>
  <ALoadingMask :loading="loading" fullscreen text="Loading app…" />
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(false);
const showFullscreen = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1500);
};
</script>
```

### With a toggle

```vue
<template>
  <div class="demo-col">
    <AButton @click="run">Fetch data</AButton>
    <ALoadingMask :loading="loading">
      <div class="content">{{ result || 'No data yet' }}</div>
    </ALoadingMask>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(false);
const result = ref('');
const run = async () => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 900));
  result.value = 'Fetched 24 records';
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
