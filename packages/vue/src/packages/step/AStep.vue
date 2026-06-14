<template>
  <div class="a-step">
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

export default defineComponent({
  name: 'AStep',
  props: {
    // the text which will show on every step item
    steps: {
      type: [Number, Array],
      default: 2,
    },
    // current step
    current: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const displaySteps = computed(() => {
      return typeof props.steps === 'number'
        ? new Array(props.steps).fill(null)
        : (props.steps as string[]);
    });

    return {
      displaySteps,
    };
  },
});
</script>

<style lang="scss">
.a-step {
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
      background: var(--primary);
      box-shadow: 0 0 8px var(--primary-40);
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
      z-index: 1;
      // items before (and including) the current one render as completed
      &__circle {
        width: 42px;
        height: 42px;
        line-height: 42px;
        background: var(--primary);
        color: var(--text-btn, #fff);
        border: 1px solid transparent;
        box-sizing: border-box;
        border-radius: var(--a-radius-full, 50%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        transition:
          transform var(--anim-duration, 200ms) var(--a-ease-spring, ease),
          background-color var(--anim-duration, 200ms) ease,
          border-color var(--anim-duration, 200ms) ease,
          color var(--anim-duration, 200ms) ease,
          box-shadow var(--anim-duration, 200ms) ease;
      }
      &__name {
        color: var(--text-secondary);
        margin-top: 8px;
        font-weight: 500;
        font-size: 13px;
        transition: all var(--anim-duration, 200ms) ease;
        letter-spacing: 0.05rem;
      }
    }
    .a-step-item--current {
      .a-step-item__circle {
        background: var(--primary-100, var(--primary));
        color: var(--text-btn, #fff);
        transform: scale(1.04);
        box-shadow: 0 4px 12px -4px color-mix(in srgb, var(--primary) 45%, transparent);
      }
      .a-step-item__name {
        color: var(--primary);
        font-weight: 600;
      }
    }
    // items after the current one are pending
    .a-step-item--current ~ .a-step-item {
      .a-step-item__circle {
        background: var(--bg-semi-light, var(--bg));
        color: var(--text-disabled);
        border-color: var(--border-light, var(--border));
        box-shadow: none;
      }
      .a-step-item__name {
        color: var(--text-disabled);
        font-weight: 500;
      }
    }
  }
}
</style>
