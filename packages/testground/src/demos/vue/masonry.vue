<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Fit columns</div>
      <div class="masonry-scroll">
        <a-masonry
          :items="items"
          :item-height-getter="itemHeightGetter"
          :col-width="150"
          :gap="14"
          fit
          :scroll-event-target="`.masonry-scroll`"
        >
          <template #default="{ data }">
            <div class="masonry-card" :style="{ height: data.height + 'px' }">
              <span class="masonry-card__index">{{ data.id + 1 }}</span>
              <span class="masonry-card__label">{{ data.label }}</span>
            </div>
          </template>
        </a-masonry>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Fixed 2 columns</div>
      <div class="masonry-scroll">
        <a-masonry
          :items="items"
          :item-height-getter="itemHeightGetter"
          :col="2"
          :col-width="150"
          :gap="14"
        >
          <template #default="{ data }">
            <div class="masonry-card" :style="{ height: data.height + 'px' }">
              <span class="masonry-card__index">{{ data.id + 1 }}</span>
              <span class="masonry-card__label">{{ data.label }}</span>
            </div>
          </template>
        </a-masonry>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DemoItem {
  id: number;
  height: number;
  label: string;
}

const items: DemoItem[] = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  height: 90 + (index % 4) * 46,
  label: ['River', 'Pine', 'Mist', 'Stone', 'Echo', 'Tide', 'Haze'][index % 7],
}));

const itemHeightGetter = (item: DemoItem) => item.height;
</script>

<style lang="scss" scoped>
.masonry-scroll {
  position: relative;
  width: 100%;
  max-height: 360px;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 4px 6px 6px;
  border-radius: var(--a-radius-lg, 18px);
  background: var(--bg-semi-light, var(--bg));
  border: 1px solid var(--line);
}

.masonry-card {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: var(--a-radius, 14px);
  background: linear-gradient(140deg, var(--primary), var(--secondary));
  color: var(--text-btn, #fff);
  box-shadow:
    var(--a-surface-highlight, 0 0 #0000),
    var(--a-shadow-sm, 0 4px 12px var(--shadow-6));

  &__index {
    font-size: 12px;
    font-weight: 700;
    opacity: 0.72;
  }
  &__label {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.04rem;
  }
}
</style>