<template>
  <div ref="el" class="react-island"></div>
</template>

<script lang="ts" setup>
import { createElement, type ComponentType } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { onBeforeUnmount, onMounted, ref } from 'vue';

import type { DemoLoader } from '../registry';

const props = defineProps<{ loader: DemoLoader }>();

const el = ref<HTMLElement>();
let root: Root | null = null;
let disposed = false;

onMounted(async () => {
  const mod = await props.loader();
  if (disposed || !el.value) return;
  root = createRoot(el.value);
  root.render(createElement(mod.default as ComponentType));
});

onBeforeUnmount(() => {
  disposed = true;
  // detach asynchronously so React doesn't warn about unmounting during render
  const current = root;
  root = null;
  queueMicrotask(() => current?.unmount());
});
</script>
