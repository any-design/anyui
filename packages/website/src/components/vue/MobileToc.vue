<template>
  <details v-if="resolvedHeadings.length > 0" class="mobile-toc" :open="open">
    <summary class="mobile-toc__head" @click.prevent="toggle">
      <span class="mobile-toc__title">On this page</span>
      <span class="mobile-toc__chevron" :class="{ 'mobile-toc__chevron--open': open }" aria-hidden="true">▾</span>
    </summary>
    <div class="mobile-toc__body">
      <a-list-menu
        class="mobile-toc__menu"
        :menu="menu"
        :model-value="currentActive"
        @update:model-value="handleSelect"
      />
    </div>
  </details>
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
const open = ref(false);
let scrollRaf = 0;
let isProgrammaticScroll = false;
let scrollTimer: number | undefined;

const normalizedHeadings = computed(() =>
  (props.auto ? localHeadings.value : props.headings ?? []).filter(
    (h) => h.depth >= 2 && h.depth <= 3 && h.slug && h.text,
  ),
);

const resolvedHeadings = computed(() => normalizedHeadings.value);

const menu = computed(() =>
  normalizedHeadings.value.map((h) => ({
    label: h.text,
    value: h.slug,
    className: `mobile-toc__item mobile-toc__item--depth-${h.depth}`,
  })),
);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');

const scanHeadings = () => {
  if (!props.auto) return;
  const lang = document.documentElement.dataset.lang || 'en';
  localHeadings.value = Array.from(document.querySelectorAll<HTMLElement>('.prose h2, .prose h3'))
    .filter((heading) => {
      const pane = heading.closest<HTMLElement>('.localized-doc__pane');
      return !pane || pane.dataset.lang === lang;
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
  if (scrollRaf) {
    cancelAnimationFrame(scrollRaf);
    scrollRaf = 0;
  }
  document.body.removeEventListener('scroll', onScroll);
};

const setActiveFromHash = () => {
  const slug = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  if (slug && normalizedHeadings.value.some((h) => h.slug === slug)) {
    currentActive.value = slug;
    return true;
  }
  return false;
};

// Scroll-based scrollspy: the active heading is the last one whose top sits
// above a trigger line. Near the bottom of the scroll container we ease that
// trigger line down through the final viewport, so final headings that share
// one screenful still become active in scroll order instead of jumping straight
// to the last one.
//
// AnyUI's layout.scss makes <body> the scroll container (height:100vh,
// overflow-y:auto), so we read scroll position from document.body, not window.
const TOP_OFFSET = 96;

const getTriggerOffset = (scroller: HTMLElement, scrollTop: number) => {
  const maxScroll = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
  if (maxScroll === 0) {
    return TOP_OFFSET;
  }

  const bottomRange = Math.min(scroller.clientHeight, maxScroll);
  if (bottomRange <= 0) {
    return TOP_OFFSET;
  }

  const bottomStart = maxScroll - bottomRange;
  const bottomProgress = Math.min(Math.max((scrollTop - bottomStart) / bottomRange, 0), 1);
  const bottomOffset = Math.max(TOP_OFFSET, scroller.clientHeight);
  return TOP_OFFSET + (bottomOffset - TOP_OFFSET) * bottomProgress;
};

const computeActive = () => {
  const headings = normalizedHeadings.value;
  if (headings.length === 0) {
    currentActive.value = undefined;
    return;
  }
  const scroller = document.body;
  const scrollTop = scroller.scrollTop;
  const trigger = scrollTop + getTriggerOffset(scroller, scrollTop);
  // Walk the headings and pick the last one whose top has crossed the trigger
  // line, so several headings sharing one screenful advance one-by-one.
  let active = headings[0].slug;
  for (const heading of headings) {
    const el = document.getElementById(heading.slug);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + scrollTop;
    if (top <= trigger) {
      active = heading.slug;
    } else {
      break;
    }
  }
  currentActive.value = active;
};

const onScroll = () => {
  if (isProgrammaticScroll) return;
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0;
    computeActive();
  });
};

const setupObserver = async () => {
  disconnectObserver();
  await nextTick();
  if (normalizedHeadings.value.length === 0) {
    currentActive.value = undefined;
    return;
  }
  if (!setActiveFromHash()) {
    computeActive();
  }
  // body is the scroll container (see comment above); listen there.
  document.body.addEventListener('scroll', onScroll, { passive: true });
};

const handleSelect = (value: string | number | undefined) => {
  if (typeof value !== 'string') return;
  const target = document.getElementById(value);
  if (!target) return;
  currentActive.value = value;
  open.value = false;
  isProgrammaticScroll = true;
  window.clearTimeout(scrollTimer);
  history.pushState(null, '', `#${encodeURIComponent(value)}`);
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  scrollTimer = window.setTimeout(() => {
    isProgrammaticScroll = false;
  }, 700);
};

const toggle = () => {
  open.value = !open.value;
};

const handleHashChange = () => setActiveFromHash();

const handleLanguageApplied = () => {
  scanHeadings();
  setupObserver();
};

watch(normalizedHeadings, setupObserver, { deep: true });

onMounted(() => {
  scanHeadings();
  if (!props.auto) setupObserver();
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
