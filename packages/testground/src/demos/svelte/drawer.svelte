<script lang="ts">
  import { Button, Drawer } from '@any-design/anyui-svelte';

  let defaultVisible = $state(false);
  let glassVisible = $state(false);
  let nomaskVisible = $state(false);
</script>

<div>
  <div class="demo-block">
    <div class="demo-row">
      <Button type="primary" onClick={() => (defaultVisible = true)}>Default</Button>
      <Button type="primary" onClick={() => (glassVisible = true)}>Glass 70%</Button>
      <Button type="primary" onClick={() => (nomaskVisible = true)}>No mask</Button>
    </div>
  </div>
</div>

<Drawer bind:modelValue={defaultVisible} position="right" width={300}>
  <div class="drawer-demo">
    <h3 class="drawer-demo__title">Drawer</h3>
    <p class="drawer-demo__text">
      A panel slides in from the right. The body has its own padding and scrolls independently.
    </p>
    <ul class="drawer-demo__list">
      <li>Item one</li>
      <li>Item two</li>
      <li>Item three</li>
    </ul>
    <div class="drawer-demo__actions">
      <Button size="small" onClick={() => (defaultVisible = false)}>Close</Button>
    </div>
  </div>
</Drawer>

<Drawer bind:modelValue={glassVisible} position="right" width={300} glassOpacity={0.7}>
  <div class="drawer-demo">
    <h3 class="drawer-demo__title">Glass drawer</h3>
    <p class="drawer-demo__text">
      Set <code>glassOpacity</code> below 1 to let the backdrop blur show through the panel —
      toggle the Glass theme in the top bar to see it best.
    </p>
    <div class="drawer-demo__actions">
      <Button size="small" onClick={() => (glassVisible = false)}>Close</Button>
    </div>
  </div>
</Drawer>

<Drawer bind:modelValue={nomaskVisible} position="right" width={300} withMask={false}>
  <div class="drawer-demo">
    <h3 class="drawer-demo__title">No mask</h3>
    <p class="drawer-demo__text">The page behind stays interactive while the drawer is open.</p>
    <div class="drawer-demo__actions">
      <Button size="small" onClick={() => (nomaskVisible = false)}>Close</Button>
    </div>
  </div>
</Drawer>

<style>
  .drawer-demo {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .drawer-demo__title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--text);
  }
  .drawer-demo__text {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-80, var(--text));
  }
  .drawer-demo__list {
    margin: 0;
    padding-left: 18px;
    font-size: 14px;
    line-height: 1.8;
    color: var(--text);
  }
  .drawer-demo__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 4px;
  }
  .drawer-demo code {
    padding: 1px 6px;
    border-radius: 6px;
    background: var(--bg-alter);
    font-size: 12px;
  }
</style>