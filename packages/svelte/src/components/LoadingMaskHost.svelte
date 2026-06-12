<script lang="ts">
  import LoadingMask from './LoadingMask.svelte';

  let visible = $state(false);
  let text = $state('');
  let zIndex = $state(2000);

  export function setMaskState(next: { visible: boolean; text: string; zIndex: number }) {
    visible = next.visible;
    text = next.text;
    zIndex = next.zIndex;
  }
</script>

<LoadingMask loading={visible} {text} {zIndex} fullscreen />
