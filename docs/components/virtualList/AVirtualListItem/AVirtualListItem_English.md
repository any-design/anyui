# @any-design/anyui VirtualListItem Component Documentation

## Introduction

The `VirtualListItem` component is an individual item that is rendered as part of a `VirtualList` component. It renders the individual item passed in from the `VirtualList` component, which is passed through the `item` prop. Additionally, when the item is first rendered, it emits the `initHeight` event, which is used to ensure the item's height is corrected in the list.

## Basic Usage and Example

Here's an example of how to use the VirtualListItem component:

```html
<template>
  <div>
    <VirtualList :items="items" :item-height="50">
      <template v-slot:item="{ item }">
        <VirtualListItem :item="item">
          <!-- Your item content here -->
        </VirtualListItem>
      </template>
    </VirtualList>
  </div>
</template>

<script>
import { VirtualList, VirtualListItem } from '@any-design/anyui';

export default {
  components: {
    VirtualList,
    VirtualListItem,
  },
  data() {
    return {
      items: [/* Your items here */],
    };
  },
};
</script>
```

## Props

The `VirtualListItem` component has the following props:

### `item`

- Type: `Object`
- Required: `false`

The item to be rendered by the component.

## Events

The `VirtualListItem` component emits the following event:

### `initHeight`

- Arguments:
  - `itemId` - The id of the item being rendered.
  - `height` - The height of the item being rendered.

This event is emitted when the item is first rendered, and is used to ensure the item's height is corrected in the list.

## Exposed Methods or Values

This component does not expose any methods or values.