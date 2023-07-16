# APopupMenu 组件文档

这个组件是一个基于 popper 的菜单。

## 基本用法和示例

使用 `APopupMenu` 组件，可以在一个 popper 中创建一个菜单，如下所示：

```vue
<template>
  <APopupMenu :items="['菜单项A', '菜单项B', '菜单项C']" @command="handleCommand">
    <a>点击此处展开菜单</a>
  </APopupMenu>
</template>

<script>
import { APopupMenu } from '@any-design/anyui';

export default {
  components: {
    APopupMenu,
  },
  methods: {
    handleCommand(key) {
      console.log(`用户点击了菜单项 ${key}`);
    },
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名         | 类型                                     | 默认值            | 说明                                                                                                            |
| -------------- | ---------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------- |
| placement      | String                                   | 'bottom'          | popper 的定位方式                                                                                               |
| offset         | Number                                   | 12                | 菜单相对于触发元素的偏移量（单位：px）                                                                          |
| items          | Array （string[] 或 PopMenuItem[] 类型） | []                | 菜单项列表，其中`PopMenuItem`类型为 { name: string, key: string, disabled?: boolean, children?: PopMenuItem[] } |
| width          | Number                                   | 180               | 菜单宽度（单位：px）                                                                                            |
| hideDelay      | Number                                   | 100               | 隐藏菜单的延迟时间（单位：ms）                                                                                  |
| zIndex         | Number                                   | 3000              | 菜单的 z-index 值                                                                                               |
| appendToBody   | Boolean                                  | true              | 是否将菜单的 DOM 元素创建在 body 内，而非触发元素内                                                             |
| transition     | String                                   | 'a-trans-popmenu' | popper 的过渡类名                                                                                               |
| popupClass     | String                                   |                   | popper 弹出框的 class 名称                                                                                      |
| menuClass      | String                                   |                   | 菜单的 class 名称                                                                                               |
| hideAfterClick | Boolean                                  | false             | 点击菜单项后是否自动隐藏菜单                                                                                    |

## Events

该组件发出以下事件：

| 事件名  | 参数         | 说明                       |
| ------- | ------------ | -------------------------- |
| command | 菜单项的 key | 用户点击了一个菜单项时发出 |

## 计算属性

该组件包含以下计算属性：

| 计算属性名 | 类型   | 说明                     |
| ---------- | ------ | ------------------------ |
| menuStyle  | 对象值 | 用于设置菜单的样式对象。 |

## 方法

该组件包含以下方法：

### getItemKey(item)

用于获取菜单项的唯一标识符。

参数：

- `item` - *unknown*类型，菜单项。

返回：

- *string*类型，菜单项的唯一标识符。

### getItemName(item)

用于获取菜单项的名称。

参数：

- `item` - *unknown*类型，菜单项。

返回：

- *string*类型，菜单项的名称。

### handleItemClick(key)

处理菜单项的“点击”事件。

参数：

- `key` - *string*类型，菜单项的唯一标识符。

返回值：

无。

## PopMenuItem 类型

该组件接受传递的对象类型为 `PopMenuItem`，定义如下：

```typescript
type PopMenuItem = {
  name: string;
  key: string;
  disabled?: boolean;
  children?: PopMenuItem[];
};
```

该类型表示菜单项对象，包含的属性如下：

| 属性名   | 类型            | 说明                                                                |
| -------- | --------------- | ------------------------------------------------------------------- |
| name     | _string_        | 菜单项名称                                                          |
| key      | _string_        | 唯一标识符，用来区分菜单项                                          |
| disabled | _boolean_       | 是否禁用该菜单项                                                    |
| children | _PopMenuItem[]_ | 子菜单项列表，用于创建一个有层级的菜单，其中`PopMenuItem`类型同上。 |
