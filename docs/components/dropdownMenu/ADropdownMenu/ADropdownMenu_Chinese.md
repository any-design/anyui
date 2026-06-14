# ADropdownMenu

`ADropdownMenu` 是功能丰富的下拉菜单。每个菜单项可以带 `icon`、被 `disabled`、标记为 `danger`，或与前一项 `divided` 分隔。支持点击或悬停触发，通过 `command` 事件响应选择。

## 引入

```ts
import { DropdownMenu } from '@any-design/anyui/vue';
// React:  import { DropdownMenu } from '@any-design/anyui/react';
// Svelte: import { DropdownMenu } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <ADropdownMenu :items="items" @command="onCommand">
    <AButton>操作</AButton>
  </ADropdownMenu>
</template>

<script setup>
const items = [
  { command: 'edit', label: '编辑', icon: 'ri:edit-line' },
  { command: 'duplicate', label: '复制' },
  { command: 'delete', label: '删除', danger: true, divided: true },
];
const onCommand = (cmd) => console.log('命令：', cmd);
</script>
```

## 示例

### 悬停触发

设置 `triggerType="hover"` 改为悬停时打开。

```vue
<template>
  <ADropdownMenu :items="items" trigger-type="hover">
    <AClickableText type="primary">悬停我</AClickableText>
  </ADropdownMenu>
</template>

<script setup>
const items = [
  { command: 'profile', label: '个人资料' },
  { command: 'logout', label: '退出登录' },
];
</script>
```

### 禁用项

在某个项上设置 `disabled: true` 将其置灰。

```vue
<template>
  <ADropdownMenu :items="items">
    <AButton>菜单</AButton>
  </ADropdownMenu>
</template>

<script setup>
const items = [
  { command: 'save', label: '保存' },
  { command: 'export', label: '导出', disabled: true },
];
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | Array<{ command, label, icon?, disabled?, danger?, divided? }> | [] | 菜单项。 |
| `triggerType` | 'click' \| 'hover' | 'click' | 打开方式。 |
| `placement` | Placement | 'bottom-start' | Popper 位置。 |
| `disabled` | Boolean | false | 禁用菜单。 |
| `hideAfterClick` | Boolean | true | 点击某项后隐藏菜单。 |
| `width` | Number \| String | undefined | 菜单宽度。 |
| `offset` | Number | 12 | 距触发元素偏移（px）。 |
| `hideDelay` | Number | 100 | 隐藏延迟（ms）。 |
| `zIndex` | Number | 3000 | z-index。 |
| `appendToBody` | Boolean | true | 挂载到 body。 |
| `transition` | String | 'a-trans-popmenu' | 过渡名。 |
| `popupClass / menuClass` | String | undefined | 类名钩子。 |
| `group` | String | '' | 共享 popper 分组（同组打开时关闭其他）。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `command` | (command, item) | 点击菜单项。 |
| `visible-change` | Boolean | 打开 / 关闭。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 触发元素。 |
| `item` | { item } | 覆盖单行渲染。 |
