<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Responsive equal-height cards</div>
      <a-grid :gap="14" stretch>
        <a-grid-col v-for="item in items" :key="item.title" :xs="24" :sm="12" :lg="8">
          <a-card :title="item.title" width="100%">
            <p>{{ item.copy }}</p>
          </a-card>
        </a-grid-col>
      </a-grid>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Nested row</div>
      <a-grid-row :gap="12">
        <a-grid-col :span="6"><div class="grid-swatch">6</div></a-grid-col>
        <a-grid-col :span="12"><div class="grid-swatch">12</div></a-grid-col>
        <a-grid-col :span="6"><div class="grid-swatch">6</div></a-grid-col>
      </a-grid-row>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { title: 'Short', copy: 'Compact content.' },
  {
    title: 'Long',
    copy: 'A longer body makes this card taller, and the grid stretches the rest of the row to the same height.',
  },
  { title: 'Action', copy: 'Aligned with the tallest card in the row.' },
];
</script>

<style lang="scss" scoped>
.grid-swatch {
  min-height: 72px;
  border-radius: var(--a-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: var(--text-btn);
  font-weight: 700;
}
</style>
