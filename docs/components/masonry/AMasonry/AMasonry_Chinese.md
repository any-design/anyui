# AMasonry 组件文档

`AMasonry` 组件是一个瀑布流布局容器。

## 基本用法和示例

使用 `AMasonry` 组件，可以创造一个瀑布流布局。

```vue
<template>
  <AMasonry :items="items" :colWidth="250" :col="3">
    <template #default="{ data }">
      <div class="item"> {{ data }} </div>
    </template>
  </AMasonry>
</template>

<script>
import { AMasonry } from '@any-design/anyui';

export default {
  components: {
    AMasonry,
  },
  data() {
    return {
      items: ['apple', 'banana', 'orange', 'pineapple', 'watermelon'],
    };
  },
};
</script>

<style>
.item {
  background-color: #f2f2f2;
  border: 1px solid #c5c5c5;
  border-radius: 5px;
  height: 200px;
}
</style>
```

## Props

该组件接受以下 props：

| 属性名             | 类型                          | 默认值    | 说明                                                       |
| ------------------ | ----------------------------- | --------- | ---------------------------------------------------------- |
| itemHeightGetter   | Function                      | required  | 获取每个 item 的高度的函数                                  |
| items              | Array                         | required  | 组件的 item 列表                                           |
| colWidth           | Number                        | required  | Masonry 列的宽度                                           |
| col                | Number                        | 0         | Masonry 列的数量，如果未指定，则会根据容器宽度自动确定列数 |
| gap                | Number                        | 16        | item 之间的间隔                                             |
| fit                | Boolean                       | false     | 是否将 Masonry 布局宽度设置为容器宽度                     |
| rowsPerSection     | Number                        | 3         | 每个渲染区块的行数                                         |
| groupSize          | Number                        | 100       | 一个渲染区块中 item 的数量                                  |
| additionalDistance | Number                        | 1600      | 额外增加的渲染距离                                         |
| recycleNode        | Boolean                       | false     | 是否开启 item 节点的回收                                     |
| scrollDebounceTime | Number                        | 200       | 滚动事件触发 debounce 的时间                                |
| scrollThrottleTime | Number                        | 100       | 滚动事件触发 throttle 的时间                               |
| scrollEventTarget  | String                        | undefined | 绑定滚动事件的 DOM 元素                                     |
| resizeThrottleTime | Number                        | 100       | 调整窗口大小处理 throttle 的时间                           |
| resizeDebounceTime | Number                        | 200       | 调整窗口大小处理 debounce 的时间                           |

## 事件

该组件没有注册任何事件。

## 暴露方法和值

该组件没有暴露任何方法和值。