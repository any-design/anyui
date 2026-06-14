# AInput

`AInput` is a text field for single-line user input. It supports `v-model` binding, three sizes, prefix/postfix adornment slots, password and other native types, and emits a `submit` event on Enter.

## Import

```ts
import { Input } from '@any-design/anyui/vue';
// React:  import { Input } from '@any-design/anyui/react';
// Svelte: import { Input } from '@any-design/anyui/svelte';
```

## Basic usage

Bind the value with `v-model` and set a placeholder.

```vue
<template>
  <AInput v-model="value" placeholder="Your name" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref('');
</script>
```

## Examples

### Sizes and round

```vue
<template>
  <div class="demo-col">
    <AInput size="small" placeholder="Small" />
    <AInput placeholder="Default" />
    <AInput size="large" placeholder="Large" />
    <AInput round placeholder="Rounded" />
  </div>
</template>
```

### States

Use `disabled` to grey out the field and `readonly` to make it selectable but not editable.

```vue
<template>
  <div class="demo-col">
    <AInput model-value="read only" readonly />
    <AInput model-value="disabled" disabled />
    <AInput placeholder="Borderless" borderless />
  </div>
</template>
```

### Password and submit

Set `type="password"` for masked entry. The `submit` event fires when the user presses Enter, carrying the current value.

```vue
<template>
  <AInput v-model="pw" type="password" placeholder="Password" @submit="onSubmit" />
</template>

<script setup>
import { ref } from 'vue';
const pw = ref('');
const onSubmit = (value) => console.log('submitted:', value);
</script>
```

### Prefix, postfix and post-button slots

The `prefix` and `postfix` slots render adornments inside the field (commonly icons), while `post-button` adds a clickable trailing button — perfect for a search box.

```vue
<template>
  <AInput v-model="q" placeholder="Search…">
    <template #prefix><AIcon name="ri:search-line" /></template>
    <template #post-button>
      <AButton type="primary" size="small" @click="search">Go</AButton>
    </template>
  </AInput>
</template>

<script setup>
import { ref } from 'vue';
const q = ref('');
const search = () => console.log(q.value);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | String \| Number | '' | Bound value; use `v-model` (Vue) / `bind:` (Svelte) / `value` + `onUpdateModelValue` (React). |
| `placeholder` | String | '' | Placeholder text. |
| `width` | String \| Number | '100%' | Width of the input (number → px). |
| `size` | 'default' \| 'small' \| 'large' | 'default' | Input size. |
| `round` | Boolean | false | Pill-shaped rounded input. |
| `borderless` | Boolean | false | Removes the default border. |
| `disabled` | Boolean | false | Disables the input. |
| `readonly` | Boolean | false | Makes the input read-only. |
| `editable` | Boolean | true | When false, the field cannot be edited (still focusable). |
| `type` | String | undefined | Native input `type`, e.g. `password`, `file`, `number`. |
| `max / min` | Number | undefined | Native numeric bounds (for `type="number"`). |
| `maxlength / minlength` | Number | undefined | Native length constraints. |
| `autocomplete` | String | 'off' | Native autocomplete attribute. |
| `prefixPadding / postfixPadding` | Number | undefined | Manual padding (px) for the prefix/postfix area when `measureSlots` is off. |
| `measureSlots` | Boolean | true | Auto-measure prefix/postfix slot widths to pad the text area. (Vue only.) |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | String \| Number | Emitted on every value change. |
| `input` | InputEvent | Native input event. |
| `change` | InputEvent | Native change event. |
| `submit` | String | Emitted with the current value on Enter. |
| `blur` | FocusEvent | Native blur event. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `prefix` | — | Content rendered before the text (e.g. an icon). |
| `postfix` | — | Content rendered after the text. |
| `post-button` | — | A clickable button after the text. |
