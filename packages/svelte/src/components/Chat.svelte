<script lang="ts">
  import type { AChatMessage } from '../types';
  export let messages: AChatMessage[] = [];
  export let className = '';
  export { className as class };
</script>

<div class="a-chat {className}">
  <div class="a-virtual-list">
    <div class="a-virtual-list__inner a-scroll-shadows">
      <div class="a-virtual-list__filler">
        {#each messages as message, index (message.id)}
          <div class="a-virtual-list__item" data-index={index} data-id={message.id}>
            <div class="a-chat__message {message.role === 'self' ? 'a-chat__message--self' : 'a-chat__message--target'}">
              <div class="a-chat__content">
                <pre><slot name="message" message={message}>{message.content}</slot></pre>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <slot />
</div>
