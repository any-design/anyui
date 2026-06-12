<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Wrap content</div>
      <div class="demo-row">
        <a-loading-mask :loading="cardLoading" text="Loading...">
          <a-card title="Project stats" :width="280">
            <p style="margin: 0">Stars: 1,024</p>
            <p style="margin: 6px 0 0">Forks: 256</p>
          </a-card>
        </a-loading-mask>
        <a-button type="primary" @click="cardLoading = !cardLoading">
          {{ cardLoading ? 'Stop' : 'Start' }} loading
        </a-button>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Fullscreen helper</div>
      <div class="demo-row">
        <a-button @click="showFullscreen">Show fullscreen for 2s</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { loadingMask } from '@/packages/loadingMask';

const cardLoading = ref(false);

const showFullscreen = () => {
  loadingMask.show({ text: 'Hold on...' });
  setTimeout(() => {
    loadingMask.hide();
  }, 2000);
};
</script>
