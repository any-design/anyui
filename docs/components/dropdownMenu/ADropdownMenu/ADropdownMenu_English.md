# ADropdownMenu

`ADropdownMenu` is a feature-rich dropdown menu. Each item can have an `icon`, be `disabled`, flagged as `danger`, or `divided` from the previous item. Trigger it on click or hover, and listen to the `command` event to react to selections.

## Import

```ts
import { DropdownMenu } from '@any-design/anyui/vue';
// React:  import { DropdownMenu } from '@any-design/anyui/react';
// Svelte: import { DropdownMenu } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <ADropdownMenu :items="items" @command="onCommand">
    <AButton>Actions</AButton>
  </ADropdownMenu>
</template>

<script setup>
const items = [
  { command: 'edit', label: 'Edit', icon: 'ri:edit-line' },
  { command: 'duplicate', label: 'Duplicate' },
  { command: 'delete', label: 'Delete', danger: true, divided: true },
];
const onCommand = (cmd) => console.log('command:', cmd);
</script>
```

## Examples

### Hover trigger

Set `triggerType="hover"` to open on hover instead of click.

```vue
<template>
  <ADropdownMenu :items="items" trigger-type="hover">
    <AClickableText type="primary">Hover me</AClickableText>
  </ADropdownMenu>
</template>

<script setup>
const items = [
  { command: 'profile', label: 'Profile' },
  { command: 'logout', label: 'Log out' },
];
</script>
```

### Disabled item

Set `disabled: true` on an item to grey it out.

```vue
<template>
  <ADropdownMenu :items="items">
    <AButton>Menu</AButton>
  </ADropdownMenu>
</template>

<script setup>
const items = [
  { command: 'save', label: 'Save' },
  { command: 'export', label: 'Export', disabled: true },
];
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | Array<{ command, label, icon?, disabled?, danger?, divided? }> | [] | Menu items. |
| `triggerType` | 'click' \| 'hover' | 'click' | Open trigger. |
| `placement` | Placement | 'bottom-start' | Popper placement. |
| `disabled` | Boolean | false | Disable the menu. |
| `hideAfterClick` | Boolean | true | Hide the menu after an item is clicked. |
| `width` | Number \| String | undefined | Menu width. |
| `offset` | Number | 12 | Offset (px) from the trigger. |
| `hideDelay` | Number | 100 | Hide delay (ms). |
| `zIndex` | Number | 3000 | z-index. |
| `appendToBody` | Boolean | true | Append to body. |
| `transition` | String | 'a-trans-popmenu' | Transition name. |
| `popupClass / menuClass` | String | undefined | Class hooks. |
| `group` | String | '' | Shared popper group (closes others in the same group). |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `command` | (command, item) | Item clicked. |
| `visible-change` | Boolean | Open/close. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Trigger element. |
| `item` | { item } | Override per-row render. |
