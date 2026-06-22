<template>
  <div
    :class="{
      'a-progress-button': true,
      'a-progress-button--round': round,
      'a-progress-button--fill': fill,
      'a-progress-button--disabled': disabled,
      'a-progress-button--striped': striped,
      'a-progress-button--active': active,
      'a-progress-button--indeterminate': indeterminate,
      [`a-progress-button--${status}`]: true,
      [`a-progress-button--${size}`]: size !== 'default',
    }"
    role="button"
    :tabindex="disabled ? -1 : 0"
    :aria-disabled="disabled"
    @click="onClicked"
    @keydown="onKeydown"
  >
    <div class="a-progress-button__bar" :style="barStyle">
      <span v-if="striped" class="a-progress-button__stripes"></span>
    </div>
    <span class="a-progress-button__inner">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import type { AProgressButtonSize, AProgressButtonStatus } from './types';

// A button whose background is a progress bar — useful for "download", "upload"
// or any long-running action where you want to show progress right on the CTA.
export default defineComponent({
  name: 'AProgressButton',
  props: {
    // progress value, 0–100 (clamped).
    value: {
      type: Number,
      default: 0,
    },
    // color status — drives both the bar and the label tint.
    status: {
      type: String as () => AProgressButtonStatus,
      default: 'primary',
    },
    // rounded pill shape.
    round: {
      type: Boolean,
      default: false,
    },
    // fill the parent width.
    fill: {
      type: Boolean,
      default: false,
    },
    // disable interaction.
    disabled: {
      type: Boolean,
      default: false,
    },
    // animated diagonal stripes over the bar.
    striped: {
      type: Boolean,
      default: false,
    },
    // animate stripes sliding rightward (only meaningful with striped).
    active: {
      type: Boolean,
      default: false,
    },
    // indeterminate animation instead of a static fill.
    indeterminate: {
      type: Boolean,
      default: false,
    },
    // density.
    size: {
      type: String as () => AProgressButtonSize,
      default: 'default',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const percent = computed(() => Math.min(100, Math.max(0, props.value)));

    const barStyle = computed(() => ({
      width: `${percent.value}%`,
    }));

    const onClicked = (e: MouseEvent) => {
      if (props.disabled) {
        return;
      }
      emit('click', e);
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (props.disabled) {
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        emit('click', e);
      }
    };

    return {
      percent,
      barStyle,
      onClicked,
      onKeydown,
    };
  },
});
</script>

<style lang="scss">
.a-progress-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 42px;
  padding: 4px 20px;
  border-radius: var(--a-radius, 14px);
  border: 1px solid var(--border);
  background: var(--a-surface-control, var(--bg));
  color: var(--text);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05rem;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  transition:
    transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease),
    box-shadow var(--anim-duration-quick, 120ms) ease,
    border-color var(--anim-duration-quick, 120ms) ease;

  &__bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, var(--primary), var(--primary-85));
    transition: width var(--anim-duration, 200ms) var(--a-ease-soft, ease);
    // bar sits behind the label; the label color shifts once the bar covers it.
    z-index: 0;
  }

  &__stripes {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.28) 0,
      rgba(255, 255, 255, 0.28) 6px,
      transparent 6px,
      transparent 12px
    );
    background-size: 24px 24px;
  }

  &__inner {
    position: relative;
    z-index: 1;
    // mix-blend-mode lets the label read against both the empty track and the
    // filled bar without a second copy of the text.
    mix-blend-mode: difference;
    color: #fff;
  }
}

