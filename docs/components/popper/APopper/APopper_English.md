# @any-design/anyui - APopper Component

`APopper` is a Vue3 component that allows you to create tooltips, popovers, and dropdowns with flexible positioning and triggering options.

## Basic Usage

This component is composed of two parts: a trigger element and a popup element. Wrap your content inside the `APopper` component, and then use the `slot` tag to specify a trigger element and a popup element.

```vue
<template>
  <APopper>
    <button slot="trigger">Hover Me!</button>
    <div slot="popup">Hello, I am a tooltip.</div>
  </APopper>
</template>
```

This code will produce a `button` element as the trigger and a `div` element as the popup. The `APopper` component will automatically bind a mouseover event to the trigger by default, causing the popup to display when the user hovers over the trigger.

## Props

The following props can be passed to the `APopper` component:

| Name                  | Type    | Default   | Description                                                                                           |
| --------------------- | ------- | --------- | ----------------------------------------------------------------------------------------------------- |
| hideDelay             | Number  | 100       | The delay in milliseconds before hiding the popup, useful for hover events.                           |
| placement             | String  | 'bottom'  | The placement of the popup relative to the trigger, as defined by the `@popperjs/core` package.       |
| triggerType           | String  | 'hover'   | The type of event that triggers the popup. Can be 'hover', 'click', or 'manual'.                      |
| offset                | Number  | 18        | The offset in pixels between the trigger and the popup.                                               |
| zIndex                | Number  | 3000      | The z-index value of the popup.                                                                       |
| appendToBody          | Boolean | true      | Whether to append the popup to the body of the document.                                              |
| popupClass            | String  | undefined | The CSS class to be applied to the popup element.                                                     |
| transition            | String  | undefined | The CSS transition class to be applied to the popup element.                                          |
| closeWhenClickOutside | Boolean | true      | Only effective when `triggerType` is 'click'. Whether to close the popup when clicking outside of it. |

## Events

`APopper` component will emit an event when the popup visibility status changes. The event is named `'popupStatusChanged'`. You can listen to this event by using `@popupStatusChanged` on the `APopper` component.

## Exposed Methods

`APopper` component exposes two methods for programmatic control: `show` and `hide`. These methods allow you to manually show or hide the popup, or bind them to a custom event.

```vue
<template>
  <APopper ref="myPopup">
    <button @click="showPopup">Click Me!</button>
    <div slot="popup">Hello, I am a tooltip.</div>
  </APopper>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const myPopup = ref(null);

    const showPopup = () => {
      myPopup.value.show();
    };

    return {
      myPopup,
      showPopup,
    };
  },
};
</script>
```

This code will bind the `showPopup` method to the click event of the trigger button, and will open the popup by calling the `show` method of the `APopper` component.
