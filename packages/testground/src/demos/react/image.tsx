import { Image } from '@any-design/anyui-react';

const IMAGE_SRC = `${import.meta.env.BASE_URL}logo.png`;
const ICON_SRC = `${import.meta.env.BASE_URL}favicon.png`;

export default function ImageDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basic</div>
        <div className="demo-row">
          <Image src={IMAGE_SRC} width={180} height={120} />
          <Image src={ICON_SRC} width={120} height={120} size="contain" />
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
