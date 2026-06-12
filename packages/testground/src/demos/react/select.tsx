import { useState } from 'react';
import { Select } from '@any-design/anyui-react';
import type { ASelectItems } from '@any-design/anyui-react';

const items: ASelectItems = Array.from({ length: 6 }, (_, index) => ({
  text: `Item ${index}`,
  value: index,
}));

export default function SelectDemo() {
  const [value, setValue] = useState<string | number>('');
  const [multiValue, setMultiValue] = useState<(string | number)[]>([]);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basic</div>
        <div className="demo-col">
          <Select items={items} placeholder="Select an item" modelValue={value} onUpdateModelValue={setValue} />
          <span>Selected: {value === '' ? '(none)' : value}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Multiple</div>
        <div className="demo-col">
          <Select items={items} placeholder="Select items" multiple modelValue={multiValue} onUpdateModelValue={setMultiValue} />
          <span>Selected: {multiValue.length ? multiValue.join(', ') : '(none)'}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Variants</div>
        <div className="demo-col">
          <Select items={items} placeholder="Round" round />
          <Select items={items} placeholder="Large" size="large" />
          <Select items={items} placeholder="Disabled" disabled />
        </div>
      </div>
    </div>
  );
}
