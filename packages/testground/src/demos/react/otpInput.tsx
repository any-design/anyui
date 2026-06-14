import { useState } from 'react';
import { OtpInput } from '@any-design/anyui-react';

export default function OtpInputDemo() {
  const [code, setCode] = useState('');
  const [completed, setCompleted] = useState('');
  const [pin, setPin] = useState('');
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">6-digit Code</div>
        <div className="demo-col">
          <OtpInput modelValue={code} onUpdateModelValue={setCode} onComplete={setCompleted} />
          <span>Value: {code || 'empty'}</span>
          <span>Completed: {completed || 'not yet'}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">4-digit Masked</div>
        <div className="demo-col">
          <OtpInput modelValue={pin} length={4} masked onUpdateModelValue={setPin} />
          <span>Value: {pin || 'empty'}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Disabled</div>
        <div className="demo-row">
          <OtpInput modelValue="12" length={4} disabled />
        </div>
      </div>
    </div>
  );
}
