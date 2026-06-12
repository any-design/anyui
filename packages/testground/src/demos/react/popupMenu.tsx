import { useState } from 'react';
import { PopupMenu } from '@any-design/anyui-react';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

export default function PopupMenuDemo() {
  const [lastCommand, setLastCommand] = useState('');
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Triggers</div>
        <div className="demo-row">
          <PopupMenu items={items} onCommand={(command: string) => setLastCommand(command)}>
            <span>hover</span>
          </PopupMenu>
          <PopupMenu items={items} triggerType="click" hideAfterClick onCommand={(command: string) => setLastCommand(command)}>
            <span>click</span>
          </PopupMenu>
          <PopupMenu items={items} triggerType="contextmenu" hideAfterClick onCommand={(command: string) => setLastCommand(command)}>
            <span>contextmenu</span>
          </PopupMenu>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Grouped (only one open)</div>
        <div className="demo-row">
          <PopupMenu group="demo" items={items} triggerType="click" hideAfterClick>
            <span>grouped A</span>
          </PopupMenu>
          <PopupMenu group="demo" items={items} triggerType="click" hideAfterClick>
            <span>grouped B</span>
          </PopupMenu>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Last Command</div>
        <div className="demo-row">
          <span>{lastCommand || '(none)'}</span>
        </div>
      </div>
    </div>
  );
}
