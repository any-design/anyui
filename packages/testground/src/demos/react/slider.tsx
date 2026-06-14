import { useState } from 'react';
import { Slider } from '@any-design/anyui-react';

export default function SliderDemo() {
  const [value, setValue] = useState(30);
  const [stepValue, setStepValue] = useState(40);
  const [disabledValue] = useState(45);
  const [lastChange, setLastChange] = useState<number | undefined>();
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basics</div>
        <div className="demo-col">
          <Slider modelValue={value} onUpdateModelValue={setValue} />
          <span>Value: {value}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Step</div>
        <div className="demo-col">
          <Slider modelValue={stepValue} step={10} onUpdateModelValue={setStepValue} onChange={setLastChange} />
          <span>
            Value: {stepValue} (step 10) — last change: {lastChange ?? 'none'}
          </span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Disabled</div>
        <div className="demo-col">
          <Slider modelValue={disabledValue} disabled />
        </div>
      </div>
    </div>
  );
}
