<script lang="ts">
  import { Button, Input } from '@any-design/anyui-svelte';

  let text = $state('');

  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    text = target ? target.value : '';
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Variants</div>
    <div class="demo-col">
      <Input placeholder="Default" />
      <Input placeholder="Round" round />
      <Input placeholder="Large" size="large" />
      <Input placeholder="Borderless" borderless />
      <Input placeholder="Disabled" disabled />
      <Input modelValue="This is a read only input" readonly />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Prefix &amp; Postfix</div>
    <div class="demo-col">
      <Input placeholder="With prefix" prefix="@" />
      <Input placeholder="With postfix" postfix="kg" />
      <Input placeholder="With post button">
        {#snippet postButton()}
          <Button type="gradient" size="small">Submit</Button>
        {/snippet}
      </Input>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Events</div>
    <div class="demo-col">
      <Input placeholder="Type something..." {onInput} />
      <span>Value: {text || '(empty)'}</span>
    </div>
  </div>
</div>
