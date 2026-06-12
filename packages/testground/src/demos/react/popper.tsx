import { Popper } from '@any-design/anyui-react';

const popupContent = (
  <span
    style={{
      display: 'inline-block',
      padding: '8px 12px',
      borderRadius: 8,
      background: 'var(--bg-light, #fff)',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
    }}
  >
    popup
  </span>
);

export default function PopperDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Hover (placements)</div>
        <div className="demo-row">
          <Popper popup={popupContent} placement="top">
            <span>top</span>
          </Popper>
          <Popper popup={popupContent} placement="bottom">
            <span>bottom</span>
          </Popper>
          <Popper popup={popupContent} placement="right">
            <span>right</span>
          </Popper>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Click Trigger</div>
        <div className="demo-row">
          <Popper popup={popupContent} triggerType="click" placement="bottom">
            <span>click me</span>
          </Popper>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Inset (no portal)</div>
        <div className="demo-row">
          <Popper popup={popupContent} placement="right" appendToBody={false}>
            <span>hover (inset)</span>
          </Popper>
        </div>
      </div>
    </div>
  );
}
