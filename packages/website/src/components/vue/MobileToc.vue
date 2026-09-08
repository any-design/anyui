<template>
  <details
    v-if="headings.length"
    class="mobile-toc"
    :open="open"
    @toggle="open = ($event.target as HTMLDetailsElement).open"
  >
    <summary class="mobile-toc__head">
      <span class="mobile-toc__title">{{ title }}</span>
      <span
        class="mobile-toc__chevron"
        :class="{ 'mobile-toc__chevron--open': open }"
        aria-hidden="true"
        >▾</span
      >
    </summary>
    <nav class="mobile-toc__body" :aria-label="title">
      <a
        v-for="heading in headings"
        :key="heading.slug"
        class="toc__link"
        :class="{ 'toc__link--nested': heading.depth === 3 }"
        :href="`#${encodeURIComponent(heading.slug)}`"
        @click="open = false"
        :aria-current="active === heading.slug ? 'location' : undefined"
      >
        {{ heading.text }}
      </a>
    </nav>
  </details>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TocHeading } from '../../scripts/doc-headings';
import { useToc } from './useToc';
const props = defineProps<{ headings?: TocHeading[]; auto?: boolean }>();
const open = ref(false);
const { headings, active, title } = useToc(props);
</script>
