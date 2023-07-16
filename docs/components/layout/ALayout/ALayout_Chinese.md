# ALayout 组件文档

## 介绍

该组件（@any-design/anyui/ALayout）是一个布局容器组件，用于将其子组件按水平或垂直方向布局。当布局容器需要同时包含侧边栏和内容时，使用该组件能够更容易地实现布局。

## 基本用法和示例

使用 `ALayout` 组件，可以将其子组件按照垂直方向布局：

```vue
<template>
  <ALayout>
    <div>这是布局容器的第一个子组件</div>
    <div>这是布局容器的第二个子组件</div>
    <div>这是布局容器的第三个子组件</div>
  </ALayout>
</template>
```

使用 `ALayout` 组件，可以将其子组件按照水平方向布局（同时包含侧边栏和内容）：

```vue
<template>
  <ALayout>
    <ASideBar></ASideBar>
    <ADocumentation></ADocumentation>
  </ALayout>
</template>
```

## Props

该组件没有定义任何 Props。

## Provider

该组件提供了一个名为 `layout` 的 Provider，其 value 为一个对象，提供了以下属性：

| 属性名   | 类型    | 说明                 |
| -------- | ------- | -------------------- |
| hasSide  | Boolean | 是否包含侧边栏的布局 |

## Slots

该组件只接受默认插槽，用于定义布局容器的子组件。

## 忽略的样式

该组件内部定义了如下的样式规则，不推荐生成文档：

```scss
.a-layout {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.a-layout--has-side {
  flex-direction: row;
}
```