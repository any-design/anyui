# @any-design/anyui - A-Tag Component

The A-Tag component is designed to show a clickable tag. It has various available features that can customize the tag's size, shape, color, and text.

## Basic Usage

```html
<template>
  <a-tag>Default Tag</a-tag>
  <a-tag round> Round Tag</a-tag>
  <a-tag size="small" color="#1faeff">Custom Tag</a-tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ATag from '@any-design/anyui';

export default defineComponent({
  components: { ATag },
});
</script>
```

## Props

| Prop Name | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| `round` | Boolean | `false` | If `true`, the tag will have a rounded border. |
| `size` | String | `default` | Sets the size of the tag. Default values are `default`, `small`, and `large`. |
| `color` | String | `null` | Sets the background color of the tag in hexadecimal format. |

## Events

The A-Tag component emits no events.

## Exposed Methods or Values

The A-Tag component provides no exposed methods or values.  

**Note:** The styles from internal <style> tags have not been explained here, they are not part of the component's API.