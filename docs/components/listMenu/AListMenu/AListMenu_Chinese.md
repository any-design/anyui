# AListMenu

`AListMenu` 是可选中的纵向菜单。传入扁平的 `menu` 数组，或以分组标题为键的对象。用 `v-model` 绑定已选值。该包还注册了 `AListMenuItem`。

## 引入

```ts
import { ListMenu } from '@any-design/anyui/vue';
// React:  import { ListMenu } from '@any-design/anyui/react';
// Svelte: import { ListMenu } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AListMenu v-model="active" :menu="items" />
</template>

<script setup>
import { ref } from 'vue';
const active = ref('inbox');
const items = [
  { label: '收件箱', value: 'inbox' },
  { label: '已发送', value: 'sent' },
  { label: '草稿', value: 'drafts' },
];
</script>
```

## 示例

### 分组菜单

传入以分组标题为键、以选项数组为值的对象。

```vue
<template>
  <AListMenu v-model="active" :menu="groups" />
</template>

<script setup>
import { ref } from 'vue';
const active = ref('profile');
const groups = {
  账户: [
    { label: '资料', value: 'profile' },
    { label: '安全', value: 'security' },
  ],
  偏好: [
    { label: '主题', value: 'theme' },
    { label: '语言', value: 'language' },
  ],
};
</script>
```

### 纯字符串项

选项可以是纯字符串，其 value 默认为标签文字。

```vue
<template>
  <AListMenu v-model="active" :menu="['Vue', 'React', 'Svelte']" />
</template>

<script setup>
import { ref } from 'vue';
const active = ref('Vue');
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | String | undefined | 已选值（`v-model`）。 |
| `menu` | Array \| Object | undefined | 扁平数组，或按分组标题为键的对象。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | String | 选择变化。 |

## 说明

该包还注册了 `AListMenuItem`（以 `ListMenuItem` 导出）。
