<template>
  <div
    :class="{
      'a-slider': true,
      'a-slider--disabled': disabled,
      'a-slider--dragging': dragging,
    }"
    :style="wrapperStyle"
    role="slider"
    :tabindex="disabled ? -1 : 0"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="storedValue"
    :aria-disabled="disabled"
    @pointerdown="handlePointerDown"
    @keydown="handleKeyDown"
  >
    <div ref="trackRef" class="a-slider__track">
      <div class="a-slider__fill" :style="{ width: `${percent}%` }"></div>
      <div
        class="a-slider__thumb"
        :style="{ left: `${percent}%` }"
        @pointerenter="hovering = true"
        @pointerleave="hovering = false"
      >
        <transition name="a-trans-slider-tooltip">
          <div v-if="tooltipVisible" class="a-slider__tooltip">{{ storedValue }}</div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Handler } from 'mitt';
import { computed, defineComponent, getCurrentInstance, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue';

import { formatStyleSize, getCertainParent } from '../../utils';
import type { FormItemEventEmitter } from '../formItem/bus';

export default defineComponent({
  name: 'ASlider',
  props: {
    // the value which will be bound to this component.
    modelValue: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // show a small value bubble above the thumb while dragging or hovering.
    showTooltip: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [String, Number],
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const trackRef = ref<HTMLDivElement | undefined>();
    const storedValue = ref(0);
    const dragging = ref(false);
    const hovering = ref(false);

    const formItemParent = getCertainParent('AFormItem', getCurrentInstance());
    let formItemEventEmitter: FormItemEventEmitter | undefined;
    if (formItemParent) {
      formItemEventEmitter = formItemParent.exposed?.emitter as FormItemEventEmitter;
    }

    const stepDecimals = computed(() => {
      const stepStr = `${props.step}`;
      const dotIndex = stepStr.indexOf('.');
      return dotIndex === -1 ? 0 : stepStr.length - dotIndex - 1;
    });

    const clamp = (value: number) => {
      const stepped = props.min + Math.round((value - props.min) / props.step) * props.step;
      const fixed = Number(stepped.toFixed(stepDecimals.value));
      return Math.min(props.max, Math.max(props.min, fixed));
    };

    const percent = computed(() => {
      if (props.max <= props.min) {
        return 0;
      }
      return ((storedValue.value - props.min) / (props.max - props.min)) * 100;
    });

    const tooltipVisible = computed(
      () => props.showTooltip && !props.disabled && (dragging.value || hovering.value),
    );

    const wrapperStyle = computed(() => ({
      width: typeof props.width === 'undefined' ? undefined : formatStyleSize(props.width),
    }));

    const setValue = (value: number) => {
      const next = clamp(value);
      if (next === storedValue.value) {
        return;
      }
      storedValue.value = next;
      emit('update:modelValue', next);
    };

    const emitChange = () => {
      emit('change', storedValue.value);
      formItemEventEmitter?.emit('change');
    };

    const valueFromPointer = (clientX: number) => {
      const track = trackRef.value;
      if (!track) {
        return storedValue.value;
      }
      const rect = track.getBoundingClientRect();
      if (!rect.width) {
        return storedValue.value;
      }
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      return props.min + ratio * (props.max - props.min);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (props.disabled || e.button !== 0) {
        return;
      }
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      target.focus({ preventScroll: true });
      target.setPointerCapture(e.pointerId);
      dragging.value = true;
      setValue(valueFromPointer(e.clientX));

      const handleMove = (moveEvent: PointerEvent) => {
        setValue(valueFromPointer(moveEvent.clientX));
      };
      const handleUp = (upEvent: PointerEvent) => {
        target.removeEventListener('pointermove', handleMove);
        target.removeEventListener('pointerup', handleUp);
        target.removeEventListener('pointercancel', handleUp);
        if (target.hasPointerCapture(upEvent.pointerId)) {
          target.releasePointerCapture(upEvent.pointerId);
        }
        dragging.value = false;
        emitChange();
      };
      target.addEventListener('pointermove', handleMove);
      target.addEventListener('pointerup', handleUp);
      target.addEventListener('pointercancel', handleUp);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (props.disabled) {
        return;
      }
      let next: number | undefined;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          next = storedValue.value + props.step;
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          next = storedValue.value - props.step;
          break;
        case 'Home':
          next = props.min;
          break;
        case 'End':
          next = props.max;
          break;
        default:
          return;
      }
      e.preventDefault();
      setValue(next);
      emitChange();
    };

    const handleClear: Handler = () => {
      storedValue.value = clamp(props.min);
      emit('update:modelValue', storedValue.value);
    };

    watch(
      () => props.modelValue,
      () => {
        storedValue.value = clamp(props.modelValue);
      },
    );

    onBeforeMount(() => {
      storedValue.value = clamp(props.modelValue);
    });

    onMounted(() => {
      formItemEventEmitter?.on('clear', handleClear);
    });

    onUnmounted(() => {
      formItemEventEmitter?.off('clear', handleClear);
    });

    return {
      trackRef,
      storedValue,
      dragging,
      hovering,
      percent,
      tooltipVisible,
      wrapperStyle,
      handlePointerDown,
      handleKeyDown,
    };
  },
});
</script>

