import { Card } from '@any-design/anyui-react';

export default function CardDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basic</div>
        <div className="demo-row">
          <Card width={180}>
            <p>No header</p>
          </Card>
          <Card width={180} title="Title">
            <p>With header</p>
          </Card>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Footer</div>
        <div className="demo-row">
          <Card width={180} footer={<p>This is a footer</p>}>
            <p>With footer</p>
          </Card>
          <Card width={180} title="Title" footer={<p>This is a footer</p>}>
            <p>Header and footer</p>
          </Card>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Clean</div>
        <div className="demo-row">
          <Card width={180} clean footer={<p>This is a footer</p>}>
            <p>This is a clean card</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
