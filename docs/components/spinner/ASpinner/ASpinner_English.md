# ASpinner

`ASpinner` renders a rotating icon — a simple spinning loader. Pass an `icon` prop (any Iconify name) to swap the default spinner, or leave it empty for the built-in one.

## Import

```ts
import { Spinner } from '@any-design/anyui/vue';
// React:  import { Spinner } from '@any-design/anyui/react';
// Svelte: import { Spinner } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <ASpinner />
</template>
```

## Examples

### Custom icon

Pass any [Iconify](https://iconify.design/) icon name to spin it instead of the default.

```vue
<template>
  <ASpinner icon="ri:loader-4-line" />
</template>
```

### Inline in a button

Like `ALoading`, the spinner works well inside a button to indicate an in-flight action.

```vue
<template>
  <AButton type="primary" disabled>
    <ASpinner icon="ri:loader-4-line" />
    <span>Loading</span>
  </AButton>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | String \| IconifyIcon | '' | The icon to spin (defaults to the built-in spinner). |
