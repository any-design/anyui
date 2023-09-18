# APopupMenu Component Documentation

The `APopupMenu` component is designed to create a menu based on the popper. The component comes with various props enabling customization such as items to render, positioning, delay and hover effect, etc.

## Basic usage and Example

Here is a basic usage example of the `APopupMenu` component:

```vue
<template>
  <APopupMenu :items="['item1', 'item2', 'item3']" triggerType="click">
    <button>Click Me</button>
  </APopupMenu>
</template>

<script>
import { APopupMenu } from '@any-design/anyui';

export default {
  components: {
    APopupMenu,
  },
};
</script>
```

## Props

The component accepts the following props:

| Prop name      | Type    | Default           | Description                                                      |
| -------------- | ------- | ----------------- | ---------------------------------------------------------------- |
| placement      | String  | 'bottom'          | The placement position of the popper                             |
| offset         | Number  | 12                | The menu position offset to the trigger element, unit is px      |
| items          | Array   | []                | Items to render in the menu                                      |
| width          | Number  | 180               | The menu width                                                   |
| hideDelay      | Number  | 100               | Menu hide delay when mouse move out the menu popper              |
| zIndex         | Number  | 3000              | The zIndex of the menu popper                                    |
| appendToBody   | Boolean | true              | If true, the menu will be appended to body                       |
| transition     | String  | 'a-trans-popmenu' | The transition class name                                        |
| popupClass     | String  |                   | The class applied to the popup                                   |
| menuClass      | String  |                   | The class applied to the menu                                    |
| hideAfterClick | Boolean | false             | If true, menu will hide itself automatically after a click event |
| triggerType    | String  | 'hover'           | The trigger type to show the menu                                |
| group          | String  |                   | The group name                                                   |

## Events

The component emits the following events:

- **`command`** - will be emitted when user click on a menu item. It emits the key of the clicked item and extra information about the event.

Example usage:

```vue
<template>
  <APopupMenu @command="handleCommand" :items="['item1', 'item2', 'item3']"></APopupMenu>
</template>

<script>
export default {
  methods: {
    handleCommand(command, extra) {
      // perform some action here
    },
  },
};
</script>
```

## Exposed Methods

The component exposes the following methods:

- **`getItemKey(item)`** - it's used to get the key of the item which can be a string or a `PopMenuItem`.
- **`getItemName(item)`** - it's used to get the name of the item which can be a string or a `PopMenuItem`.
- **`handleItemClick(key)`** - it's used to handle the click event on an item. If `hideAfterClick` is true, it hides the menu and emits the `command` event.