<style lang="scss">
.a-slider {
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 24px;
  cursor: pointer;
  touch-action: none;
  outline: none;
  box-sizing: border-box;

  &__track {
    position: relative;
    width: 100%;
    height: 6px;
    border-radius: var(--a-radius-full, 999px);
    background: var(--bg-semi-dark);
  }

  &__fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--primary), var(--primary-85));
  }

  &__thumb {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid var(--primary);
    box-sizing: border-box;
    box-shadow: 0 2px 8px -2px color-mix(in srgb, var(--primary) 55%, transparent);
    transform: translate(-50%, -50%);
    transition:
      transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease),
      box-shadow var(--anim-duration-quick, 120ms) ease;
  }

  &__tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    padding: 2px 8px;
    border-radius: var(--a-radius-full, 999px);
    background: var(--a-surface-control, var(--bg-bright));
    box-shadow:
      var(--a-surface-highlight, 0 0 #0000),
      var(--a-shadow-xs, 0px 2px 8px var(--shadow-5));
    color: var(--text);
    font-size: 12px;
    line-height: 18px;
    white-space: nowrap;
    pointer-events: none;
  }
}

.a-slider:hover:not(.a-slider--disabled) {
  .a-slider__thumb {
    transform: translate(-50%, -50%) scale(1.15);
  }
}

.a-slider--dragging:not(.a-slider--disabled),
.a-slider:active:not(.a-slider--disabled) {
  .a-slider__thumb {
    transform: translate(-50%, -50%) scale(0.95);
  }
}

.a-slider:focus-visible {
  .a-slider__thumb {
    box-shadow:
      var(--a-focus-ring, 0 0 0 3px var(--primary-18)),
      0 2px 8px -2px color-mix(in srgb, var(--primary) 55%, transparent);
  }
}

.a-slider--disabled {
  cursor: not-allowed;

  .a-slider__fill {
    background: var(--text-disabled);
  }

  .a-slider__thumb {
    border-color: var(--border);
    box-shadow: var(--a-shadow-xs, 0px 2px 8px var(--shadow-5));
  }
}

.a-trans-slider-tooltip-enter-active {
  transition:
    opacity var(--anim-duration-quick, 120ms) ease-out,
    transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease-out);
}
.a-trans-slider-tooltip-leave-active {
  transition: opacity var(--anim-duration-quick, 120ms) ease-out;
}
.a-trans-slider-tooltip-enter-from,
.a-trans-slider-tooltip-leave-to {
  opacity: 0;
}
.a-trans-slider-tooltip-enter-from {
  transform: translateX(-50%) scale(0.8);
}
</style>
