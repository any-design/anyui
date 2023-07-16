# ACheckboxGroup 组件文档

这个组件是一个复选框组，可以选择多个值。

## 基本用法和示例

使用 `ACheckboxGroup` 组件，可以创建一个多选框组：

```vue
<template>
  <ACheckboxGroup :items="['选项1', '选项2', '选项3']" v-model="selectedItems" />
</template>

<script>
import { ACheckboxGroup } from '@any-design/anyui';

export default {
  components: {
    ACheckboxGroup,
  },
  setup() {
    const selectedItems = ref([]);
    return {
      selectedItems,
    };
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名   | 类型                  | 默认值  | 说明                         |
| -------- | --------------------- | ------- | ---------------------------- |
| modelValue | Array | [] | 选中的选项的值 |
| items    | Array\<string \| number\> | - | 选项的列表 |
| gap      | Number                | 16      | 选项之间的间隙，单位为 px。 |

## 事件

该组件会在下列情况下触发 emit 事件：

| 事件名           | 参数含义                                                 |
| ---------------- | -------------------------------------------------------- |
| update:modelValue | 当选中的选项改变时，触发该事件，将新的选中的选项值更新至父组件。 |


## 方法和值

该组件暴露了以下方法和值：

### 子组件组合值 `storedValues`

代表了每个选项的选中状态。该值的类型为 `Record<string, boolean>`。

### 生成各个选项所需的样式 `checkboxItemStyles`

`checkboxItemStyles` 是一个计算属性，其工作是为每个选项生成需要的CSS样式。

### `changeMethodFactory(item: string | number)`

根据传入的选项值生成函数，用于实时响应用户的选项选择。

### `handleItemChange(checked: boolean, item: string | number)`

处理单个选项的选中状态改变。

示例：

```vue
<template>
  <ACheckboxGroup :items="['选项1', '选项2', '选项3']" v-model="selectedItems" />
</template>

<script>
import { ACheckboxGroup } from '@any-design/anyui';
import { ref } from 'vue';

export default {
  components: {
    ACheckboxGroup,
  },
  setup() {
    const selectedItems = ref([]);
    const { storedValues, changeMethodFactory, handleItemChange } = ACheckboxGroup.setup({
      items: ['选项1', '选项2', '选项3'],
      modelValue: [],
    });
    return {
      selectedItems,
      storedValues,
      changeMethodFactory,
      handleItemChange,
    };
  },
};
</script>
```