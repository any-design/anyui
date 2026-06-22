<template>
  <nav class="components-sidebar">
    <a-list-menu :menu="menu" :model-value="currentActive" @update:model-value="handleSelect" />
  </nav>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { navigate } from 'astro:transitions/client';

interface SidebarItem {
  name: string;
  slug: string;
}
interface SidebarGroup {
  category: { label: { en: string; zh?: string } };
  items: SidebarItem[];
}

const props = defineProps({
  active: {
    type: String,
    default: '',
  },
  groups: {
    type: Array as PropType<SidebarGroup[]>,
    default: () => [],
  },
});

const activeFromPath = (path: string) => {
  const normalized = path.replace(/\/$/, '');
  if (normalized === '/components') {
    return 'overview';
  }
  const match = normalized.match(/^\/components\/([^/]+)$/);
  return match?.[1] ?? props.active;
};

const currentActive = ref(props.active);

watch(
  () => props.active,
  (value) => {
    currentActive.value = value;
  },
);

const syncActiveFromLocation = () => {
  currentActive.value = activeFromPath(window.location.pathname);
};

onMounted(() => {
  syncActiveFromLocation();
  document.addEventListener('astro:page-load', syncActiveFromLocation);
});

onBeforeUnmount(() => {
  document.removeEventListener('astro:page-load', syncActiveFromLocation);
});

// AListMenu accepts a Record<groupName, items[]>. The empty Overview group
// renders as a bare top item because AListMenu skips empty split labels.
const menu = computed(() => {
  const map: Record<string, { label: string; value: string }[]> = {
    '': [{ label: 'Overview', value: 'overview' }],
  };
  props.groups.forEach((g) => {
    map[g.category.label.en] = g.items.map((it) => ({ label: it.name, value: it.slug }));
  });
  return map;
});

const handleSelect = (value: string | number | undefined) => {
  const v = typeof value === 'string' ? value : '';
  currentActive.value = v || 'overview';
  // 'overview' → the index page; otherwise → the component detail page
  navigate(v === 'overview' ? '/components' : `/components/${v}`);
};
</script>
