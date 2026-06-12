import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@any-design/anyui-react';

export default function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const [groupValue, setGroupValue] = useState<Array<string | number>>(['Option 1']);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Checkbox</div>
        <div className="demo-row">
          <Checkbox label={`Checkbox (${checked ? 'checked' : 'unchecked'})`} modelValue={checked} onChange={setChecked} />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Checkbox Group</div>
        <div className="demo-col">
          <CheckboxGroup
            items={['Option 1', 'Option 2', 'Option 3']}
            modelValue={groupValue}
            onUpdateModelValue={setGroupValue}
          />
          <span>Selected: {groupValue.join(', ') || 'none'}</span>
        </div>
      </div>
    </div>
  );
}
