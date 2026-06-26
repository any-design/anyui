# ATabs

`ATabs` switches between panels of content. Compose it with `ATab` (the trigger) and `ATabPanel` (the content). Use the `line` variant for an animated underline indicator, or `card` for a highlighted-button style. Bind `v-model:modelValue` to track the active tab.

## Import

```ts
import { Tabs, Tab, TabPanel } from '@any-design/anyui/vue';
// React:  import { Tabs, Tab, TabPanel } from '@any-design/anyui/react';
// Svelte: import { Tabs, Tab, TabPanel } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <ATabs v-model="active">
    <template #tab>
      <ATab :value="1">Profile</ATab>
      <ATab :value="2">Settings</ATab>
    </template>
    <ATabPanel :value="1"><p>Profile content.</p></ATabPanel>
    <ATabPanel :value="2"><p>Settings content.</p></ATabPanel>
  </ATabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Tabs, Tab, TabPanel } from '@any-design/anyui/vue';
const active = ref(1);
</script>
```

## Examples

### Card variant

Set `type="card"` to highlight the active tab as a filled button instead of an underline.

```vue
<template>
  <ATabs v-model="active" type="card">
    <template #tab>
      <ATab :value="1">Overview</ATab>
      <ATab :value="2">Activity</ATab>
    </template>
    <ATabPanel :value="1"><p>Overview.</p></ATabPanel>
    <ATabPanel :value="2"><p>Activity feed.</p></ATabPanel>
  </ATabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Tabs, Tab, TabPanel } from '@any-design/anyui/vue';
const active = ref(1);
</script>
```

### Sizes & position

`size` adjusts the bar height (`small` / `default` / `large`). `position="bottom"` places the bar below the content.

### Disabled tab & icons

Pass `disabled` to disable a tab, and `icon` to render a leading iconify icon.

### Keep alive

Set `keepAlive` on a panel to keep it mounted (hidden) when inactive, preserving component state. `lazy` renders it once and reuses it.

## Keyboard

`←/→` and `↑/↓` move between tabs; `Home`/`End` jump to the first / last tab; `Enter`/`Space` activate.

## ATabs Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | String \| Number | — | Active tab value (`v-model:modelValue`). |
| `type` | 'line' \| 'card' | 'line' | Visual variant. |
| `size` | 'small' \| 'default' \| 'large' | 'default' | Bar density. |
| `position` | 'top' \| 'bottom' | 'top' | Bar placement. |
| `autoSelect` | Boolean | true | Auto-select the first tab when no `modelValue` is provided. |

## ATabs Slots

| Slot | Description |
| --- | --- |
| `tab` | Tab triggers (`ATab`). |
| `default` | Tab panels (`ATabPanel`). |

## ATab Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | String \| Number | — | Value that identifies this tab. When omitted, the index is used. |
| `disabled` | Boolean | false | Disable interaction. |
| `icon` | String | `''` | Leading icon name (iconify). |

## ATabPanel Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | String \| Number | — | Must match the matching `ATab` value. |
| `keepAlive` | Boolean | false | Keep the slot mounted when inactive. |
| `lazy` | Boolean | false | Render once and reuse. |