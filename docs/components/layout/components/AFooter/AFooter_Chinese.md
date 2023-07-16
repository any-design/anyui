# ALayoutFooter 组件文档

这个组件是一个布局内的页脚容器组件。

## 基本用法和示例

使用 `ALayoutFooter` 组件，可以创建一个包含内容的页脚容器：

```vue
<template>
  <ALayout>
    <ALayoutHeader>Header</ALayoutHeader>
    <ALayoutContent>Content</ALayoutContent>
    <ALayoutFooter>Footer</ALayoutFooter>
  </ALayout>
</template>
```

## Props

该组件接受以下 props：

| 属性名 | 类型    | 默认值 | 说明                 |
| ------ | ------- | ------ | -------------------- |
| height | Number/String | '' | 页脚容器的高度，需为有效的CSS高度字符串。 |

## 暴露出的值和方法

该组件没有暴露出的方法和值。