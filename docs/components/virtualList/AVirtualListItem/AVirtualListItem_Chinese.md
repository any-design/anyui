# AVirtualListItem 组件文档

这是一个为虚拟列表提供子项的组件。

## 基本用法和示例

当你希望使用虚拟列表时，每一个列表项应使用 `AVirtualListItem` 组件：

```vue
<template>
  <AVirtualListItem :item="item">
    <!-- 在此处添加你的列表项内容 -->
  </AVirtualListItem>
</template>

<script setup lang="ts">
import { AVirtualListItem } from '@any-design/anyui';

export default {
  components: {
    AVirtualListItem,
  },
  setup() {
    const item = {
      __listIndex: 0,
      id: 'unique_id',
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

| 属性名 | 类型   | 默认值 | 说明                       |
| ------ | ------ | ------ | -------------------------- |
| item   | Object | 无     | 从虚拟列表传入的列表项数据 |

- item: 表示从虚拟列表中传入的具体列表项数据，类型为 Object。`item` 对象的约定形式为 { \_\_listIndex: number, id: string }。

## Event

该组件会触发的事件：

- initHeight: 当列表项首次渲染以获取其高度，用来修正列表项在虚拟列表中的位置。事件的参数为 { itemId: string, height: number }。其中 `itemId` 是列表项的 ID，`height` 是列表项的实际高度。

## Notice

- 该组件使用了 Vue 3 的新语法 `script setup`，确保你的 Vue 版本在 3.2.0 或以上。
- 你必须为每一个列表项提供唯一的 `id`，以帮助虚拟列表更好地追踪和管理每一个列表项。
- 注意在列表项组件中包含图片或者其他可能导致高度变化的元素可能会导致虚拟列表的错位，建议在加载这些元素前预设好宽高。
