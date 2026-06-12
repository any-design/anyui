<template>
  <div class="a-empty">
    <div class="a-empty__figure">
      <Icon class="a-empty__icon" :icon="icon"></Icon>
    </div>
    <span v-if="text" class="a-empty__text">{{ text }}</span>
    <div v-if="$slots.default" class="a-empty__actions">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import type { IconifyIcon } from '@iconify/vue';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
    },
    icon: {
      type: [String, Object] as PropType<string | IconifyIcon>,
      default: 'iconoir:file-not-found',
    },
  },
});
</script>

<style lang="scss">
.a-empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 28px 16px;
  color: var(--text-secondary);
  user-select: none;

  &__figure {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--a-radius-xl, 22px);
    background: linear-gradient(135deg, var(--primary-12), var(--secondary-20));
    box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 40%, transparent);
  }

  &__icon {
    font-size: 30px;
    color: var(--primary-70, var(--primary));
  }

  &__text {
    margin-top: 14px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    letter-spacing: 0.02rem;
  }

  &__actions {
    margin-top: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
