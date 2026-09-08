<script lang="ts">
  import { Tabs, Tab, TabPanel, Input } from '@any-design/anyui-svelte';

  let defaultTab = $state<string | number>(1);
  let card = $state<string | number>(1);
  let sized = $state<string | number>(1);
  let implicitTab = $state<string | number>();
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Implicit values &amp; kept state</div>
    <Tabs class="implicit-tabs" onChange={(value: string | number) => implicitTab = value}>
      <Tab disabled>Unavailable</Tab>
      <Tab>First</Tab>
      <Tab>Second</Tab>
      <Tab disabled>Disabled last</Tab>
      <TabPanel>Unavailable panel</TabPanel>
      <TabPanel keepAlive><Input placeholder="Your note stays here" /></TabPanel>
      <TabPanel lazy><p>Second implicit panel</p><Input placeholder="Mounted on first visit" /></TabPanel>
      <TabPanel>Disabled panel</TabPanel>
    </Tabs>
    <span>Last selected index: {implicitTab ?? 'none'}</span>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Default</div>
    <div class="demo-row">
      <Tabs bind:modelValue={defaultTab} style="flex:1">
        <Tab value={1}>Profile</Tab>
        <Tab value={2}>Settings</Tab>
        <Tab value={3} disabled>Disabled</Tab>
        <TabPanel value={1}><p>Profile content — edit your account info here.</p></TabPanel>
        <TabPanel value={2}><p>Settings content — tweak your preferences.</p></TabPanel>
        <TabPanel value={3}><p>Unreachable because the tab is disabled.</p></TabPanel>
      </Tabs>
    </div>
  </div>

  <div class="demo-block">
    <div class="demo-block__label">Card</div>
    <div class="demo-row">
      <Tabs bind:modelValue={card} type="card" style="flex:1">
        <Tab value={1}>Overview</Tab>
        <Tab value={2}>Activity</Tab>
        <TabPanel value={1}><p>Overview panel.</p></TabPanel>
        <TabPanel value={2}><p>Activity feed.</p></TabPanel>
      </Tabs>
    </div>
  </div>

  <div class="demo-block">
    <div class="demo-block__label">Sizes</div>
    <div class="demo-col">
      <Tabs bind:modelValue={sized} size="small">
        <Tab value={1}>S</Tab>
        <Tab value={2}>M</Tab>
        <TabPanel value={1}><p>small</p></TabPanel>
        <TabPanel value={2}><p>small-2</p></TabPanel>
      </Tabs>
      <Tabs bind:modelValue={sized} size="large">
        <Tab value={1}>L</Tab>
        <Tab value={2}>M</Tab>
        <TabPanel value={1}><p>large</p></TabPanel>
        <TabPanel value={2}><p>large-2</p></TabPanel>
      </Tabs>
    </div>
  </div>
</div>
