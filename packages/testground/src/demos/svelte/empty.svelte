<script lang="ts">
  import { Empty } from '@any-design/anyui-svelte';
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basic</div>
    <div class="demo-row" style="height: 160px;">
      <Empty text="Not Found" />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Custom Icon</div>
    <div class="demo-row" style="height: 160px;">
      <Empty icon="iconoir:trash" text="Nothing here" />
    </div>
  </div>
</div>
