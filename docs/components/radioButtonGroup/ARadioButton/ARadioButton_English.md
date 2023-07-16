# ARadioButton Component

The ARadioButton is a component that allows you to display a radio button.

## Basic Usage

You can use the ARadioButton component in your Vue templates like this:

```
<template>
  <ARadioButton item="{label: string, value: string}" selected="{Boolean}" @click="handleClicked" />
</template>

<script>
import ARadioButton from '@any-design/anyui/lib/components/radioButton';

export default {
  components: {
    ARadioButton,
  },
  methods: {
    handleClicked(event) {
      console.log(event);
      // handle when clicked the button.
      // Will print an object with the value of the button and the position of it.
      // Example: { value: "anyValue", position: { width: 10, left: 20 } }
    },
  },
};
</script>
```

## Props

The ARadioButton component accepts the following props:

### item

- **Description:** A object with `label` and `value` properties that will be used to render the radio button. 
- **Type:** `Object`
- **Required:** `false`
- **Default value:** `null`
- **Example:** `{ label: 'Option 1', value: 'opt1' }`

### selected

- **Description:** Whether the radio button is selected or not. 
- **Type:** `Boolean`
- **Required:** `false`
- **Default value:** `false`
- **Example:** `selected="{true}"`

## Events

The ARadioButton component emits the following event:

### click

- **Description:** Triggered when the radio button is clicked. Returns an object with the value of the button and the position of it. 
- **Example:** `{ value: "anyValue", position: { width: 10, left: 20 } }`


## Exposed Methods or Values

There are no exposed methods or values for this component.