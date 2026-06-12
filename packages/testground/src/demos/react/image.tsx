import { Image } from '@any-design/anyui-react';

export default function ImageDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basic</div>
        <div className="demo-row">
          <Image src="https://picsum.photos/seed/anyui/300/200" width={180} height={120} />
          <Image src="https://picsum.photos/seed/anyui2/300/200" width={120} height={120} size="contain" />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Error Fallback</div>
        <div className="demo-row">
          <Image width={180} height={80} error={<span>Failed to load</span>} />
        </div>
      </div>
    </div>
  );
}
