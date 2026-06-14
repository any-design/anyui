<template>
  <div class="a-avatar" :style="styles">
    <slot v-if="showFallback && slots.fallback" name="fallback"></slot>
    <span v-else-if="showFallback && initials" class="a-avatar__initials" :style="initialsStyle">
      {{ initials }}
    </span>
    <img v-else :src="src" loading="lazy" @error="handleError" />
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue';
import { computed, ref, useSlots, watch } from 'vue';

import { AvatarSize, PREDEFINED_SIZE } from './types';

import type { EnumValues } from '@/utils/types';

const props = defineProps<{
  src: string;
  size?: EnumValues<typeof AvatarSize>;
  width?: number | string;
  round?: boolean;
  name?: string;
}>();

const emit = defineEmits<{ error: [Event] }>();

const slots = useSlots();

const failed = ref(false);

watch(
  () => props.src,
  () => {
    failed.value = false;
  },
);

const handleError = (event: Event) => {
  failed.value = true;
  emit('error', event);
};

// fallback content only takes over when the image is missing or failed to load
const showFallback = computed(() => failed.value || !props.src);

const initials = computed(() => {
  const name = props.name?.trim();
  if (!name) {
    return '';
  }
  const words = name.split(/\s+/);
  if (words.length >= 2) {
    return `${Array.from(words[0])[0]}${Array.from(words[1])[0]}`.toUpperCase();
  }
  // single word (incl. CJK): take the first 2 characters
  return Array.from(name).slice(0, 2).join('').toUpperCase();
});

const pixelSize = computed(() => {
  if (typeof props.width === 'number') {
    return props.width;
  }
  if (typeof props.width === 'string') {
    const parsed = Number.parseFloat(props.width);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return PREDEFINED_SIZE[props.size || AvatarSize.Medium];
});

const initialsStyle = computed(() => ({
  fontSize: `${Math.round(pixelSize.value * 0.4)}px`,
}));

const styles = computed<StyleValue>(() => {
  const sizeValue = PREDEFINED_SIZE[props.size || AvatarSize.Medium];
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
  box-shadow: var(--a-shadow-sm, 2px 3px 12px var(--shadow-8));

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__initials {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary-70), var(--secondary-70));
    color: #fff;
    font-weight: 600;
    line-height: 1;
    user-select: none;
  }
}
</style>
