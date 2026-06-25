import { useState } from 'react';
import { Button, Step } from '@any-design/anyui-react';

export default function StepDemo() {
  const [current, setCurrent] = useState(1);
  const steps = ['Cart', 'Shipping', 'Payment', 'Done'];
  const currentLabel = current > steps.length ? 'Completed' : steps[current - 1];
  const move = (delta: number) =>
    setCurrent((value) => Math.min(steps.length + 1, Math.max(1, value + delta)));
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Workflow</div>
        <div className="demo-row">
          <Button round size="small" onClick={() => move(-1)}>
            Prev
          </Button>
          <Button round size="small" onClick={() => move(1)}>
            Next
          </Button>
          <span>Current: {currentLabel}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="step-preview-shell">
          <div className="step-preview-shell__meta">
            <div className="step-preview-shell__eyebrow">Checkout</div>
            <div className="step-preview-shell__title">{currentLabel}</div>
            <div className="step-preview-shell__caption">
              Step {Math.min(current, steps.length)} of {steps.length}
              {current > steps.length ? ' · Done' : ''}
            </div>
          </div>
          <Step steps={steps} current={current} />
        </div>
      </div>
    </div>
  );
}
