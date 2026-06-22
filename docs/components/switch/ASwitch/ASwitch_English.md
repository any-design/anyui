# ASwitch

`ASwitch` is a compact boolean toggle for enabling or disabling a setting. Bind it with `v-model` and listen for `change` when you need to react to user interaction.

## Import

```ts
import { Switch } from '@any-design/anyui/vue';
// React:  import { Switch } from '@any-design/anyui/react';
// Svelte: import { Switch } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <ASwitch v-model="enabled" />
</template>
```

## Examples

### Disabled

Use `disabled` to show a read-only switch that cannot be toggled.

```vue
<template>
  <ASwitch v-model="enabled" disabled />
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | Boolean | false | Checked state (`v-model`). |
| `disabled` | Boolean | false | Prevents interaction. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | Boolean | Emitted when the value changes. |
| `change` | Boolean | Emitted after user interaction changes the value. |
