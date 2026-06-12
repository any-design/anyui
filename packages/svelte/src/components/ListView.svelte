<script lang="ts">
  import { setContext } from 'svelte';
  let {
    fit = true,
    type = '',
    itemHeight = undefined,
    class: className = '',
    children,
  } = $props();
  const context = {
    get type() {
      return type;
    },
    get itemHeight() {
      return itemHeight;
    },
  };
  setContext('anyui-list-view', context);
</script>

<div class="a-list-view {fit ? 'a-list-view--fit' : ''} {className}">
  {@render children?.()}
</div>
