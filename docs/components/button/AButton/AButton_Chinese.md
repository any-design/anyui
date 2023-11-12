# AButton 组件文档

这个组件是一个按钮。

## 基本用法和示例

使用 `AButton` 组件，可以创建一个按钮：

```vue
<template>
  <AButton>点击我</AButton>
</template>
```

## Props

该组件接受以下 props：

| 属性名       | 类型    | 默认值    | 说明                                     |
| ------------ | ------- | --------- | ---------------------------------------- |
| type         | String  | 'default' | 按钮的样式类型                           |
| round        | Boolean | false     | 是否应用圆角边框到按钮                   |
| anim         | Boolean | false     | 鼠标悬停时按钮是否执行一个向上移动的动画 |
| size         | String  | 'default' | 按钮的尺寸                               |
| disabled     | Boolean | false     | 是否禁用按钮                             |
| fill         | Boolean | false     | 是否让按钮填充父容器                     |
| textShadow   | Boolean | false     | 是否给按钮文本应用文字阴影               |
| icon         | String  | ''        | 按钮中的图标                             |
| iconPosition | String  | 'leading' | 图标的位置                               |
| loading      | Boolean | false     | 按钮是否处于加载态                       |

- type: 按钮的样式类型，可以为 primary、gradient、gradient-reverse、depth 和 default，默认为 'default'。
- round: 是否应用圆角边框到按钮，在 true 时，按钮应用圆角边框，默认为 false。
- anim: 鼠标悬停时按钮是否执行一个向上移动的动画，在 true 时，鼠标悬停时按钮执行一个向上移动的动画，默认为 false。
- size: 按钮的尺寸，可以为 small、default 和 large，默认为 'default'。
- disabled: 是否禁用按钮，在 true 时，按钮为禁用状态，默认为 false。
- fill: 是否让按钮填充父容器，在 true 时，按钮填充父容器，默认为 false。
- textShadow: 是否给按钮文本应用文字阴影，在 true 时，应用文字阴影，默认为 false。
- icon: 按钮中的图标，类型为 String，默认为空字符串 ''。
- iconPosition: 图标的位置，可以为 leading 和 trailing，默认为 'leading'。
- loading: 按钮是否处于加载态，为 true 时会显示 Spinner 且不可点击。

示例：

```vue
<template>
  <AButton type="primary" round size="large" :disabled="true" fill anim>提交</AButton>
</template>

<script>
import { AButton } from '@any-design/anyui';

export default {
  components: {
    AButton,
  },
};
</script>
```
