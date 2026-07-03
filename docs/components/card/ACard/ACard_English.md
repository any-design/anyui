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

A full-featured card: a custom `header` slot, body content, a `footer` slot with an action, a `link` so the whole surface is navigable, and `clean` so the body image bleeds to the card edges.

```vue
<template>
  <ACard width="320" link="/docs/getting-started" clean>
    <template #header>
      <strong>Notifications</strong>
    </template>
    <div
      style="height:120px;background:linear-gradient(135deg,var(--primary),var(--info));"
    ></div>
    <template #footer>
      <AButton type="primary" size="small">Save preferences</AButton>
    </template>
  </ACard>
</template>
```

Use the `title` prop for a plain header, the `header`/`footer` slots to customize those regions, `link` to render the card as an `<a>`, and `clean` to drop the default body padding.

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
