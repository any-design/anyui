# AOtpInput

`AOtpInput` is a one-time-password / verification-code input. It splits the code into `length` cells (default 6), supports paste, auto-advance, a masked mode for sensitive codes, and emits `complete` when every cell is filled — ideal for SMS / authenticator sign-in flows.

## Import

```ts
import { OtpInput } from '@any-design/anyui/vue';
// React:  import { OtpInput } from '@any-design/anyui/react';
// Svelte: import { OtpInput } from '@any-design/anyui/svelte';
```

## Basic usage

Bind the code with `v-model`; the default length is 6.

```vue
<template>
  <AOtpInput v-model="code" />
  <p>Code: {{ code }}</p>
</template>

<script setup>
import { ref } from 'vue';
const code = ref('');
</script>
```

## Examples

### Masked code

Set `masked` to hide typed digits as dots, useful for PIN entry.

```vue
<template>
  <AOtpInput v-model="pin" :length="4" masked />
</template>

<script setup>
import { ref } from 'vue';
const pin = ref('');
</script>
```

### Auto-focus and complete handler

`autoFocus` focuses the first cell on mount; `complete` fires once all cells are filled, perfect for auto-submitting a verification code.

```vue
<template>
  <AOtpInput v-model="code" :length="6" autoFocus @complete="onComplete" />
</template>

<script setup>
import { ref } from 'vue';
const code = ref('');
const onComplete = (val) => {
  console.log('verifying:', val);
  // call your verification API here
};
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | String | '' | Current code (`v-model`). |
| `length` | Number | 6 | Number of cells. |
| `disabled` | Boolean | false | Disabled. |
| `masked` | Boolean | false | Mask digits as dots. |
| `autoFocus` | Boolean | false | Focus the first cell on mount. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | String | Code change. |
| `complete` | String | Emitted once all cells are filled. |
