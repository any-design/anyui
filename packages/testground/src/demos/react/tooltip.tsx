import { useState } from 'react';
import { Button, Tooltip } from '@any-design/anyui-react';

export default function TooltipDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Placements (hover trigger)</div>
        <div className="demo-row">
          <Tooltip content="Tooltip on top" placement="top">
            <Button>Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" placement="bottom">
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip on the left" placement="left">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip content="Tooltip on the right" placement="right">
            <Button>Right</Button>
          </Tooltip>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Click trigger &amp; states</div>
        <div className="demo-row">
          <Tooltip
            content="You clicked the trigger"
            triggerType="click"
            onVisibleChange={(value: boolean) => setVisible(value)}
          >
            <Button type="primary">Click Me</Button>
          </Tooltip>
          <Tooltip content="You will never see me" disabled>
            <Button>Disabled Tooltip</Button>
          </Tooltip>
          <Tooltip content="Shows after 500ms" openDelay={500}>
            <Button>Open Delay (500ms)</Button>
          </Tooltip>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Rich content &amp; max width</div>
        <div className="demo-row">
          <Tooltip
            placement="bottom"
            maxWidth={220}
            content={
              <>
                <strong>Pro tip</strong>
                <br />
                Pass any node as <em>content</em> for rich tooltips, long text wraps at the
                configured max width.
              </>
            }
          >
            <Button>Rich Content</Button>
          </Tooltip>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Visible state</div>
        <div className="demo-row">
          <span>{visible ? 'visible' : 'hidden'}</span>
        </div>
      </div>
    </div>
  );
}
