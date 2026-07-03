import { useState } from 'react';
import { Button, Drawer } from '@any-design/anyui-react';

export default function DrawerDemo() {
  const [defaultVisible, setDefaultVisible] = useState(false);
  const [glassVisible, setGlassVisible] = useState(false);
  const [nomaskVisible, setNomaskVisible] = useState(false);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-row">
          <Button type="primary" onClick={() => setDefaultVisible(true)}>
            Default
          </Button>
          <Button type="primary" onClick={() => setGlassVisible(true)}>
            Glass 70%
          </Button>
          <Button type="primary" onClick={() => setNomaskVisible(true)}>
            No mask
          </Button>
        </div>
      </div>
      <Drawer modelValue={defaultVisible} position="right" width={300} onUpdateModelValue={setDefaultVisible}>
        <div className="drawer-demo">
          <h3 className="drawer-demo__title">Drawer</h3>
          <p className="drawer-demo__text">
            A panel slides in from the right. The body has its own padding and scrolls independently.
          </p>
          <ul className="drawer-demo__list">
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
          </ul>
          <div className="drawer-demo__actions">
            <Button size="small" onClick={() => setDefaultVisible(false)}>
              Close
            </Button>
          </div>
        </div>
      </Drawer>
      <Drawer
        modelValue={glassVisible}
        position="right"
        width={300}
        glassOpacity={0.7}
        onUpdateModelValue={setGlassVisible}
      >
        <div className="drawer-demo">
          <h3 className="drawer-demo__title">Glass drawer</h3>
          <p className="drawer-demo__text">
            Set <code>glassOpacity</code> below 1 to let the backdrop blur show through the panel —
            toggle the Glass theme in the top bar to see it best.
          </p>
          <div className="drawer-demo__actions">
            <Button size="small" onClick={() => setGlassVisible(false)}>
              Close
            </Button>
          </div>
        </div>
      </Drawer>
      <Drawer
        modelValue={nomaskVisible}
        position="right"
        width={300}
        withMask={false}
        onUpdateModelValue={setNomaskVisible}
      >
        <div className="drawer-demo">
          <h3 className="drawer-demo__title">No mask</h3>
          <p className="drawer-demo__text">The page behind stays interactive while the drawer is open.</p>
          <div className="drawer-demo__actions">
            <Button size="small" onClick={() => setNomaskVisible(false)}>
              Close
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}