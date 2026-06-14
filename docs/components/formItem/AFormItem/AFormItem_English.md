# AFormItem

`AFormItem` is a labeled field wrapper used inside `AForm`. Set `label` for the caption and `prop` to bind the item to a key of the form's model — `prop` is what the parent `AForm` uses to run validation and display error messages for that field.

## Import

```ts
import { FormItem } from '@any-design/anyui/vue';
// React:  import { FormItem } from '@any-design/anyui/react';
// Svelte: import { FormItem } from '@any-design/anyui/svelte';
```

## Basic usage

Wrap a control, give it a `label`, and set `prop` to the matching model key.

```vue
<template>
  <AFormItem label="Email" prop="email">
    <AInput v-model="model.email" placeholder="you@example.com" />
  </AFormItem>
</template>

<script setup>
import { reactive } from 'vue';
const model = reactive({ email: '' });
</script>
```

## Examples

### Inside a form context

Place several `AFormItem`s inside an `AForm` and pass the shared `model`; `prop` on each item ties the field to validation.

```vue
<template>
  <AForm :model="model">
    <AFormItem label="Username" prop="username">
      <AInput v-model="model.username" />
    </AFormItem>
    <AFormItem label="Password" prop="password">
      <AInput v-model="model.password" type="password" />
    </AFormItem>
  </AForm>
</template>

<script setup>
import { reactive } from 'vue';
const model = reactive({ username: '', password: '' });
</script>
```

### Any control in the slot

The default slot accepts any input control — selects, textareas, or sliders.

```vue
<template>
  <AFormItem label="Country" prop="country">
    <AInput v-model="model.country" placeholder="Select country" />
  </AFormItem>
</template>

<script setup>
import { reactive } from 'vue';
const model = reactive({ country: '' });
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `prop` | String | undefined | Model key this item binds to (used for validation). |
| `label` | String | undefined | Label text. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | The form control. |
