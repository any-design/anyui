<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Single (accordion)</div>
      <div class="demo-row">
        <a-accordion v-model="single" style="flex: 1; max-width: 420px">
          <a-accordion-item :value="1" title="What is AnyUI?">
            AnyUI is a cross-framework component library targeting Vue, React and Svelte.
          </a-accordion-item>
          <a-accordion-item :value="2" title="Is it themeable?">
            Yes — every component ships with CSS variables and a token-based theme.
          </a-accordion-item>
          <a-accordion-item :value="3" title="Disabled item" disabled>
            This item cannot be opened.
          </a-accordion-item>
        </a-accordion>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-block__label">Multiple</div>
      <div class="demo-row">
        <a-accordion v-model="multi" mode="multiple" round style="flex: 1; max-width: 420px">
          <a-accordion-item :value="1" title="First section">
            Several panels can stay open at the same time.
          </a-accordion-item>
          <a-accordion-item :value="2" title="Second section">
            Toggle each independently.
          </a-accordion-item>
          <a-accordion-item :value="3" title="Third section">
            Rounded corners via the round prop.
          </a-accordion-item>
        </a-accordion>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const single = ref(1);
const multi = ref([1]);
</script>