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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ARadio',
  props: {
    label: {
      type: String,
      default: '',
    },
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
    border-radius: 10px;
    background: var(--bg-alter);
    box-shadow: 0px 2px 8px var(--shadow-5);
    border: 1px solid var(--border-lighter);
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;

    &__inner {
      width: 12px;
      height: 12px;
      background: var(--primary);
      border-radius: 8px;
      box-shadow: 1px 1px 3px var(--shadow-8);
    }
  }
}
.a-radio:hover {
  .a-radio-check {
    transition: var(--anim-duration, 200ms) ease;
    border: 1px solid var(--primary-70);
  }
}
.a-radio--checked {
  .a-radio-check {
    border: 1px solid var(--primary-70);
  }
}

.a-trans-radio-inner-enter-active,
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
