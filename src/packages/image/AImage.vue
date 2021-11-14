<template>
  <div :id="imageId" ref="containerRef" class="a-image" :data-src="src" :style="containerStyles">
    <div v-if="!isLoading && !isError" class="a-image__pic" :style="picStyles"></div>
    <div v-if="isLoading" class="a-image__loading">
      <slot name="loading"></slot>
    </div>
    <div v-if="!isLoading && isError" class="a-image__error">
      <slot name="error"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';
import { formatStyleSize } from '../../utils';
import observer from './observer';
import emitter from './bus';
import { Handler } from 'mitt';

interface AnyUIPicStyles {
  'background-image'?: string;
  'background-position': string;
  'background-size': string;
  'background-repeat': string;
}

export default defineComponent({
  props: {
    src: {
      type: String,
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    height: {
      type: [String, Number],
      default: '100%',
    },
    size: {
      type: String,
      default: 'cover',
    },
    position: {
      type: String,
      default: 'center',
    },
    repeat: {
      type: String,
      default: 'no-repeat',
    },
  },
  setup(props) {
    const isLoading = ref(false);
    const isError = ref(false);
    const containerRef = ref(null);

    const containerStyles = {
      width: formatStyleSize(props.width),
      height: formatStyleSize(props.height),
    };
    const picStyles: AnyUIPicStyles = {
      'background-position': props.position,
      'background-size': props.size,
      'background-repeat': props.repeat,
    };

    const imageId = `a-image__${Math.random() + Date.now()}`;

    let observed = false;

    const loadHandler: Handler<{ imageId: string }> = (e) => {
      if (imageId !== e.imageId) {
        return;
      }
      isLoading.value = true;
    };
    const loadedHandler: Handler<{ imageId: string }> = (e) => {
      if (imageId !== e.imageId) {
        return;
      }
      picStyles['background-image'] = `url('${props.src}')`;
      isLoading.value = false;
    };
    const errorHandler: Handler<{ imageId: string }> = (e) => {
      if (imageId !== e.imageId) {
        return;
      }
      isLoading.value = false;
      isError.value = true;
    };

    onMounted(() => {
      if (!props.src) {
        console.warn('You should give a source to the image component.');
        isError.value = true;
        return;
      }
      if (!containerRef.value) {
        return;
      }
      emitter.on('load', loadHandler);
      emitter.on('loaded', loadedHandler);
      emitter.on('error', errorHandler);
      observer.observe(containerRef.value);
      observed = true;
    });

    onUpdated(() => {
      if (!observed) {
        containerRef.value && observer.observe(containerRef.value);
      }
    });

    onBeforeUnmount(() => {
      containerRef.value && observer.unobserve(containerRef.value);
      emitter.off('load', loadHandler);
      emitter.off('loaded', loadedHandler);
      emitter.off('error', errorHandler);
    });

    return {
      imageId,
      containerStyles,
      picStyles,
      containerRef,
      isLoading,
      isError,
    };
  },
});
</script>

<style lang="scss">
.a-image {
  position: relative;
  &__pic {
    width: 100%;
    height: 100%;
  }
}
</style>