import { Content, Footer, Header, Layout, Side } from '@any-design/anyui-react';
import type { CSSProperties } from 'react';

const cellStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--primary)',
  color: 'var(--text-btn)',
};

const sideStyle: CSSProperties = {
  ...cellStyle,
  background: 'var(--bg-light)',
  color: 'var(--primary)',
};

const contentInnerStyle: CSSProperties = {
  ...cellStyle,
  background: 'var(--primary-80)',
  width: '100%',
  height: '100%',
};

const ContentInner = () => <div style={contentInnerStyle}>Content</div>;

export default function LayoutDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Side + Header / Content / Footer</div>
        <div style={{ height: 240 }}>
          <Layout hasSide>
            <Side width={100} style={sideStyle}>
              Side
            </Side>
            <Layout>
              <Header height={48} style={cellStyle}>
                Header
              </Header>
              <Content>
                <ContentInner />
              </Content>
              <Footer height={48} style={cellStyle}>
                Footer
              </Footer>
            </Layout>
          </Layout>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Side On The Right</div>
        <div style={{ height: 180 }}>
          <Layout hasSide>
            <Layout>
              <Content>
                <ContentInner />
              </Content>
              <Footer height={48} style={cellStyle}>
                Footer
              </Footer>
            </Layout>
            <Side width={100} style={sideStyle}>
              Side
            </Side>
          </Layout>
        </div>
      </div>
    </div>
  );
}
