# Component Documentation: `a-drawer`

The `a-drawer` component teleports an element to a specified target location in the DOM and displays it using transitions. This component has customizable props that allow you to control its appearance and behavior. 

## Basic Usage

The `a-drawer` can be used as follows:

```html
<template>
  <a-drawer v-model="drawerVisible" :position="position">
    <div>
      <!-- Put your content here -->
    </div>
  </a-drawer>
</template>
```
```js
<script>
  import { ref } from 'vue'
  import { DrawerPosition } from '@any-design/anyui'

  export default {
    setup() {
      const drawerVisible = ref(false)
      const position = DrawerPosition.Right
      return {
        drawerVisible,
        position
      }
    }
  }
</script>
```

## Props

| Prop | Type | Default | Description |
| ---  | ---  | ---     | ---         |
| `drawerClass` | `String` | `undefined` | The class applied to the `a-drawer` element. |
| `maskClass` | `String` | `undefined` | The class applied to the mask layer. |
| `bodyClass` | `String` | `undefined` | The class applied to the `a-drawer__body` element. |
| `appendToBody` | `Boolean` | `true` | If `true`, the `a-drawer` component is teleported to the body of the document. |
| `position` | `String` | `'left'` | The desired position of the `a-drawer` component. `'left'` or `'right'`. |
| `modelValue` | `Boolean` | `false` | The visibility value which will be bound to the component. |
| `withMask` | `Boolean` | `true` | If `true`, the mask layer will be rendered. |
| `width` | `String/Number` | `'30%'` | The width of the `a-drawer` component. A percentage or a number is acceptable. |
| `zIndex` | `Number` | `100` | The z-index value of the `a-drawer` component. |
| `maskZIndex` | `Number` | `(z-index - 1)` | The z-index value of the mask layer. |
| `transitionName` | `String` | `undefined` | The class name of the transition that the component will use when opening or closing. Ignored if not provided. |
| `lockScroll` | `Boolean` | `true` | If `true`, the lockTarget cannot be scrolled when the `a-drawer` is opening. |
| `lockTarget` | `String` | `'document.body'` | The element which will be locked. |

## Events

| Name | Description |
| --- | --- |
| `update:modelValue` | Emitted when the visibility value changes. |

## Computed

| Name | Return Type | Description |
| --- | --- | --- |
| `visible` | `ref(Boolean)` | The visibility value which is bound to the component. |
| `wrapper` | `ref(HTMLElement)` | The `a-drawer` wrapper element. |
| `maskStyles` | `computed(CSSProperties)` | The styles applied to the mask layer. |
| `drawerStyles` | `computed(CSSProperties)` | The styles applied to the `a-drawer` element. |
| `transitionForUse` | `computed(String)` | The class name of the transition that the component will use when opening or closing. |

## Methods

| Method | Description |
| --- | --- |
| `onMaskClicked` | Handles the click event on the mask layer. Sets the visibility value to `false` and emits an `update:modelValue` event. |

## Styling

Please note that this section is provided for illustrative purposes only, and you should not modify the internal styles of the `a-drawer` component.

The `a-drawer` component is styled using SCSS, which produces CSS. The CSS classes associated with this component are listed below.

| Class | Description |
| --- | --- |
| `.a-drawer` | The primary class applied to the `a-drawer` component. |
| `.a-drawer__mask` | The mask layer element inside the `a-drawer`. |
| `.a-drawer__mask--outside` | The mask layer element if it is outside the `a-drawer`. |
| `.a-drawer__body` | The content element inside the `a-drawer`. |
| `.a-drawer__body--outside` | The content element if it is outside the `a-drawer`. |
| `.a-drawer--left` | The class applied to the `a-drawer` component when `position` is set to `'left'`. |
| `.a-drawer--right` | The class applied to the `a-drawer` component when `position` is set to `'right'`. |

## Example

```html
<template>
  <a-drawer
    v-model="drawerVisible"
    :appendToBody="appendToBody"
    :position="drawerPosition"
    :withMask="withMask"
    :width="drawerWidth"
    :zIndex="drawerZIndex"
    :maskZIndex="drawerMaskZIndex"
    :transitionName="'custom-slide'"
    :lockScroll="lockScroll"
    :lockTarget="lockTarget"
    class="my-drawer-class"
    maskClass="my-drawer-mask-class"
    bodyClass="my-drawer-body-class"
  >
    <!-- Put your content here -->
  </a-drawer>
</template>

<script>
import { ref } from 'vue';
import { DrawerPosition } from '@any-design/anyui';

export default {
  setup() {
    const drawerVisible = ref(false);
    const appendToBody = true;
    const drawerPosition = DrawerPosition.Right;
    const withMask = true;
    const drawerWidth = '25%';
    const drawerZIndex = 150;
    const drawerMaskZIndex = 50;
    const lockScroll = true;
    const lockTarget = '.my-lock-target';
    return {
      drawerVisible,
      appendToBody,
      drawerPosition,
      withMask,
      drawerWidth,
      drawerZIndex,
      drawerMaskZIndex,
      lockScroll,
      lockTarget,
    };
  },
};
</script>

<style lang="scss">
.my-drawer-class {
  // Add your styles here
}
.my-drawer-mask-class {
  // Add your styles here
}
.my-drawer-body-class {
  // Add your styles here
}
@keyframes custom-slide {
  from {
    opacity: 0;
    transform: translateX(-50%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.custom-slide-enter-active,
.custom-slide-leave-active {
  animation: custom-slide 300ms ease-in-out;
}
.custom-slide-enter-from,
.custom-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}
.custom-slide-enter-to,
.custom-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
```