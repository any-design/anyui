<template>
  <nav class="components-sidebar">
    <a-list-menu :menu="menu" :model-value="active" @update:model-value="handleSelect" />
  </nav>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed } from 'vue';
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
  // 'overview' → the index page; otherwise → the component detail page
  navigate(v === 'overview' ? '/components' : `/components/${v}`);
};
</script>
