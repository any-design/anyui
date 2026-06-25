# AForm

`AForm` is a validation-powered container that coordinates `AFormItem` children. Pass a `modelValue` object and a `rules` map keyed by field name, then call the exposed `validate()` method (via a template ref) to run validation before submit.

## Import

```ts
import { Form, FormItem } from '@any-design/anyui/vue';
// React:  import { Form, FormItem } from '@any-design/anyui/react';
// Svelte: import { Form, FormItem } from '@any-design/anyui/svelte';
```

## Basic usage

A login form with two required fields. `validate()` resolves with a boolean.

```vue
<template>
  <AForm ref="formRef" :model-value="model" :rules="rules">
    <AFormItem prop="email" label="Email">
      <AInput v-model="model.email" placeholder="you@anyui.dev" />
    </AFormItem>
    <AFormItem prop="password" label="Password">
      <AInput v-model="model.password" type="password" />
    </AFormItem>
    <AButton type="primary" @click="onSubmit">Sign in</AButton>
  </AForm>
</template>

<script setup>
import { ref } from 'vue';
const formRef = ref();
const model = ref({ email: '', password: '' });
const rules = {
  email: [{ required: true, message: 'Email is required' }],
  password: [{ required: true, message: 'Password is required' }],
};
const onSubmit = async () => {
  const ok = await formRef.value.validate();
  if (ok) console.log('submit', model.value);
};
</script>
```

## Examples

### Inline layout

Set `layout="inline"` to render items horizontally — good for filter bars.

```vue
<template>
  <AForm :model-value="model" :rules="rules" layout="inline">
    <AFormItem prop="keyword" label="Search">
      <AInput v-model="model.keyword" />
    </AFormItem>
    <AButton type="primary">Apply</AButton>
  </AForm>
</template>

<script setup>
import { ref } from 'vue';
const model = ref({ keyword: '' });
const rules = { keyword: [{ required: true, message: 'Required' }] };
</script>
```

### Programmatic validation and reset

Use the exposed methods to validate a single field, clear validation, or clear values.

```vue
<template>
  <div class="demo-col">
    <AForm ref="formRef" :model-value="model" :rules="rules">
      <AFormItem prop="name" label="Name">
        <AInput v-model="model.name" />
      </AFormItem>
    </AForm>
    <div class="demo-row">
      <AButton @click="formRef.validateField('name')">Check name</AButton>
      <AButton @click="formRef.clearValidation()">Reset errors</AButton>
      <AButton @click="formRef.clearFields()">Clear values</AButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const formRef = ref();
const model = ref({ name: '' });
const rules = { name: [{ required: true, message: 'Name is required' }] };
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | Object | undefined | The form model object. |
| `rules` | Record<string, FormRuleItem[]> | undefined | Validation rules keyed by field name. |
| `layout` | 'default' \| 'inline' | 'default' | Stacked or inline layout. |
| `labelWidth` | String \| Number | '20%' | Width of the label column. |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `validate` | () => Promise<boolean> | Validate the whole form; resolves with overall validity. |
| `validateField` | (field) => Promise<boolean> | Validate a single field. |
| `clearField / clearFields` | (field?) => void | Clear value(s) and validation state. |
| `clearValidation` | (field?) => void | Clear validation messages only. |
