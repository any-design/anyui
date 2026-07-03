# APopper

`APopper` 是底层定位原语（基于 Popper.js），支撑 `ATooltip`、`ADropdownMenu` 与 `APopupMenu`。当你需要自定义弹出层并锚定到触发元素、且要完全控制位置和触发行为时，可直接使用它。

## 引入

```ts
import { Popper } from '@any-design/anyui/vue';
// React:  import { Popper } from '@any-design/anyui/react';
// Svelte: import { Popper } from '@any-design/anyui/svelte';
```

## 基础用法

触发器建议使用 `AButton`，多个触发方式可以放进 `.demo-row`，让预览区保持一行扫描。

```vue
<template>
  <div class="demo-row popper-preview-row">
    <APopper placement="top">
      <AButton>悬停</AButton>
      <template #popup>
        <div class="popper-preview-card">
          <strong>悬停面板</strong>
          <p>在触发按钮上方展示一段轻量提示。</p>
        </div>
      </template>
    </APopper>

    <APopper placement="bottom" trigger-type="click">
      <AButton type="primary">点击</AButton>
      <template #popup>
        <div class="popper-preview-card">
          <strong>点击面板</strong>
          <p>点击外部关闭，然后可以再次点击打开。</p>
        </div>
      </template>
    </APopper>

    <APopper placement="bottom-start" trigger-type="contextmenu">
      <AButton type="secondary">右键</AButton>
      <template #popup>
        <div class="popper-preview-card">
          <strong>右键面板</strong>
          <p>在外部右键可关闭，随后可以再次触发。</p>
        </div>
      </template>
    </APopper>

    <APopper ref="manualPopper" placement="right" trigger-type="manual">
      <AButton @click="openManual">打开</AButton>
      <template #popup>
        <div class="popper-preview-card">
          <strong>手动面板</strong>
          <p>命令式控制适合引导流程或复杂状态。</p>
          <AButton size="small" type="secondary" @click="manualPopper?.hide()">关闭</AButton>
        </div>
      </template>
    </APopper>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';

const manualPopper = ref();

const openManual = async () => {
  manualPopper.value?.hide();
  await nextTick();
  manualPopper.value?.show();
};
</script>

<style scoped>
.popper-preview-row {
  gap: 12px 14px;
}

.popper-preview-card {
  width: max-content;
  max-width: 240px;
  padding: 12px 14px;
  border: 1px solid var(--a-surface-border-color, var(--line));
  border-radius: var(--a-radius, 14px);
  background: var(--a-surface, var(--bg-bright));
  box-shadow: var(--a-shadow-md, 0 4px 10px var(--shadow-5), 0 12px 28px -8px var(--shadow-10));
  color: var(--text);
  font-size: 13px;
  line-height: 1.5;
}

.popper-preview-card strong {
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  font-weight: 700;
}

.popper-preview-card p {
  margin: 0 0 10px;
  color: var(--text-secondary, var(--text));
}
</style>
```

## 示例

### 手动触发

设置 `triggerType="manual"`，通过模板 ref 调用暴露的 `show()` / `hide()` 方法实现完全的命令式控制。

```vue
<template>
  <APopper ref="popper" trigger-type="manual">
    <AButton @click="openPopper">打开</AButton>
    <template #popup>
      <div class="custom-pop">
        受控弹出层
        <AButton size="small" @click="popper.hide()">关闭</AButton>
      </div>
    </template>
  </APopper>
</template>

<script setup>
import { nextTick, ref } from 'vue';

const popper = ref();

const openPopper = async () => {
  popper.value?.hide();
  await nextTick();
  popper.value?.show();
};
</script>
```

### 右键

使用 `triggerType="contextmenu"` 将弹出层锚定到右键。

```vue
<template>
  <APopper trigger-type="contextmenu" placement="bottom-start">
    <AButton type="secondary">右键点击我</AButton>
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
