<template>
  <nav class="docs-menu">
    <a-list-menu :menu="menu" :model-value="active" @update:model-value="handleSelect" />
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
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

const menu = computed(() =>
  Object.fromEntries((props.groups ?? []).map((group) => [
    group.label,
    group.items.map((item) => ({ label: item.label, value: item.id })),
  ])),
);

const hrefs = computed(() => hrefById(props.groups ?? []));

const handleSelect = (value: string | number | undefined) => {
  if (typeof value !== 'string') {
    return;
  }
  const href = hrefs.value[value];
  if (href) {
    navigate(href);
  }
};
</script>
