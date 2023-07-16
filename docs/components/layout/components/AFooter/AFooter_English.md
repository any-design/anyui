# @any-design/anyui Footer Component

The `Footer` component is a layout component that is used to include a footer section in a web page. This component is exported as a default component from the `@any-design/anyui` package.

## Basic Usage

The `Footer` component can be used in the following way:

```html
<template>
  <Footer height="60">Footer Content</Footer>
</template>

<script>
import { Footer } from '@any-design/anyui';

export default {
  components: {
    Footer,
  },
};
</script>
```

In the above example, a `Footer` component is included with a height of `60px` and the content for the footer is provided inside the component.

## Props

The `Footer` component accepts the following props:

### height

- Type: `Number | String`
- Default: `''`

The `height` prop sets the height of the footer section in the web page. It accepts a `Number` or a `String` value that is a valid CSS height string. If no height is provided, the default value will be used.

```html
<template>
  <Footer height="80">Footer Content</Footer>
</template>
```

In the above example, the height of the footer section is set to `80px`.

## Events

The `Footer` component doesn't emit any events.

## Exposed Methods and Values

The `Footer` component doesn't have any exposed methods or values.