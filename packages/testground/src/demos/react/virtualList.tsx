import { VirtualList } from '@any-design/anyui-react';

interface DemoItem {
  id: string;
  height: number;
  index: number;
}

const items: DemoItem[] = Array.from({ length: 1000 }, (_, index) => ({
  id: `${index}`,
  height: Math.floor((Math.sin(index * 13) + 1) * 40) + 48,
  index,
}));

export default function VirtualListDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Virtual List (1000 items)</div>
        <div style={{ height: 320 }}>
          <VirtualList items={items}>
            {({ item }: { item: DemoItem; index: number }) => (
              <div
                style={{
                  height: item.height,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--primary-8, rgba(0, 0, 0, 0.04))',
                  border: '1px solid var(--primary-12, rgba(0, 0, 0, 0.08))',
                  color: 'var(--primary)',
                  fontSize: 14,
                  boxSizing: 'border-box',
                }}
              >
                {item.index} ({item.height}px)
              </div>
            )}
          </VirtualList>
        </div>
      </div>
    </div>
  );
}
