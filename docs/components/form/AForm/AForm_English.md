# AForm Component

The `AForm` component is a Vue3 component that allows users to define a form with custom validation rules and validation error handling. `AForm` provides options for handling validation and event bus functionality.

## Basic Usage

To use `AForm`, import it from `@any-design/anyui` package and insert it into the template. The template typically contains `a-form-item`, `a-input` and `a-select` components to create a form.

Here's a basic example of how to use `AForm`:

```html
<template>
  <a-form :model-value="form">
    <a-form-item label="Name:" prop="name">
      <a-input v-model="form.name" />
    </a-form-item>
    <a-form-item label="Email:" prop="email">
      <a-input v-model="form.email" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="handleSubmit">
      Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { ref } from 'vue';
import { AForm, AFormItem, AInput, AButton } from '@any-design/anyui';

export default {
  components: {
    AForm, AFormItem, AInput, AButton,
  },
  setup() {
    const form = ref({
      name: '',
      email: '',
    });

    const handleSubmit = async () => {
      const isValid = await formRef.validate();
      if (isValid) {
        console.log('Form submitted successfully.');
      }
    };

    const formRef = ref();

    return {
      form,
      handleSubmit,
      formRef,
    }
  }
};
</script>
```

## Props

The `AForm` component has the following props:

| Props | Type | Default Value | Description |
| ----- | ---- | ------------- | ----------- |
| modelValue | `Object` | `{}` | The form values which will be bound to this component |
| rules | `Object` | `{}` | The validation rules which can be used in async-validator |
| layout | `String` | `'default'` | The layout type of the form; can be `'default'` or `'inline'` |
| labelWidth | `String`/`Number` | `'20%'` | The width of the label; can be percentage or number |

## Exposed Event Bus

`AForm` exposes an event bus to emit events based on user interaction. The following events can be emitted:

| Event | Description |
| ----- | ----------- |
| setValid | Updates the validation states of the specified form item |
| clear | Clears form item(s) or validation states |


## Exposed Methods and Values

The `AForm` component exposes the following methods and values:

| Methods / Values | Description |
| ---------------- | ----------- |
| emitter | The event bus of the form |
| formattedLabelWidth | The formatted label width of the form |
| validate() | Validates all the form items by rules |
| validateField(field: string) | Validates a single form item by rule |
| clearField(field: string) | Clears the value of the specified form item |
| clearFields() | Clears all the values |
| clearValidation(field?:string) | Clears the validation states |

## Example

Here's an example of how to use `AForm` with some of the exposed methods:

```html
<template>
  <a-form ref="formRef" v-model="form">
    <a-form-item
      label="Name:"
      prop="name"
      :rules="{ required: true, message: 'Name is required' }"
    >
      <a-input v-model="form.name"></a-input>
    </a-form-item>
    <a-form-item
      label="Age:"
      prop="age"
      :rules="{ required: true, message: 'Age is required' }"
    >
      <a-input v-model="form.age"></a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="handleValidate">
        Validate
      </a-button>
      <a-button type="error" @click="handleClear">
        Clear Validation
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import { ref } from 'vue';
  import { AForm, AFormItem, AInput, AButton } from '@any-design/anyui';

  export default {
    components: { AForm, AFormItem, AInput, AButton },
    setup() {
      const form = ref({
        name: '',
        age: '',
      });
      const formRef = ref();
      const handleValidate = async () => {
        const isValid = await formRef.value.validate();
        if (isValid) {
          console.log('Form is valid.');
        } else {
          console.log('Form is invalid.');
        }
      };
      const handleClear = async () => {
        await formRef.value.clearValidation();
      };
      return {
        form,
        formRef,
        handleValidate,
        handleClear,
      };
    },
  };
</script>
```