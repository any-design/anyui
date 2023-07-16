# ASplit 组件文档

这个组件是一条分割线。

## 基本用法和示例

使用 `ASplit` 组件，可以创建一条分割线：

```vue
<template>
  <ASplit :height="4" color="red" :round="true" margin="20px"></ASplit>
</template>

<script>
import { ASplit } from '@any-design/anyui';

export default {
  components: {
    ASplit,
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名   | 类型                           | 默认值  | 说明                                               |
| -------- | ------------------------------ | ------- | -------------------------------------------------- |
| height   | `String`或`Number`类型         | `2`     | 分割线的高度，可以是百分比或数字                   |
| color    | `String`类型                   | `'var(--line)'`  | 分割线的颜色                                       |
| margin   | `String`或`Number`类型         | `12`    | 分割线的上下外边距，可以是百分比或数字             |
| round    | `Boolean`类型                  | `false` | 分割线是否显示带圆角边框                           |

分割线高度示例:

```vue
<template>
  <ASplit :height="200"></ASplit>
</template>

<script>
import { ASplit } from '@any-design/anyui';

export default {
  components: {
    ASplit,
  },
};
</script>
```

圆角边框示例：

```vue
<template>
  <ASplit :height="4" color="red" :round="true" margin="20px"></ASplit>
</template>

<script>
import { ASplit } from '@any-design/anyui';

export default {
  components: {
    ASplit,
  },
};
</script>
``` 

## 暴露的方法与值

该组件没有暴露的方法与值。