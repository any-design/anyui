# ALoadingMask

`ALoadingMask` 在内容之上覆盖一层半透明加载状态。切换 `loading` 属性即可显示加载图标（与可选的 `text`），同时底层内容保持可见但不可交互。

## 引入

```ts
import { LoadingMask } from '@any-design/anyui/vue';
// React:  import { LoadingMask } from '@any-design/anyui/react';
// Svelte: import { LoadingMask } from '@any-design/anyui/svelte';
```

## 基础用法

包裹任意内容；切换 `loading` 即可覆盖遮罩。

```vue
<template>
  <ALoadingMask :loading="loading" text="保存中…">
    <ACard title="设置">
      <AInput placeholder="显示名" />
    </ACard>
  </ALoadingMask>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
```

## 示例

### 全屏

设置 `fullscreen` 覆盖整个视口 —— 适合应用初始加载或阻塞操作。

```vue
<template>
  <ALoadingMask :loading="loading" fullscreen text="正在加载应用…" />
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
```

### 配合开关

```vue
<template>
  <AButton @click="run">拉取数据</AButton>
  <ALoadingMask :loading="loading">
    <div class="content">{{ result || '暂无数据' }}</div>
  </ALoadingMask>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(false);
const result = ref('');
const run = async () => {
  loading.value = true;
  result.value = await fetch('/api/data').then((r) => r.text());
  loading.value = false;
};
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `loading` | Boolean | false | 是否显示遮罩。 |
| `text` | String | '' | 加载图标下方的可选文本。 |
| `fullscreen` | Boolean | false | 覆盖整个视口。 |
| `zIndex` | Number | 2000 | 遮罩的 z-index。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 被遮罩的内容。 |
