import { Split } from '@any-design/anyui-react';

export default function SplitDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Default &amp; Round</div>
        <div className="demo-col">
          <Split />
          <Split height="4px" round />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Margin &amp; Color</div>
        <div className="demo-col">
          <span>Content above</span>
          <Split margin={4} color="var(--primary)" />
          <span>Content below</span>
        </div>
      </div>
    </div>
  );
}
