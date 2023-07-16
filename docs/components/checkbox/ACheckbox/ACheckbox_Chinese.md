# ACheckbox 组件文档

此组件是一个复选框。

## 基本用法和示例

使用 `ACheckbox` 组件，可以创建一个可以勾选的复选框按钮：

```vue
<template>
  <ACheckbox label="I am a checkbox" v-model="checked" />
</template>

<script>
import { ACheckbox } from '@any-design/anyui';

export default {
  components: {
    ACheckbox,
  },
  data() {
    return {
      checked: false,
    };
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名         | 类型    | 默认值               | 说明                                                           |
| -------------- | ------- | -------------------- | -------------------------------------------------------------- |
| label          | String  | undefined            | 复选框标签文本                                                 |
| checkIcon      | String  | 'si-glyph:checked'   | 勾选状态下图标                                                 |
| modelValue     | Boolean | false                | 复选框是否被勾选，默认未被勾选                                 |
| iconTransition | String  | 'a-trans-check-icon' | 用于勾选图标过渡动画的 class 名称，默认为 'a-trans-check-icon' |

注意：该组件使用 v-model 时可以实现双向绑定功能。

## Events

该组件会发出以下事件：

| 事件名            | 参数值  | 说明                                       |
| ----------------- | ------- | ------------------------------------------ |
| update:modelValue | Boolean | 当勾选框状态发生改变时触发，可用于双向绑定 |
| change            | Boolean | 当勾选框状态发生改变时触发                 |

## Slots

该组件接受以下 slots：

| 插槽名  | 说明                    |
| ------- | ----------------------- |
| default | 复选框文本或图标的 HTML |

## SCSS 变量

该组件使用以下 SCSS 变量：

| 变量名                | 默认值                         | 说明               |
| --------------------- | ------------------------------ | ------------------ |
| --primary             | #1890ff                        | 主颜色             |
| --primary-70          | rgba(24, 144, 255, 0.7)        | 主颜色 70%不透明度 |
| --border-lighter      | #d9d9d9                        | 边框颜色浅         |
| --bg-semi-light       | #f5f5f5                        | 背景色半亮         |
| --shadow-5            | 0 2px 8px rgba(0, 0, 0, 0.05)  | 阴影 5             |
| --shadow-8            | 2px 2px 2px rgba(0, 0, 0, 0.8) | 阴影 8             |
| --anim-duration-quick | 100ms                          | 过渡动画快速       |

示例：

```scss
// 更改过渡动画时间
$anim-duration-quick: 200ms;
```
