# AVirtualList

`AVirtualList` 是面向大数据量的高性能虚拟列表，可高效渲染上万条数据。传入 `items`（每项**必须**含 `id`），通过 `default` 插槽渲染每行，可选设置 `estimatedItemHeight` 以获得更精确的布局。该包还导出 `AVirtualListItem`。

## 引入

```ts
import { VirtualList } from '@any-design/anyui/vue';
// React:  import { VirtualList } from '@any-design/anyui/react';
// Svelte: import { VirtualList } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <div class="virtual-list-preview">
    <AVirtualList :items="items" :estimated-item-height="44">
      <template #default="scope">
        <div class="virtual-list-row">{{ scope?.item?.label }}</div>
      </template>
    </AVirtualList>
  </div>
</template>

<script setup>
import { VirtualList as AVirtualList } from '@any-design/anyui/vue';

const items = Array.from({ length: 5000 }, (_, i) => ({
  id: String(i),
  label: `项目 ${i}`,
}));
</script>

<style scoped>
.virtual-list-preview {
  height: 320px;
}

.virtual-list-row {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  border-bottom: 1px solid var(--line);
  color: var(--text);
  box-sizing: border-box;
}
</style>
```

## 示例

### 滚动到底部

通过模板 ref 调用 `scrollToBottom()` —— 适合聊天或日志视图。

```vue
<template>
  <div class="virtual-list-preview">
    <AVirtualList ref="listRef" :items="items" :estimated-item-height="44">
      <template #default="scope">
        <div class="virtual-list-row">{{ scope?.item?.label }}</div>
      </template>
    </AVirtualList>
  </div>
  <div class="virtual-list-actions">
    <AButton @click="listRef.scrollToBottom()">跳到底部</AButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { VirtualList as AVirtualList } from '@any-design/anyui/vue';

const listRef = ref();
const items = Array.from({ length: 2000 }, (_, i) => ({
  id: String(i),
  label: `第 ${i} 行`,
}));
</script>

<style scoped>
.virtual-list-preview {
  height: 320px;
}

.virtual-list-actions {
  margin-top: 12px;
}

.virtual-list-row {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  border-bottom: 1px solid var(--line);
  color: var(--text);
  box-sizing: border-box;
}
</style>
```

### 自定义高度与缓冲

根据行高调整 `estimatedItemHeight`，增大 `buffer` 以渲染更多屏外项（快速滚动时更流畅）。

```vue
<template>
  <div class="virtual-list-preview">
    <AVirtualList :items="items" :estimated-item-height="84" :buffer="2000">
      <template #default="scope">
        <div class="virtual-list-card">
          <strong>{{ scope?.item?.label }}</strong>
          <span>带自定义高度的行内容。</span>
        </div>
      </template>
    </AVirtualList>
  </div>
</template>

<script setup>
import { VirtualList as AVirtualList } from '@any-design/anyui/vue';

const items = Array.from({ length: 1000 }, (_, i) => ({
  id: String(i),
  label: `卡片 ${i}`,
}));
</script>

<style scoped>
.virtual-list-preview {
  height: 360px;
}

.virtual-list-card {
  min-height: 84px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  margin: 0 0 10px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: var(--a-radius-md, 12px);
  background: var(--surface);
  color: var(--text);
  box-sizing: border-box;
}

.virtual-list-card span {
  color: var(--text-secondary);
}
</style>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | Array<{ id, ... }> | [] | 数据项（每项必须含 `id`）。 |
| `estimatedItemHeight` | Number | undefined | 用于布局估算的行高。 |
| `buffer` | Number | 1200 | 额外渲染缓冲（px）。 |
| `firstScreenThreshold` | Number | 10 | 首屏渲染的项目数。 |
| `preserveScrollTop` | Boolean | true | 数据变化时保持滚动位置。 |
| `ignoreInvisibleItems` | Boolean | false | 布局中跳过不可见项。 |
| `dynamicEstimatedHeight` | Boolean | true | 根据测量值优化估算高度。 |
| `enableDeepWatch` | Boolean | false | 深度监听 `items`。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | { item } | 项目模板。 |

## 方法

| 方法 | 签名 | 说明 |
| --- | --- | --- |
| `scrollToItem / scrollToBottom / scrollTo` | (index \| top) => void | 命令式滚动。 |
| `refresh / refreshDisplay` | () => void | 重新计算布局。 |
| `getContainer` | () => HTMLElement | DOM 访问器。 |

## 说明

该包还注册了 `AVirtualListItem`（以 `VirtualListItem` 导出）。
