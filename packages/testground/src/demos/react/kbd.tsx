import { Kbd } from '@any-design/anyui-react';

const comboStyle = { display: 'inline-flex', alignItems: 'center', gap: 4 } as const;

export default function KbdDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Single keys</div>
        <div className="demo-row">
          <Kbd>Esc</Kbd>
          <Kbd>Tab</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>A</Kbd>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Combos</div>
        <div className="demo-row">
          <span style={comboStyle}>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
          <span style={comboStyle}>
            <Kbd>⌃</Kbd>
            <Kbd>⌥</Kbd>
            <Kbd>Del</Kbd>
          </span>
          <span style={comboStyle}>
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>P</Kbd>
          </span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Small size inside text</div>
        <div className="demo-row">
          <span>
            Press <Kbd size="small">⌘</Kbd> <Kbd size="small">K</Kbd> to open the command palette,
            or <Kbd size="small">/</Kbd> to search.
          </span>
        </div>
      </div>
    </div>
  );
}
