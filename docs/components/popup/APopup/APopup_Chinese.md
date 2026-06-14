# APopup

`APopup` 是居中的模态弹层，可选遮罩。适合用于不适合 `ADialog` 结构的自定义覆盖层 —— 图片灯箱、自定义面板或完全自定义的内容。通过 `v-model` 控制显隐。

## 引入

```ts
import { Popup } from '@any-design/anyui/vue';
// React:  import { Popup } from '@any-design/anyui/react';
// Svelte: import { Popup } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AButton @click="open = true">打开弹层</AButton>
  <APopup v-model="open" width="480">
    <div style="padding: 24px">
      <h3>自定义面板</h3>
      <p>这里可以放任意内容。</p>
    </div>
  </APopup>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
```

## 示例

### 无遮罩

设置 `show-mask="false"` 获得无遮罩的覆盖层。

```vue
<template>
  <APopup v-model="open" :show-mask="false">
    <div class="floating-panel">浮动内容</div>
  </APopup>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

### 禁止点击遮罩关闭

设置 `mask-closable="false"` 强制用户显式关闭。

```vue
<template>
  <APopup v-model="open" :mask-closable="false">
    <div style="padding: 24px">
      <p>点击按钮关闭。</p>
      <AButton @click="open = false">关闭</AButton>
    </div>
  </APopup>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | Boolean | false | 是否可见（`v-model`）。 |
| `width` | Number \| String | undefined | 宽度。 |
| `showMask` | Boolean | true | 显示遮罩。 |
| `maskClosable` | Boolean | true | 点击遮罩关闭。 |
| `appendToBody` | Boolean | true | 挂载到 body。 |
| `zIndex` | Number | 1000 | z-index。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | Boolean | 可见性变化。 |
| `open / close` | — | 生命周期钩子。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 弹层内容。 |
