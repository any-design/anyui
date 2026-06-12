<script lang="ts">
  import { Button, Popup } from '@any-design/anyui-svelte';

  let basicVisible = $state(false);
  let lockedVisible = $state(false);
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basic</div>
    <div class="demo-row">
      <Button type="primary" onClick={() => (basicVisible = true)}>Open popup</Button>
      <Popup bind:modelValue={basicVisible} width={360}>
        <div style="padding: 24px;">
          <p style="margin: 0 0 16px;">A bare popup panel, close by mask or Esc.</p>
          <Button size="small" onClick={() => (basicVisible = false)}>Close</Button>
        </div>
      </Popup>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Not mask closable</div>
    <div class="demo-row">
      <Button onClick={() => (lockedVisible = true)}>Open popup</Button>
      <Popup bind:modelValue={lockedVisible} width={360} maskClosable={false}>
        <div style="padding: 24px;">
          <p style="margin: 0 0 16px;">Mask click and Esc are disabled here.</p>
          <Button size="small" type="primary" onClick={() => (lockedVisible = false)}>Close</Button>
        </div>
      </Popup>
    </div>
  </div>
</div>
