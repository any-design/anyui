# AStep

`AStep` 是横向步骤指示器，适用于结账、引导等多步骤流程。通过 `steps`（数量或标签数组）设置步骤，用 `current`（从 1 开始）跟踪进度。

## 引入

```ts
import { Step } from '@any-design/anyui/vue';
// React:  import { Step } from '@any-design/anyui/react';
// Svelte: import { Step } from '@any-design/anyui/svelte';
```

## 基础用法

一个简洁的结账进度条，第二步处于激活状态。

```vue
<template>
  <div
    style="padding: 20px 22px; border-radius: 18px; border: 1px solid var(--line); background: var(--a-surface, var(--bg-bright)); box-shadow: var(--a-surface-highlight, 0 0 #0000), var(--a-shadow-sm, 0 2px 6px var(--shadow-4));"
  >
    <div class="demo-row" style="justify-content: space-between; margin-bottom: 14px;">
      <div>
        <div
          style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05rem; color: var(--text-placeholder);"
        >
          Checkout
        </div>
        <div style="margin-top: 4px; font-size: 14px; font-weight: 700;">Payment</div>
      </div>
      <span
        style="height: 24px; padding: 0 10px; border-radius: 999px; background: var(--primary-12); color: var(--primary); font-size: 12px; font-weight: 700; display: inline-flex; align-items: center;"
      >
        第 2 步 / 共 4 步
      </span>
    </div>
    <Step :steps="4" :current="2" />
  </div>
</template>

<script setup lang="ts">
import { Step } from '@any-design/anyui/vue';
</script>
```

## 示例

### 带标签

传入字符串数组为每步添加标签。

```vue
<template>
  <div
    style="padding: 20px 22px; border-radius: 18px; border: 1px solid var(--line); background: var(--a-surface, var(--bg-bright)); box-shadow: var(--a-surface-highlight, 0 0 #0000), var(--a-shadow-sm, 0 2px 6px var(--shadow-4));"
  >
    <Step :steps="['购物车', '配送', '支付', '完成']" :current="3" />
  </div>
</template>

<script setup lang="ts">
import { Step } from '@any-design/anyui/vue';
</script>
```

### 跟踪进度

将 `current` 绑定到 ref，随用户推进流程而更新。当 `current` 超过 `steps.length` 时，所有步骤（含最后一步）都会变为已完成态。

```vue
<template>
  <div class="demo-col" style="gap: 20px">
    <div
      style="padding: 20px 22px; border-radius: 18px; border: 1px solid var(--line); background: var(--a-surface, var(--bg-bright)); box-shadow: var(--a-surface-highlight, 0 0 #0000), var(--a-shadow-sm, 0 2px 6px var(--shadow-4));"
    >
      <Step :steps="steps" :current="current" />
    </div>
    <div class="demo-row" style="justify-content: space-between; align-items: center;">
      <div>
        <div
          style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05rem; color: var(--text-placeholder);"
        >
          Current
        </div>
        <div style="margin-top: 4px; font-size: 14px; font-weight: 700">{{ steps[current - 1] }}</div>
      </div>
      <div class="demo-row">
        <Button round size="small" @click="move(-1)">上一项</Button>
        <Button round size="small" type="primary" @click="move(1)">下一步</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button, Step } from '@any-design/anyui/vue';

const steps = ['购物车', '配送', '支付', '完成'];
const current = ref(2);
const move = (delta: number) => {
  // 允许 current 走到 length + 1，使所有步骤都变为已完成
  current.value = Math.min(steps.length + 1, Math.max(1, current.value + delta));
};
</script>
```

### 自定义完成色

通过 `finishColor` 指定已完成步骤的颜色，可以是 hex 或 CSS 变量。留空则使用主题 `success` 色。

```vue
<template>
  <div
    style="padding: 20px 22px; border-radius: 18px; border: 1px solid var(--line); background: var(--a-surface, var(--bg-bright)); box-shadow: var(--a-surface-highlight, 0 0 #0000), var(--a-shadow-sm, 0 2px 6px var(--shadow-4));"
  >
    <Step :steps="['购物车', '配送', '支付', '完成']" :current="3" finish-color="#1faeff" />
  </div>
</template>

<script setup lang="ts">
import { Step } from '@any-design/anyui/vue';
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `steps` | Number \| String[] | 2 | 步骤数量，或标签数组。 |
| `current` | Number | 1 | 当前步骤（从 1 开始）。当 `current > steps.length` 时，所有步骤（含最后一步）都视为已完成。 |
| `finishColor` | String | `''` | 已完成步骤的自定义颜色，接受 hex（如 `'#1faeff'`）或 CSS 变量（如 `'var(--my-green)'`）。留空则使用主题的 `success` 色。 |
