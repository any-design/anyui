<script lang="ts">
  import { Button, Collapse } from '@any-design/anyui-svelte';

  let verticalVisible = $state(false);
  let horizontalVisible = $state(false);
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Vertical</div>
    <div class="demo-col">
      <div class="demo-row">
        <Button size="small" onClick={() => (verticalVisible = !verticalVisible)}>
          Toggle Vertical
        </Button>
      </div>
      <Collapse visible={verticalVisible} alwaysRender>
        <p>Vertical content line 1</p>
        <p>Vertical content line 2</p>
        <p>Vertical content line 3</p>
      </Collapse>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Horizontal</div>
    <div class="demo-col">
      <div class="demo-row">
        <Button size="small" onClick={() => (horizontalVisible = !horizontalVisible)}>
          Toggle Horizontal
        </Button>
      </div>
      <Collapse direction="horizontal" visible={horizontalVisible} alwaysRender>
        <span>horizontal</span>
        <span>horizontal</span>
        <span>horizontal</span>
      </Collapse>
    </div>
  </div>
</div>
