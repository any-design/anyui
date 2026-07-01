<template>
  <div class="site-header__nav-wrap" data-site-nav>
    <nav class="site-header__nav" aria-label="Primary navigation">
      <a
        v-for="item in navItems"
        :key="item.href"
        class="site-header__nav-link"
        :class="{ 'site-header__nav-link--mobile-hidden': item.mobileHidden }"
        :href="item.href"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noreferrer' : undefined"
        :data-astro-reload="item.reload ? true : undefined"
        :aria-current="item.active && currentActive === item.active ? 'page' : undefined"
        @click="(event) => handleNavClick(event, item)"
      >
        <a-button
          class="site-header__nav-button"
          :class="{ 'site-header__nav-button--active': item.active && currentActive === item.active }"
          size="small"
          round
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
        :title="dark ? 'Switch to light theme' : 'Switch to dark theme'"
        :aria-label="dark ? 'Switch to light theme' : 'Switch to dark theme'"
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
        :icon="glass ? 'ph:drop-bold' : 'ph:square-half-bold'"
        :title="glass ? 'Use solid surfaces' : 'Use glass surfaces'"
        :aria-label="glass ? 'Use solid surfaces' : 'Use glass surfaces'"
        role="button"
        tabindex="0"
        :aria-pressed="glass"
        @click="toggleGlass"
        @keydown.enter.prevent="toggleGlass"
        @keydown.space.prevent="toggleGlass"
      >
        {{ glass ? 'Glass' : 'Solid' }}
      </a-button>
      <a-button
        v-if="shouldRenderMobileMenu"
        class="site-header__menu-button"
        size="small"
        round
        icon="ph:list-bold"
        title="Open menu"
        aria-label="Open menu"
        role="button"
        tabindex="0"
        @click="openMobileNav"
        @keydown.enter.prevent="openMobileNav"
        @keydown.space.prevent="openMobileNav"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { navigate } from 'astro:transitions/client';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useSitePrefs } from './useSitePrefs';

interface NavItem {
  label: string;
  href: string;
  active?: string;
  external?: boolean;
  reload?: boolean;
  mobileHidden?: boolean;
}

const props = defineProps<{
  active?: string;
}>();

const navItems: NavItem[] = [
  { label: 'Docs', href: '/docs/getting-started', active: 'docs' },
  { label: 'Components', href: '/components', active: 'components' },
  { label: 'Testground', href: '/testground/', active: 'testground', reload: true, mobileHidden: true },
  { label: 'GitHub', href: 'https://github.com/any-design/anyui', external: true, mobileHidden: true },
];

const currentActive = ref(props.active ?? '');
const hasMobileMenu = ref(false);
const isMobileNavViewport = ref(false);
const { dark, glass, toggleDark, toggleGlass, syncPrefs } = useSitePrefs();
const shouldRenderMobileMenu = computed(() => hasMobileMenu.value && isMobileNavViewport.value);
const MOBILE_NAV_MEDIA_QUERY = '(max-width: 840px)';
let mobileNavMediaQuery: MediaQueryList | undefined;

watch(
  () => props.active,
  (value) => {
    currentActive.value = value ?? '';
  },
);

const activeFromPath = (path: string) => {
  if (path.startsWith('/docs')) {
    return 'docs';
  }
  if (path.startsWith('/components')) {
    return 'components';
  }
  if (path.startsWith('/testground')) {
    return 'testground';
  }
  return '';
};

// The mobile menu button (which opens the page listMenu drawer) only makes
// sense on pages that actually have a listMenu — docs and components pages.
// Derive it from the URL so it stays correct across SPA navigations even
// though the SiteNav island is persisted.
const pageHasMenu = (path: string) =>
  path.startsWith('/docs') || path.startsWith('/components');

const syncActive = () => {
  currentActive.value = activeFromPath(window.location.pathname);
  hasMobileMenu.value = pageHasMenu(window.location.pathname);
};

const syncMobileNavViewport = () => {
  isMobileNavViewport.value = Boolean(mobileNavMediaQuery?.matches);
};

const isPlainLeftClick = (event: MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

const handleNavClick = (event: MouseEvent, item: NavItem) => {
  if (item.external || item.reload || !isPlainLeftClick(event)) {
    return;
  }
  event.preventDefault();
  currentActive.value = item.active ?? '';
  navigate(item.href);
};

const openMobileNav = () => {
  window.dispatchEvent(new CustomEvent('anyui:open-mobile-nav'));
};

onMounted(() => {
  mobileNavMediaQuery = window.matchMedia(MOBILE_NAV_MEDIA_QUERY);
  syncMobileNavViewport();
  mobileNavMediaQuery.addEventListener('change', syncMobileNavViewport);
  syncPrefs();
  syncActive();
  document.addEventListener('astro:page-load', syncActive);
});

onBeforeUnmount(() => {
  mobileNavMediaQuery?.removeEventListener('change', syncMobileNavViewport);
  document.removeEventListener('astro:page-load', syncActive);
});
</script>
