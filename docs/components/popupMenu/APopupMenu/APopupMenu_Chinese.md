# APopupMenu 组件文档

这是一个基于 popper 的菜单组件。

## 基本用法和示例

你可以使用 `APopupMenu` 组件来创建一个菜单：

```vue
<template>
  <APopupMenu
    :items="['编辑', '复制', '删除']"
    @command="(key: string) => handleMessage(key)"
    triggerType="click"
  >
    <button>点击我</button>
  </APopupMenu>
</template>
```

## Props

该组件接受以下 props：

| 属性名         | 类型    | 默认值            | 说明                                       |
| -------------- | ------- | ----------------- | ------------------------------------------ |
| placement      | String  | 'bottom'          | popper 的放置位置，同 APopper 组件         |
| offset         | Number  | 12                | 菜单位置相对于触发元素的偏移量，单位为 px  |
| items          | Array   | []                | 菜单中要渲染的项                           |
| width          | Number  | 180               | 菜单的宽度                                 |
| hideDelay      | Number  | 100               | 鼠标移出菜单 popper 时，菜单隐藏的延迟时间 |
| zIndex         | Number  | 3000              | 菜单 popper 的 z-index                     |
| appendToBody   | Boolean | true              | 如果为 true，菜单将被追加到 body           |
| transition     | String  | 'a-trans-popmenu' | 过渡类名                                   |
| popupClass     | String  |                   | 应用于弹出窗的类                           |
| menuClass      | String  |                   | 应用于菜单的类                             |
| hideAfterClick | Boolean | false             | 如果为 true，点击菜单项后菜单将自动隐藏    |
| triggerType    | String  | 'hover'           | 触发类型，与 APopper 组件相同              |
| group          | String  | ''                | 分组名称                                   |

## 事件

该组件将发出以下事件：

- command: 当用户点击一个菜单项时发出。该事件将返回两个参数，第一个是点击的菜单项的键（key），第二个是一个额外的 PopMenuCommandExtra 对象，包含了触发元素（triggerEl）和弹出元素（popupEl）。

示例：

```vue
<template>
  <APopupMenu
    :items="[
      { key: 'edit', name: '编辑' },
      { key: 'copy', name: '复制' },
      { key: 'delete', name: '删除' },
    ]"
    trigger="click"
    @command="(key, extra) => handleCommand(key, extra)"
  >
    <a-button>点击我</a-button>
  </APopupMenu>
</template>

<script>
import { APopupMenu } from '@any-design/anyui';

export default {
  components: {
    APopupMenu,
  },
  methods: {
    handleCommand(key, extra) {
      console.log(`Selected command: ${key}, triggered by element: ${extra.triggerEl}`);
    },
  },
};
</script>
```
