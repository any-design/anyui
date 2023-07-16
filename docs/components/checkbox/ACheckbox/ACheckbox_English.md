# ACheckbox Component

The `ACheckbox` component is a Vue component that allows the user to select an item by clicking an icon. The component provides an option for a label after the checkbox, a check icon to be shown if the checkbox is checked, and a bound value to the component.

## Basic Usage

```vue
<template>
  <a-checkbox label="anyui checkbox" v-model="checked" />
</template>

<script>
import { defineComponent, ref } from 'vue';
import { ACheckbox } from '@any-design/anyui';

export default defineComponent({
  components: {
    ACheckbox,
  },
  setup() {
    const checked = ref(false);

    return {
      checked,
    };
  },
});
</script>
```

## Props

### label

- Type: `String`

A label text after the checkbox.

Example:

```vue
<a-checkbox label="anyui checkbox" />
```

### checkIcon

- Type: `String`
- Default: `'si-glyph:checked'`

The icon which will be showed when the checkbox is checked.

Example:

```vue
<a-checkbox check-icon="fas fa-check-circle" />
```

### modelValue

- Type: `Boolean`
- Default: `false`

The value which will be bound to this component.

Example:

```vue
<a-checkbox v-model="checked" />
```

### iconTransition

- Type: `String`
- Default: `'a-trans-check-icon'`

The class name of icon for transition.

Example:

```vue
<a-checkbox icon-transition="a-example-icon-transition" />
```

## Events

### change

- Payload: `Boolean`

Emits when the value changed. With the new value.

Example:

```vue
<a-checkbox @change="onChange" />

<script>
export default {
  methods: {
    onChange(newValue) {
      console.log(newValue);
    },
  },
};
</script>
```

### update:modelValue

- Payload: `Boolean`

Emits when the value changed and will update the value in parent.

Example:

```vue
<a-checkbox v-model="checked" />

<script>
export default {
  data() {
    return {
      checked: false,
    };
  },
};
</script>
```

## Exposed Methods and Values

### checked

- Type: `ref<Boolean>`

The value of the checkbox, and it is reactive.

Example:

```vue
<template>
  <a-checkbox v-model="checked" />
  {{ checked }} // true/false
</template>

<script>
import { ref } from 'vue';
import { ACheckbox } from '@any-design/anyui';

export default {
  components: {
    ACheckbox,
  },
  setup() {
    const checked = ref(false);

    return {
      checked,
    };
  },
};
</script>
```
