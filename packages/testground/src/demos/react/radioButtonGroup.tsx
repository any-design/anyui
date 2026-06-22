import { useState } from 'react';
import { RadioButtonGroup } from '@any-design/anyui-react';

const items = [
  { label: 'Button 1', value: 1 },
  { label: 'Button 2', value: 2 },
  { label: 'Button 3', value: 3 },
];

export default function RadioButtonGroupDemo() {
  const [selected, setSelected] = useState<string | number>(1);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Default</div>
        <div className="demo-col">
          <RadioButtonGroup items={items} modelValue={selected} onUpdateModelValue={setSelected} />
          <span>Selected: {selected}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Round</div>
        <div className="demo-row">
          <RadioButtonGroup items={items} round />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Sizes</div>
        <div className="demo-row">
          <RadioButtonGroup items={items} size="small" />
          <RadioButtonGroup items={items} />
          <RadioButtonGroup items={items} size="large" />
        </div>
      </div>
    </div>
  );
}
