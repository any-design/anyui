# AInput 组件文档

这个组件是一个输入框。

## 基本用法和示例

使用 `AInput` 组件，可以创建一个输入框，如下：

```vue
<template>
  <AInput v-model="value" placeholder="请输入内容" />
</template>
<script>
import { AInput } from '@any-design/anyui';

export default {
  components: {
    AInput,
  },
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

| 属性名      | 类型            | 默认值 | 说明                                   |
| ----------- | --------------- | ------ | -------------------------------------- |
| width       | String, Number  | '100%' | 宽度，可以是数字或者字符串              |
| size        | String          | 'default' | 输入框尺寸                              |
| round       | Boolean         | false  | 是否应用圆角边框到输入框               |
| borderless  | Boolean         | false  | 是否去掉输入框的边框                   |
| modelValue  | String, Number  | ''     | 输入框的内容，支持 v-model 双向绑定     |
| placeholder | String          | ''     | 输入框的占位符内容                     |
| disabled    | Boolean         | false  | 是否禁用输入框                         |
| readonly    | Boolean         | false  | 是否只读输入框                         |
| editable    | Boolean         | true   | 是否可编辑（在不是只读或禁用的情况下） |
| type        | String          | ''     | input 类型                             |
| max         | Number          |        | input 最大值                           |
| min         | Number          |        | input 最小值                           |
| maxlength   | Number          |        | input 最大长度                         |
| minlength   | Number          |        | input 最小长度                         |
| autocomplete | String          | 'off'  | 是否启用自动补全功能                  |

## Events

| 事件名        | 说明               | 回调函数参数                   |
| ------------- | ------------------ | ------------------------------ |
| update:modelValue | 绑定值被更新时的事件 | 更新后的值                     |
| submit        | 用户按下回车键时触发 | 用户输入的内容                |

## 插槽

该组件接受以下插槽：

| 插槽名        | 说明             |
| ------------- | ---------------- |
| prefix        | 输入框前置内容   |
| postfix       | 输入框后置内容   |
| post-button   | 输入框尾部按钮   |

### prefix

```vue
<template>
  <AInput>
    <template #prefix>
      <svg>...</svg>
    </template>
  </AInput>
</template>
```

### postfix

```vue
<template>
  <AInput>
    <template #postfix>
      <svg>...</svg>
    </template>
  </AInput>
</template>
```

### post-button

```vue
<template>
  <AInput>
    <template #post-button>
      <AButton>按钮</AButton>
    </template>
  </AInput>
</template>
```

## 方法

该组件提供以下方法：

### clear

清空输入框内容

```vue
<template>
  <AInput ref="input" />
  <AButton @click="() => inputRef.clear()">清空</AButton>
</template>

<script>
import { AInput, AButton } from '@any-design/anyui';

export default {
  components: {
    AInput,
    AButton,
  },
  setup() {
    const inputRef = ref();

    return {
      inputRef,
    };
  },
};
</script>
```