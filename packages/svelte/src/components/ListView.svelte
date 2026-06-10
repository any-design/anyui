<script lang="ts">
  import { setContext } from 'svelte';
  export let fit = true;
  export let type = '';
  export let itemHeight: string | number | undefined = undefined;
  export let className = '';
  export { className as class };
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
  <slot />
</div>
