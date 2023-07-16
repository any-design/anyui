# AVirtualListItem 组件文档

`AVirtualListItem` 组件用于渲染虚拟列表中的列表项。

## 基本用法和示例

使用 `AVirtualListItem` 组件，可以在虚拟列表中渲染每一项：

```vue
<template>
  <AVirtualListItem :item="item">
    <div>{{ item.text }}</div>
  </AVirtualListItem>
</template>

<script>
import { AVirtualListItem } from '@any-design/anyui';

export default {
  components: {
    AVirtualListItem,
  },
  setup() {
    const item = {
      id: 'item-1',
      text: '列表项 1',
    };
    return {
      item,
    };
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名 | 类型              | 默认值 | 说明                                                                                        |
| ------ | ----------------- | ------ | ------------------------------------------------------------------------------------------- |
| item   | `VirtualListItem` | -      | 虚拟列表中的列表项。此对象应包含 `id` 属性，用于识别列表项并与虚拟列表中其他元素进行交互。 |

## Events

该组件发出以下事件：

| 事件名     | 说明                         |
| ---------- | ---------------------------- |
| `initHeight` | 列表项在首次渲染时触发的事件。 |

## Methods

该组件并未暴露任何方法和值。