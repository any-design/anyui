import { useState } from 'react';
import { Button, DropdownMenu } from '@any-design/anyui-react';
import type { DropdownMenuItem } from '@any-design/anyui-react';

const items: DropdownMenuItem[] = [
  { command: 'edit', label: 'Edit', icon: 'uil:edit' },
  { command: 'duplicate', label: 'Duplicate', icon: 'uil:copy' },
  { command: 'archive', label: 'Archive', icon: 'uil:archive', disabled: true },
  { command: 'delete', label: 'Delete', icon: 'uil:trash-alt', danger: true, divided: true },
];

export default function DropdownMenuDemo() {
  const [lastCommand, setLastCommand] = useState('');
  const onCommand = (command: string | number, item: DropdownMenuItem) =>
    setLastCommand(`${command} (${item.label})`);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basic (click trigger)</div>
        <div className="demo-row">
          <DropdownMenu
            items={items}
            onCommand={onCommand}
            onVisibleChange={(visible: boolean) => console.log('dropdown visible:', visible)}
          >
            <Button>Open Menu</Button>
          </DropdownMenu>
          <DropdownMenu items={items} disabled onCommand={onCommand}>
            <Button>Disabled Dropdown</Button>
          </DropdownMenu>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Hover trigger</div>
        <div className="demo-row">
          <DropdownMenu items={items} triggerType="hover" onCommand={onCommand}>
            <Button type="primary">Hover Me</Button>
          </DropdownMenu>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Custom width</div>
        <div className="demo-row">
          <DropdownMenu items={items} width={240} onCommand={onCommand}>
            <Button>Wide Menu (240px)</Button>
          </DropdownMenu>
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
