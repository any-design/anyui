import { useEffect, useRef, useState } from 'react';

import { Button, ProgressButton } from '@any-design/anyui-react';

export default function ProgressButtonDemo() {
  const [value, setValue] = useState(0);
  const [running, setRunning] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setValue((v) => (v + 2) % 101);
      }, 120);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, [running]);

  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">ProgressButton</div>
        <div className="demo-row">
          <ProgressButton value={value}>Downloading… {Math.round(value)}%</ProgressButton>
          <ProgressButton value={value} type="solid">
            Solid {Math.round(value)}%
          </ProgressButton>
          <Button type="primary" onClick={() => setRunning((r) => !r)}>
            {running ? 'Pause' : 'Play'}
          </Button>
        </div>
        <div className="demo-row">
          <ProgressButton value={55} type="solid" status="success" round>
            Solid success
          </ProgressButton>
          <ProgressButton value={65} striped active>
            Stripes
          </ProgressButton>
          <ProgressButton value={40} disabled>
            Disabled
          </ProgressButton>
        </div>
      </div>
    </div>
  );
}