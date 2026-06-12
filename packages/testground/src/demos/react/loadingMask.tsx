import { useState } from 'react';
import { Button, Card, LoadingMask, loadingMask } from '@any-design/anyui-react';

export default function LoadingMaskDemo() {
  const [cardLoading, setCardLoading] = useState(false);

  const showFullscreen = () => {
    loadingMask.show({ text: 'Hold on...' });
    setTimeout(() => {
      loadingMask.hide();
    }, 2000);
  };

  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Wrap content</div>
        <div className="demo-row">
          <LoadingMask loading={cardLoading} text="Loading...">
            <Card title="Project stats" width={280}>
              <p style={{ margin: 0 }}>Stars: 1,024</p>
              <p style={{ margin: '6px 0 0' }}>Forks: 256</p>
            </Card>
          </LoadingMask>
          <Button type="primary" onClick={() => setCardLoading((loading) => !loading)}>
            {cardLoading ? 'Stop' : 'Start'} loading
          </Button>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Fullscreen helper</div>
        <div className="demo-row">
          <Button onClick={showFullscreen}>Show fullscreen for 2s</Button>
        </div>
      </div>
    </div>
  );
}
