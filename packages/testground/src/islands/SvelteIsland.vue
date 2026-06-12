<template>
  <div ref="el" class="svelte-island"></div>
</template>

<script lang="ts" setup>
import { mount, unmount, type Component } from 'svelte';
import { onBeforeUnmount, onMounted, ref } from 'vue';

import type { DemoLoader } from '../registry';

const props = defineProps<{ loader: DemoLoader }>();

const el = ref<HTMLElement>();
let instance: Record<string, unknown> | null = null;
let disposed = false;

onMounted(async () => {
  const mod = await props.loader();
  if (disposed || !el.value) return;
  instance = mount(mod.default as Component, { target: el.value });
});

onBeforeUnmount(() => {
  disposed = true;
  if (instance) {
    const current = instance;
    instance = null;
    unmount(current);
  }
});
</script>
