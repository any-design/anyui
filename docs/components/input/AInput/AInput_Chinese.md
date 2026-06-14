# AInput

`AInput` 是用于单行文本输入的输入框。它支持 `v-model` 双向绑定、三种尺寸、前后缀装饰插槽、密码等多种原生 type，并在按下回车时触发 `submit` 事件。

## 引入

```ts
import { Input } from '@any-design/anyui/vue';
// React:  import { Input } from '@any-design/anyui/react';
// Svelte: import { Input } from '@any-design/anyui/svelte';
```

## 基础用法

通过 `v-model` 绑定值，并设置占位文本。

```vue
<template>
  <AInput v-model="value" placeholder="你的名字" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref('');
</script>
```

## 示例

### 尺寸与圆角

```vue
<template>
  <div class="demo-col">
    <AInput size="small" placeholder="Small" />
    <AInput placeholder="Default" />
    <AInput size="large" placeholder="Large" />
    <AInput round placeholder="Rounded" />
  </div>
</template>
```

### 状态

`disabled` 用于置灰输入框，`readonly` 让内容可选但不可编辑。

```vue
<template>
  <div class="demo-col">
    <AInput model-value="只读" readonly />
    <AInput model-value="禁用" disabled />
    <AInput placeholder="无边框" borderless />
  </div>
</template>
```

### 密码与提交

设置 `type="password"` 进行掩码输入。用户按下回车时会触发 `submit` 事件，并返回当前值。

```vue
<template>
  <AInput v-model="pw" type="password" placeholder="密码" @submit="onSubmit" />
</template>

<script setup>
import { ref } from 'vue';
const pw = ref('');
const onSubmit = (value) => console.log('提交：', value);
</script>
```

### 前缀、后缀与尾部按钮插槽

`prefix` 与 `postfix` 插槽用于在输入框内部渲染装饰（通常是图标），`post-button` 添加一个可点击的尾部按钮 —— 非常适合搜索框。

```vue
<template>
  <AInput v-model="q" placeholder="搜索…">
    <template #prefix><AIcon name="ri:search-line" /></template>
    <template #post-button>
      <AButton type="primary" size="small" @click="search">搜索</AButton>
    </template>
  </AInput>
</template>

<script setup>
import { ref } from 'vue';
const q = ref('');
const search = () => console.log(q.value);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | String \| Number | '' | 绑定值；Vue 用 `v-model`，Svelte 用 `bind:`，React 用 `value` + `onUpdateModelValue`。 |
| `placeholder` | String | '' | 占位文本。 |
| `width` | String \| Number | '100%' | 输入框宽度（数字会当作 px）。 |
| `size` | 'default' \| 'small' \| 'large' | 'default' | 输入框尺寸。 |
| `round` | Boolean | false | 胶囊形圆角输入框。 |
| `borderless` | Boolean | false | 移除默认边框。 |
| `disabled` | Boolean | false | 禁用输入框。 |
| `readonly` | Boolean | false | 只读模式。 |
| `editable` | Boolean | true | 为 false 时不可编辑（仍可获得焦点）。 |
| `type` | String | undefined | 原生 input `type`，例如 `password`、`file`、`number`。 |
| `max / min` | Number | undefined | 数值上下界（用于 `type="number"`）。 |
| `maxlength / minlength` | Number | undefined | 原生长度约束。 |
| `autocomplete` | String | 'off' | 原生 autocomplete 属性。 |
| `prefixPadding / postfixPadding` | Number | undefined | `measureSlots` 关闭时，前后缀区域的手动内边距（px）。 |
| `measureSlots` | Boolean | true | 自动测量前后缀插槽宽度以填充文本区域。（仅 Vue。） |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `update:modelValue` | String \| Number | 值变化时触发。 |
| `input` | InputEvent | 原生 input 事件。 |
| `change` | InputEvent | 原生 change 事件。 |
| `submit` | String | 按下回车时触发并返回当前值。 |
| `blur` | FocusEvent | 原生 blur 事件。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `prefix` | — | 渲染在文本之前的内容（例如图标）。 |
| `postfix` | — | 渲染在文本之后的内容。 |
| `post-button` | — | 文本之后可点击的按钮。 |
