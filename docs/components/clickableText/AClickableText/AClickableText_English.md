# AClickableText Component

The `AClickableText` component is a clickable text component designed for use in Vue3 projects. It has two available values for the `type` prop which are `'primary'` and `'secondary'`.

## Basic Usage

To use the `AClickableText` component, first import it into your Vue3 SFC file using:

```javascript
import AClickableText from '@any-design/anyui';
```

Then, you can use the component in your template with the following code:

```html
<a-clickable-text type="secondary">Click me</a-clickable-text>
```

You can replace the text "Click me" with any text you would like to use in your project.

## Props

The following props are available to be passed into the `AClickableText` component:

### type

- **type**: String
- **default**: `''`

The `type` prop defines the color scheme of the text. It accepts two values which are `'primary'` and `'secondary'`.

#### Example

To use the `'primary'` type, pass it in as a prop like so:

```html
<a-clickable-text type="primary">Click me</a-clickable-text>
```

And to use the `'secondary'` type, pass it in as a prop like so:

```html
<a-clickable-text type="secondary">Click me</a-clickable-text>
```

## Events

The `AClickableText` component emits the following event:

### click

This event is emitted when a user clicks on the clickable text.

#### Example

To use this event, you can define a method in your component that will be executed when the `click` event is emitted. First, add the event listener to the `a-clickable-text` element like so:

```html
<a-clickable-text type="primary" @click="handleClick">Click me</a-clickable-text>
```

Then, define a method called `handleClick` in your Vue3 component like so:

```javascript
methods: {
  handleClick() {
    // your code here
  },
},
```

## Exposed Methods

The `AClickableText` component exposes no methods.

## Exposed Values

The `AClickableText` component exposes no values.