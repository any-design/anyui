import { QrCode } from '@any-design/anyui-react';

export default function QrCodeDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basic</div>
        <div className="demo-row">
          <QrCode value="https://anyui.dev" />
          <QrCode value="AnyUI QR code" size={120} margin={1} />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Custom color</div>
        <div className="demo-row">
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
  );
}
