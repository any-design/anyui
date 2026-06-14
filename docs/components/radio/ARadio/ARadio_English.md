# ARadio

`ARadio` is a standalone radio control. Set its `label` and drive its `checked` state — most commonly it lives inside an `ARadioGroup`, but you can use it directly for simple binary picks where you manage selection yourself.

## Import

```ts
import { Radio } from '@any-design/anyui/vue';
// React:  import { Radio } from '@any-design/anyui/react';
// Svelte: import { Radio } from '@any-design/anyui/svelte';
```

## Basic usage

Render a single radio and react to `change`.

```vue
<template>
  <ARadio label="Option A" :checked="true" @change="onChange" />
</template>

<script setup>
const onChange = (checked) => console.log('checked:', checked);
</script>
```

## Examples

### With a label

The `label` prop renders text next to the radio dot.

```vue
<template>
  <ARadio label="Ship to home" :checked="ship" @change="ship = $event" />
</template>

<script setup>
import { ref } from 'vue';
const ship = ref(true);
</script>
```

### Two standalone radios

When used outside a group, manage `checked` yourself to enforce single selection.

```vue
<template>
  <div class="demo-col">
    <ARadio label="Credit card" :checked="method === 'card'" @change="method = 'card'" />
    <ARadio label="PayPal" :checked="method === 'paypal'" @change="method = 'paypal'" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const method = ref('card');
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | String | '' | Label text. |
| `checked` | Boolean | false | Checked state. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `change` | Boolean | Emitted when toggled (typically used inside a group). |
