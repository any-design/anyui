<template>
  <nav ref="sidebar" class="components-sidebar" aria-label="Components">
    <NavLinks
      :groups="links"
      :initial-path="active === 'overview' ? '/components' : `/components/${active}`"
    />
  </nav>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import NavLinks from './NavLinks.vue';
const props = defineProps<{
  active?: string;
  groups: {
    category: { label: { en: string; zh?: string } };
    items: { name: string; slug: string }[];
  }[];
}>();
const sidebar = ref<HTMLElement>();
const links = computed(() => [
  { label: '', items: [{ label: { en: 'Overview', zh: '概览' }, href: '/components' }] },
  ...props.groups.map((group) => ({
    label: group.category.label,
    items: group.items.map((item) => ({
      label: item.name,
      href: `/components/${item.slug}`,
    })),
  })),
]);
const key = 'anyui-components-sidebar-scroll-top';
const save = () => {
  try {
    sessionStorage.setItem(key, String(sidebar.value?.scrollTop || 0));
  } catch {}
};
const restore = () => {
  try {
    if (sidebar.value) sidebar.value.scrollTop = Number(sessionStorage.getItem(key)) || 0;
  } catch {}
};
onMounted(() => {
  restore();
  document.addEventListener('astro:before-preparation', save);
  document.addEventListener('astro:page-load', restore);
});
onBeforeUnmount(() => {
  save();
  document.removeEventListener('astro:before-preparation', save);
  document.removeEventListener('astro:page-load', restore);
});
</script>
