# AVirtualListItem Component Documentation

This component is used as a child component of the virtual list.

## Basic Usage and Examples

Use of `AVirtualListItem` component can look like this:

```vue
<template>
  <AVirtualListItem :item="listItem">
    <!-- The content of the list item goes to here. -->
  </AVirtualListItem>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AVirtualListItem from '@/components/AVirtualListItem';

export default {
  components: {
    AVirtualListItem,
  },
  setup() {
    const listItem = ref({
      id: 'item1',
      __listIndex: 0,
      // other fields, depends on your use case.
    });

    return {
      listItem,
    };
  },
};
</script>
```

## Props

This component accepts the following props:

| Prop | Type   | Default | Description                                                       |
| ---- | ------ | ------- | ----------------------------------------------------------------- |
| item | Object | null    | An item that represents the information of the virtual list item. |

The `item` prop is required and it's an object. It follows the `VirtualListItem` interface which has following structure:

```ts
interface VirtualListItem<T> {
  id: string;
  __listIndex: number;
  data: T;
}
```

- The `id` field is a string and used for uniquely identify each item.
- The `__listIndex` field is a number, assigned by the parent VirtualList component. Represents the index of the item in the entire list.
- The `data` field is actual data of the item, could be any type depends on your use case.

## Event Emits

This component emits the following events:

- `initHeight` : This event is emitted when the item was first rendered that the virtual list could correct items positioning. The payload is a object that includes `itemId` that the id of the item and `height` that the real height of the item.
