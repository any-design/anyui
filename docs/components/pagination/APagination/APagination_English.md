# APagination Component Documentation

This is a documentation for the APagination component. This component is a pagination control that provides interactive navigation through a set of pages. Customizable page ranges and navigation icons are provided to guide the user through the pagination control.

## Basic Usage and Examples

Here is a basic usage of the `APagination` component:

```vue
<template>
  <APagination :pagination="{ current: 1, pageSize: 10, total: 100 }" />
</template>
```

In this example, a simple pagination component is created, initially with 1 current page, each page having the size of 10, and total items of 100.

## Props

The component takes in the following props:

| Prop          | Type                      | Default             | Description                                                                                         |
| ------------- | ------------------------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| pagination    | `PaginationMeta`          | `{}`                | The meta-information about the pagination such as the current page, page size, and total item count |
| siblingCount  | Number                    | 1                   | The count of page items to display on each side of the current page                                 |
| boundaryCount | Number                    | 1                   | The count of page items at the start and end of pagination range                                    |
| prevIcon      | `String` or `IconifyIcon` | `'uil:angle-left'`  | The Icon to be displayed as the Previous Page button                                                |
| nextIcon      | `String` or `IconifyIcon` | `'uil:angle-right'` | The Icon to be displayed as the Next Page button                                                    |

Example:

```vue
<template>
  <APagination
    :pagination="{ current: 1, pageSize: 10, total: 100 }"
    siblingCount="2"
    boundaryCount="2"
    prevIcon="icon-prev.png"
    nextIcon="icon-next.png"
  />
</template>
```

## Events

The component emits the following events: `update:pagination` and `change`

| Event               | Payload          | Description                       |
| ------------------- | ---------------- | --------------------------------- |
| `update:pagination` | `PaginationMeta` | Triggered when pagination changes |
| `change`            | `PaginationMeta` | Duplicate of `update:pagination`  |

Example:

```vue
<template>
  <APagination
    @update:pagination="handlePaginationChange"
    @change="handlePaginationChange"
    :pagination="{ current: 1, pageSize: 10, total: 100 }"
  />
</template>

<script>
export default {
  methods: {
    handlePaginationChange(pagination) {
      // handle pagination change
    },
  },
};
</script>
```

## Computed Properties and Methods

The component exposes the following computed properties and methods

- `currentPage`: the current page in the pagination
- `totalPages`: the total pages calculated from given `pageSize` and `total`, using the pagination prop.
- `shouldDisablePrev`: computed property to evaluate if the Previous page button should be disabled.
- `shouldDisableNext`: computed property to evaluate if the Next page button should be disabled.

The following methods are used to handle clicks on different parts of the pagination:

- `handlePrevClicked`: handles clicking of the Previous page button
- `handleNextClicked`: handles clicking of the Next page button
- `handlePageClicked`: handles clicking of any page number in the pagination.

These methods are unfortunately part of the component's internal API and cannot be accessed from outside.
