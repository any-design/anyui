## Introduction

`ARadio` is a radio button component offered by the package `@any-design/anyui` that allows users to toggle a single option from a group of options.

## Basic Usage

The `ARadio` component can be used in a `template` section like the following:

```vue
<template>
  <div>
    <ARadio label="Option 1" :checked="isChecked" @change="handleChange" />
  </div>
</template>
```

Where `isChecked` is a `Boolean` `prop` to set the radio button checked or unchecked and `handleChange` is the method to be executed when the radio button's value is changed.

## Props

The following `props` can be passed into the `ARadio` component:

- `label`: `string`. Optional. The label of the radio button. Default: `''`.
- `checked`: `boolean`. Optional. Whether the radio button is checked or not. Default: `false`.

Example usage of `props`.

```vue
<template>
  <div>
    <ARadio label="Option 1" :checked="true" @change="handleChange" />
  </div>
</template>
```

This code renders the radio button with label `Option 1` checked.

## Events

The ARadio component emits the following events:

- `change`: emitted when the `checked` prop changes it's value. The payload of this event is the new state of the `checked` property.

Example of emitting the `change` event in a method:

```vue
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ARadio',
  props: {
    label: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change'], // defined the event to be emitted
  setup(props, { emit }) {
    const handleClick = () => {
      if (props.checked) {
        return;
      }
      // emit `change` event
      emit('change', !props.checked);
    };
    return {
      handleClick,
    };
  },
});
</script>
```
