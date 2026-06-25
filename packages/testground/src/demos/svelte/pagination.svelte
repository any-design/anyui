<script lang="ts">
  import { Pagination } from '@any-design/anyui-svelte';
  import type { PaginationMeta } from '@any-design/anyui-svelte';

  let pagination: PaginationMeta = $state({ current: 1, pageSize: 10, total: 50 });
  let largePagination: PaginationMeta = $state({ current: 3, pageSize: 10, total: 80 });
  let shapesPagination: PaginationMeta = $state({ current: 3, pageSize: 10, total: 200 });
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basic</div>
    <div class="demo-col">
      <Pagination bind:pagination />
      <span>Current page: {pagination.current}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">More Pages</div>
    <div class="demo-col">
      <Pagination bind:pagination={largePagination} />
      <span>Current page: {largePagination.current}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Shapes</div>
    <div class="demo-col">
      <Pagination bind:pagination={shapesPagination} shape="rounded" />
      <Pagination bind:pagination={shapesPagination} shape="squircle" />
      <Pagination bind:pagination={shapesPagination} shape="circle" />
    </div>
  </div>
</div>
