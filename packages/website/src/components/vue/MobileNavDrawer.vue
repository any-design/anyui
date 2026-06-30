<template>
  <a-drawer
    v-model="visible"
    class="mobile-nav-drawer"
    body-class="mobile-nav-drawer__body"
    position="right"
    width="320px"
    :with-mask="true"
    :z-index="200"
    append-to-body
  >
    <div class="mobile-nav-drawer__inner">
      <div v-if="menu && hasMenu" class="mobile-nav-drawer__section mobile-nav-drawer__section--menu">
        <div class="mobile-nav-drawer__section-title">{{ menuTitle }}</div>
        <a-list-menu
          class="mobile-nav-drawer__menu"
          :menu="menu"
          :model-value="resolvedMenuActive"
          @update:model-value="handleMenuSelect"
        />
      </div>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { navigate } from 'astro:transitions/client';
import { useSiteLang } from './useSiteLang';

type LocalizedLabel = string | { en: string; zh?: string };

interface MenuGroupItem {
  label: LocalizedLabel;
  value: string;
  href?: string;
}
interface MenuGroup {
  label: LocalizedLabel;
  items: MenuGroupItem[];
}

const props = defineProps<{
  active?: string;
  menuGroups?: MenuGroup[];
  menuActive?: string;
  menuTitle?: string;
  menuKind?: 'docs' | 'components';
}>();

const visible = ref(false);
const localMenuActive = ref(props.menuActive ?? '');
const { currentLang } = useSiteLang();

watch(
  () => props.menuActive,
  (value) => {
    localMenuActive.value = value ?? '';
  },
);

const labelText = (label: LocalizedLabel) =>
  typeof label === 'string' ? label : label[currentLang.value] ?? label.en;

const menu = computed(() => {
  if (!props.menuGroups || props.menuGroups.length === 0) return null;
  const map: Record<string, { label: string; value: string }[]> = {};
  for (const group of props.menuGroups) {
    const key = labelText(group.label);
    map[key] = group.items.map((item) => ({
      label: labelText(item.label),
      value: item.value,
    }));
  }
  return map;
});

const hasMenu = computed(() => Boolean(menu.value && Object.keys(menu.value).length > 0));

const menuTitle = computed(() => props.menuTitle ?? (props.menuKind === 'components' ? 'Components' : 'Docs'));

const hrefByValue = computed(() => {
  const map: Record<string, string> = {};
  if (props.menuGroups) {
    for (const group of props.menuGroups) {
      for (const item of group.items) {
        if (item.href && item.value) {
          map[item.value] = item.href;
        }
      }
    }
  }
  return map;
});

const valueByHref = computed(() => {
  const map: Record<string, string> = {};
  for (const [value, href] of Object.entries(hrefByValue.value)) {
    map[href.replace(/\/$/, '')] = value;
  }
  return map;
});

const resolvedMenuActive = computed(() => localMenuActive.value);

const menuActiveFromPath = (path: string) => {
  const normalized = path.replace(/\/$/, '');
  if (valueByHref.value[normalized]) return valueByHref.value[normalized];
  if (normalized === '/components') return 'overview';
  return '';
};

const syncMenuActive = () => {
  const fromPath = menuActiveFromPath(window.location.pathname);
  if (fromPath) localMenuActive.value = fromPath;
};

const handleMenuSelect = (value: string | number | undefined) => {
  if (typeof value !== 'string') return;
  const href = hrefByValue.value[value];
  if (href) {
    localMenuActive.value = value;
    visible.value = false;
    navigate(href);
  }
};

const open = () => {
  visible.value = true;
};

onMounted(() => {
  syncMenuActive();
  document.addEventListener('astro:page-load', syncMenuActive);
  window.addEventListener('anyui:open-mobile-nav', open);
});

onBeforeUnmount(() => {
  document.removeEventListener('astro:page-load', syncMenuActive);
  window.removeEventListener('anyui:open-mobile-nav', open);
});
</script>