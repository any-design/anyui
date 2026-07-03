import type { CSSProperties } from 'react';

import { Masonry } from '@any-design/anyui-react';

interface DemoItem {
  id: number;
  height: number;
  label: string;
}

const items: DemoItem[] = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  height: 90 + (index % 4) * 46,
  label: ['River', 'Pine', 'Mist', 'Stone', 'Echo', 'Tide', 'Haze'][index % 7],
}));

const itemHeightGetter = (item: DemoItem) => item.height;

const scrollStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  maxHeight: 360,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  padding: '4px 6px 6px',
  borderRadius: 18,
  background: 'var(--bg-semi-light, var(--bg))',
  border: '1px solid var(--line)',
};

const cardStyle: CSSProperties = {
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '12px 14px',
  borderRadius: 14,
  background: 'linear-gradient(140deg, var(--primary), var(--secondary))',
  color: 'var(--text-btn, #fff)',
};

const indexStyle: CSSProperties = { fontSize: 12, fontWeight: 700, opacity: 0.72 };
const labelStyle: CSSProperties = { fontSize: 15, fontWeight: 600, letterSpacing: '0.04rem' };

export default function MasonryDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Fit columns</div>
        <div style={scrollStyle}>
          <Masonry items={items} itemHeightGetter={itemHeightGetter} colWidth={150} gap={14} fit>
            {(item: DemoItem) => (
              <div style={{ ...cardStyle, height: (item as DemoItem).height }}>
                <span style={indexStyle}>{(item as DemoItem).id + 1}</span>
                <span style={labelStyle}>{(item as DemoItem).label}</span>
              </div>
            )}
          </Masonry>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Fixed 2 columns</div>
        <div style={scrollStyle}>
          <Masonry items={items} itemHeightGetter={itemHeightGetter} col={2} colWidth={150} gap={14}>
            {(item: DemoItem) => (
              <div style={{ ...cardStyle, height: item.height }}>
                <span style={indexStyle}>{item.id + 1}</span>
                <span style={labelStyle}>{item.label}</span>
              </div>
            )}
          </Masonry>
        </div>
      </div>
    </div>
  );
}