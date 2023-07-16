# AImage 组件文档

这个组件是一个图片容器，用于展示图片，并提供图片加载状态和错误状态的提示。

## 基本用法和示例

使用 `AImage` 组件，可以展示一张指定的图片：

```vue
<template>
  <AImage src="https://example.com/image.jpg"></AImage>
</template>
```

## Props

该组件接受以下 props：

| 属性名   | 类型   | 默认值      | 说明             |
| -------- | ------ | ----------- | ---------------- |
| src      | String |             | 图片的 url       |
| width    | mixed  | '100%'      | 图片容器的宽度   |
| height   | mixed  | '100%'      | 图片容器的高度   |
| size     | String | 'cover'     | 背景图的尺寸     |
| position | String | 'center'    | 背景图的位置     |
| repeat   | String | 'no-repeat' | 背景图的重复模式 |

例如：

```vue
<template>
  <AImage
    src="https://example.com/image.jpg"
    width="200px"
    height="200px"
    size="contain"
    position="center"
  ></AImage>
</template>
```

## Events

该组件会发出以下事件：

| 事件名 | 说明         |
| ------ | ------------ |
| load   | 图片开始加载 |
| loaded | 图片加载完成 |
| error  | 图片加载出错 |

## Setup 返回值

该组件暴露以下变量：

| 变量名          | 类型              | 说明                   |
| --------------- | ----------------- | ---------------------- |
| isLoading       | ref(Boolean)      | 图片是否正在加载       |
| isError         | ref(Boolean)      | 图片是否加载出错       |
| containerRef    | ref(HtmlElement?) | 图片容器的 DOM 引用    |
| containerStyles | Object            | 图片容器的样式对象     |
| picStyles       | CSSProperties     | 背景图片的样式对象     |
| imageId         | String            | 图片容器的唯一 ID 标识 |
