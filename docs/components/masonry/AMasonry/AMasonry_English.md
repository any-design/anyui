## @any-design/anyui AMasonry Component

The `AMasonry` Component is a Vue3 component that helps to create grid-like layout by using the waterfall flow layout algorithm. It renders a list of items with dynamically calculated positions. It's useful when working with a large number of children elements.


### Basic Usage

```vue
<template>
  <AMasonry
    :items="items"
    :itemHeightGetter="itemHeightGetter"
    :colWidth="colWidth"
  >
    <template #default="slotProps">
      <div class="my-item" :style="{ height: slotProps.data.height + 'px' }">
        <p>this is item {{ slotProps.data }}</p>
      </div>
    </template>
  </AMasonry>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AMasonry from '@any-design/anyui';

const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const itemHeightGetter = () => 100;
const colWidth = 200;
</script>
```

### Props

Name | Type | Required | Default | Description
---|---|---|---|---
`itemHeightGetter` | `Function` | `Yes` | `null` | A getter method for getting the height of the item passed through the props.
`items` | `Array` | `Yes` | `null` | An array of items to be rendered in the masonry.
`colWidth` | `Number` | `Yes` | `null` | The width of the column.
`col` | `Number` | `No` | `0` | Total columns count
`gap` | `Number` | `No` | `16` | Gap between items
`fit` | `Boolean` | `No` | `false` | If set to `true`, the masonry will fit the container automatically.
`rowsPerSection` | `Number` | `No` | `3` | The number of rows in one render section.
`groupSize` | `Number` | `No` | `100` | How many items will be included in a render group.
`additionalDistance` | `Number` | `No` | `1600` | The additional render distance out of the screen.
`scrollDebounceTime` | `Number` | `No` | `200` | The debounce time for scroll handler execution.
`scrollThrottleTime` | `Number` | `No` | `100` | The throttle time for scroll handler execution
`scrollEventTarget` | `String` | `No` | `null` | If not specified, the scroll event handler will be attached to the window.
`resizeThrottleTime` | `Number` | `No` | `100` | The resize throttle time.
`resizeDebounceTime` | `Number` | `No` | `200` | The resize debounce time.

### Events

`@scroll`: The `AMasonry` component does not emit any event.

### Exposed Methods or Values

The `AMasonry` component does not have any exposed methods or values.