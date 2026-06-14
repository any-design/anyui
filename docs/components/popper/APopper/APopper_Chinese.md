# APopper

`APopper` 是底层定位原语（基于 Popper.js），支撑 `ATooltip`、`ADropdownMenu` 与 `APopupMenu`。当你需要自定义弹出层并锚定到触发元素、且要完全控制位置和触发行为时，可直接使用它。

## 引入

```ts
import { Popper } from '@any-design/anyui/vue';
// React:  import { Popper } from '@any-design/anyui/react';
// Svelte: import { Popper } from '@any-design/anyui/svelte';
```

## 基础用法

悬停触发元素即可显示 popup 插槽。

```vue
<template>
  <APopper placement="top">
    <AButton>悬停我</AButton>
    <template #popup>
      <div class="custom-pop">自定义弹出内容！</div>
    </template>
  </APopper>
</template>
```

## 示例

### 手动触发

设置 `triggerType="manual"`，通过模板 ref 调用暴露的 `show()` / `hide()` 方法实现完全的命令式控制。

```vue
<template>
  <APopper ref="popper" trigger-type="manual">
    <AButton @click="popper.show()">打开</AButton>
    <template #popup>
      <div class="custom-pop">
        受控弹出层
        <AButton size="small" @click="popper.hide()">关闭</AButton>
      </div>
    </template>
  </APopper>
</template>

<script setup>
import { ref } from 'vue';
const popper = ref();
</script>
```

### 右键

使用 `triggerType="contextmenu"` 将弹出层锚定到右键。

```vue
<template>
  <APopper trigger-type="contextmenu" placement="bottom-start">
    <div class="canvas">右键点击我</div>
    <template #popup>
      <div class="custom-pop">此处放置上下文操作</div>
    </template>
  </APopper>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `placement` | Placement | 'bottom' | 位置。 |
| `triggerType` | 'hover' \| 'click' \| 'contextmenu' \| 'manual' | 'hover' | 触发方式。 |
| `offset` | Number | 18 | 偏移（px）。 |
| `hideDelay` | Number | 100 | 隐藏延迟（ms）。 |
| `closeWhenClickOutside` | Boolean | true | 点击外部关闭。 |
| `zIndex` | Number | 3000 | z-index。 |
| `appendToBody` | Boolean | true | 挂载到 body。 |
| `transition` | String | undefined | 过渡名。 |
| `popupClass` | String | undefined | 类名钩子。 |
| `group` | String | '' | 共享 popper 分组。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `popupStatusChanged` | Boolean | 可见性变化。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | 触发元素。 |
| `popup` | — | 弹出内容。 |

## 方法

| 方法 | 签名 | 说明 |
| --- | --- | --- |
| `show / hide` | () => void | 命令式控制（配合 `triggerType="manual"` 使用）。 |
| `getTriggerEl / getPopupEl` | () => HTMLElement | DOM 访问器。 |
