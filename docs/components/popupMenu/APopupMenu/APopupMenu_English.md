# @any-design/anyui APopupMenu Component

The @any-design/anyui APopupMenu component is a menu based on the Popper component. This component provides a dropdown menu that appears when the user interacts with it. It is highly customizable and allows you to specify various placement and styling options. 

## Basic Usage

```html
<template>
  <a-popup-menu :items="myMenuItems">
    <span>Open Menu</span>
  </a-popup-menu>
</template>

<script>
import APopupMenu from '@any-design/anyui/components/popup-menu';

export default {
  components: { APopupMenu },
  data() {
    return {
      myMenuItems: ['Option A', 'Option B', 'Option C'],
    };
  },
};
</script>
```

## Props

The following props can be passed to the @any-design/anyui APopupMenu component:

| Prop         | Type                     | Default  | Description                                                                                        |
| ------------ | ------------------------| -------- | -------------------------------------------------------------------------------------------------- |
| placement    | String                   | 'bottom' | The placement position of the popper.                                                              |
| offset       | Number                   | 12       | The menu position offset to the trigger element, unit is px.                                        |
| items        | Array of strings/objects | []       | An array of items to render in the menu. Each item can be a string or an object with the PopMenuItem type |
| width        | Number                   | 180      | The width of the menu.                                                                             |
| hideDelay    | Number                   | 100      | The menu hide delay when the mouse moves out of the menu popper.                                    |
| zIndex       | Number                   | 3000     | The z-index of the menu popper.                                                                    |
| appendToBody | Boolean                  | true     | If true, the menu will be appended to the body.                                                    |
| transition   | String                   | 'a-trans-popmenu' | The transition class name.                                                               |
| popupClass   | String                   | N/A      | The class applied to the popup.                                                                    |
| menuClass    | String                   | N/A      | The class applied to the menu.                                                                     |
| hideAfterClick | Boolean                | false    | If true, menu will hide itself automatically after user clicking a menu item.                      |

## Events

The @any-design/anyui APopupMenu component emits a single 'command' event with a string parameter when a user clicks an item in the menu. The string parameter is the key of the clicked item. It can be used like this:

```html
<template>
  <a-popup-menu :items="myMenuItems" @command="onCommand">
    <span>Open Menu</span>
  </a-popup-menu>
</template>

<script>
import APopupMenu from '@any-design/anyui/components/popup-menu';

export default {
  components: { APopupMenu },
  data() {
    return {
      myMenuItems: ['Option A', 'Option B', 'Option C'],
    };
  },
  methods: {
    onCommand(key) {
      // Handle the clicked menu item
    },
  },
};
</script>
```

## Computed Properties

The following computed property can be used in the @any-design/anyui APopupMenu component's template:

### menuStyle

Returns an object that sets the width of the menu based on the width prop. The value is in the format { width: "value" } where "value" is a string representation of the width in pixels. Example:

```html
<template>
  <a-popup-menu :items="myMenuItems">
    <span>Open Menu</span>
  </a-popup-menu>
</template>

<script>
import APopupMenu from '@any-design/anyui/components/popup-menu';

export default {
  components: { APopupMenu },
  data() {
    return {
      myMenuItems: ['Option A', 'Option B', 'Option C'],
    };
  },
  computed: {
    menuStyle() {
      return { width: '300px' };
    },
  },
};
</script>
```

## Methods

The following method can be used in the @any-design/anyui APopupMenu component:

### getItemKey(item)

Retrieves the key of the given item in the menu. The method returns the value of the 'key' property if it exists, otherwise it returns the 'name' property of the item. If the item is a string, it returns the item value. Example:

```html
<template>
  <a-popup-menu :items="myMenuItems">
    <span>Open Menu</span>
  </a-popup-menu>
</template>

<script>
import APopupMenu from '@any-design/anyui/components/popup-menu';

export default {
  components: { APopupMenu },
  data() {
    return {
      myMenuItems: [
        { key: 'option-a', name: 'Option A' },
        { key: 'option-b', name: 'Option B' },
        'Option C',
      ],
    };
  },
  methods: {
    handleItemClick(item) {
      const key = this.getItemKey(item);
      
      // ...
    },
  },
};
</script>
```

### getItemName(item)

Retrieves the name of the given item in the menu. The method returns the 'name' property of the item. If the item is a string, it returns the item value. Example:

```html
<template>
  <a-popup-menu :items="myMenuItems">
    <span>Open Menu</span>
  </a-popup-menu>
</template>

<script>
import APopupMenu from '@any-design/anyui/components/popup-menu';

export default {
  components: { APopupMenu },
  data() {
    return {
      myMenuItems: ['Option A', 'Option B', 'Option C'],
    };
  },
  methods: {
    handleItemClick(item) {
      const name = this.getItemName(item);
      
      // ...
    },
  },
};
</script>
```

## Styling

The following CSS can be used to style the @any-design/anyui APopupMenu component:

```scss
.a-popup-menu {
  border-radius: 12px;
  background: var(--bg-semi-light);
  box-sizing: border-box;
  padding: 8px 0;
  box-shadow: 0 4px 12px var(--shadow-10);
  overflow: hidden;

  &__item {
    padding: 8px 16px;
    line-height: 24px;
    font-size: 15px;
    user-select: none;
    transition: background-color var(--anim-duration, 200ms) ease;
  }

  &__item:hover {
    background-color: var(--bg-semi-dark);
    cursor: pointer;
  }
}

.a-trans-popmenu-enter-active,
.a-trans-popmenu-leave-active {
  transition: opacity var(--anim-duration-quick, 100ms) ease-out,
    transform var(--anim-duration-quick, 100ms) ease-out,
    max-height var(--anim-duration-quick, 100ms) ease-out;
}
.a-trans-popmenu-enter-to {
  opacity: 1;
  transform: translateY(0px);
  max-height: max-content;
}
.a-trans-popmenu-enter-from,
.a-trans-popmenu-leave-to {
  opacity: 0.4;
  transform: translateY(-12px);
  max-height: 0;
}
```
Note: Any variable that starts with "--" is a CSS custom property and needs to be defined elsewhere in the CSS.