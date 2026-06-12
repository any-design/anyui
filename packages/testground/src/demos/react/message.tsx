import { Button, Message, message } from '@any-design/anyui-react';
import type { MessageType } from '@any-design/anyui-react';

const types: MessageType[] = ['default', 'info', 'success', 'warning', 'error'];

export default function MessageDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Popup Messages</div>
        <div className="demo-row">
          {types.map((type) => (
            <Button key={type} size="small" onClick={() => message({ type, content: type })}>
              {type}
            </Button>
          ))}
          <Button size="small" onClick={() => message.info({ content: 'Round', round: true })}>
            round
          </Button>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Inline Messages</div>
        <div className="demo-col">
          <Message type="info" content="This is an info message" />
          <Message type="success" content="This is a success message" />
          <Message type="error" content="This is an error message" round />
        </div>
      </div>
    </div>
  );
}
