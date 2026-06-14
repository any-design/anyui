# AClickableText

`AClickableText` 是带主题色的链接样式文字触发器。通过 `type` 设置颜色（primary、secondary、danger、warn、info），监听 `click` 事件。适合用于 "编辑"、"查看全部"、"删除" 等内联操作。

## 引入

```ts
import { ClickableText } from '@any-design/anyui/vue';
// React:  import { ClickableText } from '@any-design/anyui/react';
// Svelte: import { ClickableText } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AClickableText type="primary" @click="onClick">查看详情</AClickableText>
</template>

<script setup>
const onClick = () => console.log('clicked');
</script>
```

## 示例

### 危险操作

使用 `type="danger"` 表示删除等破坏性内联操作。

```vue
<template>
  <AClickableText type="danger" @click="onDelete">移除</AClickableText>
</template>

<script setup>
const onDelete = () => console.log('delete');
</script>
```

### 句子中的内联链接

将其混入正文，作为内联链接使用。

```vue
<template>
  <p>
    新用户？
    <AClickableText type="primary" @click="goSignup">创建账号</AClickableText>
  </p>
</template>

<script setup>
const goSignup = () => console.log('signup');
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | 'primary' \| 'secondary' \| 'danger' \| 'warn' \| 'info' | '' | 主题色（空字符串 = 默认文字色）。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `click` | MouseEvent | 原生点击。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 文字内容。 |
