# Component Documentation: AInput by "@any-design/anyui"

## Introduction

"AInput" is a text input component that allows users to enter text information. It provides an input box with a variety of styles that can be customized to match the design of your site. You can also pass in different props to further customize the component.

## Basic Usage

```vue
<template>
  <div>
    <a-input v-model="inputValue" placeholder="Enter text here"></a-input>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AInput from '@any-design/anyui';

export default defineComponent({
  name: 'ExampleComponent',
  components: {
    AInput,
  },
  setup() {
    const inputValue = ref('');

    return {
      inputValue,
    };
  },
});
</script>
```

In the code above, we create an `AInput` instance. The `v-model` directive on the `AInput` component binds the input to a local data value called `inputValue`. The placeholder defines the placeholder text in the text box before the user enters any text.

## Props

| Prop Name | Type | Default | Description |
| --- | --- | --- | --- |
| width | string/number | '100%' | The width of the input. Can be a number or a string, e.g. '500px'. |
| size | string | 'default' | The size of the input. Can be 'default' or 'large'. |
| round | boolean | false | Whether to display the input with rounded corners. |
| borderless | boolean | false | If this prop is set to 'true', the input will not display a surrounding border. |
| modelValue | string/number | '' |  The initial value of the input. This is the value that the input will attempt to display. |
| placeholder | string | '' | The placeholder text displayed in the input before the user enters any text. |
| disabled | boolean | false | If this value is set to 'true', the input is disabled and user input is not accepted. |
| readonly | boolean | false | If this value is set to 'true', the input is readonly and the user cannot change the input value. |
| editable | boolean | true | If this value is set to 'false', the input is read-only and disabled. |
| type | string | 'text' | The type of input. Can be 'text', 'email', 'password', etc. |
| max | number | - | The maximum value that can be entered. |
| min | number | - | The minimum value that can be entered. |
| maxlength | number | - | The maximum number of characters that can be entered. |
| minlength | number | - | The minimum number of characters that must be entered. |
| autocomplete | string | 'off' | This attribute indicates whether the value of the control can be automatically completed by the browser. |

## Events

| Event Name | Description |
| --- | --- |
| update:modelValue | Triggered when the value inside the input changes. This event updates the local data value. |
| submit | Triggered when "Enter" is pressed on the keyboard. Emits the current value inside the input. |

## Exposed Methods or Values

| Name | Description |
| --- | --- |
| clear | A method to clear the content of the input box. |