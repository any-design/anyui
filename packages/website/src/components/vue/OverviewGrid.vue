<template>
  <div class="components-index">
    <div class="components-index__hero">
      <h1>Components</h1>
      <p class="components-index__intro">
        Every component in AnyUI, available across Vue, React and Svelte with one shared API.
        Browse by category below, or pick a component from the sidebar.
      </p>
    </div>

    <section v-for="group in groups" :key="group.category.id" class="components-index__group">
      <h2 class="components-index__group-title">{{ group.category.label.en }}</h2>
      <a-grid class="components-index__grid" :columns="24" :gap="14" stretch>
        <a-grid-col
          v-for="item in group.items"
          :key="item.slug"
          :xs="24"
          :sm="12"
          :lg="8"
          :xl="8"
        >
          <a-card
            :link="`/components/${item.slug}`"
            :clean="true"
            :width="'100%'"
            class="components-index__card"
          >
            <div class="components-index__card-inner">
              <div class="components-index__card-name">{{ item.name }}</div>
              <div class="components-index__card-blurb">{{ item.blurb.en }}</div>
            </div>
          </a-card>
        </a-grid-col>
      </a-grid>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

interface ComponentItem {
  slug: string;
  name: string;
  blurb: { en: string; zh: string };
}
interface ComponentGroup {
  category: { id: string; label: { en: string; zh: string } };
  items: ComponentItem[];
}

defineProps({
  groups: {
    type: Array as PropType<ComponentGroup[]>,
    default: () => [],
  },
});
</script>
