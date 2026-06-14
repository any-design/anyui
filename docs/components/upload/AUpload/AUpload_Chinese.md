# AUpload

`AUpload` 是拖拽 / 点击的文件上传区。它通过 `upload` 事件输出单个 `File` —— **不会**自行发起 HTTP 请求。通过 `status` 属性驱动 uploading / success / error 状态，每种状态都有对应的插槽。

## 引入

```ts
import { Upload } from '@any-design/anyui/vue';
// React:  import { Upload } from '@any-design/anyui/react';
// Svelte: import { Upload } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AUpload @upload="onUpload" />
</template>

<script setup>
const onUpload = (file) => {
  console.log('收到文件：', file.name);
  // 在此调用你的上传接口
};
</script>
```

## 示例

### 状态驱动

设置 `status` 以显示对应插槽（`uploading`、`success`、`error`）。

```vue
<template>
  <AUpload :status="status" @upload="handle">
    <template #uploading>正在上传 {{ fileName }}…</template>
    <template #success>{{ fileName }} 上传成功！</template>
    <template #error>上传失败 —— 请重试。</template>
  </AUpload>
</template>

<script setup>
import { ref } from 'vue';
const status = ref('');
const fileName = ref('');
const handle = async (file) => {
  fileName.value = file.name;
  status.value = 'uploading';
  try {
    // await api.upload(file)
    status.value = 'success';
  } catch {
    status.value = 'error';
  }
};
</script>
```

### 禁用

用 `disabled` 锁定上传区。

```vue
<template>
  <AUpload disabled />
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `status` | 'default' \| 'uploading' \| 'error' \| 'success' | '' | 当前状态（空字符串 = 默认）。 |
| `clickable` | Boolean | true | 允许点击选择。 |
| `disabled` | Boolean | false | 禁用所有交互。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `upload` | File | 文件被拖入或选择时触发。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 默认空闲状态。 |
| `dragging` | — | 文件拖入时显示。 |
| `uploading` | — | `status="uploading"` 时显示。 |
| `error` | — | `status="error"` 时显示。 |
| `success` | — | `status="success"` 时显示。 |
