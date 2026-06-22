<script lang="ts">
  import { Card, Grid, GridCol, GridRow } from '@any-design/anyui-svelte';

  const items = [
    { title: 'Short', copy: 'Compact content.' },
    {
      title: 'Long',
      copy: 'A longer body makes this card taller, and the grid stretches the rest of the row to the same height.',
    },
    { title: 'Action', copy: 'Aligned with the tallest card in the row.' },
  ];
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Responsive equal-height cards</div>
    <Grid gap={14} stretch>
      {#each items as item}
        <GridCol xs={24} sm={12} lg={8}>
          <Card title={item.title} width="100%">
            <p>{item.copy}</p>
          </Card>
        </GridCol>
      {/each}
    </Grid>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Nested row</div>
    <GridRow gap={12}>
      <GridCol span={6}><div class="grid-swatch">6</div></GridCol>
      <GridCol span={12}><div class="grid-swatch">12</div></GridCol>
      <GridCol span={6}><div class="grid-swatch">6</div></GridCol>
    </GridRow>
  </div>
</div>

<style>
  .grid-swatch {
    min-height: 72px;
    border-radius: var(--a-radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    color: var(--text-btn);
    font-weight: 700;
  }
</style>
