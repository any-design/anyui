# ATextarea Component

`@any-design/anyui` Component Library provides a textarea component named as ATextarea for Vue 3.

## Basic Usage

To use the ATextarea component, import the component into your Vue file and add the code to your template with the necessary props, as shown below:

```vue
<template>
  <a-textarea v-model="message" placeholder="Enter your message"></a-textarea>
</template>

<script>
import { defineComponent } from 'vue';
import ATextarea from '@any-design/anyui/lib/ATextarea';

export default defineComponent({
  components: { ATextarea },
  data() {
    return {
      message: '',
    };
  },
});
</script>
```

## Props

The `ATextarea ` component accepts the following props:

| Prop Name             | Type              | Default | Description                                                                                                                                               |
| --------------------- | ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `minRows`             | Number            | `3`     | Minimum height in rows of the textarea.                                                                                                                   |
| `maxRows`             | Number            | `10`    | Maximum height in rows of the textarea.                                                                                                                   |
| `readonly`            | Boolean           | `false` | Whether the textarea is readonly or not.                                                                                                                  |
| `disabled`            | Boolean           | `false` | Whether the textarea is disabled or not.                                                                                                                  |
| `modelValue`          | String            | `''`    | The value of the textarea. Use `v-model` to two-way bind to this variable.                                                                                |
| `placeholder`         | String            | `''`    | Placeholder text within the textarea.                                                                                                                     |
| `lineHeight`          | Number            | `1.5`   | The line height of the textarea.                                                                                                                          |
| `maxlength`           | Number            |         | The maximum number of characters allowed in the textarea.                                                                                                 |
| `minlength`           | Number            |         | The minimum number of characters allowed in the textarea.                                                                                                 |
| `autocomplete`        | String            | `'off'` | Whether to enable autocomplete. Possible values: `on`, `off`.                                                                                             |
| `autocorrect`         | String            | `'off'` | Whether to enable autocorrect. Possible values: `on`, `off`.                                                                                              |
| `spellcheck`          | [String, Boolean] |         | Whether to enable spell-check. Possible values: `true`, `false`, or `'default'`. If `'default'`, the browser's default spell-check behavior will be used. |
| `wrap`                | String            |         | How text should wrap inside the textarea. Possible values: `hard`, `soft`, or `off`.                                                                      |
| `disableResizeCorner` | Boolean           | `false` | Whether to disable the resize corner of the textarea.                                                                                                     |
| `autoMatchHeight`     | Boolean           | `false` | Whether to automatically match the height of the textarea.                                                                                                |
| `borderless`          | Boolean           | `false` | Whether to remove border of the textarea.                                                                                                                 |

## Events

The `ATextarea` component will emit the following events, which can be listened to using `v-on`:

| Event Name          | Description                                                                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `update:modelValue` | Triggers whenever the value of the textarea changes. The updated value of the textarea is passed as an argument to listening functions.         |
| `submit`            | Fires whenever the Enter key is pressed within the textarea. The current value of the textarea is passed as an argument to listening functions. |

## Exposed Methods/Values

`ATextarea` component does not have any exposed methods or values.
