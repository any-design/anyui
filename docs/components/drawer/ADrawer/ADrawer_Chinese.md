# ADrawer 组件文档

这个组件是一个抽屉。

## 基本用法和示例

使用 `ADrawer` 组件，可以创建一个抽屉：

```vue
<template>
  <ADrawer v-model="isDrawerVisible">我是抽屉</ADrawer>
</template>

<script>
import { ADrawer } from '@any-design/anyui';

export default {
  components: {
    ADrawer,
  },
  data() {
    return {
      isDrawerVisible: false,
    };
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名          | 类型                  | 默认值    | 说明                                     |
| --------------- | --------------------- | --------- | ---------------------------------------- |
| drawerClass     | String                |           | 应用于抽屉的 class                        |
| maskClass       | String                |           | 应用于抽屉遮罩的 class                    |
| bodyClass       | String                |           | 应用于抽屉主体的 class                    |
| appendToBody    | Boolean               | true      | 是否移动到 body 上                       |
| position        | DrawerPosition(String) | 'left'    | 抽屉的位置                               |
| modelValue      | Boolean               | false     | 表示抽屉是否可见的 Boolean 值             |
| withMask        | Boolean               | true      | 是否显示遮罩                             |
| width           | String/Number         | '30%'     | 抽屉的宽度                               |
| zIndex          | Number                | 100       | 抽屉的 z-index                           |
| maskZIndex      | Number                |           | 遮罩的 z-index                           |
| transitionName  | String                |           | 抽屉过渡效果的名称                       |
| lockScroll      | Boolean               | true      | 是否锁定抽屉展开时，父容器不可滚动       |
| lockTarget      | String                | 'document.body' | 容器锁定的元素                      |

### position

该属性用于设置抽屉的位置。可以是以下值:

* left(默认)，表示抽屉出现在左侧
* right，表示抽屉出现在右侧

### width

该属性设置抽屉的宽度，默认为 '30%' 。除了基本的字符串之外，也可以传递数字表示像素。

### transitionName

该属性设置抽屉过渡效果的名称。

### lockTarget

该属性用于定义锁定抽屉展开时父容器不可滚动的目标元素，默认为 'document.body' 。

### lockScroll

该属性用于控制锁定父容器是否可滚动，true 为锁定不可滚动，false 为不锁定，抽屉展开时仍然可以滚动父容器。

## Events

该组件将会触发以下事件：

| 事件名          | 说明               |
| --------------- | ------------------ |
| update:modelValue | 更改视图是否可见 |

## Slots

该组件含有默认 slot，用法如下：

```vue
<template>
  <ADrawer v-model="isDrawerVisible">
    <p>这是 slot 内的内容</p>
  </ADrawer>
</template>
```

## 示例代码

下面的代码演示了一个 `ADrawer` 的基本用法：

```vue
<template>
  <div>
    <button @click="isDrawerVisible = true">打开抽屉</button>
    <ADrawer v-model="isDrawerVisible">
        <p>这是一个抽屉</p>
    </ADrawer>
  </div>
</template>

<script>
import { ADrawer } from "@any-design/anyui";
export default {
  components: {
    ADrawer
  },
  data() {
    return {
      isDrawerVisible: false
    };
  }
};
</script>
```