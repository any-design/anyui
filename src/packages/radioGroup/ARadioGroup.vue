<template>
  <div class="a-radio-group">
    <a-radio
      v-for="item in items"
      :key="item.value"
      :label="item.label"
      :checked="selected === item.value"
      @change="() => handleItemChange(item)"
    ></a-radio>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ARadioGroupItem, ARadioGroupItems } from './types';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<ARadioGroupItems>,
    },
    modelValue: {
      type: [String, Number],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selected = ref<string | null>(null);
    const handleItemChange = (item: ARadioGroupItem) => {
      selected.value = item.value;
      emit('update:modelValue', item.value);
    };
    return {
      selected,
      handleItemChange,
    };
  },
});
</script>

<style lang="scss">
.a-radio-group {
  display: flex;
  .a-radio {
    margin-right: 16px;
  }
  .a-radio:last-child {
    margin-right: 0;
  }
}
</style>
