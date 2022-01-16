<template>
  <div
    :class="{
      'a-radio': true,
      'a-radio--checked': checked,
    }"
    @click="handleClick"
  >
    <div class="a-radio-check">
      <transition name="a-radio-inner">
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
    &__inner {
      width: 10px;
      height: 10px;
      background: var(--primary);
      border-radius: 8px;
    }
  }
}
.a-radio:hover {
  .a-radio-check {
    transition: 200ms ease;
    border: 1px solid var(--primary-70);
  }
}
.a-radio--checked {
  .a-radio-check {
    border: 1px solid var(--primary-70);
  }
}
</style>
