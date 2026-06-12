import { useState } from 'react';
import { Textarea } from '@any-design/anyui-react';

export default function TextareaDemo() {
  const [value, setValue] = useState('');
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Variants</div>
        <div className="demo-col">
          <Textarea placeholder="This is a textarea..." />
          <Textarea placeholder="Borderless textarea..." borderless />
          <Textarea placeholder="Fixed height" height={80} disableResizeCorner />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Controlled</div>
        <div className="demo-col">
          <Textarea placeholder="Type something..." modelValue={value} onUpdateModelValue={setValue} />
          <span>Length: {value.length}</span>
        </div>
      </div>
    </div>
  );
}
