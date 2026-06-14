# ASpinner

`ASpinner` 渲染一个旋转的图标 —— 简单的旋转加载动画。通过 `icon` 属性（任意 Iconify 图标名）可替换默认图标，留空则使用内置图标。

## 引入

```ts
import { Spinner } from '@any-design/anyui/vue';
// React:  import { Spinner } from '@any-design/anyui/react';
// Svelte: import { Spinner } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <ASpinner />
</template>
```

## 示例

### 自定义图标

传入任意 [Iconify](https://iconify.design/) 图标名，旋转它以替代默认图标。

```vue
<template>
  <ASpinner icon="ri:loader-4-line" />
</template>
```

### 内联在按钮中

与 `ALoading` 类似，spinner 适合放在按钮内表示操作进行中。

```vue
<template>
  <AButton type="primary" disabled>
    <ASpinner icon="ri:loader-4-line" />
    <span>加载中</span>
  </AButton>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `icon` | String \| IconifyIcon | '' | 旋转的图标（默认使用内置的 spinner）。 |
