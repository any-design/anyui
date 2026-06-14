# AEmpty

`AEmpty` 是空状态占位组件 —— 一个图标加可选说明文字。当列表、表格或搜索无结果时使用。默认插槽渲染在文字下方，用于放置操作按钮。

## 引入

```ts
import { Empty } from '@any-design/anyui/vue';
// React:  import { Empty } from '@any-design/anyui/react';
// Svelte: import { Empty } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AEmpty text="暂无结果" />
</template>
```

## 示例

### 自定义图标

向 `icon` 传入 [Iconify](https://iconify.design/) 图标名。

```vue
<template>
  <AEmpty text="收件箱为空" icon="ri:inbox-line" />
</template>
```

### 带操作

在默认插槽中放一个按钮，给用户下一步的入口。

```vue
<template>
  <AEmpty text="还没有项目">
    <AButton type="primary">创建项目</AButton>
  </AEmpty>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `text` | String | undefined | 可选说明文本。 |
| `icon` | String \| IconifyIcon | 'iconoir:file-not-found' | 文字上方的图标。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 文字下方的操作区。 |
