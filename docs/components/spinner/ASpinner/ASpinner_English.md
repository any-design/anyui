# Introduction
The `a-spinner` component is a part of the `@any-design/anyui` package. It is a simple spinner component that can be used to indicate loading or processing.

# Basic Usage
To use the `a-spinner` component, simply import it from the `@any-design/anyui` package and include it in your template. You can pass in an icon name as a prop to display a particular type of spinner.

```html
<template>
  <a-spinner icon="quill:loading-spin"></a-spinner>
</template>

<script>
import { defineComponent } from 'vue';
import { aSpinner } from '@any-design/anyui';

export default defineComponent({
  components: {
    aSpinner,
  },
});
</script>
```

# Props
The `a-spinner` component has one prop:

## icon
- **Type:** `String`
- **Default Value:** `'quill:loading-spin'`
- **Description:** The icon name of the spinner to be displayed. This prop is optional. Defaults to a loading spinner icon.

# Events
The `a-spinner` component does not emit any events.

# Exposed Methods and Values
The `a-spinner` component does not expose any methods or values.