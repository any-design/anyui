# ACollapse 组件文档

## 介绍

这个组件是一个可以展开和收起的容器，当展开时，容器内的内容可以全部显示；当收起时，只有一部分内容显示，剩余部分会隐藏起来。

## 基本用法和示例

使用 `ACollapse` 组件，你可以编写如下的示例代码：

```vue
<template>
  <ACollapse :visible="false" always-render>
    <!-- 这里是可以收起和展开的内容 -->
  </ACollapse>
</template>

<script>
import { ACollapse } from '@any-design/anyui';

export default {
  components: {
    ACollapse,
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名         | 类型     | 默认值     | 说明                                                                                                                                                        |
| -------------- | -------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible        | Boolean  | false      | 是否默认展开，如果不设置该属性，组件默认会收起                                                                                                             |
| direction      | String   | 'vertical' | 展开方向，可以是 'horizontal' 或 'vertical'                                                                                                                 |
| alwaysRender   | Boolean  | false      | 是否总是渲染组件。如果设为 `true`，即使组件处于收起状态，也会一直渲染，但是会占用一定的资源，如果不需要，请不要设置为 true                            |
| renderWaitTime | Number   | 100        | `visible` 属性修改后，动画延迟时间。在实际应用中，`visible` 属性修改后，会有一个过渡动画，该属性可以设置动画的延迟时间。单位是毫秒 |
| elementStyle   | CSSStyle | undefined  | 该属性是组件内部用来设置 `style` 的，不要手动修改                                                                                                        |

## 事件

该组件不会触发任何事件。

## 暴露的方法或属性

该组件没有暴露任何方法或属性。