import { useState } from 'react';
import { Button, Drawer } from '@any-design/anyui-react';
import type { DrawerPosition } from '@any-design/anyui-react';

export default function DrawerDemo() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<DrawerPosition>('left');
  const openDrawer = (nextPosition: DrawerPosition) => {
    setPosition(nextPosition);
    setVisible(true);
  };
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Drawer</div>
        <div className="demo-row">
          <Button type="primary" onClick={() => openDrawer('left')}>
            Left
          </Button>
          <Button type="primary" onClick={() => openDrawer('right')}>
            Right
          </Button>
        </div>
      </div>
      <Drawer modelValue={visible} position={position} width={240} onUpdateModelValue={setVisible}>
        <div style={{ padding: 16 }}>
          <p>This is a drawer ({position}).</p>
          <Button size="small" onClick={() => setVisible(false)}>
            Close
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
