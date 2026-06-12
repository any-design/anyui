import { useState } from 'react';
import { Button, Dialog } from '@any-design/anyui-react';

export default function DialogDemo() {
  const [basicVisible, setBasicVisible] = useState(false);
  const [customVisible, setCustomVisible] = useState(false);
  const [lastAction, setLastAction] = useState('');
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basic</div>
        <div className="demo-row">
          <Button type="primary" onClick={() => setBasicVisible(true)}>
            Open dialog
          </Button>
          <Dialog
            modelValue={basicVisible}
            title="Delete workspace"
            onUpdateModelValue={setBasicVisible}
            onConfirm={() => setLastAction('confirm')}
            onCancel={() => setLastAction('cancel')}
          >
            This action cannot be undone. All files in the workspace will be removed.
          </Dialog>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Custom footer</div>
        <div className="demo-row">
          <Button onClick={() => setCustomVisible(true)}>Open dialog</Button>
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
            A dialog with a custom footer.
          </Dialog>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Last action</div>
        <div className="demo-row">
          <span>{lastAction || 'none'}</span>
        </div>
      </div>
    </div>
  );
}
