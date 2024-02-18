# AVirtualList 组件文档

这是一个虚拟列表组件，使用二进制索引树查找滚动高度，性能优越。不像其他同类功能的组件，我们的虚拟列表不会让用户设置项高度getter，它会自动测量合适的项高度。同时默认支持动态项高度。

## 基本用法和示例

使用 `AVirtualList` 组件，可以创建一个虚拟滚动列表：

```vue
<template>
  <AVirtualList :items="items" :buffer="1200">
    <template v-slot="{ item }">
      <!-- 在这里放置列表项的模板 -->
    </template>
  </AVirtualList>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, content: 'Item 1' },
        { id: 2, content: 'Item 2' },
        // ...
      ],
    };
  },
};
</script>
```

## Props

| 属性名               | 类型                           | 默认值    | 说明                                     |
| -------------------- | ------------------------------ | --------- | ---------------------------------------- |
| items                | RawVirtualListItem<unknown>[]  | []        | 将在虚拟列表中渲染的数据列表                                       |
| buffer               | Number                         | 1200      | 列表的滚动缓冲区大小，较大的数值意味着将渲染更多的项               |
| estimatedItemHeight  | Number                         |           | 如果已知适当的项高度，可以在此处设置以跳过高度测量                 |
| enableDeepWatch      | Boolean                        | false     | 如果为真，组件将深度观察项目                                     |
| firstScreenThreshold | Number                         | 10        | 将用于高度测量的元素数量                                           |

- items：将在虚拟列表中渲染的数据列表，它将被传递给 `AVirutalListItem` 组件，并最终传递给你的自定义组件。确保列表中的所有项目都有一个唯一的id。
- buffer：列表的滚动缓冲区大小，以px为单位接受一个数字。较大的数值意味着将渲染更多的项。
- estimatedItemHeight：如果已知适当的项高度，可以在此处设置以跳过高度测量。
- enableDeepWatch：如果为真，组件将深度观察项目。
- firstScreenThreshold：将用于高度测量的元素数量。

## 事件

`AVirtualList` 组件不发出任何事件。

## 公开的方法

`AVirtualList` 提供了以下公开方法：

- refresh：刷新项目列表
- scrollToBottom：滚动到底部
- scrollTo：滚动到指定的顶部偏移量
- getContainer：获取列表容器的引用

例子：

```vue
<!-- 在 template 中 -->
<AVirtualList ref="virtualListRef" :items="items"></AVirtualList>

<!-- 在 script 中 -->
import type { VirtualListExposure } from 'AnyUI';

export default {
  data() {
    return {
      virtualListRef: ref<VirtualListExposure | null>(null),
      items: [
        { id: 1, content: 'Item 1' },
        { id: 2, content: 'Item 2' },
        // ...
      ],
    };
  },

  mounted() {
    if (this.virtualListRef) {
      this.virtualListRef.scrollToBottom();
    }
  },
};
```
