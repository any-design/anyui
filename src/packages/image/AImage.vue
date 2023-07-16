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
import { CSSProperties, defineComponent, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';
import { formatStyleSize } from '../../utils';
import observer from './observer';
import emitter from './bus';
import { Handler } from 'mitt';

export default defineComponent({
  name: 'AImage',
  props: {
    // image source url
    src: {
      type: String,
    },
    // the width of the image, can be a percentage or a number
    width: {
      type: [String, Number],
      default: '100%',
    },
    // the height of the image, can be a percentage or a number
    height: {
      type: [String, Number],
      default: '100%',
    },
    // the size style string, same as background-size
    size: {
      type: String,
      default: 'cover',
    },
    // the position style string, same as background-position
    position: {
      type: String,
      default: 'center',
    },
    // the repeat mode, same as background-repeat
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
    const picStyles: CSSProperties = {
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
        console.warn('[AnyUI][image] You should give a source to the image component.');
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
