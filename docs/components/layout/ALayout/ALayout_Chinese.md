# ALayout

`ALayout` 及其子组件 —— `AHeader`、`AContent`、`AFooter`、`ASide` —— 共同组成经典的应用外壳。`AHeader` / `AFooter` 接收 `height` 属性；`ASide` 接收 `width` 属性；`AContent` 自动填充剩余空间。

## 引入

```ts
import { Layout, Header, Content, Footer, Side } from '@any-design/anyui/vue';
// React:  import { Layout, Header, Content, Footer, Side } from '@any-design/anyui/react';
// Svelte: import { Layout, Header, Content, Footer, Side } from '@any-design/anyui/svelte';
```

## 基础用法

一个 Header / Content / Footer 外壳。

```vue
<template>
  <ALayout>
    <AHeader :height="60">Header</AHeader>
    <AContent>主体内容</AContent>
    <AFooter :height="40">Footer</AFooter>
  </ALayout>
</template>
```

## 示例

### 带侧边栏

添加 `ASide` 实现侧边导航布局。

```vue
<template>
  <ALayout>
    <AHeader :height="56">顶栏</AHeader>
    <ALayout>
      <ASide :width="220">侧边栏</ASide>
      <AContent>页面内容</AContent>
    </ALayout>
  </ALayout>
</template>
```

### 撑满视口

设置 `fit` 让整个布局撑满视口高度（适合后台仪表盘）。

```vue
<template>
  <ALayout fit>
    <AHeader :height="56">Header</AHeader>
    <AContent>填充视口剩余高度</AContent>
  </ALayout>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `fit` | Boolean | false | 撑满视口高度。 |
| `autoFit` | Boolean | true | 自动适配视口。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 布局子元素。 |

## 说明

子组件：`AHeader` / `AFooter` 接收 `height`（Number|String，默认 `""`）；`ASide` 接收 `width`（Number|String）与 `noDefault`（Boolean，false）；`AContent` 无属性。以 `Header`、`Content`、`Footer`、`Side` 导出。
