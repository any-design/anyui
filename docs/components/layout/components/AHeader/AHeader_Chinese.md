# ALayoutInnerFooter 组件文档

## 简介

该组件是一个在 `ALayout` 组件内的底部统一布局容器。

## 基本用法和示例

使用 `ALayoutInnerFooter` 组件，可以将组件放入容器中，然后自动应用 ALHeader 的样式：

```vue
<template>
  <ALayout>
    <ALayoutInner>
      <ALayoutInnerFooter>需要显示在底部的内容</ALayoutInnerFooter>
    </ALayoutInner>
  </ALayout>
</template>

<script>
import { ALayout, ALayoutInner, ALayoutInnerFooter } from '@any-design/anyui';

export default {
  components: {
    ALayout, ALayoutInner, ALayoutInnerFooter,
  },
};
</script>
```

## Props

该组件接受以下的 props:

| 属性名 | 类型 | 默认值 | 说明                                                              |
| ------ | ---- | ------ | ----------------------------------------------------------------- |
| height | 数字或字符串 | '' | 底部容器的高度，需要是一个有效的 CSS 高度字符串          |

## 事件

该组件没有任何事件。

## 暴露方法或值

该组件没有任何被暴露的方法或值。

注意事项：

- 组件中的样式均使用 CSS 变量，可以在外部通过 `:root` 或其他方式进行覆盖。
- 该组件适用于 `ALayout` 容器内的底部嵌入，使用时需要将组件包裹在 `ALayoutInner` 中，否则可能出现样式异常。