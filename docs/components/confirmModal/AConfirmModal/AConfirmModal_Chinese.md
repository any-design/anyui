# AConfirmModal

`AConfirmModal` 是带"确认 / 取消"按钮的确认对话框。可以通过 `v-model` 声明式控制显隐，也可以使用返回 Promise 的命令式 `confirmModal()` 辅助函数。删除等破坏性操作可设置 `type="danger"`。

## 引入

```ts
import { ConfirmModal, confirmModal } from '@any-design/anyui/vue';
// React:  import { ConfirmModal, confirmModal } from '@any-design/anyui/react';
// Svelte: import { ConfirmModal, confirmModal } from '@any-design/anyui/svelte';
```

## 基础用法

声明式：用 `v-model` 控制显隐，监听 `confirm` / `cancel` 事件。

```vue
<template>
  <AButton @click="open = true">删除账号</AButton>
  <AConfirmModal
    v-model="open"
    type="danger"
    title="确认删除账号？"
    content="该操作将永久删除你的账号及全部数据。"
    @confirm="onDelete"
  />
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
const onDelete = () => console.log('已删除');
</script>
```

## 示例

### 命令式辅助函数

`confirmModal()` 返回 Promise，确认时 resolve 为 `true` —— 无需模板。

```vue
<template>
  <AButton @click="ask">移除文件</AButton>
</template>

<script setup>
import { confirmModal } from '@any-design/anyui/vue';
const ask = async () => {
  const ok = await confirmModal({
    title: '移除文件？',
    content: '文件将被移到回收站。',
    type: 'danger',
  });
  if (ok) console.log('已移除');
};
</script>
```

### 自定义按钮文案

通过 `confirmText` 与 `cancelText` 自定义按钮文字。

```vue
<template>
  <AConfirmModal
    v-model="open"
    title="发布？"
    confirmText="发布"
    cancelText="暂不"
    @confirm="onPublish"
  />
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
const onPublish = () => console.log('已发布');
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | Boolean | false | 是否可见（`v-model`）。 |
| `title` | String | '' | 标题。 |
| `content` | String | '' | 正文。 |
| `confirmText` | String | 'OK' | 确认按钮文案。 |
| `cancelText` | String | 'Cancel' | 取消按钮文案。 |
| `type` | 'primary' \| 'danger' | 'primary' | 确认按钮样式。 |
| `loading` | Boolean | false | 确认按钮的加载态。 |
| `closeOnConfirm` | Boolean | true | 确认后关闭弹窗。 |
| `width` | Number \| String | 420 | 弹窗宽度。 |
| `maskClosable` | Boolean | true | 点击遮罩关闭。 |
| `appendToBody` | Boolean | true | 挂载到 document.body。 |
| `zIndex` | Number | 1000 | z-index。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | Boolean | 可见性变化。 |
| `confirm` | — | 点击确认。 |
| `cancel` | — | 点击取消。 |
| `close` | — | 弹窗关闭。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 覆盖正文内容。 |

## 方法

| 方法 | 签名 | 说明 |
| --- | --- | --- |
| `confirmModal` | (options) => Promise<boolean> | 命令式调用，确认时 resolve 为 true。 |
