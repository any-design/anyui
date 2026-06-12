<script lang="ts">
  import { Card } from '@any-design/anyui-svelte';
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basic</div>
    <div class="demo-row">
      <Card width={180}>
        <p>No header</p>
      </Card>
      <Card title="Title" width={180}>
        <p>With header</p>
      </Card>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Footer</div>
    <div class="demo-row">
      <Card width={180}>
        <p>With footer</p>
        {#snippet footer()}
          <p>This is a footer</p>
        {/snippet}
      </Card>
      <Card title="Title" width={180}>
        <p>Header and footer</p>
        {#snippet footer()}
          <p>This is a footer</p>
        {/snippet}
      </Card>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Clean</div>
    <div class="demo-row">
      <Card clean width={180}>
        <p>This is a clean card</p>
        {#snippet footer()}
          <p>This is a footer</p>
        {/snippet}
      </Card>
    </div>
  </div>
</div>
