<template>
  <div
    :class="{
      'a-radio': true,
      'a-radio--checked': checked,
    }"
    @click="handleClick"
  >
    <div class="a-radio-check">
      <transition name="a-trans-radio-inner">
        <div v-show="checked" class="a-radio-check__inner"></div>
      </transition>
    </div>
    <div v-if="label" class="a-radio__label">
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ARadio',
  props: {
    // the label of the radio
    label: {
      type: [String, Number] as PropType<string | number>,
      default: '',
    },
    // the value of the radio
    checked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const handleClick = () => {
      if (props.checked) {
        return;
      }
      // will be emitted when the value changed
      emit('change', !props.checked);
    };
    return {
      handleClick,
    };
  },
});
</script>

<style lang="scss">
.a-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &-check {
    width: 20px;
    height: 20px;
    border-radius: var(--a-radius-full, 999px);
    background: var(--bg-light);
    box-shadow: var(--a-shadow-xs, 0px 2px 8px var(--shadow-5));
    border: 1px solid var(--border);
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    transition:
      transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease),
      border-color var(--anim-duration-quick, 120ms) ease;

    &__inner {
      width: 12px;
      height: 12px;
      background: var(--primary);
      border-radius: var(--a-radius-full, 999px);
      box-shadow: 0 1px 4px color-mix(in srgb, var(--primary) 45%, transparent);
    }
  }
}
.a-radio:hover {
  .a-radio-check {
    border: 1px solid var(--primary-70);
    transform: scale(1.08);
  }
}
.a-radio:active {
  .a-radio-check {
    transform: scale(0.92);
  }
}
.a-radio--checked {
  .a-radio-check {
    border: 1px solid var(--primary-70);
  }
}

.a-trans-radio-inner-enter-active {
  transition: all var(--anim-duration, 200ms) var(--a-ease-spring, ease-out);
}
.a-trans-radio-inner-leave-active {
  transition: all var(--anim-duration-quick, 100ms) ease-out;
}
.a-trans-radio-inner-enter-to {
  opacity: 1;
  transform: scale(1);
}
.a-trans-radio-inner-enter-from,
.a-trans-radio-inner-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
