<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Fixed Height</div>
      <div class="demo-row">
        <a-scroll-area :height="220" class="scroll-demo">
          <div v-for="row in rows" :key="row" class="scroll-demo__row">Row {{ row }}</div>
        </a-scroll-area>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Horizontal</div>
      <div class="demo-row">
        <a-scroll-area :height="80" horizontal class="scroll-demo scroll-demo--wide">
          <div class="scroll-demo__strip">
            <div v-for="col in 24" :key="col" class="scroll-demo__chip">Item {{ col }}</div>
          </div>
        </a-scroll-area>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const rows = Array.from({ length: 30 }, (_, index) => index + 1);
</script>

<style scoped>
.scroll-demo {
  width: 320px;
  border: 1px solid var(--border);
  border-radius: var(--a-radius, 14px);
  background: var(--a-surface, var(--bg-bright));
}

.scroll-demo--wide {
  width: 420px;
}

.scroll-demo__row {
  padding: 10px 16px;
  border-bottom: 1px solid var(--line);
}

.scroll-demo__strip {
  display: flex;
  gap: 8px;
  padding: 16px;
}

.scroll-demo__chip {
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: var(--a-radius-full, 999px);
  background: var(--bg-semi-dark);
  white-space: nowrap;
}
</style>
