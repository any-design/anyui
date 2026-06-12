import { useState } from 'react';
import { Button, Float } from '@any-design/anyui-react';

export default function FloatDemo() {
  const [defaultVisible, setDefaultVisible] = useState(false);
  const [roundVisible, setRoundVisible] = useState(false);
  const [centeredVisible, setCenteredVisible] = useState(false);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Float</div>
        <div className="demo-row">
          <Button type="primary" onClick={() => setDefaultVisible(true)}>
            Default
          </Button>
          <Button type="primary" onClick={() => setRoundVisible(true)}>
            Round
          </Button>
          <Button type="primary" onClick={() => setCenteredVisible(true)}>
            Centered
          </Button>
        </div>
      </div>
      <Float visible={defaultVisible} width={300} onUpdateVisible={setDefaultVisible}>
        <p>This is a float.</p>
      </Float>
      <Float visible={roundVisible} width={300} round onUpdateVisible={setRoundVisible}>
        <p>This is a round float.</p>
      </Float>
      <Float visible={centeredVisible} width={300} round centered onUpdateVisible={setCenteredVisible}>
        <p>This is a centered float.</p>
      </Float>
    </div>
  );
}
