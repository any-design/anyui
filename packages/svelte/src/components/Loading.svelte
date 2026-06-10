<script lang="ts">
  export let className = '';
  export { className as class };
  const circles = [1, 2, 3, 4];
</script>

<div class="a-loading-wrapper {className}">
  <span class="a-loading">
    {#each circles as item}
      <i class="a-loading-circle a-loading-circle__{item} a-loading-circle-{item}"></i>
    {/each}
  </span>
</div>
