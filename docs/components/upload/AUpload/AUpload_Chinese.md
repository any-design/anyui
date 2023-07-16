# AUpload 文档

## 介绍

AUpload 组件是一个基于 Vue3 开发的 UI 组件。此组件为一个上传文件组件，不负责具体上传操作，而是提供一个拖拽上传或浏览器上传文件的模板，方便开发者使用。

## 基本用法

> 注：在下面的例子中，需要注意的是 `@any-design/anyui` 这个包的引入方式。

在 Vue3 项目中，可以使用以下方式引入 AUpload 组件：

```
<template>
  <div>
    <a-upload @upload="handleUpload">上传文件</a-upload>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AUpload from '@any-design/anyui/lib/AUpload';

export default defineComponent({
  name: 'MyComponent',
  components: {
    AUpload,
  },
  methods: {
    handleUpload(file) {
      console.log('file:', file);
    },
  },
});
</script>
```

## Props

### status

- 类型：String
- 默认值：''
- 说明：上传状态。可以为 'default', 'uploading', 'error', 'success'。

### clickable

- 类型：Boolean
- 默认值：true
- 说明：是否可以点击上传

## 事件

AUpload 组件会触发 `upload` 事件，当用户选择文件或者将文件拖拽到此组件中时，事件中会传入一个 file 对象，开发者可以处理该文件。

## 方法

AUpload 组件未对外暴露任何方法。