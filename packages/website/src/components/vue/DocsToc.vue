<template>
  <aside class="toc" data-toc>
    <div class="toc__title">On this page</div>
    <a-list-menu
      class="toc__menu"
      :menu="menu"
      :model-value="currentActive"
      @update:model-value="handleSelect"
    />
  </aside>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

const props = defineProps<{
  headings?: TocHeading[];
  auto?: boolean;
}>();

const localHeadings = ref<TocHeading[]>([]);
const currentActive = ref<string>();
let observer: IntersectionObserver | undefined;
let isProgrammaticScroll = false;
let scrollTimer: number | undefined;

const normalizedHeadings = computed(() =>
  (props.auto ? localHeadings.value : props.headings ?? []).filter(
    (heading) => heading.depth >= 2 && heading.depth <= 3 && heading.slug && heading.text,
  ),
);

const menu = computed(() =>
  normalizedHeadings.value.map((heading) => ({
    label: heading.text,
    value: heading.slug,
    className: `toc__item toc__item--depth-${heading.depth}`,
  })),
);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');

const scanHeadings = () => {
  if (!props.auto) {
    return;
  }
  const currentLang = document.documentElement.dataset.lang || 'en';
  localHeadings.value = Array.from(document.querySelectorAll<HTMLElement>('.prose h2, .prose h3'))
    .filter((heading) => {
      const pane = heading.closest<HTMLElement>('.localized-doc__pane');
      return !pane || pane.dataset.lang === currentLang;
    })
    .map((heading, index) => {
      heading.id = slugify(heading.textContent || '') || `section-${index + 1}`;
      return {
        depth: heading.tagName.toLowerCase() === 'h2' ? 2 : 3,
        slug: heading.id,
        text: heading.textContent || '',
      };
    });
};

const disconnectObserver = () => {
  observer?.disconnect();
  observer = undefined;
};

const setActiveFromHash = () => {
  const slug = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  if (slug && normalizedHeadings.value.some((heading) => heading.slug === slug)) {
    currentActive.value = slug;
    return true;
  }
  return false;
};

const syncInitialActive = () => {
  if (setActiveFromHash()) {
    return;
  }
  currentActive.value = normalizedHeadings.value[0]?.slug;
};

const setupObserver = async () => {
  disconnectObserver();
  await nextTick();

  const targets = normalizedHeadings.value
    .map((heading) => document.getElementById(heading.slug))
    .filter((target): target is HTMLElement => Boolean(target));

  if (targets.length === 0) {
    currentActive.value = undefined;
    return;
  }

  syncInitialActive();

  observer = new IntersectionObserver(
    (entries) => {
      if (isProgrammaticScroll) {
        return;
      }
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]?.target.id) {
        currentActive.value = visible[0].target.id;
      }
    },
    {
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0,
    },
  );

  targets.forEach((target) => observer?.observe(target));
};

const handleSelect = (value: string | number | undefined) => {
  if (typeof value !== 'string') {
    return;
  }
  const target = document.getElementById(value);
  if (!target) {
    return;
  }

  currentActive.value = value;
  isProgrammaticScroll = true;
  window.clearTimeout(scrollTimer);
  history.pushState(null, '', `#${encodeURIComponent(value)}`);
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  scrollTimer = window.setTimeout(() => {
    isProgrammaticScroll = false;
  }, 700);
};

const handleHashChange = () => {
  setActiveFromHash();
};

const handleLanguageApplied = () => {
  scanHeadings();
  setupObserver();
};

watch(normalizedHeadings, setupObserver, { deep: true });

onMounted(() => {
  scanHeadings();
  if (!props.auto) {
    setupObserver();
  }
  window.addEventListener('hashchange', handleHashChange);
  window.addEventListener('anyui:lang-applied', handleLanguageApplied);
});

onBeforeUnmount(() => {
  window.clearTimeout(scrollTimer);
  window.removeEventListener('hashchange', handleHashChange);
  window.removeEventListener('anyui:lang-applied', handleLanguageApplied);
  disconnectObserver();
});
</script>
