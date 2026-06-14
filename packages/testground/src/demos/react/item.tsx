import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button, Card, Item, Tag } from '@any-design/anyui-react';

export default function ItemDemo() {
  const [lastClicked, setLastClicked] = useState('');
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">List inside a card</div>
        <div className="demo-row">
          <Card width={380} clean>
            <Item
              title="Enable notifications"
              description="Get notified when someone mentions you in a thread."
              clickable
              media={<Icon icon="uil:bell" />}
              actions={<Tag size="small">New</Tag>}
              onClick={() => setLastClicked('notifications')}
            />
            <Item
              title="Sync across devices"
              description="Your preferences follow you on every device, even offline. Changes are merged automatically when you reconnect."
              clickable
              media={<Icon icon="uil:sync" />}
              actions={<Button size="small">Configure</Button>}
              onClick={() => setLastClicked('sync')}
            />
            <Item
              title="Danger zone"
              description="This item is disabled and cannot be interacted with."
              clickable
              disabled
              media={<Icon icon="uil:shield-exclamation" />}
            />
          </Card>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Outline variant &amp; link</div>
        <div className="demo-col" style={{ maxWidth: 380 }}>
          <Item
            variant="outline"
            title="Open the documentation"
            description="Renders as an anchor element when href is provided."
            href="https://github.com/any-design/anyui"
            clickable
            media={<Icon icon="uil:book-open" />}
            actions={<Icon icon="uil:angle-right-b" />}
          />
          <Item
            variant="outline"
            size="small"
            title="Small outline item"
            clickable
            media={<Icon icon="uil:setting" />}
          />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Custom content (children)</div>
        <div className="demo-row">
          <Item variant="outline">
            <span>
              Anything can live here — children override the title and description area.
            </span>
          </Item>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Last clicked</div>
        <div className="demo-row">
          <span>{lastClicked || '(none)'}</span>
        </div>
      </div>
    </div>
  );
}
