# AQrCode

`AQrCode` renders text content as an SVG QR code. It is an optional component: import it when you need QR generation, and keep it out of the default app installer otherwise.

## Import

```ts
import { QrCode } from '@any-design/anyui/vue';

app.use(QrCode);

// React:  import { QrCode } from '@any-design/anyui/react';
// Svelte: import { QrCode } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AQrCode value="https://anyui.dev" />
</template>
```

## Examples

### Custom size and color

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

### Error correction

Use `errorCorrectionLevel="H"` when the code may be printed, resized, or displayed in noisy environments.

```vue
<template>
  <AQrCode value="https://anyui.dev/components/qr-code" error-correction-level="H" />
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | String | '' | Text content encoded into the QR code. |
| `size` | Number \| String | 160 | Rendered width and height. Numeric values use pixels. |
| `margin` | Number | 2 | Quiet-zone margin around the QR pattern. |
| `errorCorrectionLevel` | 'L' \| 'M' \| 'Q' \| 'H' | 'M' | QR error correction level. |
| `dark` | String | '#202426' | Foreground color. |
| `light` | String | '#ffffff' | Background color. |
| `bordered` | Boolean | true | Show the AnyUI bordered surface. |
| `placeholder` | String | 'No QR code' | Text shown when `value` is empty. |
| `ariaLabel` | String | '' | Accessible label. Falls back to the encoded value or placeholder. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `error` | Error | Emitted if QR generation fails. |
