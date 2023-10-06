# AInput Component Documentation

This component `AInput` is an input field. It provides different variants of input field with the ability to set custom padding for inner content, prefix and postfix sections, and explicit remeasurement of slots if necessary.

## Basic Usage and Examples

The below example illustrates the simple usage of `AInput` component:

```vue
<template>
  <AInput v-model="name"></AInput>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    };
  },
};
</script>
```

## Props

The `AInput` component accepts the following props:

| Prop           | Type           | Default   | Description                                                |
| -------------- | -------------- | --------- | ---------------------------------------------------------- |
| width          | String, Number | '100%'    | Width of the input field                                   |
| size           | String         | 'default' | Determines the size of the input field                     |
| round          | Boolean        | false     | Whether round corners should be applied to the input field |
| borderless     | Boolean        | false     | When true, no border will be applied to the input field    |
| modelValue     | String, Number | ''        | Value of the input field                                   |
| placeholder    | String         | ''        | Placeholder for the input field                            |
| disabled       | Boolean        | false     | Disables the input field, if set to true                   |
| readonly       | Boolean        | false     | Set the input field to readonly                            |
| editable       | Boolean        | true      | Allows input field to be editable                          |
| type           | String         |           | HTML5 input type of the input field                        |
| max            | Number         |           | Maximum value for the input field                          |
| min            | Number         |           | Minimum value for the input field                          |
| maxlength      | Number         |           | Maximum length of the string in the input field            |
| minlength      | Number         |           | Minimum length of the string in the input field            |
| autocomplete   | String         | 'off'     | Sets whether autocomplete is enabled for the input field   |
| prefixPadding  | Number         |           | Apply padding to the prefix in the input field             |
| postfixPadding | Number         |           | Apply padding to the postfix in the input field            |
| leftPadding    | Number         |           | Apply left padding to the input field                      |
| rightPadding   | Number         |           | Apply right padding to the input field                     |
| measureSlots   | Boolean        | true      | Measure size of used slots or not                          |

## Events

The `AInput` component emits the following events:

- 'update:modelValue': This event is emitted whenever the input value changes, it emits the current value of the input field as a payload.
- 'submit': This event is emitted when Enter key is pressed, it emits the current value of the input field as a payload.

## Example

The below example depicts the use of various props of the `AInput` component:

```vue
<template>
  <AInput
    v-model="name"
    size="large"
    placeholder="Enter your name"
    round
    width="50%"
    autocomplete="on"
    :disabled="false"
    :readonly="false"
    :editable="true"
    maxlength="100"
    minlength="2"
    type="text"
  />
</template>

<script>
export default {
  data() {
    return {
      name: '',
    };
  },
};
</script>
```

In the given example, a rounded input field with size "large", placeholder "Enter your name", width "50%", autocomplete enabled, and editable is configured. The minlength and maxlength for the input are set to 2 and 100, respectively.
