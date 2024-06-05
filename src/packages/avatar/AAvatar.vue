<template>
  <div class="a-avatar" :style="styles">
    <img :src="src" loading="lazy" @error="handleError" />
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue';
import { computed } from 'vue';

import { PREDEFINED_SIZE, type AvatarSize } from './types';

import type { EnumValues } from '@/utils/types';

const props = defineProps<{
  src: string;
  size: EnumValues<typeof AvatarSize>;
  width?: number | string;
  round?: boolean;
}>();

const emit = defineEmits<{ error: [Event] }>();

const handleError = (event: Event) => {
  emit('error', event);
};

const styles = computed<StyleValue>(() => {
  const sizeValue = PREDEFINED_SIZE[props.size];
  const widthValue = props.width ?? `${sizeValue}px`;

  return {
    width: typeof widthValue === 'number' ? `${widthValue}px` : widthValue,
    height: typeof widthValue === 'number' ? `${widthValue}px` : widthValue,
    borderRadius: props.round ? '50%' : '8px',
    overflow: 'hidden',
  };
});
</script>

<style lang="scss">
.a-avatar {
  display: inline-block;
  box-shadow: 2px 3px 12px var(--shadow-8);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
