<script lang="ts">
  import type { AChatMessage } from '../types';
  let {
    messages = [] as AChatMessage[],
    class: className = '',
    children,
    message,
  } = $props();
</script>

<div class="a-chat {className}">
  <div class="a-virtual-list">
    <div class="a-virtual-list__inner a-scroll-shadows">
      <div class="a-virtual-list__filler">
        {#each messages as item, index (item.id)}
          <div class="a-virtual-list__item" data-index={index} data-id={item.id}>
            <div class="a-chat__message {item.role === 'self' ? 'a-chat__message--self' : 'a-chat__message--target'}">
              <div class="a-chat__content">
                <pre>{#if message}{@render message(item)}{:else}{item.content}{/if}</pre>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  {@render children?.()}
</div>
