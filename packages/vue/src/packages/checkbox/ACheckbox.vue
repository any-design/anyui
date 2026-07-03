<template>
  <div
    :class="{
      'a-checkbox': true,
      'a-checkbox--checked': checked,
      'a-checkbox--has-label': hasLabel,
    }"
    @click="handleClick"
  >
    <div class="a-checkbox-checker">
      <transition :name="iconTransition">
        <Icon v-show="checked" class="a-checkbox-checker__icon" :icon="checkIcon" />
      </transition>
    </div>
    <div v-if="hasLabel" class="a-checkbox-label">
      <template v-if="labelText">{{ labelText }}</template>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script lang="ts">
import type { IconifyIcon } from '@iconify/vue';
import { Icon } from '@iconify/vue';
import type { PropType } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'ACheckbox',
  components: {
    Icon,
  },
  props: {
    // a label text after the checkbox.
    label: {
      type: [String, Number],
      default: '',
    },
    // the icon which will showed when the checkbox is checked.
    checkIcon: {
      type: [String, Object] as PropType<string | IconifyIcon>,
      default: 'si-glyph:checked',
    },
    // the value which will be bound to this component.
    modelValue: {
      type: Boolean,
      default: false,
    },
    // the class name of icon for transition, defaultValue is 'a-trans-check-icon'.
    iconTransition: {
      type: String,
      default: 'a-trans-check-icon',
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, slots }) {
    const checked = ref(props.modelValue);
    const labelText = computed(() => (props.label === undefined || props.label === null ? '' : `${props.label}`));
    const hasLabel = computed(() => Boolean(labelText.value || slots.default));

    watch(
      () => props.modelValue,
      (value) => {
        checked.value = value;
      },
    );

    const handleClick = () => {
      checked.value = !checked.value;
      // will be emitted when value changed, it will update the value in parent.
      emit('update:modelValue', checked.value);
      // will be emitted when value changed, with the new value.
      emit('change', checked.value);
    };

    return {
      checked,
      hasLabel,
      labelText,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
.a-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  &-checker {
    width: 20px;
    height: 20px;
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-light);
    box-shadow: var(--a-shadow-xs, 0px 2px 8px var(--shadow-5));
    border-radius: 7px;
    box-sizing: border-box;
    position: relative;
    transition:
      transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease),
      border-color var(--anim-duration-quick, 120ms) ease,
      background-color var(--anim-duration-quick, 120ms) ease,
      box-shadow var(--anim-duration-quick, 120ms) ease;

    &__icon {
      width: 14px;
      display: block;
      color: var(--text-btn, #fff);
      position: absolute;
      top: 1px;
      left: 2px;
    }
  }
}

.a-checkbox--has-label {
  .a-checkbox-checker {
    margin-right: 10px;
  }
}

.a-checkbox:hover {
  .a-checkbox-checker {
    border: 1px solid var(--primary-70);
    transform: scale(1.08);
  }
}

.a-checkbox:active {
  .a-checkbox-checker {
    transform: scale(0.92);
  }
}

.a-checkbox--checked {
  .a-checkbox-checker {
    border: 1px solid var(--primary);
    background-color: var(--primary);
    box-shadow: 0 2px 8px -2px color-mix(in srgb, var(--primary) 50%, transparent);
  }
}

.a-checkbox--checked:hover {
  .a-checkbox-checker {
    border: 1px solid var(--primary);
  }
}

.a-trans-check-icon-enter-active {
  transition: all var(--anim-duration, 200ms) var(--a-ease-spring, ease-out);
}

.a-trans-check-icon-leave-active {
  transition: all var(--anim-duration-quick, 100ms) ease-out;
}

.a-trans-check-icon-enter-to {
  opacity: 1;
  transform: scale(1);
}

.a-trans-check-icon-enter-from,
.a-trans-check-icon-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
