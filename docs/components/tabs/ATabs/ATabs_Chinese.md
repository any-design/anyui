# ATabs

`ATabs` 用于在不同内容面板之间切换。由 `ATab`（触发器）与 `ATabPanel`（内容）组合使用。`line` 变体带动画下划线指示器，`card` 变体为高亮按钮样式。通过 `v-model:modelValue` 绑定当前激活的标签。

## 引入

```ts
import { Tabs, Tab, TabPanel } from '@any-design/anyui/vue';
// React:  import { Tabs, Tab, TabPanel } from '@any-design/anyui/react';
// Svelte: import { Tabs, Tab, TabPanel } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <ATabs v-model="active">
    <template #tab>
      <ATab :value="1">资料</ATab>
      <ATab :value="2">设置</ATab>
    </template>
    <ATabPanel :value="1"><p>资料内容。</p></ATabPanel>
    <ATabPanel :value="2"><p>设置内容。</p></ATabPanel>
  </ATabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Tabs, Tab, TabPanel } from '@any-design/anyui/vue';
const active = ref(1);
</script>
```

## 示例

### 卡片样式

设置 `type="card"` 将激活标签以填充按钮高亮，替代下划线。

```vue
<template>
  <ATabs v-model="active" type="card">
    <template #tab>
      <ATab :value="1">概览</ATab>
      <ATab :value="2">动态</ATab>
    </template>
    <ATabPanel :value="1"><p>概览。</p></ATabPanel>
    <ATabPanel :value="2"><p>动态信息流。</p></ATabPanel>
  </ATabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Tabs, Tab, TabPanel } from '@any-design/anyui/vue';
const active = ref(1);
</script>
```

### 尺寸与位置

`size` 调节栏高（`small` / `default` / `large`）；`position="bottom"` 将标签栏置于内容下方。

### 禁用与图标

为 `ATab` 传 `disabled` 可禁用，传 `icon` 可显示前导 iconify 图标。

### 保留状态

在面板上设置 `keepAlive` 可在非激活时仍保留挂载（保留组件状态）；`lazy` 渲染一次后复用。

## 键盘操作

`←/→`、`↑/↓` 在标签间移动；`Home`/`End` 跳到首个 / 末个标签；`Enter`/`Space` 激活。

## ATabs 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | String \| Number | — | 当前激活标签值（`v-model:modelValue`）。 |
| `type` | 'line' \| 'card' | 'line' | 视觉样式。 |
| `size` | 'small' \| 'default' \| 'large' | 'default' | 栏密度。 |
| `position` | 'top' \| 'bottom' | 'top' | 标签栏位置。 |
| `autoSelect` | Boolean | true | 未提供 `modelValue` 时自动选中首个标签。 |

## ATabs 插槽

| 插槽 | 说明 |
| --- | --- |
| `tab` | 标签触发器（`ATab`）。 |
| `default` | 标签面板（`ATabPanel`）。 |

## ATab 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | String \| Number | — | 标识该标签的值，省略时使用索引。 |
| `disabled` | Boolean | false | 是否禁用。 |
| `icon` | String | `''` | 前导图标名（iconify）。 |

## ATabPanel 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | String \| Number | — | 需与对应 `ATab` 的 value 匹配。 |
| `keepAlive` | Boolean | false | 非激活时仍保留挂载。 |
| `lazy` | Boolean | false | 渲染一次后复用。 |