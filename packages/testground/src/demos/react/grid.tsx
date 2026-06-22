import { Card, Grid, GridCol, GridRow } from '@any-design/anyui-react';
import type { CSSProperties } from 'react';

const items = [
  { title: 'Short', copy: 'Compact content.' },
  {
    title: 'Long',
    copy: 'A longer body makes this card taller, and the grid stretches the rest of the row to the same height.',
  },
  { title: 'Action', copy: 'Aligned with the tallest card in the row.' },
];

const swatchStyle: CSSProperties = {
  minHeight: 72,
  borderRadius: 'var(--a-radius-lg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--primary)',
  color: 'var(--text-btn)',
  fontWeight: 700,
};

export default function GridDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Responsive equal-height cards</div>
        <Grid gap={14} stretch>
          {items.map((item) => (
            <GridCol key={item.title} xs={24} sm={12} lg={8}>
              <Card title={item.title} width="100%">
                <p>{item.copy}</p>
              </Card>
            </GridCol>
          ))}
        </Grid>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Nested row</div>
        <GridRow gap={12}>
          <GridCol span={6}>
            <div style={swatchStyle}>6</div>
          </GridCol>
          <GridCol span={12}>
            <div style={swatchStyle}>12</div>
          </GridCol>
          <GridCol span={6}>
            <div style={swatchStyle}>6</div>
          </GridCol>
        </GridRow>
      </div>
    </div>
  );
}
