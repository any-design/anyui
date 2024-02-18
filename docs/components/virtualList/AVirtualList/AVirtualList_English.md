# AVirtualList Component Documentation

This document includes comprehensive details of the `AVirtualList` Vue component from "@any-design/anyui" JavaScript library. The `AVirtualList` is a performant virtual scroll list that uses a binary indexed tree to determine the scroll top. It automatically measures the optimal item height and supports dynamic item height.

## Basic Usage and Example

Below is an example of how to use the `AVirtualList` component:

```vue
<template>
  <AVirtualList :items="dataItems" :buffer="800" :estimatedItemHeight="50" :enableDeepWatch="true" :firstScreenThreshold="15">
    <template v-slot="{item}">
      <div>{{ item.name }}</div>
    </template>
  </AVirtualList>
</template>

<script>
export default {
  data() {
    return {
      dataItems: Array.from({ length: 500 }, (_, index) => ({ id: index, name: `item-${index}` }))
    }
  },
};
</script>
```

## Props

The `AVirtualList` component accepts the following props:

| Prop                 | Type          | Default   | Description                                                                        |
| -------------------- | ------------- | --------- | ---------------------------------------------------------------------------------- |
| items                | Array<Object> | []        | The data list to be rendered in the virtual list                                   |
| buffer               | Number        | 1200      | The scroll buffer of the list in pixels/units                                      |
| estimatedItemHeight  | Number        | undefined | Expected height for each item in pixels/units, if known                            |
| enableDeepWatch      | Boolean       | false     | If true, the items will be deeply watched                                          |
| firstScreenThreshold | Number        | 10        | The number of elements that will be used for initial height measure                |

- `items`: This is an array of items that will be rendered in the virtual list. Each item in the array should have a unique id.
- `buffer`: This prop is a buffer size (in pixels) for the list. A larger number means that more items will be rendered. Default value is 1200.
- `estimatedItemHeight`: If you know the proper height of your items, you can set it here to skip the height measurement.
- `enableDeepWatch`: If set to true, the component will deeply watch the items.
- `firstScreenThreshold`: This prop dictates how many elements will be used for initial height measure. Default value is 10.

## Events

The `AVirtualList` component does not emit any Vue events of its own.

## Exposed Methods

The `AVirtualList` component exposes several methods for usage:

- `refresh()`: Refreshes the list. Useful when items in the list get updated or changes occur in the list layout.
- `scrollToBottom()`: Scrolls to the bottom of the list.
- `scrollTo(top: number)`: Scrolls the list to the specified scroll top. The argument `top` represents the top position in pixels/units.
- `getContainer()`: Returns a reference to the underlying list container.

Example on accessing an exposed method:

```vue
<template>
    <a-virtual-list ref="virtualListRef" :items="items"></a-virtual-list>
</template>

<script>
export default {
    data() {
        return {
            items: Array.from({ length: 500 }, (_, index) => ({ id: index, name: `item-${index}` }))
        }
    },
    mounted() {
      this.$nextTick(() =>{
           this.$refs.virtualListRef.refresh();
      });
    }
}
</script>
```