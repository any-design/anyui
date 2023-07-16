# AUpload Component

The `AUpload` component is a template that supports exposing dropped files to its parent. This component doesn't trigger or handle any upload operation by itself. It has four different upload statuses, which are 'default', 'uploading', 'error', and 'success'. Moreover, it can be clickable and has drag and drop feature.

## Basic usage

To use the component, you need to import it from the "@any-design/anyui" package and include the "a-upload" tag in your template.

```html
<template>
  <a-upload />
</template>

<script setup lang="ts">
  import { AUpload } from '@any-design/anyui';
</script>
```

You can also add slots inside AUpload component based on its status.

```html
<template>
  <a-upload>
    <span slot="dragging">Drop file here</span>
    <span slot="error">Failed: file size too large</span>
  </a-upload>
</template>
```

## Props

The following props are available in the `AUpload` component.

| Prop      | Type    | Default | Description                                                                                   |
| --------- | ------- | ------- | --------------------------------------------------------------------------------------------- |
| status    | String  | `''`    | The upload status of the uploader, can be `'default'`, `'uploading'`, `'error'`, `'success'`. |
| clickable | Boolean | `true`  | If `true`, the uploader will be clickable.                                                    |

### status

The `status` prop determines the current status of the `AUpload` component. The available options are `'default'`, `'uploading'`, `'error'`, and `'success'`.

```html
<template>
  <a-upload :status="'uploading'" />
</template>
```

### clickable

The `clickable` prop determines whether the AUpload component is clickable or not. If `true`, you can click it to select files.

```html
<template>
  <a-upload :clickable="false" />
</template>
```

## Events

The `AUpload` component emits only one event, which is `'upload'`. This event is triggered when a file is chosen by the user or be dropped in the uploader by the user. The first argument of the event is the File object.

```vue
<template>
  <a-upload @upload="handleUpload" />
</template>

<script setup lang="ts">
import { AUpload } from '@any-design/anyui';

const handleUpload = (file) => {
  console.log('Selected file: ', file);
};
</script>
```

## Exposed Methods or Values

The `AUpload` component has no exposed methods or values.
