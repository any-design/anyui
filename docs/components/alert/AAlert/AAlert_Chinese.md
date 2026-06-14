# AAlert

`AAlert` 是用于状态消息的内联横幅。通过 `type`（info、success、warn、danger）决定颜色与图标，可选地添加 `title`，并设置 `closable` 让用户可关闭。

## 引入

```ts
import { Alert } from '@any-design/anyui/vue';
// React:  import { Alert } from '@any-design/anyui/react';
// Svelte: import { Alert } from '@any-design/anyui/svelte';
```

## 基础用法

默认 info 类型，主体内容放在默认插槽。

```vue
<template>
  <AAlert>新版本已发布 —— 刷新即可更新。</AAlert>
</template>
```

## 示例

### 带标题的成功提示

添加 `title` 并将 `type` 设为 `success`，用于正面反馈。

```vue
<template>
  <AAlert type="success" title="支付成功">
    收据已发送至您的邮箱。
  </AAlert>
</template>
```

### 可关闭

设置 `closable` 显示关闭按钮；监听 `close` 事件响应关闭。

```vue
<template>
  <AAlert v-if="show" type="warn" closable @close="show = false">
    您的试用将在 3 天后到期。
  </AAlert>
</template>

<script setup>
import { ref } from 'vue';
const show = ref(true);
</script>
```

### 危险提示

使用 `type="danger"` 表示错误或破坏性警告。

```vue
<template>
  <AAlert type="danger" title="上传失败">
    文件超过了 10 MB 限制，请选择更小的文件。
  </AAlert>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | 'info' \| 'success' \| 'warn' \| 'danger' | 'info' | 状态类型，决定颜色与图标。 |
| `title` | String | '' | 可选标题。 |
| `closable` | Boolean | false | 显示关闭按钮。 |
| `showIcon` | Boolean | true | 显示类型图标。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `close` | — | 点击关闭按钮时触发。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 主体内容。 |
| `icon` | — | 覆盖类型图标。 |
