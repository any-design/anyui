import { useState } from 'react';
import { Tabs, Tab, TabPanel } from '@any-design/anyui-react';

export default function TabsDemo() {
  const [line, setLine] = useState<string | number>(1);
  const [card, setCard] = useState<string | number>(1);
  const [sized, setSized] = useState<string | number>(1);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Line (default)</div>
        <div className="demo-row">
          <Tabs modelValue={line} onUpdateModelValue={setLine} style={{ flex: 1 }}>
            <Tab value={1}>Profile</Tab>
            <Tab value={2}>Settings</Tab>
            <Tab value={3} disabled>Disabled</Tab>
            <TabPanel value={1}><p>Profile content — edit your account info here.</p></TabPanel>
            <TabPanel value={2}><p>Settings content — tweak your preferences.</p></TabPanel>
            <TabPanel value={3}><p>Unreachable because the tab is disabled.</p></TabPanel>
          </Tabs>
        </div>
      </div>

      <div className="demo-block">
        <div className="demo-block__label">Card</div>
        <div className="demo-row">
          <Tabs modelValue={card} type="card" onUpdateModelValue={setCard} style={{ flex: 1 }}>
            <Tab value={1}>Overview</Tab>
            <Tab value={2}>Activity</Tab>
            <TabPanel value={1}><p>Overview panel.</p></TabPanel>
            <TabPanel value={2}><p>Activity feed.</p></TabPanel>
          </Tabs>
        </div>
      </div>

      <div className="demo-block">
        <div className="demo-block__label">Sizes</div>
        <div className="demo-col">
          <Tabs modelValue={sized} size="small" onUpdateModelValue={setSized}>
            <Tab value={1}>S</Tab>
            <Tab value={2}>M</Tab>
            <TabPanel value={1}><p>small</p></TabPanel>
            <TabPanel value={2}><p>small-2</p></TabPanel>
          </Tabs>
          <Tabs modelValue={sized} size="large" onUpdateModelValue={setSized}>
            <Tab value={1}>L</Tab>
            <Tab value={2}>M</Tab>
            <TabPanel value={1}><p>large</p></TabPanel>
            <TabPanel value={2}><p>large-2</p></TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}