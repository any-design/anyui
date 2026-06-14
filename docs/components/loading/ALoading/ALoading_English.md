# ALoading

`ALoading` renders four bouncing dots — a lightweight, purely presentational loading indicator. It takes no props; just drop it inline wherever you need a small "working…" signal.

## Import

```ts
import { Loading } from '@any-design/anyui/vue';
// React:  import { Loading } from '@any-design/anyui/react';
// Svelte: import { Loading } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <ALoading />
</template>
```

## Examples

### Inline inside a button

A common pattern: show the dots inside a button while an async action runs.

```vue
<template>
  <AButton type="primary" :disabled="saving">
    <ALoading v-if="saving" />
    <span v-else>Save</span>
  </AButton>
</template>

<script setup>
import { ref } from 'vue';
const saving = ref(false);
</script>
```

### Centered in a region

Wrap it in a flex container to center it over content that hasn't loaded yet.

```vue
<template>
  <div class="loading-wrap">
    <ALoading />
  </div>
</template>

<style scoped>
.loading-wrap { display: flex; justify-content: center; padding: 40px; }
</style>
```

## Props

_This component has no configurable props._

## Notes

No props — purely presentational. Use inside a button or inline where you need a tiny indicator.
