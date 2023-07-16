# @any-design/anyui footer component documentation

## Introduction

The @any-design/anyui footer component is a custom reusable component built with Vue3. It is designed to provide a flexible and easy-to-use footer section for any layout.

## Basic Usage

To use the footer component, you need to import it first and then place it inside the template where you want it to appear. Here is an example of how to use it:

```html
<template>
  <div>
    <h1>Welcome to my website</h1>
    <p>This is my home page.</p>
    <Footer height="60"></Footer>
  </div>
</template>

<script>
import { Footer } from '@any-design/anyui';

export default {
  name: 'MyHomePage',
  components: {
    Footer,
  },
};
</script>
```

You can also pass any content you want to appear inside the Footer using the default `slot`.

```html
<Footer height="60">
  <!-- additional content goes here -->
</Footer>
```

## Props

The following props are available for the @any-design/anyui footer component:

### height

- Type: `Number` | `String`
- Default: `''`

Height of the footer component. It should be a valid CSS height string. If a number is provided, it will be converted to a string with 'px' suffix. If no value is provided, the height will be set to auto.

Example usage:

```html
<Footer height="60"></Footer>
```

## Events

The @any-design/anyui footer component doesn't emit any events.

## Exposed Methods or Values

The @any-design/anyui footer component doesn't expose any methods or values.