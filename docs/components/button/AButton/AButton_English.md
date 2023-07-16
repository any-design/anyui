# AButton Component

The `AButton` component is a UI button that can be used in Vue3 and can be customized in various ways.

## Basic Usage

```html
<template>
  <AButton type="primary" round size="large" anim> Click me! </AButton>
</template>

<script>
  import AButton from '@any-design/anyui';

  export default {
    components: { AButton },
  };
</script>
```

## Props

### type

- Type: `String`
- Default value: `'default'`

The `type` prop is used to specify the style type of the button. It accepts one of the following values:

- `'default'`
- `'primary'`
- `'gradient'`
- `'gradient-reverse'`
- `'depth'`

```html
<AButton type="primary">Primary Button</AButton>
```

### round

- Type: `Boolean`
- Default value: `false`

The `round` prop, when set to `true`, will apply a rounded border to the button.

```html
<AButton round>Round Button</AButton>
```

### anim

- Type: `Boolean`
- Default value: `false`

When the `anim` prop is set to `true`, the button will perform a move-up animation on hover.

```html
<AButton anim>Animated Button</AButton>
```

### size

- Type: `String`
- Default value: `'default'`

This prop sets the button size. The following values are supported:

- `'default'`
- `'small'`
- `'large'`

```html
<AButton size="large">Large Button</AButton>
```

### disabled

- Type: `Boolean`
- Default value: `false`

Setting the `disabled` prop to `true` will disable the button.

```html
<AButton disabled>Disabled Button</AButton>
```

### fill

- Type: `Boolean`
- Default value: `false`

The `fill` prop, if set to `true`, will make the button fill its parent container.

```html
<AButton fill>Filled Button</AButton>
```

### textShadow

- Type: `Boolean`
- Default value: `false`

The `textShadow` prop, if set to `true`, will apply a text-shadow to the text in the button.

```html
<AButton textShadow>Text Shadow Button</AButton>
```

### icon

- Type: `String`
- Default value: `''`

The `icon` prop is used to set the icon within the button.

```html
<AButton icon="ri-menu-3-line">Menu Button</AButton>
```

### iconPosition

- Type: `String`
- Default value: `'leading'`

This `iconPosition` prop sets the position of the icon inside the button. The following values are supported:

- `'leading'`
- `'trailing'`

```html
<AButton iconPosition="trailing">Trailing Icon Button</AButton>
```
