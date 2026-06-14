<script lang="ts">
  import { Button, Tooltip } from '@any-design/anyui-svelte';

  let visible = $state(false);

  const onVisibleChange = (value: boolean) => {
    visible = value;
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Placements (hover trigger)</div>
    <div class="demo-row">
      <Tooltip content="Tooltip on top" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on the left" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Tooltip on the right" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Click trigger &amp; states</div>
    <div class="demo-row">
      <Tooltip content="You clicked the trigger" triggerType="click" {onVisibleChange}>
        <Button type="primary">Click Me</Button>
      </Tooltip>
      <Tooltip content="You will never see me" disabled>
        <Button>Disabled Tooltip</Button>
      </Tooltip>
      <Tooltip content="Shows after 500ms" openDelay={500}>
        <Button>Open Delay (500ms)</Button>
      </Tooltip>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Rich content &amp; max width</div>
    <div class="demo-row">
      <Tooltip placement="bottom" maxWidth={220}>
        <Button>Rich Content</Button>
        {#snippet content()}
          <strong>Pro tip</strong><br />
          Use the <em>content</em> snippet for rich tooltips, long text wraps at the configured max
          width.
        {/snippet}
      </Tooltip>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Visible state</div>
    <div class="demo-row">
      <span>{visible ? 'visible' : 'hidden'}</span>
    </div>
  </div>
</div>
