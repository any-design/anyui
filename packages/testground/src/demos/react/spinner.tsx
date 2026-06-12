import { Spinner } from '@any-design/anyui-react';

export default function SpinnerDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Sizes</div>
        <div className="demo-row">
          <span style={{ fontSize: 16 }}>
            <Spinner />
          </span>
          <span style={{ fontSize: 24 }}>
            <Spinner />
          </span>
          <span style={{ fontSize: 32 }}>
            <Spinner />
          </span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Custom Icon</div>
        <div className="demo-row">
          <span style={{ fontSize: 24 }}>
            <Spinner icon="eos-icons:bubble-loading" />
          </span>
        </div>
      </div>
    </div>
  );
}
