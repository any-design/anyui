# AItem

`AItem` 是列表行，包含前置 `media` 插槽、`title` 与 `description`，以及尾部 `actions` 插槽。支持 `clickable` / `href` 实现交互，并提供 `outline` 样式。

## 引入

```ts
import { Item } from '@any-design/anyui/vue';
// React:  import { Item } from '@any-design/anyui/react';
// Svelte: import { Item } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AItem title="Ada Lovelace" description="工程师" />
</template>
```

## 示例

### 带媒体与操作

`media` 插槽放头像或图标；`actions` 插槽放尾部控件。

```vue
<template>
  <AItem title="Ada Lovelace" description="ada@anyui.dev">
    <template #media>
      <AAvatar src="/users/ada.png" size="medium" round />
    </template>
    <template #actions>
      <AButton size="small">发消息</AButton>
    </template>
  </AItem>
</template>
```

### 可点击与链接

设置 `clickable` 获得悬停反馈，或设置 `href` 将该项渲染为链接。

```vue
<template>
  <AItem title="设置" description="管理你的偏好" clickable href="/settings" />
</template>
```

### 描边样式

使用 `variant="outline"` 获得带边框的卡片式行。

```vue
<template>
  <AItem variant="outline" title="专业版" description="¥99/月" />
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | String | '' | 主标题。 |
| `description` | String | '' | 副标题。 |
| `clickable` | Boolean | false | 悬停 / 按压反馈。 |
| `href` | String | '' | 渲染为链接。 |
| `size` | 'default' \| 'small' | 'default' | 密度。 |
| `variant` | 'default' \| 'outline' | 'default' | 视觉样式。 |
| `disabled` | Boolean | false | 禁用。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `click` | MouseEvent | 点击事件。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 覆盖标题 / 描述。 |
| `media` | — | 前置媒体（图标 / 头像）。 |
| `actions` | — | 尾部操作。 |
