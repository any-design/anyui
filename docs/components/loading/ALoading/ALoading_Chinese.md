# ALoading

`ALoading` 渲染四个弹跳点 —— 轻量的纯展示型加载指示器。它没有 props，只需在需要小型 "加载中…" 提示的地方直接放置即可。

## 引入

```ts
import { Loading } from '@any-design/anyui/vue';
// React:  import { Loading } from '@any-design/anyui/react';
// Svelte: import { Loading } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <ALoading />
</template>
```

## 示例

### 内联在按钮中

常见用法：异步操作执行时，在按钮内显示弹跳点。

```vue
<template>
  <AButton type="primary" :disabled="saving">
    <ALoading v-if="saving" />
    <span v-else>保存</span>
  </AButton>
</template>

<script setup>
import { ref } from 'vue';
const saving = ref(false);
</script>
```

### 区域内居中

用 flex 容器包裹，使其在尚未加载的内容上方居中。

```vue
<template>
  <div class="loading-wrap">
    <ALoading />
  </div>
</template>

<style scoped>
.loading-wrap { display: flex; justify-content: center; padding: 40px; }
</style>
```

## 属性

_该组件没有可配置属性。_

## 说明

没有 props — 纯展示组件。可在按钮或行内需要小型指示器的地方使用。
