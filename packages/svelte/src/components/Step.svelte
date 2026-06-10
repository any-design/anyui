<script lang="ts">
  export let steps: number | Array<string | null> = 2;
  export let current = 1;
  export let className = '';
  export { className as class };
  $: displaySteps = Array.isArray(steps) ? steps : Array.from({ length: steps }, () => null);
</script>

<div class="a-step {className}">
  <div class="a-step__line"></div>
  <div class="a-step__content">
    {#each displaySteps as item, index}
      <div class="a-step-item {current === index + 1 ? 'a-step-item--current' : ''}">
        <div class="a-step-item__circle">{index + 1}</div>
        {#if item}<div class="a-step-item__name">{item}</div>{/if}
      </div>
    {/each}
  </div>
</div>
