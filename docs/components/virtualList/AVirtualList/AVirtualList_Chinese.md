# @any-design/anyui - 虚拟滚动列表组件

这是一个非常快速的虚拟滚动列表组件，它基于二叉索引树来搜索滚动列表，性能十分卓越。与其他具有相同功能的组件不同，我们的虚拟列表不需要用户设置项目高度，它会自动测量适合的项目高度。此外，默认支持动态项目高度。

## 基本使用和示例

```
<template>
  <a-virtual-list // 插入你代码里的标签名
    :items="list"
    :buffer="bufferHeight"
  >
    <div slot-scope="{ item }" :style="..." /> // 自定义的组件或模板
  </a-virtual-list>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import AVirtualList from '@any-design/anyui/dist/AVirtualList'; // 引入组件

  export default defineComponent({
    name: 'Example',
    middleware() {
      return [
        async (resolve) => {
          const listData = await someData();
          resolve({ listData });
        },
      ];
    },
    setup(props) {
      const list = ref(props.listData);
      const bufferHeight = 4;
      return { list, bufferHeight };
    },
    components: {
      AVirtualList, // 注册组件
    },
  });
</script>
```

## 属性

### items

- 类型: `Array`
- 默认值: `[]`
- 必填: 否

包含渲染虚拟列表的数据数组。它将传递给 AVirtualListItem 组件，并最终传递到您的自定义组件。请确保列表中的所有项目都具有唯一的 `id`。

### buffer

- 类型: `Number`
- 默认值: `0`
- 必填: 否

列表的滚动缓冲区，较大的数字表示渲染的项目数量更多。此属性接受以像素为单位的数字。

### estimatedItemHeight

- 类型: `Number`
- 默认值: `0`
- 必填: 否

如果您已经知道项目的适当高度，则可以在此处设置它以跳过测量高度。

### enableDeepWatch

- 类型: `Boolean`
- 默认值: `false`
- 必填: 否

如果设置为 `true`，则组件将对项目进行深度侦听。

### firstScreenThreshold

- 类型: `Number`
- 默认值: `10`
- 必填: 否

首屏要显示的元素数量。

### reuseNodes

- 类型: `Boolean`
- 默认值: `true`
- 必填: 否

如果设置为 `true`，则此组件将重用 DOM 节点以避免频繁创建和删除 DOM 节点。

### keyType

- 类型: `String`
- 默认值: `'none'`
- 必填: 否

项的键类型，它将影响刷新。可以是 `'batch'`（渲染批次的索引），`'screen'`（基于屏幕高度和项目数的一系列索引），`'both'`（使用上述两个索引之一），`'none'`（不使用以前的任何索引，仅使用项的自然索引）。

## 暴露的方法

### refresh

刷新列表，当你的数据源更新时需要调用此方法。

```
  <a-button @click="() => list = mockData" />
  <!-- ... -->
  <a-virtual-list ref="virtualList" :items="list" />

  <script>
    // ...
    const refreshList = () => {
      const { value: virtualList } = refs.virtualList;
      virtualList.refresh();
    };
  </script>
```

### scrollToBottom

滚动到底部。

```
  <a-button @click="() => scrollToBottom()" />

  <script>
    // ...
    const { scrollToBottom } = useContext();
  </script>
```
