<script lang="ts">
  import { Textarea } from '@any-design/anyui-svelte';

  let text = $state('');

  const onInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement | null;
    text = target ? target.value : '';
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Variants</div>
    <div class="demo-col">
      <Textarea placeholder="Default" height={72} />
      <Textarea placeholder="Borderless" borderless height={72} />
      <Textarea placeholder="Resizable" resizable height={72} />
      <Textarea placeholder="Disabled" disabled height={72} />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Events</div>
    <div class="demo-col">
      <Textarea placeholder="Type something..." height={72} maxlength={120} {onInput} />
      <span>Length: {text.length}</span>
    </div>
  </div>
</div>
