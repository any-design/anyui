<template>
  <nav ref="sidebarRef" class="components-sidebar" @scroll.passive="saveScrollTop">
    <a-list-menu :menu="menu" :model-value="currentActive" @update:model-value="handleSelect" />
  </nav>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { navigate } from 'astro:transitions/client';
import { t } from '../../i18n/lang';
import { useSiteLang } from './useSiteLang';

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
const { currentLang } = useSiteLang();
const sidebarRef = ref<HTMLElement>();
const SCROLL_STORAGE_KEY = 'anyui-components-sidebar-scroll-top';

watch(
  () => props.active,
  (value) => {
    currentActive.value = value;
  },
);

const syncActiveFromLocation = () => {
  currentActive.value = activeFromPath(window.location.pathname);
};

const saveScrollTop = () => {
  const top = sidebarRef.value?.scrollTop ?? 0;
  try {
    sessionStorage.setItem(SCROLL_STORAGE_KEY, String(top));
  } catch {
    // ignore
  }
};

const restoreScrollTop = () => {
  requestAnimationFrame(() => {
    const sidebar = sidebarRef.value;
    if (!sidebar) {
      return;
    }
    try {
      const top = Number(sessionStorage.getItem(SCROLL_STORAGE_KEY) || 0);
      if (Number.isFinite(top)) {
        sidebar.scrollTop = top;
      }
    } catch {
      // ignore
    }
  });
};

onMounted(() => {
  syncActiveFromLocation();
  restoreScrollTop();
  document.addEventListener('astro:before-preparation', saveScrollTop);
  document.addEventListener('astro:page-load', syncActiveFromLocation);
  document.addEventListener('astro:page-load', restoreScrollTop);
});

onBeforeUnmount(() => {
  saveScrollTop();
  document.removeEventListener('astro:before-preparation', saveScrollTop);
  document.removeEventListener('astro:page-load', syncActiveFromLocation);
  document.removeEventListener('astro:page-load', restoreScrollTop);
});

// AListMenu accepts a Record<groupName, items[]>. The empty Overview group
// renders as a bare top item because AListMenu skips empty split labels.
const menu = computed(() => {
  const map: Record<string, { label: string; value: string }[]> = {
    '': [{ label: t(currentLang.value, 'components.overview'), value: 'overview' }],
  };
  props.groups.forEach((g) => {
    map[g.category.label[currentLang.value] ?? g.category.label.en] = g.items.map((it) => ({
      label: it.name,
      value: it.slug,
    }));
  });
  return map;
});

const handleSelect = (value: string | number | undefined) => {
  const v = typeof value === 'string' ? value : '';
  currentActive.value = v || 'overview';
  saveScrollTop();
  // 'overview' → the index page; otherwise → the component detail page
  navigate(v === 'overview' ? '/components' : `/components/${v}`);
};
</script>
