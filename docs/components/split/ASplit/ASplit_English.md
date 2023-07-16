# ASplit Component

The `ASplit` component is a Vue component that creates a colored line to indicate a split between two sections. The component accepts a few props for customization.

## Basic Usage

To use the `ASplit` component, you can import it from the `@any-design/anyui` package and add it to your template. The component can be used with default values like this:

```html
<template>
  <ASplit />
</template>

<script>
import ASplit from '@any-design/anyui/lib/ASplit';

export default {
  components: {
    ASplit,
  },
};
</script>
```

## Props

The `ASplit` component accepts the following props:

- `height` (default: `2`) - The height of the split line. This can be a percentage or a number.

  Example:
  ```html
  <ASplit height="10" />
  ```
  
- `color` (default: `var(--line)`) - The color of the split line.

  Example:
  ```html
  <ASplit color="red" />
  ```
  
- `margin` (default: `12`) - The top and bottom margin of the split line. This can be a percentage or a number.

  Example:
  ```html
  <ASplit margin="20" />
  ```
  
- `round` (default: `false`) - If set to `true`, the split line will have a rounded border.

  Example:
  ```html
  <ASplit round />
  ```

## Events

The `ASplit` component does not emit any events.

## Exposed Methods and Values

The `ASplit` component does not expose any methods or values.