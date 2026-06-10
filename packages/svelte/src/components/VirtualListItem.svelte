<script lang="ts">
  import type { VirtualListItem } from '../types';
  export let item: VirtualListItem<unknown> | undefined = undefined;
  export let className = '';
  export { className as class };
</script>

<div class="a-virtual-list__item {className}" data-index={item?.__listIndex} data-id={item?.id}>
  <slot />
</div>
