# AFloat

`AFloat` 是停靠在视口边缘的浮动面板。通过 `v-model:visible` 控制显隐，用 `top` 调整位置，可选 `centered` 改为居中而非停靠。适合命令面板、通知堆叠或辅助面板。

## 引入

```ts
import { Float } from '@any-design/anyui/vue';
// React:  import { Float } from '@any-design/anyui/react';
// Svelte: import { Float } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AButton @click="visible = true">打开面板</AButton>
  <AFloat v-model:visible="visible" :top="80" width="480">
    <div style="padding: 16px">
      <AInput placeholder="搜索命令…" />
    </div>
  </AFloat>
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>
```

## 示例

### 居中

设置 `centered` 获得类似模态的居中面板，而非停靠。

```vue
<template>
  <AFloat v-model:visible="visible" centered width="560">
    <div style="padding: 24px">
      <h3>快捷操作</h3>
    </div>
  </AFloat>
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(true);
</script>
```

### 圆角

添加 `round` 获得胶囊形圆角。

```vue
<template>
  <AFloat v-model:visible="visible" round :top="60" width="420">
    <div style="padding: 16px">圆角浮动面板</div>
  </AFloat>
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(true);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | Boolean | false | 是否可见（`v-model:visible`）。 |
| `top` | Number \| String | undefined | 距顶部偏移。 |
| `width` | String \| Number | 800 | 面板宽度。 |
| `padding` | String \| Number | undefined | 内边距。 |
| `round` | Boolean | false | 圆角。 |
| `roundRadius` | Number \| String | undefined | 自定义圆角。 |
| `centered` | Boolean | false | 居中而非停靠。 |
| `lockScroll` | Boolean | true | 打开时锁定滚动。 |
| `scrollLockTarget` | String | 'html' | 锁定元素的选择器。 |
| `zIndex` | Number | 1000 | z-index。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:visible` | Boolean | 可见性变化。 |
| `close` | — | 关闭时触发。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 面板内容。 |
