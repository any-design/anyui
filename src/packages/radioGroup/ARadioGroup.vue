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
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  watch,
  onBeforeMount,
} from 'vue';
import { FormItemEventEmitter } from '../formItem/bus';
import { ARadioGroupItem, ARadioGroupItems } from './types';

export default defineComponent({
  name: 'ARadioGroup',
  props: {
    // an array includes objects which match the type { label: string, value: string }, it will be rendered as a group of radio
    items: {
      type: Array as PropType<ARadioGroupItems>,
    },
    // the value of the radio group, it will be bound to the component.
    modelValue: {
      type: [String, Number],
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const selected = ref<string | number | undefined>(undefined);

    const formItemParent = getCertainParent('AFormItem', getCurrentInstance());
    let formItemEventEmitter: FormItemEventEmitter | undefined;
    if (formItemParent) {
      formItemEventEmitter = formItemParent.exposed?.emitter as FormItemEventEmitter;
    }

    watch(
      () => props.modelValue,
      () => {
        selected.value = props.modelValue;
      },
    );

    const handleItemChange = (item: ARadioGroupItem) => {
      selected.value = item.value;
      // will be emitted when the value is changed or be cleared.
      emit('update:modelValue', item.value);
      emit('change', item.value);
      formItemEventEmitter?.emit('change');
    };

    const handleClear = () => {
      selected.value = undefined;
      emit('update:modelValue', undefined);
      emit('change', undefined);
    };

    onBeforeMount(() => {
      selected.value = props.modelValue;
    });

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
