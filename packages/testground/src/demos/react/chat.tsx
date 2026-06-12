import { useState } from 'react';
import { Button, Chat } from '@any-design/anyui-react';
import type { AChatMessage } from '@any-design/anyui-react';

let messageId = 0;

const createMessage = (content: string, role: AChatMessage['role']): AChatMessage => ({
  id: `msg_${messageId++}`,
  content,
  role,
});

const initialMessages: AChatMessage[] = [
  createMessage('AnyUI is a fantastic cute UI library.', 'target'),
  createMessage('It now works in React too!', 'self'),
  createMessage('Try adding more messages below.', 'target'),
];

export default function ChatDemo() {
  const [messages, setMessages] = useState<AChatMessage[]>(initialMessages);
  const addMessage = () => {
    const lines = Math.floor(Math.random() * 3) + 1;
    const content = Array.from({ length: lines }, () => `Random content ${Date.now()}`).join('\n');
    setMessages((current) => [...current, createMessage(content, Math.random() > 0.5 ? 'self' : 'target')]);
  };
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Chat</div>
        <div className="demo-col">
          <div style={{ height: 320, overflow: 'auto' }}>
            <Chat messages={messages} />
          </div>
          <div className="demo-row">
            <Button type="primary" size="small" onClick={addMessage}>
              Add Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
