<script lang="ts">
  export let round = false;
  export let size = 'default';
  export let color = '';
  export let bgColor = '';
  export let className = '';
  export { className as class };
</script>

<div class="a-tag a-tag--{size} {round ? 'a-tag--round' : ''} {(color || bgColor) ? 'a-tag--custom-color' : ''} {className}" style:color={color || undefined} style:background-color={bgColor || color || undefined}>
  <slot />
</div>
