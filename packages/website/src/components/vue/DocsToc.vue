<template>
  <aside class="toc" data-toc :aria-label="title">
    <div class="toc__title">{{ title }}</div>
    <nav class="toc__menu">
      <a
        v-for="heading in headings"
        :key="heading.slug"
        class="toc__link"
        :class="{ 'toc__link--nested': heading.depth === 3 }"
        :href="`#${encodeURIComponent(heading.slug)}`"
        :aria-current="active === heading.slug ? 'location' : undefined"
      >
        {{ heading.text }}
      </a>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { TocHeading } from '../../scripts/doc-headings';
import { useToc } from './useToc';
const props = defineProps<{ headings?: TocHeading[]; auto?: boolean }>();
const { headings, active, title } = useToc(props);
</script>
