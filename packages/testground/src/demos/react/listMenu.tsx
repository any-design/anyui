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
        <div className="demo-block__label">List Menu</div>
        <div className="demo-row">
          <div style={{ width: 220 }}>
            <ListMenu
              menu={menu}
              modelValue={selected}
              selectedVariant="solid"
              onUpdateModelValue={setSelected}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
