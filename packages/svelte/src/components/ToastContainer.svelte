<script lang="ts">
  import Toast from './Toast.svelte';
  import type { ToastItem } from '../types';

  let { onCleared } = $props();

  type QueueItem = ToastItem & { anim: string };

  let toastQueue = $state<QueueItem[]>([]);

  const setAnim = (key: string, anim: string) => {
    toastQueue = toastQueue.map((item) => (item.key === key ? { ...item, anim } : item));
  };

  const removeToast = (key: string) => {
    const target = toastQueue.find((item) => item.key === key);
    if (!target || target.anim.includes('leave')) return;
    setAnim(key, 'a-toast-anim-leave-active a-toast-anim-leave-to');
    window.setTimeout(() => {
      toastQueue = toastQueue.filter((item) => item.key !== key);
      if (!toastQueue.length) onCleared?.();
    }, 240);
  };

  export function addToast(toast: Omit<ToastItem, 'key'>) {
    const key = String(Date.now()) + String(Math.random());
    toastQueue = [
      { ...toast, key, anim: 'a-toast-anim-enter-active a-toast-anim-enter-from' },
      ...toastQueue,
    ];
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnim(key, 'a-toast-anim-enter-active a-toast-anim-enter-to')),
    );
    window.setTimeout(() => setAnim(key, ''), 320);
    if (toast.duration > 0) {
      window.setTimeout(() => removeToast(key), toast.duration);
    }
  }
</script>

{#each toastQueue as item (item.key)}
  <Toast
    class={item.anim}
    type={item.type}
    title={item.title}
    content={item.content}
    closable={item.closable}
    onClose={() => removeToast(item.key)}
  />
{/each}
