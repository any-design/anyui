<template>
  <div class="a-step" :style="rootStyle">
    <div class="a-step__lines">
      <div
        v-for="lineIndex in Math.max(displaySteps.length - 1, 0)"
        :key="`line-${lineIndex}`"
        :class="{
          'a-step__line': true,
          'a-step__line--active': lineIndex < current,
        }"
      ></div>
    </div>
    <div class="a-step__content">
      <div
        v-for="(item, index) in displaySteps"
        :key="index"
        :class="{
          'a-step-item': true,
          'a-step-item--completed': index + 1 < current,
          'a-step-item--current': current === index + 1,
        }"
      >
        <div class="a-step-item__circle">{{ index + 1 }}</div>
        <div v-if="item" class="a-step-item__name">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { CSSProperties } from 'vue';

export default defineComponent({
  name: 'AStep',
  props: {
    // the text which will show on every step item
    steps: {
      type: [Number, Array],
      default: 2,
    },
    // current step (1-based). when current > steps.length, every step (including the last) is treated as completed.
    current: {
      type: Number,
      default: 1,
    },
    // custom color for completed steps — a hex color (e.g. '#1faeff') or a css variable (e.g. 'var(--my-green)'). empty falls back to the theme success color.
    finishColor: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const displaySteps = computed(() => {
      return typeof props.steps === 'number'
        ? new Array(props.steps).fill(null)
        : (props.steps as string[]);
    });

    const rootStyle = computed<Partial<CSSProperties> | undefined>(() => {
      return props.finishColor ? ({ '--a-step-finish': props.finishColor } as CSSProperties) : undefined;
    });

    return {
      displaySteps,
      rootStyle,
    };
  },
});
</script>

