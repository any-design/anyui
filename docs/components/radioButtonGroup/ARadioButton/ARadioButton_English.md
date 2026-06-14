# ARadioButton

ARadioButton is a single button-style radio, exported alongside ARadioButtonGroup.

## Import

```ts
import { RadioButton } from '@any-design/anyui/vue';
```

For React and Svelte, import from `@any-design/anyui/react` and `@any-design/anyui/svelte` respectively — the component API is identical.

## Basic Usage

```vue
<template>
  <ARadioButton />
</template>

<script setup>
import { RadioButton } from '@any-design/anyui/vue';
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | String | '' | Label shown on the button. |
| `value` | String \| Number | undefined | Value this button represents. |
| `disabled` | Boolean | false | Disabled. |
