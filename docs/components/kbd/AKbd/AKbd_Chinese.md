# AKbd

`AKbd` 渲染键盘按键标识，外观类似物理键帽。用于在帮助文字、提示气泡或菜单中展示快捷键与热键。

## 引入

```ts
import { Kbd } from '@any-design/anyui/vue';
// React:  import { Kbd } from '@any-design/anyui/react';
// Svelte: import { Kbd } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  按 <AKbd>Enter</AKbd> 提交。
</template>
```

## 示例

### 组合键

组合多个按键以展示组合快捷键。

```vue
<template>
  <AKbd>Ctrl</AKbd> + <AKbd>K</AKbd> 打开命令面板。
</template>
```

### 小尺寸

使用 `size="small"` 适配菜单项等紧凑场景。

```vue
<template>
  <AKbd size="small">Esc</AKbd>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | 'default' \| 'small' | 'default' | 按键尺寸。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 按键文案。 |
