<template>
  <div class="a-checkbox" @click="handleClick">
    <div class="a-checkbox__before">
      <icon v-if="checked" :icon="checkIcon" color="var(--primary)" />
    </div>
    <div class="a-checkbox__label">
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
  &__before {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-alter);
    margin-right: 10px;
    box-shadow: 2px 2px 8px var(--shadow-10);
    border-radius: 4px;
  }
}
</style>