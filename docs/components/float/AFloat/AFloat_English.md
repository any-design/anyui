# AFloat

`<AFloat>` is a Vue component of "@any-design/anyui" package.

## Usage

Here is an example of how to use `<AFloat>` component :

```vue
<template>
  <a-float
    :visible="true"
    top="200"
    padding="20"
    width="400"
    round-radius="10"
    z-index="30"
    lock-scroll="true"
    :scroll-lock-target="'#app'"
    @close="handleClose"
    @update:visible="handleVisible"
  >
    <p>This is the content of AFloat component.</p>
  </a-float>
</template>
```

## Props

These are the props for `<AFloat>` component :

### `className`

- type: `String`

Allows to add custom class name(s) to the component to overwrite styles.

### `top`

- type: `Number` or `String`
- default: `96`

Sets the distance from the top of the screen, in pixels, or in the string representation of a CSS measurement to allow the component to be positioned.

### `padding`

- type: `Number` or `String`
- default: `16`

Sets the padding of the component , accepts a value in pixels or the string representation of a CSS measurement.

### `visible`

- type: `Boolean`
- default: `false`

Specifies the visible state of the component. It can be used for disappearing and appearing animations.

### `zIndex`

- type: `Number`
- default: `1000`

Sets the z-index value of the component.

### `width`

- type: `Number` or `String`
- default: `800`

Sets the width of the component. It can accept a value in pixels or the string representation of a CSS measurement.

### `roundRadius`

- type: `Number` or `String`
- default: `undefined`

Sets the border-radius of the component, can be set using pixels or the string representation of a CSS measurement.

### `round`

- type: `Boolean`
- default: `false`

If true, the component will be applied a 24px border-radius automaticlly.

### `lockScroll`

- type: `Boolean`
- default: `true`

When set to `true`, locks the page's scrolling feature when the component is visible.

### `scrollLockTarget`

- type: `String`
- default: `'html'`

Sets the target of locking the page's scroll feature, accepts a CSS selector.

## Events

`<AFloat>` component will emit the following events:

### `close`

Emitted after the component is closed completely.

### `update:visible`

Emitted when the visibility value of the component changes.

## Methods

`<AFloat>` component exposes no methods.

## CSS Classes

These are explicitly defined CSS classes for the component.

### `.a-float__mask`

- It is used to style the mask used to cover the area outside the float component.
- It has the following properties:
  - `width`: sets the width of the mask to 100%.
  - `height`: sets the height of the mask to 100%.
  - `background`: By default it has a transparent black color gradient using rgba value 'rgba(0, 0, 0, 0.8)' and accepts any css valid color.
  - `position`: sets the position of the mask to absolute.
  - `top`: sets the top position of the mask to zero.
  - `left`: sets the left position of the mask to zero.
  - `z-index`: sets the z-index position of the mask behind the main component.
  - `backdrop-filter`: sets the backdrop-filter property to blur(4px) for browser support.

### `.a-float__content`

- It is used to style the content of the float component which includes the slot content.
- It has the following properties:
  - `height`: sets the height of the component to maximum available height.
  - `background`: By default it has same color as the whole component's background and accepts any css valid color.
  - `margin-left`: sets the left margin to auto.
  - `margin-right`: sets the right margin to auto.
  - `z-index`: sets the z-index position of the component above the mask.
  - `box-shadow`: sets the box-shadow value to '0 12px 40px var(--shadow-w-10)' for browser support.
  - `box-sizing`: sets the box-sizing property of the element.

### `.scroll-locked`

By default, the component locks the page's scrolling feature. It adds the 'scroll-locked' class to the document body, and its value is:

```css
.scroll-locked {
  overflow: hidden;
}
```

It sets the `overflow` property of the body to `hidden` to prevent the page's scrolling feature.
