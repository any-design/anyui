<template>
  <div class="hero__actions">
    <a href="/docs/getting-started" @click="handleDocsClick">
      <a-button type="gradient" round icon="ri:arrow-right-line" icon-position="trailing">
        Get Started
      </a-button>
    </a>
    <a href="/testground/" data-astro-reload>
      <a-button round icon="ri:flask-line" icon-position="trailing">
        Open Testground
      </a-button>
    </a>
  </div>

  <div class="hero__install">
    <code>pnpm add @any-design/anyui</code>
    <a-button
      size="small"
      round
      :icon="copied ? 'ri:check-line' : 'ri:file-copy-line'"
      role="button"
      tabindex="0"
      @click="copyInstall"
      @keydown.enter.prevent="copyInstall"
      @keydown.space.prevent="copyInstall"
    >
      {{ copied ? 'Copied' : 'Copy' }}
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { navigate } from 'astro:transitions/client';
import { onBeforeUnmount, ref } from 'vue';

const copied = ref(false);
let resetTimer: number | undefined;

const isPlainLeftClick = (event: MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

const handleDocsClick = (event: MouseEvent) => {
  if (!isPlainLeftClick(event)) {
    return;
  }
  event.preventDefault();
  navigate('/docs/getting-started');
};

const copyInstall = async () => {
  const command = 'pnpm add @any-design/anyui';
  try {
    await navigator.clipboard.writeText(command);
  } catch {
    const helper = document.createElement('textarea');
    helper.value = command;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    helper.remove();
  }
  copied.value = true;
  window.clearTimeout(resetTimer);
  resetTimer = window.setTimeout(() => {
    copied.value = false;
  }, 1500);
};

onBeforeUnmount(() => {
  window.clearTimeout(resetTimer);
});
</script>
