# AStep

The `AStep` component is a Vue3 component, which allows you to create a step progress bar. 

## Basic Usage

The following example shows how to use this component.

```html
<template>
  <div>
    <a-step :steps="4" :current="2" />
  </div>
</template>

<script setup>
import AStep from '@any-design/anyui';

</script>
```

## Props

The `AStep` component accepts the following props:

### steps

The `steps` prop is used to pass the array or number of steps. The default value for the `steps` prop is `2`.

#### Example

```html
<template>
  <div>
    <a-step :steps="4" />
  </div>
</template>

<script setup>
import AStep from '@any-design/anyui';

</script>
```

### current

The `current` prop is used to pass the current step number. The default value for the `current` prop is `1`.

#### Example

```html
<template>
  <div>
    <a-step :steps="4" :current="2" />
  </div>
</template>

<script setup>
import AStep from '@any-design/anyui';

</script>
```

## Events

The `AStep` component doesn't emit any events.

## Exposed Methods or Values

The `AStep` component doesn't expose any methods or values.