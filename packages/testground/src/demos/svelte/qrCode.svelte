<script lang="ts">
  import { QrCode } from '@any-design/anyui-svelte';
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basic</div>
    <div class="demo-row">
      <QrCode value="https://anyui.dev" />
      <QrCode value="AnyUI QR code" size={120} margin={1} />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Custom color</div>
    <div class="demo-row">
      <QrCode
        value="anyui:qrcode"
        size={152}
        errorCorrectionLevel="H"
        dark="#0f172a"
        light="#f8fafc"
      />
      <QrCode value="" placeholder="Set a value" bordered={false} />
    </div>
  </div>
</div>