.a-progress-button:hover:not(.a-progress-button--disabled) {
  transform: translateY(-1px);
  box-shadow:
    var(--a-surface-highlight, 0 0 #0000),
    var(--a-shadow-md, 0 6px 16px var(--shadow-8));
}
.a-progress-button:active:not(.a-progress-button--disabled) {
  transform: translateY(0) scale(0.96);
  box-shadow:
    var(--a-surface-highlight, 0 0 #0000),
    var(--a-shadow-xs, 0 2px 6px var(--shadow-5));
}
.a-progress-button:focus-visible {
  outline: none;
  box-shadow: var(--a-focus-ring, 0 0 0 3px var(--primary-18));
}

.a-progress-button--round {
  border-radius: var(--a-radius-full, 999px);
}
.a-progress-button--fill {
  width: 100%;
}
.a-progress-button--small {
  height: 32px;
  padding: 3px 14px;
  font-size: 12px;
  border-radius: var(--a-radius-sm, 10px);
}
.a-progress-button--small.a-progress-button--round {
  border-radius: var(--a-radius-full, 999px);
}
.a-progress-button--large {
  height: 52px;
  padding: 6px 24px;
  font-size: 16px;
  border-radius: var(--a-radius-lg, 18px);
}
.a-progress-button--large.a-progress-button--round {
  border-radius: var(--a-radius-full, 999px);
}

// status tints
.a-progress-button--secondary .a-progress-button__bar {
  background: linear-gradient(90deg, var(--secondary), color-mix(in srgb, var(--secondary) 85%, #fff));
}
.a-progress-button--success .a-progress-button__bar {
  background: linear-gradient(90deg, var(--success), color-mix(in srgb, var(--success) 85%, #fff));
}
.a-progress-button--warn .a-progress-button__bar {
  background: linear-gradient(90deg, var(--warn), color-mix(in srgb, var(--warn) 85%, #fff));
}
.a-progress-button--danger .a-progress-button__bar {
  background: linear-gradient(90deg, var(--danger), color-mix(in srgb, var(--danger) 85%, #fff));
}
.a-progress-button--info .a-progress-button__bar {
  background: linear-gradient(90deg, var(--info), color-mix(in srgb, var(--info) 85%, #fff));
}

.a-progress-button--striped.a-progress-button--active .a-progress-button__stripes {
  animation: a-progress-button-stripes 0.7s linear infinite;
}

@keyframes a-progress-button-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 24px 0;
  }
}

// indeterminate — a sliding sliver across the button
.a-progress-button--indeterminate {
  .a-progress-button__bar {
    width: 35% !important;
    background: linear-gradient(
      90deg,
      transparent,
      var(--primary),
      color-mix(in srgb, var(--primary) 85%, #fff),
      transparent
    );
    animation: a-progress-button-indeterminate 1.1s var(--a-ease-soft, ease-in-out) infinite;
  }

  &.a-progress-button--secondary .a-progress-button__bar {
    background: linear-gradient(
      90deg,
      transparent,
      var(--secondary),
      color-mix(in srgb, var(--secondary) 85%, #fff),
      transparent
    );
  }
  &.a-progress-button--success .a-progress-button__bar {
    background: linear-gradient(
      90deg,
      transparent,
      var(--success),
      color-mix(in srgb, var(--success) 85%, #fff),
      transparent
    );
  }
  &.a-progress-button--warn .a-progress-button__bar {
    background: linear-gradient(
      90deg,
      transparent,
      var(--warn),
      color-mix(in srgb, var(--warn) 85%, #fff),
      transparent
    );
  }
  &.a-progress-button--danger .a-progress-button__bar {
    background: linear-gradient(
      90deg,
      transparent,
      var(--danger),
      color-mix(in srgb, var(--danger) 85%, #fff),
      transparent
    );
  }
  &.a-progress-button--info .a-progress-button__bar {
    background: linear-gradient(
      90deg,
      transparent,
      var(--info),
      color-mix(in srgb, var(--info) 85%, #fff),
      transparent
    );
  }
}

@keyframes a-progress-button-indeterminate {
  0% {
    left: -35%;
  }
  100% {
    left: 100%;
  }
}

.a-progress-button--disabled {
  cursor: not-allowed;
  border-color: transparent;
  box-shadow: 0 3px 12px var(--shadow-5);

  .a-progress-button__bar {
    background: var(--text-disabled);
  }
  .a-progress-button__inner {
    color: var(--text-disabled);
    mix-blend-mode: normal;
  }
}
</style>
