<script lang="ts">
  import { Button, ListView, ListViewItem } from '@any-design/anyui-svelte';

  let lastClicked = $state('');
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Borderless (default)</div>
    <div class="demo-col" style="height: 180px;">
      <ListView itemHeight="54px">
        <ListViewItem label="Avatar" onClick={() => (lastClicked = 'Avatar')}>
          <Button type="primary" size="small">View</Button>
        </ListViewItem>
        <ListViewItem label="Nickname" onClick={() => (lastClicked = 'Nickname')}>
          <span>AnyUI</span>
        </ListViewItem>
        <ListViewItem label="Email" onClick={() => (lastClicked = 'Email')}>
          <span>anyui@pwp.sh</span>
        </ListViewItem>
      </ListView>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Bordered</div>
    <div class="demo-col" style="height: 180px;">
      <ListView itemHeight="54px" type="bordered">
        <ListViewItem label="Avatar"><Button type="primary" size="small">View</Button></ListViewItem>
        <ListViewItem label="Nickname"><span>AnyUI</span></ListViewItem>
        <ListViewItem label="Email"><span>anyui@pwp.sh</span></ListViewItem>
      </ListView>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Deep</div>
    <div class="demo-col" style="height: 200px;">
      <ListView itemHeight="64px" type="deep">
        <ListViewItem label="Avatar"><Button type="primary" size="small">View</Button></ListViewItem>
        <ListViewItem label="Nickname" selected><span>AnyUI</span></ListViewItem>
        <ListViewItem label="Email"><span>anyui@pwp.sh</span></ListViewItem>
      </ListView>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Click Event</div>
    <div class="demo-row">
      <span>Last clicked: {lastClicked || 'none'}</span>
    </div>
  </div>
</div>
