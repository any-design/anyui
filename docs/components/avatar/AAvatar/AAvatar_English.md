# AAvatar

`AAvatar` renders a user avatar from an image URL. It supports five preset sizes (or a custom `width`), an optional circular `round` mode, and a `name` prop that drives an initials fallback when the image fails to load.

## Import

```ts
import { Avatar } from '@any-design/anyui/vue';
// React:  import { Avatar } from '@any-design/anyui/react';
// Svelte: import { Avatar } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AAvatar src="/users/ada.png" name="Ada Lovelace" size="medium" />
</template>
```

## Examples

### Preset sizes

Five sizes are available: `xsmall` (16px), `small` (24px), `medium` (32px), `large` (48px), `xlarge` (64px).

```vue
<template>
  <div class="demo-row">
    <AAvatar src="/users/ada.png" name="Ada Lovelace" size="xsmall" />
    <AAvatar src="/users/ada.png" name="Ada Lovelace" size="small" />
    <AAvatar src="/users/ada.png" name="Ada Lovelace" size="medium" />
    <AAvatar src="/users/ada.png" name="Ada Lovelace" size="large" />
    <AAvatar src="/users/ada.png" name="Ada Lovelace" size="xlarge" />
  </div>
</template>
```

### Round and custom width

`round` makes the avatar circular; `width` overrides the preset size with any value.

```vue
<template>
  <AAvatar src="/users/ada.png" name="Ada Lovelace" round :width="72" />
</template>
```

### Fallback with name

When the image fails to load, the `name` prop generates initials. Use the `fallback` slot for fully custom fallback content.

```vue
<template>
  <AAvatar src="/broken.png" name="Ada Lovelace" size="large" round />
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | String | undefined | Required. Image URL. |
| `size` | 'xlarge' \| 'large' \| 'medium' \| 'small' \| 'xsmall' | undefined | Preset size. |
| `width` | Number \| String | undefined | Custom width (overrides `size`). |
| `round` | Boolean | undefined | Circular avatar. |
| `name` | String | undefined | Used for initials fallback. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `error` | Event | Image load error. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `fallback` | — | Content when the image fails to load. |
