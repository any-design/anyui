<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Collapse</p>
    <div class="testground-flex">
      <a-button @click="handleClick('vertical')">Vertical</a-button>
      <a-collapse :visible="verticalVisible">
        <p v-for="(_, idx) in new Array(10).fill(0)" :key="idx">vertical</p>
      </a-collapse>
      <a-button @click="handleClick('horizontal')">Horizontal</a-button>
      <a-collapse direction="horizontal" :visible="horizontalVisible">
        <span v-for="(_, idx) in new Array(10).fill(0)" :key="idx">horizontal</span>
      </a-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      verticalVisible: false,
      horizontalVisible: false,
    };
  },
  methods: {
    handleClick(direction: 'horizontal' | 'vertical') {
      this[`${direction}Visible`] = !this[`${direction}Visible`];
    },
  },
});
</script>
