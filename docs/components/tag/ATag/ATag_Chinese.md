# ATag 组件文档

该组件用于创建一个 tag。

## 基本用法和示例

通过使用 `ATag` 组件，可以创建一个 tag：

```vue
<template>
  <ATag>标签</ATag>
</template>
```

## Props

该组件接受以下 props：

| 属性名 | 类型    | 默认值    | 说明                                                    |
| ------ | ------- | --------- | ------------------------------------------------------- |
| round  | Boolean | false     | 是否显示圆角                                            |
| size   | String  | 'default' | tag 的尺寸，可以是 'default'，'small'，'large' 中的一种 |
| color  | String  | null      | tag 的颜色值（hex 格式），如 '#1faeff'                  |

示例：

```vue
<template>
  <ATag round size="small" color="#1faeff">小标签</ATag>
</template>

<script>
import { ATag } from '@any-design/anyui';

export default {
  components: {
    ATag,
  },
};
</script>
```

## 组件样式

该组件的样式如下：

```scss
.a-tag {
  height: 26px;
  padding: 6px 16px;
  background: #fff;
  color: var(--text);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 14px;
  border-radius: 14px;
  box-shadow: 1px 2px 8px var(--shadow-6);
  white-space: nowrap;
}

.a-tag--small {
  height: 20px;
  padding: 4px 10px;
  font-size: 10px;
  line-height: 10px;
  border-radius: 10px;
}

.a-tag--large {
  height: 32px;
  padding: 8px 20px;
  font-size: 15px;
  line-height: 16px;
  border-radius: 16px;
}
```

请注意：上方样式是组件内部实现的，不是 prop 配置项，无法更改。
