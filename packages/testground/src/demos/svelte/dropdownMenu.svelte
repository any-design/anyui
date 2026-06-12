<script lang="ts">
  import { Button, DropdownMenu } from '@any-design/anyui-svelte';
  import type { DropdownMenuItem } from '@any-design/anyui-svelte';

  const items: DropdownMenuItem[] = [
    { command: 'edit', label: 'Edit', icon: 'uil:edit' },
    { command: 'duplicate', label: 'Duplicate', icon: 'uil:copy' },
    { command: 'archive', label: 'Archive', icon: 'uil:archive', disabled: true },
    { command: 'delete', label: 'Delete', icon: 'uil:trash-alt', danger: true, divided: true },
  ];

  let lastCommand = $state('');

  const onCommand = (command: string | number, item: DropdownMenuItem) => {
    lastCommand = `${command} (${item.label})`;
  };

  const onVisibleChange = (visible: boolean) => {
    console.log('dropdown visible:', visible);
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basic (click trigger)</div>
    <div class="demo-row">
      <DropdownMenu {items} {onCommand} {onVisibleChange}>
        <Button>Open Menu</Button>
      </DropdownMenu>
      <DropdownMenu {items} disabled {onCommand}>
        <Button>Disabled Dropdown</Button>
      </DropdownMenu>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Hover trigger</div>
    <div class="demo-row">
      <DropdownMenu {items} triggerType="hover" {onCommand}>
        <Button type="primary">Hover Me</Button>
      </DropdownMenu>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Custom width</div>
    <div class="demo-row">
      <DropdownMenu {items} width={240} {onCommand}>
        <Button>Wide Menu (240px)</Button>
      </DropdownMenu>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Last Command</div>
    <div class="demo-row">
      <span>{lastCommand || '(none)'}</span>
    </div>
  </div>
</div>
