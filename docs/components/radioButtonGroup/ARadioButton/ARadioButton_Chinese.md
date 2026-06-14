# ARadioButton

ARadioButton 是单个按钮式单选项，随 ARadioButtonGroup 一起导出。

## 引入

```ts
import { RadioButton } from '@any-design/anyui/vue';
```

React 与 Svelte 的引入路径分别是 `@any-design/anyui/react` 和 `@any-design/anyui/svelte`，组件 API 保持一致。

## 基础用法

```vue
<template>
  <ARadioButton />
</template>

<script setup>
import { RadioButton } from '@any-design/anyui/vue';
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `label` | String | '' | 按钮上显示的标签。 |
| `value` | String \| Number | undefined | 该按钮代表的值。 |
| `disabled` | Boolean | false | 禁用。 |
