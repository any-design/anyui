import { Empty } from '@any-design/anyui-react';

export default function EmptyDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Default</div>
        <div className="demo-row" style={{ height: 160 }}>
          <Empty text="Not Found" />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Custom Icon</div>
        <div className="demo-row" style={{ height: 160 }}>
          <Empty icon="iconoir:trash" text="Nothing here" />
        </div>
      </div>
    </div>
  );
}
