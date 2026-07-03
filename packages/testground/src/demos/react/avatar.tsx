import { Avatar } from '@any-design/anyui-react';

const SRC = 'https://i.pravatar.cc/120?img=12';

export default function AvatarDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Sizes</div>
        <div className="demo-row">
          <Avatar src={SRC} size="xlarge" />
          <Avatar src="https://i.pravatar.cc/96?img=12" size="large" />
          <Avatar src="https://i.pravatar.cc/64?img=12" size="medium" />
          <Avatar src="https://i.pravatar.cc/48?img=12" size="small" />
          <Avatar src="https://i.pravatar.cc/32?img=12" size="xsmall" />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Round &amp; Custom Width</div>
        <div className="demo-row">
          <Avatar src="https://i.pravatar.cc/96?img=12" size="large" round />
          <Avatar src="https://i.pravatar.cc/80?img=12" width={40} />
          <Avatar src="https://i.pravatar.cc/96?img=5" width="50px" round />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Fallback</div>
        <div className="demo-row">
          <Avatar size="large" fallback={<span style={{ fontSize: 12 }}>N/A</span>} />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Name initials fallback</div>
        <div className="demo-row">
          <Avatar src="" name="Ada Lovelace" size="large" round />
          <Avatar src="" name="Turing" size="large" />
          <Avatar src="" name="宮崎駿" size="large" round />
          <Avatar src="https://broken.example/missing.png" name="Grace Hopper" width={40} round />
          <Avatar src="" name="Linus Torvalds" size="small" round />
        </div>
      </div>
    </div>
  );
}
