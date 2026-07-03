<template>
  <div class="a-avatar" :style="styles">
    <slot v-if="showFallback && slots.fallback" name="fallback"></slot>
    <span v-else-if="showFallback && initials" class="a-avatar__initials" :style="initialsStyle">
      {{ initials }}
    </span>
    <span v-else-if="loading" class="a-avatar__loading" aria-hidden="true"></span>
    <img v-else-if="loadedSrc" :src="loadedSrc" :alt="alt" loading="lazy" />
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue';
import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue';

import { AvatarSize, PREDEFINED_SIZE } from './types';

import type { EnumValues } from '@/utils/types';

const props = defineProps<{
  src: string;
  alt?: string;
  size?: EnumValues<typeof AvatarSize>;
  width?: number | string;
  round?: boolean;
  name?: string;
}>();

const emit = defineEmits<{ error: [Event] }>();

const slots = useSlots();

// Background-load the image: only mount the <img> once the browser has
// successfully decoded it, so we never flash a broken-image icon. While the
// fetch is in flight we show a loading placeholder; on failure we fall back to
// the slot / initials.
const loading = ref(false);
const loadedSrc = ref('');
let currentImage: HTMLImageElement | undefined;
let stopWatchingSrc: (() => void) | undefined;

const cancelLoad = () => {
  if (currentImage) {
    currentImage.onload = null;
    currentImage.onerror = null;
    currentImage = undefined;
  }
};

const startLoad = (src: string) => {
  cancelLoad();
  if (!src) {
    loading.value = false;
    loadedSrc.value = '';
    return;
  }
  if (typeof window === 'undefined' || typeof window.Image !== 'function') {
    loading.value = false;
    loadedSrc.value = '';
    return;
  }
  loading.value = true;
  loadedSrc.value = '';
  const image = new window.Image();
  image.onload = () => {
    loadedSrc.value = src;
    loading.value = false;
  };
  image.onerror = (event) => {
    loading.value = false;
    loadedSrc.value = '';
    emit('error', event instanceof Event ? event : new Event('error'));
  };
  image.src = src;
  currentImage = image;
};

onMounted(() => {
  stopWatchingSrc = watch(
    () => props.src,
    (src) => {
      startLoad(src ?? '');
    },
    { immediate: true },
  );
});

onBeforeUnmount(() => {
  stopWatchingSrc?.();
  cancelLoad();
});

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

const showFallback = computed(() => !loadedSrc.value && !loading.value);
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
    color: var(--text-btn, #fff);
    font-weight: 600;
    line-height: 1;
    user-select: none;
  }

  &__loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-semi-light, var(--bg));
    position: relative;

    &::after {
      content: '';
      width: 40%;
      height: 40%;
      border-radius: 50%;
      border: 2px solid color-mix(in srgb, var(--text-secondary) 24%, transparent);
      border-top-color: var(--text-secondary);
      animation: a-avatar-spin 0.7s linear infinite;
    }
  }
}

@keyframes a-avatar-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
