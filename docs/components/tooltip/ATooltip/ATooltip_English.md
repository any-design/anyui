# ATooltip

`ATooltip` shows a small informational bubble on hover (default) or click. Set `content` for the text, `placement` for position, and use the `content` slot for rich tooltip bodies.

## Import

```ts
import { Tooltip } from '@any-design/anyui/vue';
// React:  import { Tooltip } from '@any-design/anyui/react';
// Svelte: import { Tooltip } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <ATooltip content="Save your changes">
    <AButton type="primary">Save</AButton>
  </ATooltip>
</template>
```

## Examples

### Placement

`placement` accepts any Popper.js position (`top`, `bottom`, `left`, `right`, and their `-start` / `-end` variants).

```vue
<template>
  <ATooltip content="Bottom tooltip" placement="bottom">
    <AButton>Hover me</AButton>
  </ATooltip>
</template>
```

### Click trigger and custom content

Use `triggerType="click"` for click-to-open, and the `content` slot for rich bodies.

```vue
<template>
  <ATooltip trigger-type="click" placement="right">
    <AClickableText type="primary">What's this?</AClickableText>
    <template #content>
      <strong>Tip:</strong> You can put any content here.
    </template>
  </ATooltip>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | String | '' | Tooltip text. |
| `placement` | Placement | 'top' | Placement. |
| `triggerType` | 'click' \| 'hover' | 'hover' | Trigger type. |
| `offset` | Number | 8 | Offset (px). |
| `disabled` | Boolean | false | Disable the tooltip. |
| `maxWidth` | Number \| String | 260 | Max width of the bubble. |
| `openDelay` | Number | 0 | Open delay (ms). |
| `hideDelay` | Number | 100 | Hide delay (ms). |
| `zIndex` | Number | 3000 | z-index. |
| `appendToBody` | Boolean | true | Append to body. |
| `transition` | String | 'a-trans-popmenu' | Transition name. |
| `popupClass` | String | undefined | Class hook. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `visible-change` | Boolean | Open/close. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Trigger element. |
| `content` | — | Overrides the `content` prop. |
