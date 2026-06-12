<script lang="ts">
  import { Split } from '@any-design/anyui-svelte';
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Default &amp; Round</div>
    <div class="demo-col">
      <Split />
      <Split height="4px" round />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Margin &amp; Color</div>
    <div class="demo-col">
      <span>Content above</span>
      <Split margin={4} color="var(--primary)" />
      <span>Content below</span>
    </div>
  </div>
</div>
