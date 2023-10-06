# AInput 组件文档

AInput 是一个输入框组件，用于接收用户输入的文本数据。

## 基本用法和示例

使用 AInput 组件，可以创建一个输入框：

```vue
<template>
  <AInput v-model="value" placeholder="请输入内容" />
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名         | 类型           | 默认值    | 说明                                                               |
| -------------- | -------------- | --------- | ------------------------------------------------------------------ |
| width          | String, Number | '100%'    | 输入框的宽度                                                       |
| size           | String         | 'default' | 输入框的尺寸，可以为 'default' 或 'large'                          |
| round          | Boolean        | false     | 输入框是否使用圆角                                                 |
| borderless     | Boolean        | false     | 输入框是否无边框                                                   |
| modelValue     | String, Number | ''        | 输入框的值                                                         |
| placeholder    | String         | ''        | 输入框的提示文字                                                   |
| disabled       | Boolean        | false     | 输入框是否禁用                                                     |
| readonly       | Boolean        | false     | 输入框是否只读                                                     |
| editable       | Boolean        | true      | 输入框是否可编辑                                                   |
| type           | String         |           | 输入框的类型                                                       |
| max            | Number         |           | 输入框数值的最大值（仅当类型为 `number` 或 `range` 时）            |
| min            | Number         |           | 输入框数值的最小值（仅当类型为 `number` 或 `range` 时）            |
| maxlength      | Number         |           | 输入框可输入字符的最大长度                                         |
| minlength      | Number         |           | 输入框可输入字符的最小长度                                         |
| autocomplete   | String         | 'off'     | 输入框是否自动完成                                                 |
| prefixPadding  | Number         |           | 输入框的前缀元宽度（如果有的话），单位为像素                       |
| postfixPadding | Number         |           | 输入框的后缀元宽度（如果有的话），单位为像素                       |
| leftPadding    | Number         |           | 输入框的左边距宽度，单位为像素                                     |
| rightPadding   | Number         |           | 输入框的右边距宽度，单位为像素                                     |
| measureSlots   | Boolean        | true      | 是否度量输入框插槽的大小（对于前缀、后缀或按钮元素，如果存在的话） |

## 事件

该组件会触发以下事件：

- update:modelValue：当输入框的值更新时将触发此事件，会传递新的值为参数。
- submit：当用户在输入框中按 Enter 键时将触发此事件，会传递当前的值为参数。

示例：

```vue
<template>
  <AInput v-model="value" @submit="handleSubmit" placeholder="按 Enter 提交" />
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    handleSubmit(val) {
      console.log(`提交的值：${val}`);
    },
  },
};
</script>
```

注意: 对于 'update:modelValue' 事件，你可以使用 'v-model' 指令以双向绑定输入框的值。
