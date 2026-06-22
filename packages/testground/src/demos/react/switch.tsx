import { useState } from 'react';
import { Switch } from '@any-design/anyui-react';

export default function SwitchDemo() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Switch</div>
        <div className="demo-row">
          <Switch modelValue={enabled} onUpdateModelValue={setEnabled} />
          <span>Enabled: {String(enabled)}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Disabled</div>
        <div className="demo-row">
          <Switch modelValue disabled />
        </div>
      </div>
    </div>
  );
}
