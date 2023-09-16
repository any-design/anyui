<template>
  <div class="a-checkbox-group">
    <a-checkbox
      v-for="(item, index) in items"
      :key="item"
      v-model="storedValues[item]"
      :label="item"
      :style="index !== items.length - 1 ? checkboxItemStyles : undefined"
      @change="changeMethodFactory(item)"
    ></a-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed, onBeforeMount } from 'vue';

export default defineComponent({
  props: {
    // the values which will be bound to this component.
    modelValue: {
      type: Object as PropType<(string | number)[]>,
    },
    // the pairing labels to the values.
    items: {
      type: Array as PropType<(string | number)[]>,
      required: true,
    },
    // gap between the checkboxes, the unit is px.
    gap: {
      type: Number,
      default: 16,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const storedValues = ref<Record<string, boolean>>({});

    const changeMethodFactory = (item: string | number) => {
      return (checked: boolean) => handleItemChange(checked, item);
    };

    const handleItemChange = (checked: boolean, item: string | number) => {
      storedValues.value[item] = checked;
      // will be emitted when some item was checked or unchecked, to update new values to parent
      emit(
        'update:modelValue',
        props.items.filter((item) => storedValues.value[item]),
      );
    };

    const checkboxItemStyles = computed(() => {
      if (!props.gap) {
        return undefined;
      }
      return {
        marginRight: `${props.gap}px`,
      };
    });

    watch([() => props.modelValue, () => props.items], () => {
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

    watch(
      () => props.items,
      () => {
        props.items.forEach((item) => {
          if (typeof storedValues.value[item] === 'undefined') {
            storedValues.value[item] = props.modelValue?.includes(item) ? true : false;
          }
        });
      },
    );

    onBeforeMount(() => {
      // init values from modelValue if set
      props.items.forEach((item: string | number) => {
        if (props.modelValue?.includes(item)) {
          storedValues.value[item] = true;
          return;
        }
        storedValues.value[item] = false;
      });
    });

    return {
      storedValues,
      checkboxItemStyles,
      changeMethodFactory,
      handleItemChange,
    };
  },
});
</script>
