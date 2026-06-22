<template>
  <nav class="docs-menu">
    <a-list-menu :menu="menu" :model-value="currentActive" @update:model-value="handleSelect" />
  </nav>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { navigate } from 'astro:transitions/client';

interface DocsMenuItem {
  id: string;
  label: string;
  href: string;
}

interface DocsMenuGroup {
  label: string;
  items: DocsMenuItem[];
}

const hrefById = (groups: DocsMenuGroup[]) =>
  groups.reduce<Record<string, string>>((map, group) => {
    group.items.forEach((item) => {
      map[item.id] = item.href;
    });
    return map;
  }, {});

const props = defineProps<{
  active?: string;
  groups?: DocsMenuGroup[];
}>();

const activeFromPath = (groups: DocsMenuGroup[], path: string) => {
  const normalized = path.replace(/\/$/, '');
  for (const group of groups) {
    const match = group.items.find((item) => item.href.replace(/\/$/, '') === normalized);
    if (match) {
      return match.id;
    }
  }
  return props.active;
};

const currentActive = ref(props.active);

watch(
  () => props.active,
  (value) => {
    currentActive.value = value;
  },
);

const menu = computed(() =>
  Object.fromEntries((props.groups ?? []).map((group) => [
    group.label,
    group.items.map((item) => ({ label: item.label, value: item.id })),
  ])),
);

const hrefs = computed(() => hrefById(props.groups ?? []));

const syncActiveFromLocation = () => {
  currentActive.value = activeFromPath(props.groups ?? [], window.location.pathname);
};

onMounted(() => {
  syncActiveFromLocation();
  document.addEventListener('astro:page-load', syncActiveFromLocation);
});

onBeforeUnmount(() => {
  document.removeEventListener('astro:page-load', syncActiveFromLocation);
});

const handleSelect = (value: string | number | undefined) => {
  if (typeof value !== 'string') {
    return;
  }
  currentActive.value = value;
  const href = hrefs.value[value];
  if (href) {
    navigate(href);
  }
};
</script>
