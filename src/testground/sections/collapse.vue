<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Collapse</p>
    <div class="testground-flex">
      <a-button @click="handleClick('vertical')">Trigger Vertical</a-button>
      <a-collapse :value="verticalCollapsed">
        <p v-for="(_, idx) in new Array(10).fill(0)" :key="idx">vertical</p>
      </a-collapse>
      <a-button @click="handleClick('horizontal')">Trigger Horizontal</a-button>
      <a-collapse direction="horizontal" :value="horizontalCollapsed">
        <span v-for="(_, idx) in new Array(10).fill(0)" :key="idx">horizontal</span>
      </a-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      verticalCollapsed: false,
      horizontalCollapsed: false,
    };
  },
  methods: {
    handleClick(direction: 'horizontal' | 'vertical') {
      this[`${direction}Collapsed`] = !this[`${direction}Collapsed`]
      console.log(this[`${direction}Collapsed`]);
    },
  }
});
</script>