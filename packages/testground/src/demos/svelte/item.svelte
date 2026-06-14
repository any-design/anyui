<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button, Card, Item, Tag } from '@any-design/anyui-svelte';

  let lastClicked = $state('');
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">List inside a card</div>
    <div class="demo-row">
      <Card width={380} clean>
        <Item
          title="Enable notifications"
          description="Get notified when someone mentions you in a thread."
          clickable
          onClick={() => (lastClicked = 'notifications')}
        >
          {#snippet media()}<Icon icon="uil:bell" />{/snippet}
          {#snippet actions()}<Tag size="small">New</Tag>{/snippet}
        </Item>
        <Item
          title="Sync across devices"
          description="Your preferences follow you on every device, even offline. Changes are merged automatically when you reconnect."
          clickable
          onClick={() => (lastClicked = 'sync')}
        >
          {#snippet media()}<Icon icon="uil:sync" />{/snippet}
          {#snippet actions()}<Button size="small">Configure</Button>{/snippet}
        </Item>
        <Item
          title="Danger zone"
          description="This item is disabled and cannot be interacted with."
          clickable
          disabled
        >
          {#snippet media()}<Icon icon="uil:shield-exclamation" />{/snippet}
        </Item>
      </Card>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Outline variant &amp; link</div>
    <div class="demo-col" style="max-width: 380px">
      <Item
        variant="outline"
        title="Open the documentation"
        description="Renders as an anchor element when href is provided."
        href="https://github.com/any-design/anyui"
        clickable
      >
        {#snippet media()}<Icon icon="uil:book-open" />{/snippet}
        {#snippet actions()}<Icon icon="uil:angle-right-b" />{/snippet}
      </Item>
      <Item variant="outline" size="small" title="Small outline item" clickable>
        {#snippet media()}<Icon icon="uil:setting" />{/snippet}
      </Item>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Custom content (children)</div>
    <div class="demo-row">
      <Item variant="outline">
        <span>Anything can live here — children override the title and description area.</span>
      </Item>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Last clicked</div>
    <div class="demo-row">
      <span>{lastClicked || '(none)'}</span>
    </div>
  </div>
</div>
