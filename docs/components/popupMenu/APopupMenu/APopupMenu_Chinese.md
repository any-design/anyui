# APopupMenu

`APopupMenu` 是基于 `APopper` 的轻量右键菜单。选项可以是纯字符串或 `{ name, key }` 对象。默认 hover 触发，通过 `command` 事件返回已选 key。

## 引入

```ts
import { PopupMenu } from '@any-design/anyui/vue';
// React:  import { PopupMenu } from '@any-design/anyui/react';
// Svelte: import { PopupMenu } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <APopupMenu :items="items" @command="onCommand">
    <AButton>选项</AButton>
  </APopupMenu>
</template>

<script setup>
const items = ['编辑', '复制', '删除'];
const onCommand = (key) => console.log('已选：', key);
</script>
```

## 示例

### 右键上下文菜单

设置 `triggerType="contextmenu"` 改为右键打开。

```vue
<template>
  <APopupMenu :items="items" trigger-type="contextmenu">
    <div class="canvas">在此右键</div>
  </APopupMenu>
</template>

<script setup>
const items = ['重命名', '复制副本', '移除'];
</script>
```

### 带 key 的对象项

当 key 需要与标签不同时，传入 `{ name, key }` 对象。

```vue
<template>
  <APopupMenu :items="items" @command="onCommand">
    <AClickableText type="primary">菜单</AClickableText>
  </APopupMenu>
</template>

<script setup>
const items = [
  { name: '新建文件', key: 'new' },
  { name: '新建文件夹', key: 'folder' },
];
const onCommand = (key) => console.log(key);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | Array<string \| { name, key? }> | [] | 菜单项（支持纯字符串）。 |
| `placement` | Placement | 'bottom' | Popper 位置。 |
| `triggerType` | 'hover' \| 'click' \| 'contextmenu' \| 'manual' | 'hover' | 触发方式。 |
| `offset` | Number | 12 | 偏移（px）。 |
| `width` | Number | 180 | 菜单宽度。 |
| `hideDelay` | Number | 100 | 隐藏延迟（ms）。 |
| `hideAfterClick` | Boolean | false | 点击后隐藏。 |
| `zIndex` | Number | 3000 | z-index。 |
| `appendToBody` | Boolean | true | 挂载到 body。 |
| `transition` | String | 'a-trans-popmenu' | 过渡名。 |
| `popupClass / menuClass` | String | undefined | 类名钩子。 |
| `group` | String | '' | 共享 popper 分组。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `command` | (key, { triggerEl, popupEl }) | 点击菜单项。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 触发元素。 |
