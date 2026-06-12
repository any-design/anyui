<script lang="ts">
  import type { VirtualListItem } from '../types';
  let {
    item = undefined as VirtualListItem<unknown> | undefined,
    class: className = '',
    children,
  } = $props();
</script>

<div class="a-virtual-list__item {className}" data-index={item?.__listIndex} data-id={item?.id}>
  {@render children?.()}
</div>