<style lang="scss">
.a-step {
  --a-step-highlight: var(--text-btn, #fff);
  --a-step-shade: var(--shadow, #001220);

  width: 100%;
  height: max-content;
  position: relative;
  &__lines {
    position: absolute;
    top: 20px;
    left: 14px;
    right: 14px;
    display: flex;
    z-index: 0;
  }
  // each connector is its own segment so the completed path can fill forward
  &__line {
    flex: 1;
    height: 2px;
    background: var(--line);
    border-radius: var(--a-radius-full, 999px);
    &::after {
      content: '';
      display: block;
      width: 0;
      height: 100%;
      border-radius: var(--a-radius-full, 999px);
      background: var(--a-step-finish, var(--success));
      box-shadow: 0 0 8px var(--a-step-finish-40, color-mix(in srgb, var(--a-step-finish, var(--success)) 40%, transparent));
      transition: width var(--anim-duration, 200ms) var(--a-ease-soft, ease);
    }
  }
  &__line--active::after {
    width: 100%;
  }
  &__content {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .a-step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
      &__circle {
        position: relative;
        width: 42px;
        height: 42px;
        line-height: 42px;
        // Solid (default): keep an opaque underlay under every tint so the
        // connector line behind the circle never bleeds through.
        --a-step-circle-base: var(--bg-bright);
        --a-step-circle-fill: linear-gradient(
          180deg,
          var(--a-step-surface-hi, color-mix(in srgb, var(--bg-bright) 88%, var(--a-step-highlight) 12%)) 0%,
          var(--a-step-surface, var(--bg-bright)) 100%
        );
        background:
          var(--a-step-circle-fill),
          var(--a-step-circle-base);
        color: var(--text-disabled);
        border: 1px solid var(--a-step-surface-border, color-mix(in srgb, var(--border-light, var(--border)) 84%, var(--a-step-highlight)));
        box-sizing: border-box;
        border-radius: var(--a-radius-full, 50%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        overflow: hidden;
        transition:
          transform var(--anim-duration, 200ms) var(--a-ease-spring, ease),
          background var(--anim-duration, 200ms) ease,
          border-color var(--anim-duration, 200ms) ease,
          color var(--anim-duration, 200ms) ease,
          box-shadow var(--anim-duration, 200ms) ease;

        // gloss ring on top of the circle
        &::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          border: 1px solid color-mix(in srgb, var(--a-step-highlight) 22%, transparent);
          pointer-events: none;
          z-index: 2;
        }
      }
      &__name {
        color: var(--text-disabled);
        margin-top: 8px;
        font-weight: 500;
        font-size: 13px;
        transition: all var(--anim-duration, 200ms) ease;
        letter-spacing: 0.05rem;
      }
    }
    // completed steps use the finish color (defaults to the theme success tint).
    // the gradient stays opaque so the connector behind is fully covered.
    .a-step-item--completed {
      .a-step-item__circle {
        --a-step-circle-base: var(--bg-bright);
        --a-step-circle-fill: linear-gradient(
          180deg,
          color-mix(in srgb, var(--a-step-finish, var(--success)) 96%, var(--a-step-highlight) 4%) 0%,
          color-mix(in srgb, var(--a-step-finish, var(--success)) 82%, var(--a-step-shade) 18%) 100%
        );
        color: var(--text-btn, #fff);
        border-color: color-mix(in srgb, var(--a-step-finish, var(--success)) 60%, var(--a-step-highlight));
        box-shadow:
          0 2px 8px -2px color-mix(in srgb, var(--a-step-finish, var(--success)) 45%, transparent),
          inset 0 1px 0 color-mix(in srgb, var(--a-step-highlight) 24%, transparent);

        &::after {
          border-color: color-mix(in srgb, var(--a-step-highlight) 30%, transparent);
        }
      }
      .a-step-item__name {
        color: var(--a-step-finish, var(--success));
        font-weight: 600;
      }
    }
    // the active step uses the primary tint
    .a-step-item--current {
      .a-step-item__circle {
        --a-step-circle-base: var(--bg-bright);
        --a-step-circle-fill: linear-gradient(
          180deg,
          color-mix(in srgb, var(--primary) 96%, var(--a-step-highlight) 4%) 0%,
          color-mix(in srgb, var(--primary) 84%, var(--a-step-shade) 16%) 100%
        );
        color: var(--text-btn, #fff);
        transform: scale(1.04);
        border-color: color-mix(in srgb, var(--primary) 64%, var(--a-step-highlight));
        box-shadow:
          0 4px 12px -4px color-mix(in srgb, var(--primary) 45%, transparent),
          inset 0 1px 0 color-mix(in srgb, var(--a-step-highlight) 28%, transparent);

        &::after {
          border-color: color-mix(in srgb, var(--a-step-highlight) 24%, transparent);
        }
      }
      .a-step-item__name {
        color: var(--primary);
        font-weight: 600;
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Liquid glass style
// Apply via <html data-anyui-style="glass"> or a subtree .a-glass wrapper.
// The circles turn into translucent frosted pills: the connector line is meant
// to faintly lens through, which is the glass material cue.
// ---------------------------------------------------------------------------
@mixin step-glass {
  // plain (non-current / non-completed) circles become frosted control pills
  .a-step-item__circle {
    --a-step-circle-base: transparent;
    --a-step-circle-fill: linear-gradient(
      180deg,
      color-mix(in srgb, var(--bg-bright) 70%, transparent) 0%,
      color-mix(in srgb, var(--bg-bright) 50%, transparent) 100%
    );
    background:
      var(--a-step-circle-fill);
    border-color: var(--a-surface-border-color, color-mix(in srgb, var(--a-step-highlight) 46%, transparent));
    -webkit-backdrop-filter: var(--a-surface-backdrop, none);
    backdrop-filter: var(--a-surface-backdrop, none);
    box-shadow:
      var(--a-surface-highlight, 0 0 #0000);
  }

  // completed: keep the finish tint but make it a translucent frosted fill
  .a-step-item--completed .a-step-item__circle {
    --a-step-circle-base: transparent;
    --a-step-circle-fill: linear-gradient(
      180deg,
      color-mix(in srgb, var(--a-step-finish, var(--success)) 72%, transparent) 0%,
      color-mix(in srgb, var(--a-step-finish, var(--success)) 52%, transparent) 100%
    );
    background:
      var(--a-step-circle-fill);
    border-color: color-mix(in srgb, var(--a-step-finish, var(--success)) 50%, var(--a-step-highlight));
  }

  // current: keep the primary tint as a translucent frosted fill
  .a-step-item--current .a-step-item__circle {
    --a-step-circle-base: transparent;
    --a-step-circle-fill: linear-gradient(
      180deg,
      color-mix(in srgb, var(--primary) 70%, transparent) 0%,
      color-mix(in srgb, var(--primary) 50%, transparent) 100%
    );
    background:
      var(--a-step-circle-fill);
    border-color: color-mix(in srgb, var(--primary) 55%, var(--a-step-highlight));
  }
}

html[data-anyui-style='glass'],
.a-glass {
  .a-step {
    @include step-glass;
  }
}
</style>
