# ACard 组件文档

这个组件是一个卡片。

## 基本用法和示例

使用 `ACard` 组件，可以创建一个卡片。卡片中可以有一个标题、内容和一个底部区域。其中标题和底部部分都可以插入自定义内容。

示例：

```vue
<template>
  <ACard title="新闻">
    <span>这是一条很重要的新闻！</span>
    <template #footer>
      <span>2021-12-01</span>
    </template>
  </ACard>
</template>

<script>
import { ACard } from '@any-design/anyui';

export default {
  components: {
    ACard,
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名 | 类型   | 默认值 | 说明                                                        |
| ------ | ------ | ------ | ----------------------------------------------------------- |
| title  | String | ''     | 卡片的标题，如果不为空，会展示一个带标题的卡片顶部        |
| width  | mixed  | 240    | 卡片的宽度，接受百分比类型和数值类型（单位为px）           |
| clean  | Bool   | false  | 如果为true，则卡片将没有边框和内边距                          |
| link   | String | ''     | 如果不为空，则卡片区域将带链接效果，颜色为卡片中文本颜色     |

## 插槽

该组件包含以下插槽：

- 默认插槽：为卡片的内容部分
- header：卡片的标题
- footer: 卡片的底部部分

## 样式

该组件包含以下自定义样式：

| 样式类          | 说明                                   |
| --------------- | -------------------------------------- |
| .a-card         | 卡片的样式，包含默认的边框、阴影等   |
| .a-card-header  | 卡片中标题所在的区域的样式             |
| .a-card-body    | 卡片中内容所在的区域的样式             |
| .a-card-footer  | 卡片中底部区域所在的样式               |
| .a-card--has-link | 如果为true，则卡片将带链接效果      |
| .a-card--clean  | 如果为true，则卡片将没有边框和内边距 |