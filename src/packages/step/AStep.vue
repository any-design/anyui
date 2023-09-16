<template>
  <div class="a-step">
    <div class="a-step__line"></div>
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
  &__line {
    height: 3px;
    width: calc(100% - 28px);
    position: absolute;
    top: 19px;
    left: 14px;
    background: var(--line);
    z-index: 0;
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
      &__circle {
        width: 42px;
        height: 42px;
        line-height: 42px;
        background: var(--bg-disabled);
        color: var(--text-disabled);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        transition: all var(--anim-duration, 200ms) ease;
      }
      &__name {
        color: var(--text-disabled);
        margin-top: 10px;
        font-weight: 600;
        font-size: 20px;
        transition: all var(--anim-duration, 200ms) ease;
        letter-spacing: 0.05rem;
      }
    }
    .a-step-item--current {
      .a-step-item__circle {
        background: var(--primary-100);
        color: var(--bg);
      }
      .a-step-item__name {
        color: var(--primary);
      }
    }
  }
}
</style>
