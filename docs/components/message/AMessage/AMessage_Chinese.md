# AMessage

`AMessage` 用于渲染顶部居中的瞬时通知。主要用法是命令式 `message` API（`message.info` / `.success` / `.warning` / `.error`），无需额外标签即可弹出通知。同时也提供声明式 `<AMessage>` 组件，但大多数应用会直接使用命令式调用。

## 引入

```ts
import { Message, message } from '@any-design/anyui/vue';
// React:  import { Message, message } from '@any-design/anyui/react';
// Svelte: import { Message, message } from '@any-design/anyui/svelte';
```

## 基础用法

直接调用 `message.success` —— 无需模板。

```vue
<template>
  <AButton type="primary" @click="save">保存</AButton>
</template>

<script setup>
import { message } from '@any-design/anyui/vue';
const save = () => message.success('已保存！');
</script>
```

## 示例

### 带配置项的命令式调用

传入 options 对象来设置 `content`、`duration` 以及动画开关等。

```vue
<template>
  <AButton @click="notify">提醒</AButton>
</template>

<script setup>
import { message } from '@any-design/anyui/vue';
const notify = () => {
  message.warning({ content: '存储空间即将满', duration: 5000 });
};
</script>
```

### 各状态类型

根据严重程度使用对应的辅助方法。

```vue
<template>
  <div class="demo-row">
    <AButton @click="message.info('信息')">信息</AButton>
    <AButton @click="message.success('完成')">成功</AButton>
    <AButton @click="message.warning('注意')">警告</AButton>
    <AButton @click="message.error('失败')">错误</AButton>
  </div>
</template>

<script setup>
import { message } from '@any-design/anyui/vue';
</script>
```

### 声明式用法

对于静态的、内联横幅，可直接使用组件。

```vue
<template>
  <AMessage type="success" content="资料已更新" />
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | 'info' \| 'success' \| 'warning' \| 'error' | undefined | 状态类型。 |
| `content` | String | undefined | 消息文本。 |
| `icon` | String \| IconifyIcon | '' | 自定义图标。 |
| `showIcon` | Boolean | true | 显示类型图标。 |
| `enterAnim` | Boolean | true | 是否启用进场动画。 |
| `leaveAnim` | Boolean | true | 是否启用退场动画。 |
| `round` | Boolean | false | 圆角。 |

## 方法

| 方法 | 签名 | 说明 |
| --- | --- | --- |
| `message.info / .success / .warning / .error` | (content \| options) => void | 命令式调用；options 还支持 `duration`、`zIndex` 以及动画开关。 |

## 说明

全局安装后还会在 Vue 实例上挂载 `$message`。`duration`、`zIndex` 和动画开关仅在命令式 API 中可用，不是组件 props。
