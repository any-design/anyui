import type { CSSProperties } from 'react';

import { Masonry } from '@any-design/anyui-react';

interface DemoItem {
  id: string;
  height: number;
}

const items: DemoItem[] = Array.from({ length: 12 }, (_, index) => ({
  id: `item_${index}`,
  height: Math.floor((Math.sin(index * 7) + 1) * 60) + 60,
}));

const itemHeightGetter = (item: DemoItem) => item.height;

const cardStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: 12,
  background: 'var(--primary)',
  color: 'var(--text-btn)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function MasonryDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Fit Columns</div>
        <Masonry items={items} itemHeightGetter={itemHeightGetter} colWidth={110} gap={12} fit>
          {(item: DemoItem, index: number) => <div style={cardStyle}>{index}</div>}
        </Masonry>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Fixed 2 Columns</div>
        <Masonry items={items} itemHeightGetter={itemHeightGetter} col={2} colWidth={140} gap={12}>
          {(item: DemoItem, index: number) => <div style={cardStyle}>{index}</div>}
        </Masonry>
      </div>
    </div>
  );
}
