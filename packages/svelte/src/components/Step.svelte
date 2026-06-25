<script lang="ts">
  let {
    steps = 2,
    current = 1,
    finishColor = '',
    class: className = '',
  } = $props();
  const displaySteps = $derived(Array.isArray(steps) ? steps : Array.from({ length: steps }, () => null));
  const rootStyle = $derived(finishColor ? '--a-step-finish:' + finishColor : '');
</script>

<div class="a-step {className}" style={rootStyle}>
  <div class="a-step__lines">
    {#each displaySteps.slice(0, -1) as _, index}
      <div class="a-step__line {index + 1 < current ? 'a-step__line--active' : ''}"></div>
    {/each}
  </div>
  <div class="a-step__content">
    {#each displaySteps as item, index}
      <div class="a-step-item {current === index + 1 ? 'a-step-item--current' : ''} {index + 1 < current ? 'a-step-item--completed' : ''}">
        <div class="a-step-item__circle">{index + 1}</div>
        {#if item}<div class="a-step-item__name">{item}</div>{/if}
      </div>
    {/each}
  </div>
</div>
