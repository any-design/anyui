<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '@iconify/svelte';
  import type { PaginationMeta } from '../types';
  export let pagination: PaginationMeta = { current: 1, pageSize: 10, total: 0 };
  export let prevIcon: any = 'uil:angle-left';
  export let nextIcon: any = 'uil:angle-right';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: totalPages = Math.max(1, Math.ceil(pagination.total / pagination.pageSize));
  $: pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(0, 12);
  const update = (current: number) => {
    const next = { ...pagination, current };
    dispatch('update:pagination', next);
    dispatch('change', next);
  };
</script>

<div class="a-pagination {className}">
  <div
    class="a-pagination__guide a-pagination__prev"
    class:a-pagination__guide--disable={pagination.current <= 1}
    role="button"
    tabindex={pagination.current <= 1 ? -1 : 0}
    aria-disabled={pagination.current <= 1}
    on:click={() => update(Math.max(1, pagination.current - 1))}
    on:keydown={(event) => {
      if ((event.key === 'Enter' || event.key === ' ') && pagination.current > 1) {
        event.preventDefault();
        update(Math.max(1, pagination.current - 1));
      }
    }}
  ><Icon icon={prevIcon} /></div>
  <div class="a-pagination__pages">
    {#each pages as page}
      <div
        class="a-pagination__page"
        class:a-pagination__page--selected={page === pagination.current}
        role="button"
        tabindex="0"
        aria-current={page === pagination.current ? 'page' : undefined}
        on:click={() => update(page)}
        on:keydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            update(page);
          }
        }}
      ><span>{page}</span></div>
    {/each}
  </div>
  <div
    class="a-pagination__guide a-pagination__next"
    class:a-pagination__guide--disable={pagination.current >= totalPages}
    role="button"
    tabindex={pagination.current >= totalPages ? -1 : 0}
    aria-disabled={pagination.current >= totalPages}
    on:click={() => update(Math.min(totalPages, pagination.current + 1))}
    on:keydown={(event) => {
      if ((event.key === 'Enter' || event.key === ' ') && pagination.current < totalPages) {
        event.preventDefault();
        update(Math.min(totalPages, pagination.current + 1));
      }
    }}
  ><Icon icon={nextIcon} /></div>
</div>
