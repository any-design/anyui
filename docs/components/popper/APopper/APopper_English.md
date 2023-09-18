# APopper Component

The `APopper` component is a versatile wrapper that provides common functionalities such as show/hide poppers, event listeners, and popper rendering. It supports different options that control how the component should be triggered, where it should be placed, and how it should handle external clicks.

## Basic Usage of APopper Component

Here is an example how to use `APopper` component in Vue:

```vue
<template>
  <APopper triggerType="click" placement="bottom" closeWhenClickOutside>
    <template v-slot:popup>
      <!-- The content of the popup goes here. -->
    </template>
  </APopper>
</template>
```

## Props

`APopper` accepts the following props:

| Prop                  | Type    | Default  | Description                                                                                                      |
| --------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| hideDelay             | Number  | 100      | The delay in milliseconds before the popper is hidden.                                                           |
| placement             | String  | 'bottom' | The placement of the popper, same as the popperjs.                                                               |
| triggerType           | String  | 'hover'  | The trigger type of the popper. It can be 'hover', 'click', or 'manual'.                                         |
| offset                | Number  | 18       | The offset between the trigger element and the popup.                                                            |
| zIndex                | Number  | 3000     | The z-index value of the popup.                                                                                  |
| appendToBody          | Boolean | true     | If true, the popup will be appended to the body.                                                                 |
| popupClass            | String  |          | The class name of the popup.                                                                                     |
| transition            | String  |          | The transition class name of the popup.                                                                          |
| closeWhenClickOutside | Boolean | true     | If true, the popup will be closed when clicking outside of it. It only takes effect when triggerType is "click". |
| group                 | String  |          | Group id for mutually exclusive popups.                                                                          |

## Events

The `APopper` component emits the following event:

- popupStatusChanged: This event is triggered when the visibility state of the popup changes. The new visibility state is emitted as the payload.

## Exposed Methods

`APopper` exposes the following methods:

- `show`: This method is used to show the popup. There are no arguments.
- `hide`: This method is used to hide the popup. There are no arguments.
- `getTriggerEl`: This method is used to get the trigger element. It returns `HTMLElement` and accepts no arguments.
- `getPopupEl`: This method is used to get the popup element. It returns `HTMLElement` and accepts no arguments.

## Example

Here is an example of using the `APopper` component with customized props and slots:

```vue
<template>
  <APopper triggerType="click" placement="top" :appendToBody="false" popupClass="my-popup">
    <button slot="default">Open Popover</button>
    <div slot="popup">This is the popup content!</div>
  </APopper>
</template>

<script>
export default {
  components: {
    APopper,
  },
};
</script>
```
