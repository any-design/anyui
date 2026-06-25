# AQrCode

`AQrCode` 可以将文本内容渲染为 SVG 二维码。它是可选组件：需要二维码能力时单独引入，不会进入默认安装列表。

## 引入

```ts
import { QrCode } from '@any-design/anyui/vue';

app.use(QrCode);

// React:  import { QrCode } from '@any-design/anyui/react';
// Svelte: import { QrCode } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AQrCode value="https://anyui.dev" />
</template>
```

## 示例

### 自定义尺寸与颜色

```vue
<template>
  <AQrCode
    value="anyui:qrcode"
    :size="192"
    :margin="1"
    dark="#0f172a"
    light="#f8fafc"
  />
</template>
```

### 纠错等级

二维码可能被打印、缩放或在复杂环境里展示时，可以使用 `errorCorrectionLevel="H"`。

```vue
<template>
  <AQrCode value="https://anyui.dev/components/qr-code" error-correction-level="H" />
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | String | '' | 要编码进二维码的文本内容。 |
| `size` | Number \| String | 160 | 渲染宽高，数字会按像素处理。 |
| `margin` | Number | 2 | 二维码图案外侧的留白。 |
| `errorCorrectionLevel` | 'L' \| 'M' \| 'Q' \| 'H' | 'M' | 二维码纠错等级。 |
| `dark` | String | '#202426' | 前景色。 |
| `light` | String | '#ffffff' | 背景色。 |
| `bordered` | Boolean | true | 是否展示 AnyUI 边框容器。 |
| `placeholder` | String | 'No QR code' | `value` 为空时展示的占位文字。 |
| `ariaLabel` | String | '' | 无障碍标签，默认根据内容或占位文字生成。 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `error` | Error | 二维码生成失败时触发。 |
