# AItem

`AItem` is a list row with a leading `media` slot, a `title` and `description`, and a trailing `actions` slot. It supports `clickable` / `href` for interactivity and an `outline` variant.

## Import

```ts
import { Item } from '@any-design/anyui/vue';
// React:  import { Item } from '@any-design/anyui/react';
// Svelte: import { Item } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AItem title="Ada Lovelace" description="Engineer" />
</template>
```

## Examples

### With media and actions

The `media` slot holds an avatar or icon; the `actions` slot holds trailing controls.

```vue
<template>
  <AItem title="Ada Lovelace" description="ada@anyui.dev">
    <template #media>
      <AAvatar src="/users/ada.png" size="medium" round />
    </template>
    <template #actions>
      <AButton size="small">Message</AButton>
    </template>
  </AItem>
</template>
```

### Clickable and as a link

Set `clickable` for hover feedback, or `href` to render the item as a link.

```vue
<template>
  <AItem title="Settings" description="Manage your preferences" clickable href="/settings" />
</template>
```

### Outline variant

Use `variant="outline"` for a bordered card-like row.

```vue
<template>
  <AItem variant="outline" title="Pro plan" description="$12/month" />
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | String | '' | Primary text. |
| `description` | String | '' | Secondary text. |
| `clickable` | Boolean | false | Hover/press affordance. |
| `href` | String | '' | Render as a link. |
| `size` | 'default' \| 'small' | 'default' | Density. |
| `variant` | 'default' \| 'outline' | 'default' | Visual variant. |
| `disabled` | Boolean | false | Disabled. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `click` | MouseEvent | Click event. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Overrides title/description. |
| `media` | — | Leading media (icon/avatar). |
| `actions` | — | Trailing actions. |
