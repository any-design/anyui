<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Basic</div>
      <div class="demo-row">
        <a-button type="primary" @click="basicVisible = true">Open popup</a-button>
        <a-popup v-model="basicVisible" :width="360">
          <div style="padding: 24px">
            <p style="margin: 0 0 16px">A bare popup panel, close by mask or Esc.</p>
            <a-button size="small" @click="basicVisible = false">Close</a-button>
          </div>
        </a-popup>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Not mask closable</div>
      <div class="demo-row">
        <a-button @click="lockedVisible = true">Open popup</a-button>
        <a-popup v-model="lockedVisible" :width="360" :mask-closable="false">
          <div style="padding: 24px">
            <p style="margin: 0 0 16px">Mask click and Esc are disabled here.</p>
            <a-button size="small" type="primary" @click="lockedVisible = false">Close</a-button>
          </div>
        </a-popup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const basicVisible = ref(false);
const lockedVisible = ref(false);
</script>
