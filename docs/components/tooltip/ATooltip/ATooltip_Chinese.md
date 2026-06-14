# ATooltip

`ATooltip` 在悬停（默认）或点击时显示小型信息气泡。通过 `content` 设置文字、`placement` 设置位置，并可用 `content` 插槽放置富文本内容。

## 引入

```ts
import { Tooltip } from '@any-design/anyui/vue';
// React:  import { Tooltip } from '@any-design/anyui/react';
// Svelte: import { Tooltip } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <ATooltip content="保存你的修改">
    <AButton type="primary">保存</AButton>
  </ATooltip>
</template>
```

## 示例

### 位置

`placement` 接受任意 Popper.js 位置（`top`、`bottom`、`left`、`right` 及其 `-start` / `-end` 变体）。

```vue
<template>
  <ATooltip content="底部提示" placement="bottom">
    <AButton>悬停我</AButton>
  </ATooltip>
</template>
```

### 点击触发与自定义内容

使用 `triggerType="click"` 改为点击打开，并用 `content` 插槽放置富文本。

```vue
<template>
  <ATooltip trigger-type="click" placement="right">
    <AClickableText type="primary">这是什么？</AClickableText>
    <template #content>
      <strong>提示：</strong> 这里可以放任意内容。
    </template>
  </ATooltip>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `content` | String | '' | 提示文字。 |
| `placement` | Placement | 'top' | 位置。 |
| `triggerType` | 'click' \| 'hover' | 'hover' | 触发方式。 |
| `offset` | Number | 8 | 偏移（px）。 |
| `disabled` | Boolean | false | 禁用提示。 |
| `maxWidth` | Number \| String | 260 | 气泡最大宽度。 |
| `openDelay` | Number | 0 | 打开延迟（ms）。 |
| `hideDelay` | Number | 100 | 隐藏延迟（ms）。 |
| `zIndex` | Number | 3000 | z-index。 |
| `appendToBody` | Boolean | true | 挂载到 body。 |
| `transition` | String | 'a-trans-popmenu' | 过渡名。 |
| `popupClass` | String | undefined | 类名钩子。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `visible-change` | Boolean | 打开 / 关闭。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 触发元素。 |
| `content` | — | 覆盖 `content` 属性。 |
