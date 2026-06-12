import { useState } from 'react';
import { Button, Step } from '@any-design/anyui-react';

export default function StepDemo() {
  const [current, setCurrent] = useState(1);
  const move = (delta: number) => setCurrent((value) => Math.min(4, Math.max(1, value + delta)));
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Controls</div>
        <div className="demo-row">
          <Button round size="small" onClick={() => move(-1)}>
            Prev
          </Button>
          <Button round size="small" onClick={() => move(1)}>
            Next
          </Button>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Numbered Steps</div>
        <Step steps={4} current={current} />
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Named Steps</div>
        <Step steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} current={current} />
      </div>
    </div>
  );
}
