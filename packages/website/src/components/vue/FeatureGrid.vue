<template>
  <div class="features__grid">
    <a-card
      v-for="feature in features"
      :key="feature.title"
      :clean="true"
      :width="'100%'"
      class="feature-card"
    >
      <div class="feature-card__inner">
        <div class="feature-card__icon">
          <img :src="feature.icon" :alt="feature.title" loading="lazy" decoding="async" />
        </div>
        <div class="feature-card__title">{{ feature.title }}</div>
        <div class="feature-card__desc">{{ feature.desc }}</div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

defineProps({
  features: {
    type: Array as PropType<Feature[]>,
    default: () => [],
  },
});
</script>