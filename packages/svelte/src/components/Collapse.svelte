<script lang="ts">
  export let visible = false;
  export let direction = 'vertical';
  export let alwaysRender = false;
  export let className = '';
  export { className as class };
</script>

{#if visible || alwaysRender}
  <div class="a-collapse {!visible ? 'a-collapse--collapsed-' + direction : ''} {className}">
    <slot />
  </div>
{/if}
