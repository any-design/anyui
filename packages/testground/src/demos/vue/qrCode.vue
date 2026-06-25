<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Basic</div>
      <div class="demo-row">
        <a-qr-code value="https://anyui.dev" />
        <a-qr-code value="AnyUI QR code" :size="120" :margin="1" />
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Custom color</div>
      <div class="demo-row">
        <a-qr-code
          value="anyui:qrcode"
          :size="152"
          error-correction-level="H"
          dark="#0f172a"
          light="#f8fafc"
        />
        <a-qr-code value="" placeholder="Set a value" :bordered="false" />
      </div>
    </div>
  </div>
</template>
