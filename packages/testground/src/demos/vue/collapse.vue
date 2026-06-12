<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Vertical</div>
      <div class="demo-row">
        <a-button @click="verticalVisible = !verticalVisible">Toggle</a-button>
        <a-collapse :visible="verticalVisible">
          <p v-for="(_, idx) in new Array(4).fill(0)" :key="idx">vertical</p>
        </a-collapse>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Horizontal</div>
      <div class="demo-row">
        <a-button @click="horizontalVisible = !horizontalVisible">Toggle</a-button>
        <a-collapse direction="horizontal" :visible="horizontalVisible">
          <span v-for="(_, idx) in new Array(4).fill(0)" :key="idx">horizontal&nbsp;</span>
        </a-collapse>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const verticalVisible = ref(false);
const horizontalVisible = ref(false);
</script>
