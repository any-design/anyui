import { useState } from 'react';
import { Button, Upload } from '@any-design/anyui-react';
import type { UploadStatus } from '@any-design/anyui-react';

const statuses: UploadStatus[] = ['default', 'uploading', 'error', 'success'];

export default function UploadDemo() {
  const [status, setStatus] = useState<UploadStatus>('default');
  const [fileName, setFileName] = useState('');
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Status</div>
        <div className="demo-row">
          {statuses.map((item) => (
            <Button key={item} round size="small" onClick={() => setStatus(item)}>
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Upload Area</div>
        <div className="demo-col">
          <div style={{ width: 200, height: 160 }}>
            <Upload
              status={status}
              dragging={<span>Dragging</span>}
              uploading={<span>Uploading</span>}
              error={<span>Error</span>}
              success={<span>Success</span>}
              onUpload={(file: File) => setFileName(file.name)}
            >
              <span>Click or drop a file</span>
            </Upload>
          </div>
          <span>Last file: {fileName || '(none)'}</span>
        </div>
      </div>
    </div>
  );
}
