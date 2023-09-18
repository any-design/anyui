# APopper 组件文档

APopper 是一个可触发显示一些内容的组件，比如用于实现提示框（Tooltip）或者下拉菜单（Dropdown）等。

## 基本用法和示例

可以通过指定触发方式和弹出内容的位置，来创建一个 Popper：

```vue
<template>
  <APopper triggerType="hover" placement="bottom">
    <template #default>
      <div>点击查看详情</div>
    </template>
    <template #popup>
      <div>这是详情内容。</div>
    </template>
  </APopper>
</template>
```

## Props

APopper 组件可以接受以下 props：

| 属性名                | 类型    | 默认值   | 说明                                                       |
| --------------------- | ------- | -------- | ---------------------------------------------------------- |
| hideDelay             | Number  | 100      | 隐藏延迟时间，以毫秒为单位                                 |
| placement             | String  | 'bottom' | Popper 的位置，与 popperjs 的 placement 相同               |
| triggerType           | String  | 'hover'  | Popper 的触发方式，可选项为 'hover'，'click'，'manual'     |
| offset                | Number  | 18       | 触发元素和弹出窗口之间的距离                               |
| zIndex                | Number  | 3000     | 弹出窗口的 z-index 值                                      |
| appendToBody          | Boolean | true     | 如果为 true，弹出窗口将附加到 body                         |
| popupClass            | String  |          | 弹出窗口的类名                                             |
| transition            | String  |          | 弹出窗口的过渡类名                                         |
| closeWhenClickOutside | Boolean | true     | 仅在 triggerType 为 "click" 时有效，点击外部时关闭弹出窗口 |
| group                 | String  |          | 用于互斥的组 id                                            |

- hideDelay：隐藏延迟时间，单位是毫秒，默认值是 100。
- placement：Popper 的位置，它的值与 popperjs 的 placement 相同，默认值是 'bottom'。
- triggerType：Popper 的触发方式，可选值是 'hover'，'click'，'manual'，默认是 'hover'。
- offset：触发元素和弹出窗口之间的距离，默认值是 18。
- zIndex：弹出窗口的 z-index 值，默认值是 3000。
- appendToBody：如果为 true，弹出窗口将附加到 body，默认值是 true。
- popupClass：弹出窗口的类名，该值是一个字符串。
- transition：弹出窗口的过渡类名，该值是一个字符串。
- closeWhenClickOutside：仅在 triggerType 为 "click" 时有效，若为 true，则当点击外部时关闭弹出窗口，默认值是 true。
- group：用于互斥的组 id，该值是一个字符串。

## Events

APopper 组件会触发以下事件：

| 事件名             | 参数              | 说明                                       |
| ------------------ | ----------------- | ------------------------------------------ |
| popupStatusChanged | popupShowed:value | 当弹出窗口的可视状态发生变化时会触发该事件 |

- popupStatusChanged：当弹出窗口的可视状态发生变化时会触发该事件，会传递一个参数，该参数表示弹出窗口是否显示。

## Methods

APopper 类型暴露以下方法：

- show：显示 Popper。
- hide：隐藏 Popper。

示例：

```vue
<template>
  <APopper ref="popper" triggerType="click" placement="bottom"></APopper>
  <button @click="$refs.popper.show()">打开</button>
</template>

<script setup>
import { ref } from 'vue';
import APopper from './APopper.vue';

const popper = ref(null);
</script>
```
