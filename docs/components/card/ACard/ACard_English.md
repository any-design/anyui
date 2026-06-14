# ACard

`ACard` is a surface container that groups related content. It renders an optional title header, a body, and an optional footer, and participates in the liquid-glass style when enabled.

## Import

```ts
import { Card } from '@any-design/anyui/vue';
// React:  import { Card } from '@any-design/anyui/react';
// Svelte: import { Card } from '@any-design/anyui/svelte';
```

With the Vue plugin installed (`app.use(AnyUI)`) you can use `<ACard>` directly.

## Basic usage

A titled card with body content in the default slot.

```vue
<template>
  <ACard title="Account">
    <p>Manage your profile, password and connected services.</p>
  </ACard>
</template>
```

## Examples

### Header and footer slots

Use the `header` and `footer` slots to fully customize those regions instead of relying on the `title` prop and default layout.

```vue
<template>
  <ACard width="320">
    <template #header>
      <strong>Notifications</strong>
    </template>
    <p>Choose what you want to be notified about.</p>
    <template #footer>
      <AButton type="primary" size="small">Save preferences</AButton>
    </template>
  </ACard>
</template>
```

### Link card

Setting `link` renders the card as an `<a>`, turning the whole surface into a navigable element.

```vue
<template>
  <ACard title="Docs" link="/docs/getting-started">
    Read the getting started guide →
  </ACard>
</template>
```

### Edge-to-edge content

Pass `clean` to drop the default body padding — useful when the body is itself a list, table, or image that should touch the card edges.

```vue
<template>
  <ACard title="Gallery" clean>
    <img src="/photos/cover.jpg" alt="cover" />
  </ACard>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | String | '' | Header title. |
| `width` | Number \| String | 240 | Card width. |
| `clean` | Boolean | false | Remove default body padding. |
| `link` | String | '' | Turns the card into a link (`<a href>`). |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Body. |
| `header` | — | Overrides the title area. |
| `footer` | — | Footer area. |
