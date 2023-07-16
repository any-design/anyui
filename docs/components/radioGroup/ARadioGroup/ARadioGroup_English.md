# ARadioGroup Component

The `ARadioGroup` component is used to render multiple radio buttons as a group. It accepts an array of objects with `label` and `value` properties as `items` prop. The value of the selected radio button will be bound to the `modelValue` prop. 

## Basic Usage
```html
<template>
  <a-radio-group v-model="selected">
    <a-radio :label="1">Radio 1</a-radio>
    <a-radio :label="2">Radio 2</a-radio>
    <a-radio :label="3">Radio 3</a-radio>
  </a-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const selected = ref(1);
    return { selected };
  },
});
</script>
```
In the above example, `a-radio-group` component is used to render a group of radio buttons. The `v-model` directive binds the selected value to `selected` data property. So, initially the first radio button will be selected.

## Props

### items
- **Type:** `Array`
- **Required:** `true`

This prop contains an array of objects with `label` and `value` properties. It is used to render a group of radio buttons.

### modelValue
- **Type:** `String | Number`
- **Required:** `false`

This prop contains the value of the selected radio button in the group. It is used to bind the selected value to the component.

## Events

### update:modelValue

This event will be emitted when the selected radio button is changed or cleared. It will return the value of the selected radio button as its argument.

## Exposed Methods and Values

### selected

This is a reactive reference to the currently selected radio button's value. It can be used to bind the value of a radio button group to the component using the `v-model` directive.

### handleItemChange(item)

This method handles the change event of the radio button. It takes an object as its argument and sets the selected value to the given item's value. It will emit the `update:modelValue` event with the selected radio button's value.

### handleClear()

This method will clear the selected value of the radio button group. It should be called when the `clear` event is emitted from `AFormItem` component or any parent component that provides this event.

Note: The internal styles of the component are not documented according to the rules mentioned above.