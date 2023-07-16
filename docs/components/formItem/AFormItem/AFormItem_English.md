# AFormItem Component

`AFormItem` is a Vue component that defines a form item that can be used to lay out form data. It is a child component within `AForm`. The component has props to handle the form data labeling. It also emits events to `AForm`.

## Basic Usage

To use `AFormItem`, we can import it into our Vue component and use it in the template:

```vue
<template>
  <AFormItem label="Username" prop="username">
    <input type="text" v-model="username" />
  </AFormItem>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AFormItem from '@any-design/anyui/lib/form-item';

export default defineComponent({
  components: {
    AFormItem,
  },
  setup() {
    const username = ref('');

    return {
      username,
    };
  },
});
</script>
```

Here, we have an `AFormItem` component being used to label an input field. We pass in the `label` and `prop` props to label the field and define its corresponding property in the form data. We then use the `slot` to pass in the input field.

## Props

`AFormItem` has two props that can be passed into it.

### 1. prop

- **type:** `string`
- **description:** The name of the form data property that this input will be bound to.

```vue
<AFormItem label="Username" prop="username">
  <input type="text" v-model="username" />
</AFormItem>
```

In this example, we pass in `prop="username"` as a prop to the component, meaning that this input field will be bound to the `username` property in the form data.

### 2. label

- **type:** `string`
- **description:** The text to be displayed next to the input.

```vue
<AFormItem label="Username" prop="username">
  <input type="text" v-model="username" />
</AFormItem>
```

In this example, we pass in `label="Username"` as a prop to the component, meaning that the text "Username" will be displayed next to the input field.

## Events

`AFormItem` emits two events.

### 1. setValid

- **payload:** `{ field: string, isValid: boolean, message?: string }`
- **description:** Emits when the validity of the form field changes. The `field` property is the name of the property in the form data that corresponds to the input field. The `isValid` property is a boolean that indicates if the field is valid or not. The `message` property is an optional string that represents an error message that can be displayed to the user.

```vue
<AFormItem label="Username" prop="username">
  <input type="text" v-model="username" />
</AFormItem>
```

In this example, the component will emit a `setValid` event with the appropriate payload when the validity of the input field changes.

### 2. clear

- **payload:** `{ type: string, field?: string }`
- **description:** Emits when the form needs to be cleared. The `type` property indicates what type of clear operation needs to be performed. If `type` is `'all'`, then all form data will be cleared. If `type` is `'field'`, then only the field specified by the `field` property will be cleared.

```vue
<AFormItem label="Username" prop="username">
  <input type="text" v-model="username" />
</AFormItem>
```

In this example, the component will emit a `clear` event with the appropriate payload when form clearing is needed.

## Exposed Values

`AFormItem` exposes a value to the parent component.

### emitter

- **type:** `FormEventEmitter`
- **description:** An event emitter for the component that can emit `setValid` and `clear` events.

```vue
<template>
  <AForm>
    <AFormItem label="Username" prop="username" v-slot="{ emitter }">
      <input
        type="text"
        v-model="username"
        @blur="emitter.emit('setValid', { field: 'username', isValid: username !== '' })"
      />
    </AFormItem>
  </AForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AFormItem from '@any-design/anyui/lib/form-item';
import AForm from '@any-design/anyui/lib/form';
import { FormEventEmitter } from '@any-design/anyui/lib/form/bus';

export default defineComponent({
  components: {
    AFormItem,
    AForm,
  },
  setup() {
    const username = ref('');

    return {
      username,
    };
  },
});
</script>
```

In this example, we use the `emitter` value exposed by `AFormItem` to emit a `setValid` event when the input field is blurred. The parent `AForm` component can then use that event to determine if the form is valid or not.
