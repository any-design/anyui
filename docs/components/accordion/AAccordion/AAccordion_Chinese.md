# AAccordion

`AAccordion` 是一组基于 `ACollapse` 的可折叠面板。由 `AAccordionItem`（头部 + 可折叠内容）组合使用。`mode="single"` 为经典手风琴（同时只展开一个），`mode="multiple"` 可同时展开多个。通过 `v-model:modelValue` 控制展开的面板。

## 引入

```ts
import { Accordion, AccordionItem } from '@any-design/anyui/vue';
// React:  import { Accordion, AccordionItem } from '@any-design/anyui/react';
// Svelte: import { Accordion, AccordionItem } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AAccordion v-model="open">
    <AAccordionItem :value="1" title="AnyUI 是什么？">
      AnyUI 是一个跨框架组件库。
    </AAccordionItem>
    <AAccordionItem :value="2" title="支持主题吗？">
      支持 —— 每个组件都基于 CSS 变量。
    </AAccordionItem>
  </AAccordion>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Accordion, AccordionItem } from '@any-design/anyui/vue';
const open = ref(1);
</script>
```

## 示例

### 多开模式

设置 `mode="multiple"` 允许同时展开多个面板，`modelValue` 为值数组。

```vue
<template>
  <AAccordion v-model="open" mode="multiple">
    <AAccordionItem :value="1" title="第一段">多个面板可同时展开。</AAccordionItem>
    <AAccordionItem :value="2" title="第二段">独立切换每个面板。</AAccordionItem>
  </AAccordion>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Accordion, AccordionItem } from '@any-design/anyui/vue';
const open = ref([1]);
</script>
```

### 自定义头部与图标

使用 `header` 插槽替代 `title` 渲染自定义头部；传 `icon` 显示前导图标，传 `expandIcon` 自定义展开 / 收起箭头。

### 禁用与圆角

为 item 设置 `disabled` 可禁止切换；为 `AAccordion` 设置 `round` 得到圆角，设置 `border={false}` 去除外边框。

### 不可全部收起

`single` 模式下设置 `collapsible={false}` 可始终保留一个展开面板（点击已展开面板不会收起）。

## AAccordion 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | String \| Number \| Array | — | 展开项的值。单选模式为单个值；多选模式为数组。 |
| `mode` | 'single' \| 'multiple' | 'single' | 展开行为。 |
| `collapsible` | Boolean | true | 单选模式下是否允许全部收起。 |
| `border` | Boolean | true | 是否显示外边框。 |
| `round` | Boolean | false | 是否圆角。 |

## AAccordionItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | String \| Number | — | 标识该项的值，省略时使用索引。 |
| `title` | String | `''` | 头部文本（使用 `header` 插槽时忽略）。 |
| `icon` | String | `''` | 前导图标名（iconify）。 |
| `expandIcon` | String | `'ic:round-keyboard-arrow-down'` | 展开 / 收起图标。 |
| `disabled` | Boolean | false | 是否禁用。 |

## AAccordionItem 插槽

| 插槽 | 说明 |
| --- | --- |
| `default` | 可折叠内容。 |
| `header` | 自定义头部内容（替代 `title`）。 |