# @any-design/anyui A-Checkbox Group Component

The `a-checkbox-group` component is used to group multiple related checkboxes. It has an array of checkboxes and provides the ability for the user to pick more than one options.

## Basic Usage

```html
<template>
  <a-checkbox-group v-model="selectedFruits" :items="fruits" gap="10" />
</template>

<script>
  import { defineComponent } from 'vue';
  import ACheckboxGroup from '@any-design/anyui';

  export default defineComponent({
    components: {
      ACheckboxGroup,
    },
    setup() {
      const fruits = ['Apple', 'Banana', 'Cherry', 'Orange'];
      const selectedFruits = ['Banana', 'Orange'];

      return {
        fruits,
        selectedFruits,
      };
    },
  });
</script>
```

## Props

The following props can be passed into the `a-checkbox-group` component:

| Name         | Type   | Default | Description                                       |
| ------------ | ------ | ------- | ------------------------------------------------- |
| `modelValue` | Object | (none)  | The values which will be bound to this component. |
| `items`      | Array  | (none)  | The pairing labels to the values.                 |
| `gap`        | Number | 16      | Gap between the checkboxes, the unit is `px`.     |

## Events

The `a-checkbox-group` component emits the following events:

| Name                | Parameters | Description                                                                             |
| ------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `update:modelValue` | Array      | Will be emitted when any item was checked or unchecked, to update new values to parent. |

## Methods

The `a-checkbox-group` component does not expose any methods.

## Values

The `a-checkbox-group` component does not expose any values.
