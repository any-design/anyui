# AImage

`AImage` is a lazy-loading image component. It renders its `src` as a background image with controllable `size`, `position`, and `repeat`, and exposes `loading` and `error` slots so you can customize those states.

## Import

```ts
import { Image } from '@any-design/anyui/vue';
// React:  import { Image } from '@any-design/anyui/react';
// Svelte: import { Image } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AImage src="/photos/cover.jpg" width="320" height="200" />
</template>
```

## Examples

### Fixed dimensions with cover

`size`, `position`, and `repeat` map to the corresponding `background-*` CSS properties. `cover` (the default) fills the box without distortion.

```vue
<template>
  <AImage src="/photos/cover.jpg" width="400" height="240" size="cover" />
</template>
```

### Custom loading state

The `loading` slot renders while the image is being fetched.

```vue
<template>
  <AImage src="/photos/heavy.jpg" width="320" height="200">
    <template #loading>
      <div style="display:flex;justify-content:center;padding:80px">
        <ASpinner />
      </div>
    </template>
  </AImage>
</template>
```

### Custom error state

The `error` slot renders when the image fails to load.

```vue
<template>
  <AImage src="/broken.jpg" width="320" height="200">
    <template #error>
      <AEmpty text="Image not found" />
    </template>
  </AImage>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | String | undefined | Image URL. |
| `width` | String \| Number | '100%' | Width. |
| `height` | String \| Number | '100%' | Height. |
| `size` | String | 'cover' | background-size value. |
| `position` | String | 'center' | background-position value. |
| `repeat` | String | 'no-repeat' | background-repeat value. |
| `threshold` | Number | — | IntersectionObserver threshold (library default). |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `loading` | — | Shown while loading. |
| `error` | — | Shown on error. |
