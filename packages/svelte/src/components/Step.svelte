<script lang="ts">
  let {
    steps = 2,
    current = 1,
    class: className = '',
  } = $props();
  const displaySteps = $derived(Array.isArray(steps) ? steps : Array.from({ length: steps }, () => null));
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
