<template>
  <div
    :class="{
      'a-checkbox': true,
      'a-checkbox--checked': checked,
    }"
    @click="handleClick"
  >
    <div class="a-checkbox-before">
      <icon
        v-if="checked"
        class="a-checkbox-before__icon"
        :icon="checkIcon"
        color="var(--primary)"
      />
    </div>
    <div class="a-checkbox-label">
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'ACheckbox',
  components: {
    Icon,
  },
  props: {
    label: {
      type: String,
    },
    checkIcon: {
      type: String,
      default: 'si-glyph:checked',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const checked = ref(props.modelValue);

    watchEffect(() => {
      checked.value = props.modelValue;
    });

    const handleClick = () => {
      checked.value = !checked.value;
      emit('update:modelValue', checked.value);
      emit('change', checked.value);
    };

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
  &-before {
    width: 20px;
    height: 20px;
    border: 1px solid var(--border-lighter);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-alter);
    margin-right: 10px;
    box-shadow: 0px 2px 8px var(--shadow-5);
    border-radius: 4px;
    box-sizing: border-box;
    &__icon {
      width: 14px;
    }
  }
}
.a-checkbox:hover {
  .a-checkbox-before {
    transition: 200ms ease;
    border: 1px solid var(--primary-70);
  }
}
.a-checkbox--checked {
  .a-checkbox-before {
    border: 1px solid var(--primary-70);
  }
}
</style>