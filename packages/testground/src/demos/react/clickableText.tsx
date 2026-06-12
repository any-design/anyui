import { ClickableText } from '@any-design/anyui-react';

export default function ClickableTextDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Types</div>
        <div className="demo-row">
          <ClickableText onClick={() => console.log('clicked default')}>Default</ClickableText>
          <ClickableText type="primary" onClick={() => console.log('clicked primary')}>
            Primary
          </ClickableText>
          <ClickableText type="secondary" onClick={() => console.log('clicked secondary')}>
            Secondary
          </ClickableText>
        </div>
      </div>
    </div>
  );
}
