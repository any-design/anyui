<template>
  <div class="a-radio" @click="handleClick">
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
    box-shadow: 2px 2px 8px var(--shadow-10);
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &__inner {
      width: 12px;
      height: 12px;
      background: var(--primary);
      border-radius: 8px;
    }
  }
}
</style>
