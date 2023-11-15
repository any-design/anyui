<template>
  <div class="a-empty">
    <Icon class="a-empty__icon" :icon="icon"></Icon>
    <span v-if="text" class="a-empty__text">{{ text }}</span>
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

<style lang="scss" scoped>
.a-empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--overlay);
  align-items: center;
  justify-content: center;
  color: var(--text-80);

  &__icon {
    font-size: 48px;
  }

  &__text {
    margin-top: 12px;
    font-size: 16px;
  }
}
</style>
