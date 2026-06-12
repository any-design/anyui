<script lang="ts">
  import { Button, Drawer } from '@any-design/anyui-svelte';

  let visible = $state(false);
  let position = $state('left');

  const openDrawer = (nextPosition: string) => {
    position = nextPosition;
    visible = true;
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Positions</div>
    <div class="demo-row">
      <Button type="primary" onClick={() => openDrawer('left')}>Left</Button>
      <Button type="primary" onClick={() => openDrawer('right')}>Right</Button>
    </div>
  </div>
  <Drawer bind:modelValue={visible} {position} width={240}>
    <div style="padding: 24px;">
      <p>This is a drawer.</p>
      <Button size="small" onClick={() => (visible = false)}>Close</Button>
    </div>
  </Drawer>
</div>
