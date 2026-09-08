<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Status &amp; Labels</div>
      <div class="demo-col progress-demo-stack">
        <a-progress :value="42" show-label width="260" />
        <a-progress :value="72" status="success" show-label :format="formatDone" width="260" />
        <a-progress :value="28" status="warn" size="small" width="260" />
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Motion</div>
      <div class="demo-col progress-demo-stack">
        <a-progress :value="55" striped active width="260" />
        <a-progress indeterminate status="info" width="260" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const formatDone = (value: number) => `${Math.round(value)} done`;
</script>

<style scoped>
.progress-demo-stack {
  width: 280px;
}
</style>
