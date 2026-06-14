# AEmpty

`AEmpty` is an empty-state placeholder — an icon with optional caption text. Use it when a list, table, or search has no results. The default slot renders below the text and is meant for action buttons.

## Import

```ts
import { Empty } from '@any-design/anyui/vue';
// React:  import { Empty } from '@any-design/anyui/react';
// Svelte: import { Empty } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AEmpty text="No results found" />
</template>
```

## Examples

### Custom icon

Pass an [Iconify](https://iconify.design/) icon name to `icon`.

```vue
<template>
  <AEmpty text="Inbox is empty" icon="ri:inbox-line" />
</template>
```

### With an action

Put a button in the default slot to give the user a next step.

```vue
<template>
  <AEmpty text="No projects yet">
    <AButton type="primary">Create project</AButton>
  </AEmpty>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | String | undefined | Optional caption. |
| `icon` | String \| IconifyIcon | 'iconoir:file-not-found' | Icon above the text. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Action area below the text. |
