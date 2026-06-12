import { useState } from 'react';
import { Radio, RadioGroup } from '@any-design/anyui-react';

const items = [
  { label: 'Radio 1', value: 1 },
  { label: 'Radio 2', value: 2 },
  { label: 'Radio 3', value: 3 },
];

export default function RadioDemo() {
  const [single, setSingle] = useState(false);
  const [selected, setSelected] = useState<string | number>(1);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Single Radio</div>
        <div className="demo-row">
          <Radio label="Click to check" checked={single} onChange={() => setSingle(true)} />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Radio Group</div>
        <div className="demo-col">
          <RadioGroup items={items} modelValue={selected} onUpdateModelValue={setSelected} />
          <span>Selected: {selected}</span>
        </div>
      </div>
    </div>
  );
}
