import { Loading } from '@any-design/anyui-react';

export default function LoadingDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Loading</div>
        <div className="demo-row" style={{ fontSize: 10 }}>
          <Loading />
        </div>
      </div>
    </div>
  );
}
