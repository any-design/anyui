# @any-design/anyui VirtualListItem

The `VirtualListItem` component is used within the `VirtualList` component to represent an individual item. This component can receive an object of an item that will be passed down from the `VirtualList` component, and will use that object to generate a list item.

## 基础用法

在模板中使用 `VirtualListItem`：

```vue
<template>
  <VirtualListItem :item="item" @initHeight="handleInitHeight">
    {{ item.text }}
  </VirtualListItem>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { VirtualListItem } from '@any-design/anyui';

const item = reactive({ id: '1', text: '列表项' });

const handleInitHeight = (data: { itemId: string; height: number }) => {
  console.log(`列表项 ${data.itemId} 的高度是 ${data.height}px。`);
};
</script>
```

## Props

| Name | 类型 | 描述 |
| ---- | ---- | ---- |
| item *(required)* | `Object` | 要在列表项中呈现的对象。 |

## Events

| Name | 描述 |
| ---- | ---- |
| initHeight | `initHeight` 事件被用于在列表中被渲染时检查其高度。 当列表项高度的值发生变化时会被重新呈现。 所以 `VirtualListItem` 组件需要检查并在高度发生变化时更新组件中的状态。 这里 `initHeight` 事件会传递一个包含被呈现的项目的 ID 和其高度值的对象。 |

## Exposed Methods or Values

`VirtualListItem` 组件没有暴露方法或值。