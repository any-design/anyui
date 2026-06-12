<script lang="ts">
  import { ClickableText } from '@any-design/anyui-svelte';

  let clicks = $state(0);

  const onClick = () => {
    clicks += 1;
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Types</div>
    <div class="demo-row">
      <ClickableText {onClick}>Default</ClickableText>
      <ClickableText type="primary" {onClick}>Primary</ClickableText>
      <ClickableText type="secondary" {onClick}>Secondary</ClickableText>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Click Event</div>
    <div class="demo-row">
      <span>Clicked {clicks} times</span>
    </div>
  </div>
</div>
