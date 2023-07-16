# 虚拟滚动列表组件 AVirtualList 文档

这个组件是一个性能优越、支持自适应和动态高度且使用二叉索引树进行滚动位置查询的虚拟滚动列表组件。其他与其相似的组件需要在组件中设置项高获取器，但是这个组件会自动进行测量并计算出合适的高度。此外，它还支持动态计算项高度。

## 基本用法和示例

使用 `AVirtualList` 组件，可以创建一个虚拟滚动列表：

```vue
<template>
  <AVirtualList
    :items="itemList"
    :estimatedItemHeight="60"
    keyType="screen"
    :firstScreenThreshold="20"
    @scrollToBottom="loadMore"
  >
    <template v-slot="{ item }">
      <div>{{ item }}</div>
    </template>
  </AVirtualList>
</template>

<script>
import { ref } from 'vue';
import { AVirtualList } from '@any-design/anyui';

export default {
  components: {
    AVirtualList,
  },
  setup() {
    const randomData = () => {
      const arr = Array.from({ length: 2000 }, (_, index) => index);
      return arr.sort(() => Math.random() - 0.5);
    };

    const itemList = ref(randomData());

    const loadMore = () => {
      itemList.value = [...itemList.value, ...randomData()];
    };

    return {
      itemList,
      loadMore,
    };
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名                  | 类型                                          | 默认值                  | 说明                                                               |
| ----------------------- | --------------------------------------------- | ----------------------- | ------------------------------------------------------------------ |
| items                   | Array<RawVirtualListItem<unknown>>             | []                      | 需要渲染的数据列表。其元素需要被包装成可虚拟渲染项 `VirtualListItem` |
| buffer                  | Number                                        | 0                       | 渲染列表时预留下部分的像素                                         |
| estimatedItemHeight     | Number                                        | undefined               | 估计每个渲染项的高度，组件将在第一次渲染前自动测量出一个合适的高度   |
| enableDeepWatch         | Boolean                                       | false                   | 是否开启深度侦听                                                   |
| firstScreenThreshold    | Number                                        | 10                      | 第一屏的渲染元素个数                                               |
| reuseNodes              | Boolean                                       | true                    | 是否要复用列表项的 DOM 节点                                         |
| keyType                 | 'batch' \| 'screen' \| 'both' \| 'none'        | 'none'                  | 指定用于唯一确定一个渲染项的键的类型，可选值为 `batch`, `screen`, `both`, `none`。 |
| @scrollToBottom         | function                                      | -                       | 列表滚动到底部触发的回调函数                                         |

## 事件

该组件会触发以下事件：

| 事件名          | 说明                   |
| --------------- | ---------------------- |
| @scrollToBottom | 列表滚动到底部触发事件 |

## 通过插槽自定义渲染项

使用 `AVirtualList` 渲染列表项时，可以通过设置插槽自定义渲染项。默认情况下，Vue 会将标准化的 `item` 作为插槽的默认作用域。因此，在插槽内直接使用 `item` 即可获取到渲染列表项的数据：

```vue
<script>
export default {
  components: {
    AVirtualList,
  },
  setup() {
    const itemList = ref([
      { id: '1', name: 'Peter' },
      { id: '2', name: 'John' },
      { id: '3', name: 'Lucy' },
      { id: '4', name: 'Linda' },
      { id: '5', name: 'David' },
    ]);
    return {
      itemList,
    };
  },
};
</script>

<template>
  <AVirtualList :items="itemList" :estimatedItemHeight="60">
    <template v-slot="{ item }">
      <div>{{ item.name }}</div>
    </template>
  </AVirtualList>
</template>
```

## 通过 provide/inject 注入 ResizeObserver

当组件中的元素发生大小变化时，可能需要重新计算相应的位置信息。本组件对此封装了 ResizeObserver，并在应用级别通过 `provide/inject` 的方式，将这个观察器注入每个 `VirtualListItem` 组件中，可以方便地自由使用 ResizeObserver 提供的接口。

使用案例：

```vue
<template>
  <AVirtualList :items="itemList" :estimatedItemHeight="60">
    <template v-slot="{ item }">
      <div class="my-custom-item" data-id="{{ item.id }}" v-resize-observer @init-height="onItemHeightInit">
        {{ item.name }}
      </div>
    </template>
  </AVirtualList>
</template>

<script>
import { ref } from 'vue';
import { AVirtualList } from '@any-design/anyui';

export default {
  components: {
    AVirtualList,
  },
  setup() {
    // ...
    const onItemHeightInit = (payload) => {
      console.log('Item height is ready:', payload.itemId, payload.height);
    };

    return {
      // ...
      onItemHeightInit,
    };
  },
};
</script>

<style>
.my-custom-item {
  font-size: 14px;
  line-height: 1.5;
}
</style>
```


## 注意事项

- 组件原则上只应该渲染自身和不依赖其他第三方包的子组件。

- 在组件中，不要渲染 <style> 标签中的样式。

- 组件在内部使用了二叉索引树来计算滚动位置，请勿自行干预。

- 插槽的默认作用域为渲染列表项的数据 `item`。

- 在使用了动态高度的情况下，组件会经过两次渲染。在第一次渲染时如果发现没有提供 `estimatedItemHeight` 属性，那么它会先根据 `firstScreenThreshold` 属性设置的值仅渲染列表的第一批元素，然后测量这些元素的高度并根据统计结果来自动计算合理的 `estimatedItemHeight` 的高度。第二次渲染时将使用新的 `estimatedItemHeight` 属性重新渲染所有元素。

- 通过 provide/inject 方式注入 ResizeObserver 后，会在 AVirtualListItem 中初始化一个 ResizeObserver，并通过 @init-height 事件传递数据。请注意数据格式。