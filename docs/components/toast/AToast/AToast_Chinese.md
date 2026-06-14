# AToast

`toast` 是可堆叠的角落通知 API，`AToast` 是其声明式组件。常用的入口是命令式辅助方法（`toast.info` / `.success` / `.warning` / `.error`），它们接受 `title`、`content`、`duration` 与 `placement`，并在所选角落堆叠多个通知。

## 引入

```ts
import { Toast, toast } from '@any-design/anyui/vue';
// React:  import { Toast, toast } from '@any-design/anyui/react';
// Svelte: import { Toast, toast } from '@any-design/anyui/svelte';
```

## 基础用法

命令式调用 `toast.success`，传入标题与正文。

```vue
<template>
  <AButton type="primary" @click="save">保存</AButton>
</template>

<script setup>
import { toast } from '@any-design/anyui/vue';
const save = () => {
  toast.success({ title: '已保存', content: '你的修改已生效。' });
};
</script>
```

## 示例

### 位置与时长

用 `placement`（`top-right` | `bottom-right`）控制通知出现的位置，用 `duration` 控制停留时长。

```vue
<template>
  <AButton @click="notify">提醒</AButton>
</template>

<script setup>
import { toast } from '@any-design/anyui/vue';
const notify = () => {
  toast.info({
    title: '同步已开始',
    content: '正在上传 12 个文件…',
    placement: 'bottom-right',
    duration: 4000,
  });
};
</script>
```

### 堆叠通知

每次调用都会独立堆叠 —— 可连续触发多条以确认一批操作。

```vue
<template>
  <AButton @click="batch">执行批处理</AButton>
</template>

<script setup>
import { toast } from '@any-design/anyui/vue';
const batch = () => {
  toast.success({ title: '导出完成', content: 'report.csv 已下载。' });
  toast.warning({ title: '2 项已跳过', content: '详情请查看日志。' });
};
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | 'info' \| 'success' \| 'warning' \| 'error' | 'info' | 状态类型。 |
| `title` | String | '' | 标题。 |
| `content` | String | '' | 正文。 |
| `closable` | Boolean | true | 显示关闭按钮。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `close` | — | 关闭时触发。 |

## 方法

| 方法 | 签名 | 说明 |
| --- | --- | --- |
| `toast.info / .success / .warning / .error` | (options) => void | 命令式调用；options 还支持 `duration`、`placement`（`top-right` | `bottom-right`）、`zIndex`。 |

## 说明

全局安装还会挂载 `$toast`。`placement` 与 `duration` 仅作用于命令式 API。
