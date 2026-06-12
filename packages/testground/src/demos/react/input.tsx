import { useState } from 'react';
import { Button, Input } from '@any-design/anyui-react';

export default function InputDemo() {
  const [value, setValue] = useState('');
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basic</div>
        <div className="demo-col">
          <Input placeholder="Default" />
          <Input placeholder="Round" round />
          <Input placeholder="Large" size="large" />
          <Input placeholder="Borderless" borderless />
          <Input placeholder="Disabled" disabled />
          <Input modelValue="This is a read only input" readonly />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Prefix &amp; Post Button</div>
        <div className="demo-col">
          <Input placeholder="With prefix" prefix={<span>@</span>} />
          <Input placeholder="With postfix" postfix={<span>.com</span>} />
          <Input placeholder="With post button" postButton={<Button size="small" type="gradient">Submit</Button>} />
          <Input
            placeholder="With rounded post button"
            borderless
            round
            postButton={
              <Button type="gradient" size="small" round>
                Search
              </Button>
            }
          />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Controlled</div>
        <div className="demo-col">
          <Input placeholder="Type something..." modelValue={value} onUpdateModelValue={setValue} />
          <span>Value: {value || '(empty)'}</span>
        </div>
      </div>
    </div>
  );
}
