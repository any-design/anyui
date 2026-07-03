import { useState } from 'react';
import { Button, Dialog } from '@any-design/anyui-react';

export default function DialogDemo() {
  const [basicVisible, setBasicVisible] = useState(false);
  const [customVisible, setCustomVisible] = useState(false);
  const [persistentVisible, setPersistentVisible] = useState(false);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-row">
          <Button type="primary" onClick={() => setBasicVisible(true)}>
            Basic
          </Button>
          <Button type="primary" onClick={() => setCustomVisible(true)}>
            Custom footer
          </Button>
          <Button type="primary" onClick={() => setPersistentVisible(true)}>
            Persistent
          </Button>
        </div>
      </div>
      <Dialog
        modelValue={basicVisible}
        title="Delete workspace"
        onUpdateModelValue={setBasicVisible}
      >
        This action cannot be undone. All files in the workspace will be removed.
      </Dialog>
      <Dialog
        modelValue={customVisible}
        title="Custom footer"
        width={380}
        onUpdateModelValue={setCustomVisible}
        footer={
          <Button size="small" type="gradient" fill onClick={() => setCustomVisible(false)}>
            Got it
          </Button>
        }
      >
        A dialog with a custom footer slot.
      </Dialog>
      <Dialog
        modelValue={persistentVisible}
        title="Persistent"
        maskClosable={false}
        onUpdateModelValue={setPersistentVisible}
      >
        Clicking the mask won't close this one — use the buttons.
      </Dialog>
    </div>
  );
}