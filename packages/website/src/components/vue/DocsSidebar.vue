<template>
  <nav class="docs-menu" aria-label="Documentation">
    <NavLinks :groups="groups || []" :initial-path="`/docs/${active}`" />
  </nav>
</template>

<script setup lang="ts">
import NavLinks from './NavLinks.vue';
defineProps<{
  active?: string;
  groups?: {
    label: string | { en: string; zh?: string };
    items: { id: string; label: string | { en: string; zh?: string }; href: string }[];
  }[];
}>();
</script>
