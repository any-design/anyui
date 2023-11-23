<template>
  <div
    :class="{
      'a-checkbox': true,
      'a-checkbox--checked': checked,
    }"
    @click="handleClick"
  >
    <div class="a-checkbox-checker">
      <transition :name="iconTransition">
        <Icon
          v-show="checked"
          class="a-checkbox-checker__icon"
          :icon="checkIcon"
          color="var(--primary)"
        />
      </transition>
    </div>
    <div class="a-checkbox-label">
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
import type { IconifyIcon } from '@iconify/vue';
import { Icon } from '@iconify/vue';
import type { PropType } from 'vue';
import { defineComponent, ref, watch, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'ACheckbox',
  components: {
    Icon,
  },
  props: {
    // a label text after the checkbox.
    label: {
      type: String,
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
  setup(props, { emit }) {
    const checked = ref(false);

    watch(
      () => props.modelValue,
      () => {
        checked.value = props.modelValue;
      },
    );

    const handleClick = () => {
      checked.value = !checked.value;
      // will be emitted when value changed, it will update the value in parent.
      emit('update:modelValue', checked.value);
      // will be emitted when value changed, with the new value.
      emit('change', checked.value);
    };

    onBeforeMount(() => {
      checked.value = props.modelValue;
    });

    return {
      checked,
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
    margin-right: 10px;
    box-shadow: 0px 2px 8px var(--shadow-5);
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;

    &__icon {
      width: 14px;
      display: block;
      text-shadow: 2px 2px 2px var(--shadow-8);
      position: absolute;
      top: 1px;
      left: 2px;
    }
  }
}
.a-checkbox:hover {
  .a-checkbox-checker {
    border: 1px solid var(--primary-70);
  }
}
.a-checkbox--checked {
  .a-checkbox-checker {
    border: 1px solid var(--primary-70);
  }
}

.a-trans-check-icon-enter-active,
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
