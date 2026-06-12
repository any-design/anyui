import { useState } from 'react';
import { Button, Popup } from '@any-design/anyui-react';

export default function PopupDemo() {
  const [basicVisible, setBasicVisible] = useState(false);
  const [lockedVisible, setLockedVisible] = useState(false);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basic</div>
        <div className="demo-row">
          <Button type="primary" onClick={() => setBasicVisible(true)}>
            Open popup
          </Button>
          <Popup modelValue={basicVisible} width={360} onUpdateModelValue={setBasicVisible}>
            <div style={{ padding: 24 }}>
              <p style={{ margin: '0 0 16px' }}>A bare popup panel, close by mask or Esc.</p>
              <Button size="small" onClick={() => setBasicVisible(false)}>
                Close
              </Button>
            </div>
          </Popup>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Not mask closable</div>
        <div className="demo-row">
          <Button onClick={() => setLockedVisible(true)}>Open popup</Button>
          <Popup
            modelValue={lockedVisible}
            width={360}
            maskClosable={false}
            onUpdateModelValue={setLockedVisible}
          >
            <div style={{ padding: 24 }}>
              <p style={{ margin: '0 0 16px' }}>Mask click and Esc are disabled here.</p>
              <Button size="small" type="primary" onClick={() => setLockedVisible(false)}>
                Close
              </Button>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
}
