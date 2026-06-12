<script lang="ts">
  import { Button, Float } from '@any-design/anyui-svelte';

  let defaultVisible = $state(false);
  let roundVisible = $state(false);
  let centeredVisible = $state(false);
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Float</div>
    <div class="demo-row">
      <Button type="primary" onClick={() => (defaultVisible = true)}>Default</Button>
      <Button type="primary" onClick={() => (roundVisible = true)}>Round</Button>
      <Button type="primary" onClick={() => (centeredVisible = true)}>Centered</Button>
    </div>
  </div>
  <Float bind:visible={defaultVisible} width={320}>
    <p style="padding: 16px;">This is a float. Click the mask to close it.</p>
  </Float>
  <Float bind:visible={roundVisible} width={320} round>
    <p style="padding: 16px;">This is a round float.</p>
  </Float>
  <Float bind:visible={centeredVisible} width={320} round centered>
    <p style="padding: 16px;">This is a centered float.</p>
  </Float>
</div>
