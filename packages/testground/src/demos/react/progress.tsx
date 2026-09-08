import { Progress } from '@any-design/anyui-react';

const formatDone = (value: number) => `${Math.round(value)} done`;

export default function ProgressDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Status &amp; Labels</div>
        <div className="demo-col progress-demo-stack">
          <Progress value={42} showLabel width={260} />
          <Progress value={72} status="success" showLabel format={formatDone} width={260} />
          <Progress value={28} status="warn" size="small" width={260} />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Motion</div>
        <div className="demo-col progress-demo-stack">
          <Progress value={55} striped active width={260} />
          <Progress indeterminate status="info" width={260} />
        </div>
      </div>
    </div>
  );
}
