<script lang="ts">
  import Message from './Message.svelte';
  import type { MessageOptions } from '../types';

  let { onCleared } = $props();

  type QueueItem = MessageOptions & { key: string };

  let messageQueue = $state<QueueItem[]>([]);

  export function addMessage(options: MessageOptions) {
    const key = String(Date.now()) + String(Math.random());
    messageQueue = [{ ...options, key }, ...messageQueue];
    const duration = options.duration ?? 5000;
    if (duration > 0) {
      window.setTimeout(() => {
        messageQueue = messageQueue.filter((item) => item.key !== key);
        if (!messageQueue.length) onCleared?.();
      }, duration);
    }
  }
</script>

{#each messageQueue as item (item.key)}
  <Message type={item.type} content={item.content} icon={item.icon} showIcon={item.showIcon} round={item.round} />
{/each}
