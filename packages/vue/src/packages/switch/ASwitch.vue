<template>
  <span
    :class="{
      'a-switch': true,
      'a-switch--checked': checked,
      'a-switch--disabled': disabled,
    }"
    role="switch"
    :tabindex="disabled ? -1 : 0"
    :aria-checked="checked"
    :aria-disabled="disabled"
    @click="handleClick"
    @keydown="handleKeydown"
  ></span>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'ASwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const checked = ref(false);

    watch(
      () => props.modelValue,
      () => {
        checked.value = props.modelValue;
      },
    );

    const update = () => {
      if (props.disabled) {
        return;
      }
      checked.value = !checked.value;
      emit('update:modelValue', checked.value);
      emit('change', checked.value);
    };

    const handleClick = () => {
      update();
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        update();
      }
    };

    onBeforeMount(() => {
      checked.value = props.modelValue;
    });

    return {
      checked,
      handleClick,
      handleKeydown,
    };
  },
});
</script>

<style lang="scss">
.a-switch {
  width: 42px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  padding: 2px;
  border-radius: var(--a-radius-full, 999px);
  background: var(--border-60, var(--border));
  box-shadow: inset 0 1px 4px var(--shadow-5);
  cursor: pointer;
  position: relative;
  vertical-align: middle;
  transition:
    background-color var(--anim-duration-quick, 120ms) ease,
    box-shadow var(--anim-duration-quick, 120ms) ease,
    opacity var(--anim-duration-quick, 120ms) ease;

  &::after {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    border-radius: var(--a-radius-full, 999px);
    background: var(--bg-light);
    box-shadow: var(--a-shadow-xs, 0 2px 8px var(--shadow-5));
    transform: translateX(0);
    transition:
      transform var(--anim-duration, 200ms) var(--a-ease-spring, ease),
      background-color var(--anim-duration-quick, 120ms) ease,
      box-shadow var(--anim-duration-quick, 120ms) ease;
  }
}

.a-switch:hover:not(.a-switch--disabled)::after {
  box-shadow: var(--a-shadow-sm, 0 4px 12px var(--shadow-8));
}

.a-switch:focus-visible {
  outline: 2px solid var(--primary-40, var(--primary));
  outline-offset: 2px;
}

.a-switch--checked {
  background: var(--primary);
  box-shadow: inset 0 1px 4px color-mix(in srgb, var(--primary) 35%, var(--shadow-5));

  &::after {
    transform: translateX(18px);
  }
}

.a-switch--disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
</style>
