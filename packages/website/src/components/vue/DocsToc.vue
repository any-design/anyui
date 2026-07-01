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
let scrollRaf = 0;
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
  if (scrollRaf) {
    cancelAnimationFrame(scrollRaf);
    scrollRaf = 0;
  }
  document.body.removeEventListener('scroll', onScroll);
};

const setActiveFromHash = () => {
  const slug = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  if (slug && normalizedHeadings.value.some((heading) => heading.slug === slug)) {
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
  // line. This naturally highlights each heading in order as it scrolls past,
  // so several headings sharing one screenful advance one-by-one instead of
  // jumping.
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

const syncInitialActive = () => {
  if (setActiveFromHash()) {
    return;
  }
  computeActive();
};

const setupObserver = async () => {
  disconnectObserver();
  await nextTick();

  if (normalizedHeadings.value.length === 0) {
    currentActive.value = undefined;
    return;
  }

  syncInitialActive();
  // body is the scroll container (see comment above); listen there.
  document.body.addEventListener('scroll', onScroll, { passive: true });
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
