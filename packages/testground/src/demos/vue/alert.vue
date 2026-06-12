<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Types</div>
      <div class="demo-row" style="flex-direction: column; align-items: stretch; gap: 12px">
        <a-alert type="info" title="Heads up">Something informational happened.</a-alert>
        <a-alert type="success" title="Saved">Your changes have been saved.</a-alert>
        <a-alert type="warn" title="Storage almost full">Only 5% of space is left.</a-alert>
        <a-alert type="danger" title="Sync failed">Could not reach the server.</a-alert>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Closable / no icon</div>
      <div class="demo-row" style="flex-direction: column; align-items: stretch; gap: 12px">
        <a-alert type="info" title="Dismiss me" closable @close="closedCount += 1">
          A closable alert with a close event. Closed {{ closedCount }} time(s) so far.
        </a-alert>
        <a-alert type="success" :show-icon="false">A content-only alert without an icon.</a-alert>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const closedCount = ref(0);
</script>
