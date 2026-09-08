<template>
  <div class="docs-links">
    <div v-for="(group, index) in groups" :key="index" class="docs-links__group">
      <div v-if="label(group.label)" class="docs-links__label">{{ label(group.label) }}</div>
      <a
        v-for="item in group.items"
        :key="item.href"
        :href="item.href"
        class="docs-links__link"
        :aria-current="path === item.href.replace(/\/$/, '') ? 'page' : undefined"
        @click="emit('navigate')"
      >
        {{ label(item.label) }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useSiteLang } from './useSiteLang';
type Label = string | { en: string; zh?: string };
const props = defineProps<{
  groups: { label: Label; items: { label: Label; href: string }[] }[];
  initialPath?: string;
}>();
const emit = defineEmits<{ navigate: [] }>();
const { currentLang } = useSiteLang();
const label = (value: Label) =>
  typeof value === 'string' ? value : value[currentLang.value] || value.en;
const path = ref(props.initialPath?.replace(/\/$/, '') || '');
const sync = () => {
  path.value = window.location.pathname.replace(/\/$/, '');
};
onMounted(() => {
  sync();
  document.addEventListener('astro:page-load', sync);
});
onBeforeUnmount(() => document.removeEventListener('astro:page-load', sync));
</script>
