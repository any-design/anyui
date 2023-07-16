# AGradientText Component

The `AGradientText` component is a Vue3 component that creates text with a gradient background. It is part of the "@any-design/anyui" package.

## Basic Usage

To use the `AGradientText` component, import it from "@any-design/anyui" and add it to your template. You can then pass in any desired props.

```vue
<template>
  <a-gradient-text size="24px" gradient="linear-gradient(90deg, red, blue)">
    My Gradient Text
  </a-gradient-text>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AGradientText } from "@any-design/anyui";

export default defineComponent({
  components: {
    AGradientText,
  },
});
</script>
```

## Props

The `AGradientText` component has several props that can be passed in for customization:

### gradient

- type: string
- default: ""

If this prop is set, it will use the provided gradient instead of generating a gradient based on other props. The gradient should be a full gradient style string.

Example:

```vue
<a-gradient-text gradient="linear-gradient(to right, red, orange, yellow)">
  Gradient text with my own gradient
</a-gradient-text>
```

### reverseGradient

- type: boolean
- default: false

If this prop is set to `true`, the gradient will be reversed from the secondary color to the primary color.

Example:

```vue
<a-gradient-text reverse-gradient>
  Text with reversed gradient
</a-gradient-text>
```

### size

- type: string or number
- default: ""

This prop sets the size of the text in the component. The value will be passed to a utility function that formats style sizes.

Example:

```vue
<a-gradient-text size="2rem">
  Text with size of 2rem
</a-gradient-text>
```

### primaryColor

- type: string
- default: "var(--primary)"

This prop sets the primary color for the gradient background if no gradient is provided. The primary color is the default color used in the theme.

Example:

```vue
<a-gradient-text primary-color="blue">
  Text with blue primary color
</a-gradient-text>
```

### secondaryColor

- type: string
- default: "var(--secondary)"

This prop sets the secondary color for the gradient background if no gradient is provided. The secondary color is the default color used in the theme.

Example:

```vue
<a-gradient-text secondary-color="#FFFF00">
  Text with yellow secondary color
</a-gradient-text>
```

### splitPercent

- type: number
- default: 30

This prop sets the split position in the gradient as a percentage.

Example:

```vue
<a-gradient-text split-percent="50">
  Text with split positioned at 50% of gradient
</a-gradient-text>
```

### Events

The `AGradientText` component does not emit any events.

### Exposed Methods and Values

The `AGradientText` component does not have any exposed methods or values.