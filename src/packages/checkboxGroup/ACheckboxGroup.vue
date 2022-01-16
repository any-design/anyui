<template>
  <div class="a-checkbox-group">
    <a-checkbox
      v-for="item in items"
      :key="item"
      v-model="storedValues[item]"
      :label="item"
      @change="(checked) => handleItemChange(checked, item)"
    ></a-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<(string | number)[]>,
      required: true,
    },
    modelValue: {
      type: Object as PropType<(string | number)[]>,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const storedValues = ref<Record<string, boolean>>({});

    props.items.forEach((item: string | number) => {
      if (props.modelValue?.includes(item)) {
        storedValues.value[item] = true;
        return;
      }
      storedValues.value[item] = false;
    });

    const handleItemChange = (checked: boolean, item: string | number) => {
      storedValues.value[item] = checked;
      // update array to modelValue with checked values
      emit(
        'update:modelValue',
        props.items.filter((item) => storedValues.value[item]),
      );
    };

    watchEffect(() => {
      props.modelValue?.forEach((item) => {
        storedValues.value[item] = true;
      });
      // set other non-checked to false
      props.items
        .filter((item) => !props.modelValue?.includes(item))
        .forEach((item) => {
          storedValues.value[item] = false;
        });
    });

    watchEffect(() => {
      props.items.forEach((item) => {
        if (typeof storedValues.value[item] === 'undefined') {
          storedValues.value[item] = props.modelValue?.includes(item) ? true : false;
        }
      });
    });

    return {
      storedValues,
      handleItemChange,
    };
  },
});
</script>
