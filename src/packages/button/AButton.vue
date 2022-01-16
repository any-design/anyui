<template>
  <button
    :class="{
      'a-button': true,
      [`a-button--${size}`]: size && size !== 'default',
      [`a-button--${type}`]: !!type,
      'a-button--round': round,
      'a-button--fill': fill,
      'a-button--anim': anim,
      'a-button--disabled': disabled,
    }"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AButton',
  props: {
    type: {
      type: String,
      default: '',
    },
    round: {
      type: Boolean,
      default: false,
    },
    anim: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fill: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss">
.a-button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  height: 42px;
  line-height: 30px;
  padding: 6px 24px;
  background: var(--bg);
  color: var(--primary);
  border-radius: 4px;
  box-shadow: 0px 6px 12px var(--shadow-5);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05rem;
  cursor: pointer;
  border: 1px solid var(--primary);
  user-select: none;
  box-sizing: border-box;
}
.a-button:hover {
  filter: brightness(1.125);
}
.a-button:active {
  filter: brightness(1.05);
}
.a-button.a-button--round {
  border-radius: 24px;
}
.a-button.a-button--large {
  font-size: 18px;
  line-height: 40px;
  padding: 8px 32px;
  height: 56px;
}
.a-button.a-button--large.a-button--round {
  border-radius: 30px;
}
.a-button.a-button--small {
  font-size: 13px;
  line-height: 28px;
  padding: 4px 20px;
  height: 36px;
}
.a-button.a-button--small.a-button--round {
  border-radius: 18px;
}
.a-button.a-button--fill {
  width: 100%;
}
.a-button.a-button--primary {
  background: var(--primary);
  color: var(--btn);
  box-shadow: 0 4px 10px var(--shadow-20);
  border: none;
}
.a-button.a-button--gradient {
  background: linear-gradient(90deg, var(--secondary), var(--primary));
  color: var(--btn);
  box-shadow: 0 4px 10px var(--shadow-20);
  border: none;
}
.a-button.a-button--primary:hover {
  filter: none;
  background: var(--primary-85);
}
.a-button.a-button--primary:active {
  filter: none;
  background: var(--primary-75);
}
.a-button.a-button--anim {
  transition: all 200ms ease;
}
.a-button.a-button--anim:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px var(--shadow-25);
}
.a-button.a-button--disabled {
  transition: none;
  border: none;
  background: var(--disabled) !important;
  color: var(--text-disabled) !important;
  box-shadow: 0 2px 10px var(--shadow-5);
  cursor: not-allowed;
}
</style>
