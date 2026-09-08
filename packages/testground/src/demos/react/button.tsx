import { Button } from '@any-design/anyui-react';
import { useState } from 'react';

export default function ButtonDemo() {
  const [clicks, setClicks] = useState(0);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Keyboard interaction</div>
        <div className="demo-row">
          <Button onClick={() => setClicks((value) => value + 1)}>Count clicks</Button>
          <Button disabled onClick={() => setClicks((value) => value + 1)}>Disabled counter</Button>
          <Button loading onClick={() => setClicks((value) => value + 1)}>Loading counter</Button>
          <span>Clicks: {clicks}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Types &amp; Sizes</div>
        <div className="demo-row">
          <Button size="small">Small</Button>
          <Button>Default</Button>
          <Button size="large">Large</Button>
          <Button type="primary">Primary</Button>
          <Button type="secondary">Secondary</Button>
          <Button type="gradient">Gradient</Button>
          <Button type="depth">Depth</Button>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Round &amp; States</div>
        <div className="demo-row">
          <Button type="primary" round>
            Round
          </Button>
          <Button type="primary" round anim>
            Anim
          </Button>
          <Button type="primary" round disabled>
            Disabled
          </Button>
          <Button type="primary" loading>
            Loading
          </Button>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Icons</div>
        <div className="demo-row">
          <Button type="primary" icon="eva:alert-circle-fill" />
          <Button type="primary" icon="eva:alert-circle-fill" round />
          <Button type="primary" icon="eva:alert-circle-fill">
            Leading
          </Button>
          <Button type="primary" icon="eva:alert-circle-fill" iconPosition="trailing">
            Trailing
          </Button>
        </div>
      </div>
    </div>
  );
}
