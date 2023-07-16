# ASelect Component

The ASelect component is a dropdown select component. It display a list of options and allows the user to select only one of them.

## Basic Usage

```html
<template>
  <a-select :modelValue="value" @update:modelValue="handleUpdateModelValue" :items="items" />
</template>
<script>
  import { defineComponent } from 'vue';
  import ASelect from '@any-design/anyui/ASelect';

  export default defineComponent({
    name: 'MyComponent',
    components: {
      ASelect,
    },
    data() {
      return {
        value: '',
        items: [
          { value: 'option1', text: 'Option 1' },
          { value: 'option2', text: 'Option 2' },
          { value: 'option3', text: 'Option 3' },
          { value: 'option4', text: 'Option 4' },
        ],
      };
    },
    methods: {
      handleUpdateModelValue(newValue) {
        this.value = newValue;
      },
    },
  });
</script>
```

Here, on click on the ASelect component, a dropdown list of 4 options (option1 to option4) will be shown and user can select only one of them.

## Props

### width

- type: `String` | `Number`
- default: `'100%'`

The width of the select component. You can pass any valid string or number here. Example:

```html
<a-select width="300px" />
```

### size

- type: `String`
- default: `'default'`

The size of the select component. It can be `large`.

```html
<a-select size="large" />
```

### round

- type: `Boolean`
- default: `false`

Whether the select component should be rounded or not.

```html
<a-select :round="true" />
```

### modelValue

- type: `String` | `Number` | `null`
- default: `''`

The currently selected value.

### placeholder

- type: `String`
- default: `''`

The placeholder to show when no option is selected.

```html
<a-select placeholder="Select an option" />
```

### disabled

- type: `Boolean`
- default: `false`

Whether the select component should be disabled or not.

```html
<a-select :disabled="true" />
```

### items

- type: `Object<ASelectItems>`
- default: `null`

An array of objects. Each object represents an option in the dropdown. Each object must have the properties `value` (the unique identifier of the option) and `text` (the text to display for the option).

```html
<a-select
  :items="[
  { value: 'option1', text: 'Option 1' },
  { value: 'option2', text: 'Option 2' },
  { value: 'option3', text: 'Option 3' },
]"
/>
```

### expandIcon

- type: `String`
- default: `'ic:outline-expand-more'`

The icon to display on the right side of the select component. It should be a valid icon name that can be displayed by the Iconify icon library.

```html
<a-select expandIcon="ic:baseline-expand-more" />
```

## Events

### update:modelValue

- params: `newValue: SelectedValue`

Emitted when the user selects an option. It sends the new selected value as a parameter.

```html
<a-select @update:modelValue="handleUpdateModelValue" />
```
