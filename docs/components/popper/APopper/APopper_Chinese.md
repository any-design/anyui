# APopper 组件文档

该组件是一个弹出面板。

## 基本用法和示例

使用 `APopper` 组件，可以创建一个弹出面板：

```vue
<template>
  <APopper>
    <span>点击我</span>
    <template #popup>
      <div>弹出面板</div>
    </template>
  </APopper>
</template>
```

## Props

该组件接受以下 props：

| 属性名                | 类型                                                      | 默认值 | 说明                                                                                                       |
| --------------------- | --------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| hideDelay             | Number                                                    | 100    | 延迟弹出面板隐藏的时间（毫秒）                                                                             |
| placement             | String                                                   | 'bottom' | 弹出位置, 可选值: 'auto', 'top', 'right', 'bottom', 'left', 'auto-start', 'auto-end', 'top-start', 等等 |
| triggerType           | String                                                   | 'hover' | 触发器类型                                                                                                 |
| offset                | Number                                                   | 18     | 触发器与弹出面板之间的距离                                                                                 |
| zIndex                | Number                                                   | 3000   | 弹出面板的 z-index 属性                                                                                    |
| appendToBody          | Boolean                                                  | true   | 是否将弹出面板的位置挂於 document.body 上                                                                   |
| popupClass            | String                                                   | null   | 弹出面板的类名，可以自定义其样式                                                                            |
| transition            | String                                                   | null   | 过渡动画效果的类名                                                                                         |
| closeWhenClickOutside | Boolean                                                  | true   | 是否在点击弹出面板外自动隐藏                                                                               |

## Events

该组件会发出以下事件：

| 事件名                | 回调参数类型 | 说明                                                                                         |
| --------------------- | ------------ | -------------------------------------------------------------------------------------------- |
| popupStatusChanged    | Boolean      | 弹出面板的状态变化，参数 `true` 表示弹出面板已展示，参数 `false` 表示弹出面板已隐藏 |

## 方法

该组件暴露以下方法：

| 方法名 | 说明                                                                                   |
| ------ | -------------------------------------------------------------------------------------- |
| show   | 手动展示弹出面板                                                                       |
| hide   | 手动隐藏弹出面板                                                                       |

示例：

```vue
<template>
  <div>
    <APopper v-bind="$attrs" ref="popper">
      <template v-if="$slots.trigger">
        <slot name="trigger" :show="show" :hide="hide"></slot>
      </template>
      <template #popup>
        <slot :show="show" :hide="hide" :popupStatusChanged="onPopupStatusChanged"></slot>
      </template>
    </APopper>
  </div>
</template>

<script>
import { ref } from 'vue';
import APopper from '@any-design/anyui/lib/APopper';

export default {
  components: {
    APopper,
  },
  setup(props) {
    const popperRef = ref(null);
    const show = () => {
      popperRef.value?.show();
    };
    const hide = () => {
      popperRef.value?.hide();
    };
    const onPopupStatusChanged = (isShowed) => {
      // do something after popup status changed
    };
    return {
      show,
      hide,
      onPopupStatusChanged,
      popperRef,
    };
  },
};
</script>
```