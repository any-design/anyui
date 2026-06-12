import { useState } from 'react';
import { ListMenu } from '@any-design/anyui-react';

const menu = {
  Accounts: ['My Account'],
  UI: ['Theme'],
  Security: ['Storage', 'API'],
};

export default function ListMenuDemo() {
  const [selected, setSelected] = useState<string | undefined>('Theme');
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Grouped Menu</div>
        <div className="demo-row">
          <div style={{ width: 180 }}>
            <ListMenu menu={menu} modelValue={selected} onUpdateModelValue={setSelected} />
          </div>
          <span>Selected: {selected ?? 'none'}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Flat Menu</div>
        <div className="demo-row">
          <div style={{ width: 180 }}>
            <ListMenu menu={['Home', 'Profile', 'Settings']} />
          </div>
        </div>
      </div>
    </div>
  );
}
