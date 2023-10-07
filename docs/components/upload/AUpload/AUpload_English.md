# AUpload component documentation

This component is designed as a drag-and-drop file uploader.

## Basic usage and examples

Using the `AUpload` component, you can create a drag-and-drop area for file uploading:

```vue
<template>
  <AUpload />
</template>
```

## Props

The component accepts the following props:

| Property  | Type    | Default value | Description                                                                                                 |
| --------- | ------- | ------------- | ----------------------------------------------------------------------------------------------------------- |
| status    | String  | ''            | The upload status of the uploader, can be 'default', 'uploading', 'error', or 'success'.                    |
| clickable | Boolean | true          | If set to true, the uploader will be clickable.                                                             |
| disabled  | Boolean | false         | Disables the uploader when set to true. While disabled, it won't respond to any click or drop behaviours. |

- status: The upload status of the uploader; it can be 'default', 'uploading', 'error', or 'success'. The default value is an empty string ''.
- clickable: If set to true, the uploader will be clickable. The default value is true.
- disabled: If set to true, the uploader will be disabled; it won't respond to any click or drop behaviours. This property is useful when you do not want to trigger another upload operation while the file is uploading. The default value is false.

Example:

```vue
<template>
  <AUpload status="uploading" :clickable="false" :disabled="true" />
</template>
```

## Events

This component emits the following event:

| Event  | Value Type | Description                                                      |
| ------ | ---------- | ---------------------------------------------------------------- |
| upload | File       | Triggered when a file is chosen or dropped in the uploader by the user. The input value is the file that the user chose or dropped. |

Example:

```vue
<template>
  <AUpload @upload="handleUpload" />
</template>

<script>
export default {
  methods: {
    handleUpload(file) {
      console.log(file);
    },
  },
};
</script>
```

Please note that this component does not handle the upload operation itself. It's just a template and supports exposing dropped files to its parent. The parent component should handle the uploaded file properly.