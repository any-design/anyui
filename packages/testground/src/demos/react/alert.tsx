import { useState } from 'react';
import { Alert } from '@any-design/anyui-react';

export default function AlertDemo() {
  const [closedCount, setClosedCount] = useState(0);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Types</div>
        <div className="demo-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 12 }}>
          <Alert type="info" title="Heads up">
            Something informational happened.
          </Alert>
          <Alert type="success" title="Saved">
            Your changes have been saved.
          </Alert>
          <Alert type="warn" title="Storage almost full">
            Only 5% of space is left.
          </Alert>
          <Alert type="danger" title="Sync failed">
            Could not reach the server.
          </Alert>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Closable / no icon</div>
        <div className="demo-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 12 }}>
          <Alert
            type="info"
            title="Dismiss me"
            closable
            onClose={() => setClosedCount((count) => count + 1)}
          >
            A closable alert with a close event. Closed {closedCount} time(s) so far.
          </Alert>
          <Alert type="success" showIcon={false}>
            A content-only alert without an icon.
          </Alert>
        </div>
      </div>
    </div>
  );
}
