import { useRef } from 'react';

import { Button, Popper } from '@any-design/anyui-react';

const cardStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderRadius: 14,
  background: 'var(--a-surface, var(--bg-bright))',
  border: '1px solid var(--line)',
  boxShadow: 'var(--a-shadow-md, 0 4px 10px var(--shadow-5), 0 12px 28px -8px var(--shadow-10))',
  color: 'var(--text)',
  fontSize: 13,
  lineHeight: 1.5,
  maxWidth: 240,
};

const titleStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 4,
  fontSize: 13,
  fontWeight: 700,
};

const textStyle: React.CSSProperties = {
  margin: '0 0 10px',
  color: 'var(--text-secondary, var(--text))',
};

type PopperHandle = {
  show: () => void;
  hide: () => void;
};

export default function PopperDemo() {
  const manualPopper = useRef<PopperHandle | null>(null);

  const openManual = () => {
    manualPopper.current?.hide();
    window.requestAnimationFrame(() => manualPopper.current?.show());
  };

  return (
    <div>
      <div className="demo-row" style={{ gap: '12px 14px' }}>
        <Popper
          placement="top"
          popup={
            <div style={cardStyle}>
              <strong style={titleStyle}>Hover panel</strong>
              <p style={{ ...textStyle, marginBottom: 0 }}>A small floating panel above.</p>
            </div>
          }
        >
          <Button>Hover</Button>
        </Popper>
        <Popper
          placement="bottom"
          triggerType="click"
          popup={
            <div style={cardStyle}>
              <strong style={titleStyle}>Click panel</strong>
              <p style={{ ...textStyle, marginBottom: 0 }}>Click outside to dismiss this.</p>
            </div>
          }
        >
          <Button type="primary">Click</Button>
        </Popper>
        <Popper
          placement="bottom-start"
          triggerType="contextmenu"
          popup={
            <div style={cardStyle}>
              <strong style={titleStyle}>Context panel</strong>
              <p style={{ ...textStyle, marginBottom: 0 }}>Right-click outside, then trigger it again.</p>
            </div>
          }
        >
          <Button type="secondary">Right click</Button>
        </Popper>
        <Popper
          ref={manualPopper}
          placement="right"
          triggerType="manual"
          popup={
            <div style={cardStyle}>
              <strong style={titleStyle}>Manual panel</strong>
              <p style={textStyle}>Open can be fired repeatedly.</p>
              <Button size="small" type="secondary" onClick={() => manualPopper.current?.hide()}>
                Close
              </Button>
            </div>
          }
        >
          <Button onClick={openManual}>Open</Button>
        </Popper>
      </div>
    </div>
  );
}
