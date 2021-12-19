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
import { getCertainParent } from '../../utils';
import { defineComponent, getCurrentInstance, onMounted, onUnmounted, PropType, ref } from 'vue';
import { FormItemEventEmitter } from '../formItem/bus';
import { ARadioGroupItem, ARadioGroupItems } from './types';

export default defineComponent({
  name: 'ARadioGroup',
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
    const selected = ref<string | number | undefined>(props.modelValue);
    const formItemParent = getCertainParent('AFormItem', getCurrentInstance());
    let formItemEventEmitter: FormItemEventEmitter | undefined;
    if (formItemParent) {
      formItemEventEmitter = formItemParent.exposed?.emitter as FormItemEventEmitter;
    }

    const handleItemChange = (item: ARadioGroupItem) => {
      selected.value = item.value;
      emit('update:modelValue', item.value);
    };

    const handleClear = () => {
      selected.value = undefined;
      emit('update:modelValue', undefined);
    };

    onMounted(() => {
      formItemEventEmitter?.on('clear', handleClear);
    });

    onUnmounted(() => {
      formItemEventEmitter?.off('clear', handleClear);
    });

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
