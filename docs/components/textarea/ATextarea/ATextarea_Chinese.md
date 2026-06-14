# ATextarea

`ATextarea` 是多行文本框，会随内容自适应高度，并在最小 / 最大行数之间收缩。它支持 `v-model`、Ctrl/Cmd + Enter 提交，以及 `before` / `after` 插槽用于放置周边内容。

## 引入

```ts
import { Textarea } from '@any-design/anyui/vue';
// React:  import { Textarea } from '@any-design/anyui/react';
// Svelte: import { Textarea } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <ATextarea v-model="msg" placeholder="写点什么…" />
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('');
</script>
```

## 示例

### 控制高度

`minRows` 设置初始高度；`maxRows` 是开始滚动而非继续增高的阈值。

```vue
<template>
  <ATextarea v-model="msg" :min-rows="2" :max-rows="6" placeholder="2–6 行" />
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('');
</script>
```

### Ctrl/Cmd + Enter 提交

按下 Ctrl/Cmd + Enter 时会触发 `submit` 事件并返回当前值 —— 适合聊天或评论框。

```vue
<template>
  <ATextarea v-model="msg" placeholder="按 ⌘/Ctrl + Enter 发送" @submit="onSend" />
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('');
const onSend = (value) => { console.log('已发送：', value); msg.value = ''; };
</script>
```

### 状态与插槽

`disabled`、`readonly`、`borderless` 对应不同模式。`after` 插槽是放置工具栏的好位置。

```vue
<template>
  <ATextarea v-model="msg" placeholder="添加备注">
    <template #after>
      <AButton type="primary" size="small" @click="save">保存</AButton>
    </template>
  </ATextarea>
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('');
const save = () => console.log(msg.value);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | String | '' | 绑定值（`v-model`）。 |
| `placeholder` | String | '' | 占位文本。 |
| `minRows` | Number | 3 | 最小高度（行）。 |
| `maxRows` | Number | 10 | 最大高度（行），超过后滚动。 |
| `lineHeight` | Number | 1.5 | 用于高度计算的行高。 |
| `readonly` | Boolean | false | 只读。 |
| `disabled` | Boolean | false | 禁用。 |
| `disableResizeCorner` | Boolean | false | 隐藏原生缩放手柄。 |
| `autoMatchHeight` | Boolean | false | 持续匹配内容高度（无上限）。 |
| `borderless` | Boolean | false | 移除边框。 |
| `maxlength / minlength` | Number | undefined | 原生长度约束。 |
| `autocomplete` | String | 'off' | 原生 autocomplete。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | String | 值变化。 |
| `input / change` | InputEvent | 原生事件。 |
| `blur` | FocusEvent | 原生 blur。 |
| `submit` | String | Ctrl/Cmd + Enter 时触发。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `before` | — | 文本框上方的区域。 |
| `after` | — | 文本框下方的区域。 |
