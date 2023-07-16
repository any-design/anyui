# @any-design/anyui ARadioButtonGroup Component

The `ARadioButtonGroup` component is part of the `@any-design/anyui` package and can be used to create a group of radio buttons. It provides a customizable and flexible solution for creating a list of radio items.

## Basic Usage

To use `ARadioButtonGroup`, include it in your Vue component like this:

```vue
<template>
  <ARadioButtonGroup :items="radioItems" v-model="selectedItem" :round="isRound" />
</template>

<script>
import { defineComponent, reactive } from 'vue';
import ARadioButtonGroup from '@any-design/anyui/lib/ARadioButtonGroup';

export default defineComponent({
  components: {
    ARadioButtonGroup,
  },
  setup() {
    const state = reactive({
      radioItems: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ],
      selectedItem: '',
      isRound: true,
    });

    return state;
  },
});
</script>
```

In the example above, the `ARadioButtonGroup` component is imported from the `@any-design/anyui` package and included in the template section of the Vue component. Props can be passed to `ARadioButtonGroup` to customize it. The `items` prop is an array of objects with two properties: `label` and `value`. The `v-model` directive is used to bind the selected radio button value to `selectedItem`. The `round` prop is used to set a rounded border style to the `ARadioButtonGroup` component.

## Props

### items

- Type: `Array`
- Required: `false`

An array of objects that will be rendered as a group of radio buttons. Each object must have `label` and `value` properties.

### modelValue

- Type: `String` or `Number`
- Required: `false`

The value of the currently selected radio button. This value is bound to the component and can be accessed via the `v-model` directive.

### round

- Type: `Boolean`
- Required: `false`
- Default: `false`

Set this prop to `true` to apply a rounded border style to the `ARadioButtonGroup` component.

## Events

The `ARadioButtonGroup` component emits the following events:

### update:modelValue

This event will be emitted when the user clicks on a radio button in the group or when the value has been cleared. The `value` parameter of the emitted event is the value of the clicked radio button.

## Exposed Methods or Values

The `ARadioButtonGroup` component doesn't expose any methods or values other than the props and events mentioned above.
