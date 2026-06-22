<template>
  <div
    :class="{
      'a-progress': true,
      'a-progress--striped': striped,
      'a-progress--indeterminate': indeterminate,
      [`a-progress--${status}`]: true,
      [`a-progress--${size}`]: size !== 'default',
    }"
    :style="wrapperStyle"
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-valuenow="indeterminate ? undefined : percent"
  >
    <div class="a-progress__track">
      <div class="a-progress__fill" :style="fillStyle">
        <span v-if="striped" class="a-progress__stripes"></span>
      </div>
    </div>
    <span v-if="showLabel && !indeterminate" class="a-progress__label">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import { formatStyleSize } from '../../utils';

import type { AProgressSize, AProgressStatus } from './types';

export default defineComponent({
  name: 'AProgress',
  props: {
    // current progress value, 0–100 (clamped).
    value: {
      type: Number,
      default: 0,
    },
    // visual status — controls the fill color.
    status: {
      type: String as () => AProgressStatus,
      default: 'primary',
    },
    // height of the bar.
    height: {
      type: [String, Number],
      default: undefined,
    },
    // width of the bar.
    width: {
      type: [String, Number],
      default: undefined,
    },
    // render an animated diagonal stripe texture over the fill.
    striped: {
      type: Boolean,
      default: false,
    },
    // animate stripes sliding rightward (only meaningful with striped).
    active: {
      type: Boolean,
      default: false,
    },
    // show the numeric percentage label after the bar.
    showLabel: {
      type: Boolean,
      default: false,
    },
    // render a continuous fill animation instead of a static value.
    indeterminate: {
      type: Boolean,
      default: false,
    },
    // control density.
    size: {
      type: String as () => AProgressSize,
      default: 'default',
    },
    // custom format function for the label text.
    format: {
      type: Function as unknown as () => (value: number) => string,
      default: undefined,
    },
  },
  setup(props) {
    const percent = computed(() => Math.min(100, Math.max(0, props.value)));

    const label = computed(() => {
      if (props.format) {
        return props.format(percent.value);
      }
      return `${Math.round(percent.value)}%`;
    });

    const wrapperStyle = computed(() => ({
      width: typeof props.width === 'undefined' ? undefined : formatStyleSize(props.width),
      height: typeof props.height === 'undefined' ? undefined : formatStyleSize(props.height),
    }));

    const fillStyle = computed(() => ({
      width: `${percent.value}%`,
    }));

    return {
      percent,
      label,
      wrapperStyle,
      fillStyle,
    };
  },
});
</script>

<style lang="scss">
.a-progress {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;

  &__track {
    position: relative;
    flex: 1;
    min-width: 0;
    height: 8px;
    border-radius: var(--a-radius-full, 999px);
    background: var(--bg-semi-dark);
    overflow: hidden;
  }

  &__fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--primary), var(--primary-85));
    transition: width var(--anim-duration, 200ms) var(--a-ease-soft, ease);
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

  &__label {
    flex-shrink: 0;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--text-secondary);
    font-variant-numeric: tabular-nums;
  }
}

// status tints
.a-progress--success .a-progress__fill {
  background: linear-gradient(90deg, var(--success), color-mix(in srgb, var(--success) 85%, #fff));
}
.a-progress--warn .a-progress__fill {
  background: linear-gradient(90deg, var(--warn), color-mix(in srgb, var(--warn) 85%, #fff));
}
.a-progress--danger .a-progress__fill {
  background: linear-gradient(90deg, var(--danger), color-mix(in srgb, var(--danger) 85%, #fff));
}
.a-progress--info .a-progress__fill {
  background: linear-gradient(90deg, var(--info), color-mix(in srgb, var(--info) 85%, #fff));
}

// sizes
.a-progress--small .a-progress__track {
  height: 5px;
}
.a-progress--small .a-progress__label {
  font-size: 11px;
}
.a-progress--large .a-progress__track {
  height: 12px;
}
.a-progress--large .a-progress__label {
  font-size: 14px;
}

// animated stripes
.a-progress--striped.a-progress--active .a-progress__stripes {
  animation: a-progress-stripes 0.7s linear infinite;
}

@keyframes a-progress-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 24px 0;
  }
}

// indeterminate animation — a sliding sliver instead of a static fill
.a-progress--indeterminate {
  .a-progress__fill {
    width: 35% !important;
    background: linear-gradient(
      90deg,
      transparent,
      var(--primary),
      color-mix(in srgb, var(--primary) 85%, #fff),
      transparent
    );
    animation: a-progress-indeterminate 1.1s var(--a-ease-soft, ease-in-out) infinite;
  }

  &.a-progress--success .a-progress__fill {
    background: linear-gradient(
      90deg,
      transparent,
      var(--success),
      color-mix(in srgb, var(--success) 85%, #fff),
      transparent
    );
  }
  &.a-progress--warn .a-progress__fill {
    background: linear-gradient(
      90deg,
      transparent,
      var(--warn),
      color-mix(in srgb, var(--warn) 85%, #fff),
      transparent
    );
  }
  &.a-progress--danger .a-progress__fill {
    background: linear-gradient(
      90deg,
      transparent,
      var(--danger),
      color-mix(in srgb, var(--danger) 85%, #fff),
      transparent
    );
  }
  &.a-progress--info .a-progress__fill {
    background: linear-gradient(
      90deg,
      transparent,
      var(--info),
      color-mix(in srgb, var(--info) 85%, #fff),
      transparent
    );
  }
}

@keyframes a-progress-indeterminate {
  0% {
    left: -35%;
  }
  100% {
    left: 100%;
  }
}
</style>