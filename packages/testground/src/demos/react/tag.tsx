import { Tag } from '@any-design/anyui-react';

export default function TagDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Sizes</div>
        <div className="demo-row">
          <Tag size="small">small</Tag>
          <Tag>default</Tag>
          <Tag size="large">large</Tag>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Round &amp; Custom Color</div>
        <div className="demo-row">
          <Tag round>round</Tag>
          <Tag color="#1faeff">custom color</Tag>
          <Tag bgColor="#ffe2ec" color="#e52e71" round>
            custom bg
          </Tag>
        </div>
      </div>
    </div>
  );
}
