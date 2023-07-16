# @any-design/anyui - ACard

## Introduction
`ACard` is a Vue component designed to display a card with a title, image, or just basic content. The component allows you to customize the width and style of the card.

## Basic usage

```html
<template>
  <a-card title="Card Title" width="50%">
  	<!-- Content here. -->
  </a-card>
</template>

<script>
import { defineComponent } from 'vue'
import ACard from '@any-design/anyui/ACard'
export default defineComponent({
  components: { ACard },
})
</script>
```

## Props

| Property | Type | Default | Required | Description |
| -------- | ---- | ------- | -------- | ----------- |
| title | String | '' | No | The title of the card. If provided, the card will have a default header. |
| width | String\|Number | 240 | No | The width of the card. It can be a percentage or a number. |
| clean | Boolean | false | No | If true, the card will not have any border and padding. |
| link | String | '' | No | If true, the card will be applied with "cursor: pointer" style. |

## Events

The `ACard` component emits no events.

## Exposed Methods and Values

The `ACard` component does not expose any methods or values.