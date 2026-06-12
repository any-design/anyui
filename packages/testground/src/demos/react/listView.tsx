import { Button, ListView, ListViewItem } from '@any-design/anyui-react';

const rows = (
  <>
    <ListViewItem label="Avatar">
      <Button type="primary" size="small">
        View
      </Button>
    </ListViewItem>
    <ListViewItem label="Nickname">
      <span>AnyUI</span>
    </ListViewItem>
    <ListViewItem label="Email">
      <span>anyui@pwp.sh</span>
    </ListViewItem>
  </>
);

export default function ListViewDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Borderless (default)</div>
        <ListView itemHeight="54px">{rows}</ListView>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Bordered</div>
        <ListView itemHeight="54px" type="bordered">
          {rows}
        </ListView>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Deep</div>
        <ListView itemHeight="64px" type="deep">
          {rows}
        </ListView>
      </div>
    </div>
  );
}
