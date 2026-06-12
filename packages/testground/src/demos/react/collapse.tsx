import { useState } from 'react';
import { Button, Collapse } from '@any-design/anyui-react';

export default function CollapseDemo() {
  const [verticalVisible, setVerticalVisible] = useState(false);
  const [horizontalVisible, setHorizontalVisible] = useState(false);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Vertical</div>
        <div className="demo-col">
          <div className="demo-row">
            <Button onClick={() => setVerticalVisible((value) => !value)}>Toggle Vertical</Button>
          </div>
          <Collapse visible={verticalVisible}>
            {Array.from({ length: 5 }, (_, index) => (
              <p key={index}>vertical content {index + 1}</p>
            ))}
          </Collapse>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Horizontal</div>
        <div className="demo-col">
          <div className="demo-row">
            <Button onClick={() => setHorizontalVisible((value) => !value)}>Toggle Horizontal</Button>
          </div>
          <Collapse direction="horizontal" visible={horizontalVisible}>
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} style={{ marginRight: 8 }}>
                horizontal
              </span>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
}
