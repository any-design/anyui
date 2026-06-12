<script lang="ts">
  import { PopupMenu } from '@any-design/anyui-svelte';

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  let lastCommand = $state('');

  const onCommand = (command: string) => {
    lastCommand = command;
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Trigger Types</div>
    <div class="demo-row">
      <PopupMenu {items} {onCommand}>
        <span class="popup-menu-trigger">hover</span>
      </PopupMenu>
      <PopupMenu {items} triggerType="click" hideAfterClick {onCommand}>
        <span class="popup-menu-trigger">click</span>
      </PopupMenu>
      <PopupMenu {items} triggerType="contextmenu" hideAfterClick {onCommand}>
        <span class="popup-menu-trigger">contextmenu</span>
      </PopupMenu>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Grouped (only one opens)</div>
    <div class="demo-row">
      <PopupMenu {items} group="demo" triggerType="click" hideAfterClick {onCommand}>
        <span class="popup-menu-trigger">grouped A</span>
      </PopupMenu>
      <PopupMenu {items} group="demo" triggerType="click" hideAfterClick {onCommand}>
        <span class="popup-menu-trigger">grouped B</span>
      </PopupMenu>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Command Event</div>
    <div class="demo-row">
      <span>Last command: {lastCommand || 'none'}</span>
    </div>
  </div>
</div>

<style>
  .popup-menu-trigger {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
