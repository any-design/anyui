# ADialog

`ADialog` 是居中的模态弹窗。通过 `v-model` 控制显隐，设置 `title`，正文放在 `default` 插槽中。默认结构不满足时，可覆盖 `header` 与 `footer` 插槽。

## 引入

```ts
import { Dialog } from '@any-design/anyui/vue';
// React:  import { Dialog } from '@any-design/anyui/react';
// Svelte: import { Dialog } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AButton type="primary" @click="open = true">打开对话框</AButton>
  <ADialog v-model="open" title="欢迎">
    <p>感谢体验 AnyUI！</p>
  </ADialog>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
```

## 示例

### 自定义底部

默认底部会渲染 Cancel / OK 按钮并触发 `cancel` / `confirm` 事件。通过 `footer` 插槽可替换为自定义操作。

```vue
<template>
  <ADialog v-model="open" title="删除工作区" @confirm="onDelete">
    <p>该操作无法撤销。</p>
    <template #footer>
      <AButton @click="open = false">取消</AButton>
      <AButton type="primary" @click="onDelete">删除</AButton>
    </template>
  </ADialog>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
const onDelete = () => { console.log('已删除'); open.value = false; };
</script>
```

### 自定义头部

使用 `header` 插槽完全替换标题行 —— 适合放置标签页或富标题。

```vue
<template>
  <ADialog v-model="open" width="560">
    <template #header>
      <div class="demo-row" style="justify-content: space-between">
        <strong>设置</strong>
        <AButton size="small" @click="open = false">关闭</AButton>
      </div>
    </template>
    <p>请在下方选择你的偏好。</p>
  </ADialog>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

### 禁止点击遮罩关闭

默认点击遮罩会关闭对话框。设置 `maskClosable="false"` 强制用户显式选择。

```vue
<template>
  <ADialog v-model="open" title="确认" :mask-closable="false">
    <p>请选择一个选项。</p>
  </ADialog>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | Boolean | false | 是否可见（`v-model`）。 |
| `title` | String | '' | 标题。 |
| `width` | Number \| String | 420 | 宽度。 |
| `showClose` | Boolean | true | 显示关闭按钮。 |
| `maskClosable` | Boolean | true | 点击遮罩关闭。 |
| `appendToBody` | Boolean | true | 挂载到 body。 |
| `zIndex` | Number | 1000 | z-index。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | Boolean | 可见性变化。 |
| `confirm` | — | 默认确认按钮。 |
| `cancel` | — | 默认取消按钮。 |
| `open / close` | — | 生命周期钩子。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 正文。 |
| `header` | — | 覆盖标题与关闭区域。 |
| `footer` | — | 覆盖默认底部按钮。 |
