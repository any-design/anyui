# AUpload 组件文档

这个组件是一个文件上传组件，能够接收用户的文件上传操作，包括点击事件和拖动事件，并且提供对上传状态的展示插槽。

## 基本用法和示例

使用 `AUpload` 组件，可以创建一个文件上传器，用户可以通过点击或拖拽文件到组件区域进行上传：

```vue
<template>
  <AUpload @upload="handleUpload">
    <template #default>点击或拖动文件到此上传</template>
    <template #uploading>上传中...</template>
    <template #error>上传失败</template>
    <template #success>上传成功</template>
  </AUpload>
</template>

<script>
export default {
  methods: {
    handleUpload(file) {
      console.log('文件上传', file);
    },
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名    | 类型    | 默认值 | 说明                                                                |
| --------- | ------- | ------ | ------------------------------------------------------------------- |
| status    | String  | ''     | 上传组件的状态，可以为 'default'、'uploading'、'error'、'success'。 |
| clickable | Boolean | true   | 是否可以点击上传组件上传文件。                                      |
| disabled  | Boolean | false  | 是否禁用上传组件。                                                  |

- status: 上传组件的状态，类型为 String，默认为空字符串 ''。它的值可以为 'default'、'uploading'、'error'、'success'，对应不同的上传状态。
- clickable: 是否可以点击上传组件上传文件，类型为 Boolean，默认为 true。在它的值为 true 时，用户可以点击上传组件上传文件。
- disabled: 是否禁用上传组件，类型为 Boolean，默认为 false。在它的值为 true 时，上传组件将不响应任何点击或拖动的行为。

## Events

本组件会触发以下事件：

- upload：当用户选择了一个文件或者把一个文件拖到上传组件上时，会触发此事件。会返回一个 File 对象作为参数。

示例：

```vue
<template>
  <AUpload @upload="handleUpload">
    <template #default>点击或拖动文件到此上传</template>
    <template #uploading>上传中...</template>
    <template #error>上传失败</template>
    <template #success>上传成功</template>
  </AUpload>
</template>

<script>
export default {
  methods: {
    handleUpload(file) {
      console.log('文件上传', file);
    },
  },
};
</script>
```

其中 `handleUpload` 方法会接收到一个 File 对象，可以进行后续的上传操作。
