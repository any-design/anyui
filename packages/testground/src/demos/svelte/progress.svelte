<script lang="ts">
  import { Progress } from '@any-design/anyui-svelte';

  const formatDone = (value: number) => `${Math.round(value)} done`;
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Status &amp; Labels</div>
    <div class="demo-col progress-demo-stack">
      <Progress value={42} showLabel width={260} />
      <Progress value={72} status="success" showLabel format={formatDone} width={260} />
      <Progress value={28} status="warn" size="small" width={260} />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Motion</div>
    <div class="demo-col progress-demo-stack">
      <Progress value={55} striped active width={260} />
      <Progress indeterminate status="info" width={260} />
    </div>
  </div>
</div>

<style>
  .progress-demo-stack {
    width: 280px;
  }
</style>
