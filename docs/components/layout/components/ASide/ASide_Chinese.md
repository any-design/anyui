# ALayoutInner 组件文档

这个组件是 `ALayout` 中的内部区域组件，主要作用是用于放置 `ALayout` 中的子组件。

## 基本用法和示例

使用 `ALayoutInner` 组件，可以在 `ALayout` 组件中放置子组件：

```vue
<template>
  <ALayout>
    <ALayoutSider></ALayoutSider>
    <ALayoutInner>我是 ALyoutInner 组件</ALayoutInner>
  </ALayout>
</template>
<script>
  import { ALayout, ALayoutInner, ALayoutSider } from '@any-design/anyui';
  
  export default {
    components: {
      ALayout,
      ALayoutInner,
      ALayoutSider
    }
  }
</script>
```

## Props

该组件接受以下 props：

| 属性名    | 类型                      | 默认值 | 说明                                                                 |
| --------- | ------------------------- | ------ | -------------------------------------------------------------------- |
| width     | Number \| String          | 300    | 内部宽度，需使用有效的 CSS 高度字符串。等同于设置组件的 width 样式属性 |
| noDefault | Boolean                   | false  | 如果为 true，则不会将默认样式应用于该组件                           |

## Events

该组件没有会主动触发的事件。

## Methods

该组件没有暴露的方法或属性。