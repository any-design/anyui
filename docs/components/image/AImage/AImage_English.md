## @any-design/anyui AImage Component

The `AImage` component is designed to display an image with customized styles and handle loading and error states.

### Basic Usage

```vue
<template>
  <AImage src="[Image URL]"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AImage from '@any-design/anyui';

export default defineComponent({
  components: {
    AImage,
  },
});
</script>
```

### Props

The component can receive the following props:

#### src

- Type: String
- Required: Yes

The source URL of the image.

#### width

- Type: String | Number
- Default: `'100%'`

The width of the image, which can be either a percentage or a number.

#### height

- Type: String | Number
- Default: `'100%'`

The height of the image, which can be either a percentage or a number.

#### size

- Type: String
- Default: `'cover'`

The size style string of the image, same as background-size.

#### position

- Type: String
- Default: `'center'`

The position style string of the image, same as background-position.

#### repeat

- Type: String
- Default: `'no-repeat'`

The repeat mode of the image, same as background-repeat.

### Events

The `AImage` component will emit the following events:

#### load

Emitted when the image starts loading.

#### loaded

Emitted when the image has finished loading.

#### error

Emitted when an error occurs during the loading process.

### Exposed Methods and Values

The `AImage` component does not expose any additional methods or values.