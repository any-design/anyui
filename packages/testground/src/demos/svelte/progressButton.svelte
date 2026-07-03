<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Button, ProgressButton } from '@any-design/anyui-svelte';

  let value = $state(0);
  let running = $state(true);
  let timer: ReturnType<typeof setInterval> | undefined;

  onMount(() => {
    if (running) {
      timer = setInterval(() => {
        value = (value + 2) % 101;
      }, 120);
    }
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });

  const toggle = () => {
    if (running) {
      if (timer) {
        clearInterval(timer);
        timer = undefined;
      }
    } else {
      timer = setInterval(() => {
        value = (value + 2) % 101;
      }, 120);
    }
    running = !running;
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">ProgressButton</div>
    <div class="demo-row">
      <ProgressButton {value}>Downloading… {Math.round(value)}%</ProgressButton>
      <ProgressButton {value} type="solid">Solid {Math.round(value)}%</ProgressButton>
      <Button type="primary" onClick={toggle}>{running ? 'Pause' : 'Play'}</Button>
    </div>
    <div class="demo-row">
      <ProgressButton value={55} type="solid" status="success" round>Solid success</ProgressButton>
      <ProgressButton value={65} striped active>Stripes</ProgressButton>
      <ProgressButton value={40} disabled>Disabled</ProgressButton>
    </div>
  </div>
</div>