import type { CSSProperties } from 'react';
import { ScrollArea } from '@any-design/anyui-react';

const rows = Array.from({ length: 30 }, (_, index) => index + 1);

const boxStyle: CSSProperties = {
  width: 320,
  border: '1px solid var(--border)',
  borderRadius: 'var(--a-radius, 14px)',
  background: 'var(--a-surface, var(--bg-bright))',
};

const rowStyle: CSSProperties = {
  padding: '10px 16px',
  borderBottom: '1px solid var(--line)',
};

const stripStyle: CSSProperties = {
  display: 'flex',
  gap: 8,
  padding: 16,
};

const chipStyle: CSSProperties = {
  flexShrink: 0,
  padding: '8px 16px',
  borderRadius: 'var(--a-radius-full, 999px)',
  background: 'var(--bg-semi-dark)',
  whiteSpace: 'nowrap',
};

export default function ScrollAreaDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Fixed Height</div>
        <div className="demo-row">
          <ScrollArea height={220} style={boxStyle}>
            {rows.map((row) => (
              <div key={row} style={rowStyle}>
                Row {row}
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Horizontal</div>
        <div className="demo-row">
          <ScrollArea height={80} horizontal style={{ ...boxStyle, width: 420 }}>
            <div style={stripStyle}>
              {Array.from({ length: 24 }, (_, index) => (
                <div key={index} style={chipStyle}>
                  Item {index + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
