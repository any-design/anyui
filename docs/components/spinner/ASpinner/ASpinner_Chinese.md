# ASpinner 组件文档

这个组件是一个加载中的 spinner 图标。

## 基本用法和示例

使用 `ASpinner` 组件，可以创建一个包含 spinner 图标的加载中效果：

```vue
<template>
  <ASpinner></ASpinner>
</template>
```

## Props

该组件接受以下 props：

| 属性名 | 类型   | 默认值               | 说明                     |
| ------ | ------ | -------------------- | ------------------------ |
| icon   | String | 'quill:loading-spin' | spinner 图标的 icon 名称 |

示例：

```vue
<template>
  <ASpinner :icon="'fluent:loading_24_regular'"></ASpinner>
</template>
```
