import { useState } from 'react';
import { Button, Step } from '@any-design/anyui-react';

export default function StepDemo() {
  const [current, setCurrent] = useState(1);
  const steps = ['Cart', 'Shipping', 'Payment', 'Done'];
  const finishSteps = ['Profile', 'Workspace', 'Invite', 'Launch'];
  const currentLabel = current > steps.length ? 'Completed' : steps[current - 1];
  const move = (delta: number) =>
    setCurrent((value) => Math.min(steps.length + 1, Math.max(1, value + delta)));
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">With labels</div>
        <div className="step-preview-shell">
          <div className="step-preview-shell__meta">
            <div className="step-preview-shell__eyebrow">Checkout</div>
            <div className="step-preview-shell__title">{currentLabel}</div>
            <div className="step-preview-shell__caption">
              Step {Math.min(current, steps.length)} of {steps.length}
              {current > steps.length ? ' · Done' : ''}
            </div>
          </div>
          <div className="demo-row" style={{ marginBottom: 18 }}>
            <Button round size="small" onClick={() => move(-1)}>
              Prev
            </Button>
            <Button round size="small" type="primary" onClick={() => move(1)}>
              Next
            </Button>
          </div>
          <Step steps={steps} current={current} />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Custom finish color</div>
        <div className="step-preview-shell">
          <div className="step-preview-shell__meta">
            <div className="step-preview-shell__eyebrow">Onboarding</div>
            <div className="step-preview-shell__title">Invite team</div>
            <div className="step-preview-shell__caption">Step 3 of 4</div>
          </div>
          <Step steps={finishSteps} current={3} finishColor="#1faeff" />
        </div>
      </div>
    </div>
  );
}
