# @any-design/anyui AMessage Component Documentation

## Introduction

`AMessage` is a message component which provides a border padded dialog that can be aligned with text. It can also incorporate an icon at the beginning of the message. It's mainly used to show contextual messages, notifications and alerts.

## Basic Usage

```vue
<template>
  <AMessage type="info" content="This is a notification message." />
</template>
<script>
import AMessage from '@any-design/anyui/lib/AMessage';  //imports the component

export default {
  name: 'myComponent',
  components: { AMessage },
};
</script>
```

## Props

### type

- Type: `string`
- Required: `false`

Defines the type of the message. It can have `default`, `info`, `warning`, `success` and `error` values. Default value is `default`.

### content

- Type: `string`
- Required: `false`

Defines the text content of the message.

### icon

- Type: `string`
- Required: `false`

Defines the icon that will be displayed. If not provided , the message won't display any icon.

### showIcon

- Type: `boolean`
- Required: `false`

Determines whether to show the icon in the message or not. If not provided, the default value is `true`.

### round

- Type: `boolean`
- Required: `false`

Determines whether the message should have a round style or not. If not provided, the default value is `false`.

## Events

The `AMessage` component doesn't emit any events.

## Exposed Methods or Values

The `AMessage` component doesn't expose any methods or values.

## Style

The `AMessage` component has various CSS classes that can be used to customize the appearance of the component. However, it could create unwanted effects since the style code is not directly exposed to the user. Therefore, customizing the style is not recommended.