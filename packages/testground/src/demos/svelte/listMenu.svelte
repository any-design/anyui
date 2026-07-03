<script lang="ts">
  import { ListMenu } from '@any-design/anyui-svelte';
  import type { AListMenuConfig } from '@any-design/anyui-svelte';

  const menu: AListMenuConfig = {
    Accounts: ['My Account'],
    UI: ['Theme'],
    Security: ['Storage', 'API'],
  };

  let selected: string | undefined = $state('Theme');
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">List Menu</div>
    <div class="demo-row">
      <div style="width: 220px;">
        <ListMenu {menu} bind:modelValue={selected} selectedVariant="solid" />
      </div>
    </div>
  </div>
</div>
