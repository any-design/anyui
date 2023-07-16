# AFloat 组件文档

这个组件是一个浮动层，用于显示对话框、弹窗等内容。

## 基本用法和示例

使用 `AFloat` 组件，可以创建一个浮动层：

```vue
<template>
  <AFloat :visible="showFloat" width="600" padding="24">
    <h2>这是一个浮动层</h2>
    <p>这里可以放置任何内容。</p>
    <button @click="showFloat = false">关闭</button>
  </AFloat>
  <button @click="showFloat = true">打开浮动层</button>
</template>

<script>
import { AFloat } from '@any-design/anyui';

export default {
  components: {
    AFloat,
  },
  data() {
    return {
      showFloat: false,
    };
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名           | 类型                 | 默认值 | 说明                                                                 |
| ---------------- | -------------------- | ------ | -------------------------------------------------------------------- |
| className        | String               |        | 自定义类名                                                           |
| top              | Number/String        | 96     | 浮动层顶部距离                                                       |
| padding          | Number/String        | 16     | 浮动层内容内边距                                                     |
| visible          | Boolean              | false  | 浮动层的可见性                                                       |
| zIndex           | Number               | 1000   | 浮动层的 z-index 值                                                  |
| width            | String/Number        | 800    | 浮动层的宽度                                                         |
| roundRadius      | Number/String        | 4      | 浮动层的圆角半径                                                     |
| lockScroll       | Boolean              | true   | 是否禁止页面滚动                                                     |
| scrollLockTarget | String               | 'html' | 禁止滚动的元素（默认为整个页面），只在 lockScroll 为 true 时生效     |

## 事件

该组件会触发以下事件：

| 事件名       | 回调参数 | 说明                                     |
| ------------ | -------- | ---------------------------------------- |
| close        | -        | 浮动层关闭时触发                         |
| update:visible | visible  | 浮动层的可见性发生变化时触发，参数为可见性 |

## 示例

```vue
<template>
  <AFloat
    :visible="showFloat"
    lockScroll
    scrollLockTarget=".content"
    width="600"
    roundRadius="8"
    top="64"
    padding="24"
  >
    <h2>这是一个浮动层</h2>
    <p>这里可以放置任何内容。</p>
    <button @click="showFloat = false">关闭</button>
  </AFloat>
  <div class="content">
    <p>这是一个有滚动条的 div。</p>
    <div style="height: 800px;">
      <button @click="showFloat = true">打开浮动层</button>
    </div>
  </div>
</template>

<script>
import { AFloat } from '@any-design/anyui';

export default {
  components: {
    AFloat,
  },
  data() {
    return {
      showFloat: false,
    };
  },
};
</script>
```