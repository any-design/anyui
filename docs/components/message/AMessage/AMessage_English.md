# AMessage - Message Box

The `AMessage` component is used to display messages to users in a message box format. It offers types for different message boxes, including 'default', 'info', 'warning', 'success', and 'error'. You can use an icon along with your messages to make them more expressive.

## Basic Usage

Here is a basic example of how to use the `AMessage` component:

```html
<template>
  <AMessage type="success" content="Your payment was successful" />
</template>

<script>
import { AMessage } from '@any-design/anyui';

export default {
  components: {
    AMessage,
  },
};
</script>
```

You can replace "success" with other types, including `info`, `warning`, and `error`.

## Props

The following props can be passed to the `AMessage` component:

### type

- Type: String
- Default: 'default'
- This prop sets the type of the message box. The available options are 'default', 'info', 'warning', 'success', and 'error'.

```html
<template>
  <AMessage type="warning" />
</template>
```

### content

- Type: String
- This prop defines the message to be displayed in the box.

```html
<template>
  <AMessage content="Warning: Unauthorized access" />
</template>
```

### icon

- Type: String
- Default: ''
- If you want to add an icon to your message, you can set the name of the icon file to this prop.

```html
<template>
  <AMessage icon="warning-filled" />
</template>
```

### showIcon

- Type: Boolean
- Default: true
- This prop determines whether the icon should be shown. If you want to hide the icon, you can set this prop to `false`.

```html
<template>
  <AMessage show-icon="false" />
</template>
```

### round

- Type: Boolean
- Default: false
- If you want to display the message box with a circular shape, you can set this prop to `true`.

```html
<template>
  <AMessage round />
</template>
```

## Events

The `AMessage` component doesn't emit any events.

## Exposed Methods and Values

The `AMessage` component doesn't expose any methods or values.