import { Avatar } from '@any-design/anyui-react';

const SRC = 'https://0.gravatar.com/avatar/';

export default function AvatarDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Sizes</div>
        <div className="demo-row">
          <Avatar src={SRC} size="xlarge" />
          <Avatar src={SRC} size="large" />
          <Avatar src={SRC} size="medium" />
          <Avatar src={SRC} size="small" />
          <Avatar src={SRC} size="xsmall" />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Round &amp; Custom Width</div>
        <div className="demo-row">
          <Avatar src={SRC} size="large" round />
          <Avatar src={SRC} width={40} />
          <Avatar src={SRC} width="50px" round />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Fallback</div>
        <div className="demo-row">
          <Avatar size="large" fallback={<span style={{ fontSize: 12 }}>N/A</span>} />
        </div>
      </div>
    </div>
  );
}
