# AStep 组件文档

这个组件是一个步骤条。

## 基本用法和示例

使用 `AStep` 组件，可以创建一个步骤条：

```vue
<template>
  <AStep :steps="3" :current="2" />
</template>
```

## Props

该组件接受以下 props：

| 属性名  | 类型                    | 默认值 | 说明               |
| ------- | ----------------------- | ------ | ------------------ |
| steps   | Number \| Array<string> | 2      | 步骤条每一项的文本 |
| current | Number                  | 1      | 当前步骤的 index   |

示例：

```vue
<template>
  <AStep :steps="['step1', 'step2', 'step3']" :current="2" />
</template>

<script>
import { AStep } from '@any-design/anyui';

export default {
  components: {
    AStep,
  },
};
</script>
```

## Events

该组件没有会被触发的事件。

## Methods

该组件没有公开的方法或值。
