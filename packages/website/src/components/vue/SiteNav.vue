<template>
  <div class="site-header__nav-wrap" data-site-nav>
    <nav class="site-header__nav" aria-label="Primary navigation">
      <a
        v-for="item in navItems"
        :key="item.href"
        class="site-header__nav-link"
        :href="item.href"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noreferrer' : undefined"
        :aria-current="item.active && currentActive === item.active ? 'page' : undefined"
        @click="(event) => handleNavClick(event, item)"
      >
        <a-button
          class="site-header__nav-button"
          :class="{ 'site-header__nav-button--active': item.active && currentActive === item.active }"
          size="small"
          round
          :icon="item.icon"
        >
          {{ item.label }}
        </a-button>
      </a>
    </nav>

    <div class="site-header__actions" aria-label="Site preferences">
      <a-button
        class="site-header__action-button"
        :class="{ 'site-header__action-button--active': dark }"
        size="small"
        round
        :icon="dark ? 'ph:moon-bold' : 'ph:sun-bold'"
        role="button"
        tabindex="0"
        :aria-pressed="dark"
        @click="toggleDark"
        @keydown.enter.prevent="toggleDark"
        @keydown.space.prevent="toggleDark"
      >
        {{ dark ? 'Dark' : 'Light' }}
      </a-button>
      <a-button
        class="site-header__action-button"
        :class="{ 'site-header__action-button--active': glass }"
        size="small"
        round
        icon="ph:drop-bold"
        role="button"
        tabindex="0"
        :aria-pressed="glass"
        @click="toggleGlass"
        @keydown.enter.prevent="toggleGlass"
        @keydown.space.prevent="toggleGlass"
      >
        Glass
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { navigate } from 'astro:transitions/client';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

interface NavItem {
  label: string;
  href: string;
  active?: string;
  external?: boolean;
  icon?: string;
}

const props = defineProps<{
  active?: string;
}>();

const navItems: NavItem[] = [
  { label: 'Docs', href: '/docs/getting-started', active: 'docs', icon: 'ri:book-open-line' },
  { label: 'Components', href: '/components', active: 'components', icon: 'ri:shapes-line' },
  { label: 'Testground', href: 'https://anyui-testground.pwp.sh', external: true, icon: 'ri:flask-line' },
  { label: 'GitHub', href: 'https://github.com/any-design/anyui', external: true, icon: 'mdi:github' },
];

const STORAGE_KEY = 'anyui-site-prefs';
const currentActive = ref(props.active ?? '');
const dark = ref(false);
const glass = ref(false);

watch(
  () => props.active,
  (value) => {
    currentActive.value = value ?? '';
  },
);

const readPrefs = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Record<string, unknown>;
  } catch {
    return {};
  }
};

const writePrefs = (next: Record<string, unknown>) => {
  const prefs = { ...readPrefs(), ...next };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
};

const applyPrefs = (nextDark: boolean, nextGlass: boolean) => {
  const html = document.documentElement;
  html.setAttribute('theme', nextDark ? 'dark' : 'light');
  if (nextGlass) {
    html.setAttribute('data-anyui-style', 'glass');
  } else {
    html.removeAttribute('data-anyui-style');
  }
};

const syncPrefs = () => {
  const prefs = readPrefs();
  dark.value = document.documentElement.getAttribute('theme') === 'dark' || prefs.dark === true;
  glass.value =
    document.documentElement.getAttribute('data-anyui-style') === 'glass' || prefs.glass === true;
  applyPrefs(dark.value, glass.value);
};

const activeFromPath = (path: string) => {
  if (path.startsWith('/docs')) {
    return 'docs';
  }
  if (path.startsWith('/components')) {
    return 'components';
  }
  return '';
};

const syncActive = () => {
  currentActive.value = activeFromPath(window.location.pathname);
};

const isPlainLeftClick = (event: MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

const handleNavClick = (event: MouseEvent, item: NavItem) => {
  if (item.external || !isPlainLeftClick(event)) {
    return;
  }
  event.preventDefault();
  currentActive.value = item.active ?? '';
  navigate(item.href);
};

const toggleDark = () => {
  dark.value = !dark.value;
  applyPrefs(dark.value, glass.value);
  writePrefs({ dark: dark.value });
};

const toggleGlass = () => {
  glass.value = !glass.value;
  applyPrefs(dark.value, glass.value);
  writePrefs({ glass: glass.value });
};

onMounted(() => {
  syncPrefs();
  syncActive();
  document.addEventListener('astro:page-load', syncActive);
  document.addEventListener('astro:after-swap', syncPrefs);
});

onBeforeUnmount(() => {
  document.removeEventListener('astro:page-load', syncActive);
  document.removeEventListener('astro:after-swap', syncPrefs);
});
</script>
