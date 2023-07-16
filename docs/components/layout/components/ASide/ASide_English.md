# @any-design/anyui - LayoutInner Component

## Introduction
The `LayoutInner` component is a reusable Vue 3 component that is part of the "@any-design/anyui" package. It provides a simple layout structure with a slot, which can be used as a container for other elements. 

It has two props, width and noDefault, which allow for customization of its appearance, and emits no events. It defines the styles for the slot container and includes a computed property for dynamically setting the width of the component. 

## Basic Usage
To use the `LayoutInner` component, you can simply import it using its default import and use it in your template. Here's a basic example:

```vue
<template>
  <LayoutInner :width="'500px'">
    <h1>My Component</h1>
    <p>This is my component's content.</p>
  </LayoutInner>
</template>

<script>
import LayoutInner from '@any-design/anyui/lib/LayoutInner'

export default {
  components: {
    LayoutInner,
  },
}
</script>
```

## Props
The `LayoutInner` component has two props, width and noDefault, which can be used to customize its appearance.

### width 
- Type: `[Number, String]`
- Default: `300`

The width of the component, which needs to be a valid CSS height string. This prop can be passed in as a number or string.

### noDefault 
- Type: `Boolean`
- Default: `false`

If set to `true`, the default style for the component will not be applied. Otherwise, a default width of 300px will be applied.

## Events
The `LayoutInner` component does not emit any events.

## Exposed Methods or Values

The `LayoutInner` component has no exposed methods or values.