# ARadioGroup 组件文档

这个组件是一组单选框。

## 基本用法和示例

使用 `ARadioGroup` 组件，可以创建一组单选框：

```vue
<template>
  <ARadioGroup :items="items" v-model="selected"></ARadioGroup>
</template>

<script>
import { ARadioGroup } from '@any-design/anyui';

export default {
  components: {
    ARadioGroup,
  },
  data() {
    return {
      items: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' },
      ],
      selected: '1',
    };
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名     | 类型                                       | 默认值 | 说明                                                                                                                 |
| ---------- | ------------------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------- |
| items      | `[{ label: string, value: string }]` 类型  | `[]`   | 由多个对象组成的数组，每个对象包含 `label` 和 `value` 两个属性。                                                   |
| modelValue | `string | number` 类型                     | `none` | 单选框组件被选中的项的值，必须使用 v-model 进行双向绑定。若属性值不在 items 数组中，则不会有任何选中项的效果。 |

## Events

该组件会触发以下事件：

| 事件名        | 说明                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| update:modelValue | 当单选框组件被选中的项的值发生改变时触发。会传递被选中项的值作为参数。 |
  
## Exposed Methods & Values

该组件暴露以下方法：

| 方法名           | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| selected         | 用于获取或设置当前选中的项的值。当值为 `undefined` 时，表示没有选中任何项。   |
| handleItemChange | 当单选框组件被选中的项的值发生改变时被调用。会传递被选中项作为参数。 |

## 注意事项

- 该组件中引用了 `getCertainParent` 和 `FormItemEventEmitter` 等其他变量。这些变量不是组件的 props、events 或 methods，不应在使用该组件时出现在代码中。