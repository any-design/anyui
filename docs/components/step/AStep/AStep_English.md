# AStep

`AStep` is a horizontal step indicator for multi-step flows like checkout or onboarding. Set `steps` (a count, or an array of labels) and track progress with `current` (1-based).

## Import

```ts
import { Step } from '@any-design/anyui/vue';
// React:  import { Step } from '@any-design/anyui/react';
// Svelte: import { Step } from '@any-design/anyui/svelte';
```

## Basic usage

A compact checkout track with the second step active.

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
        Step 2 of 4
      </span>
    </div>
    <Step :steps="4" :current="2" />
  </div>
</template>

<script setup lang="ts">
import { Step } from '@any-design/anyui/vue';
</script>
```

## Examples

### With labels

Pass an array of strings to label each step.

```vue
<template>
  <div
    style="padding: 20px 22px; border-radius: 18px; border: 1px solid var(--line); background: var(--a-surface, var(--bg-bright)); box-shadow: var(--a-surface-highlight, 0 0 #0000), var(--a-shadow-sm, 0 2px 6px var(--shadow-4));"
  >
    <Step :steps="['Cart', 'Shipping', 'Payment', 'Done']" :current="3" />
  </div>
</template>

<script setup lang="ts">
import { Step } from '@any-design/anyui/vue';
</script>
```

### Tracking progress

Bind `current` to a ref to advance the indicator as the user moves through the flow. When `current` exceeds `steps.length`, every step (including the last) becomes completed.

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
        <Button round size="small" @click="move(-1)">Prev</Button>
        <Button round size="small" type="primary" @click="move(1)">Next</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button, Step } from '@any-design/anyui/vue';

const steps = ['Cart', 'Shipping', 'Payment', 'Done'];
const current = ref(2);
const move = (delta: number) => {
  // allow current to reach length + 1, marking every step as completed
  current.value = Math.min(steps.length + 1, Math.max(1, current.value + delta));
};
</script>
```

### Custom finish color

Use `finishColor` to pick the color of completed steps — a hex value or a css variable. Leave it empty to use the theme `success` color.

```vue
<template>
  <div
    style="padding: 20px 22px; border-radius: 18px; border: 1px solid var(--line); background: var(--a-surface, var(--bg-bright)); box-shadow: var(--a-surface-highlight, 0 0 #0000), var(--a-shadow-sm, 0 2px 6px var(--shadow-4));"
  >
    <Step :steps="['Cart', 'Shipping', 'Payment', 'Done']" :current="3" finish-color="#1faeff" />
  </div>
</template>

<script setup lang="ts">
import { Step } from '@any-design/anyui/vue';
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `steps` | Number \| String[] | 2 | Number of steps, or an array of labels. |
| `current` | Number | 1 | Current step (1-based). When `current > steps.length`, every step (including the last) is treated as completed. |
| `finishColor` | String | `''` | Custom color for completed steps — a hex color (e.g. `'#1faeff'`) or a css variable (e.g. `'var(--my-green)'`). Empty falls back to the theme `success` color. |
