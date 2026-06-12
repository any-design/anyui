import { createVNode, defineComponent, h, ref, render } from 'vue';

import ALoadingMask from './ALoadingMask.vue';
import type { LoadingMaskShowOptions } from './types';

// wait for the fade-out transition before unmounting
const DESTROY_DELAY = 250;

interface FullscreenMaskState {
  mountNode: HTMLDivElement;
  visible: { value: boolean };
  text: { value: string };
  zIndex: { value: number };
}

let fullscreenMask: FullscreenMaskState | null = null;
let destroyTimeout: ReturnType<typeof setTimeout> | undefined;

const createFullscreenMask = (): FullscreenMaskState => {
  const mountNode = document.createElement('div');
  const visible = ref(false);
  const text = ref('');
  const zIndex = ref(2000);

  const host = defineComponent({
    name: 'ALoadingMaskHost',
    setup() {
      return () =>
        h(ALoadingMask, {
          loading: visible.value,
          text: text.value,
          zIndex: zIndex.value,
          fullscreen: true,
        });
    },
  });

  render(createVNode(host), mountNode);
  document.body.appendChild(mountNode);

  return {
    mountNode,
    visible,
    text,
    zIndex,
  };
};

const show = (options: LoadingMaskShowOptions = {}) => {
  if (destroyTimeout) {
    clearTimeout(destroyTimeout);
    destroyTimeout = undefined;
  }
  if (!fullscreenMask) {
    fullscreenMask = createFullscreenMask();
  }
  fullscreenMask.text.value = options.text || '';
  if (typeof options.zIndex === 'number') {
    fullscreenMask.zIndex.value = options.zIndex;
  }
  fullscreenMask.visible.value = true;
};

const hide = () => {
  if (!fullscreenMask) {
    return;
  }
  fullscreenMask.visible.value = false;
  destroyTimeout = setTimeout(() => {
    if (!fullscreenMask) {
      return;
    }
    render(null, fullscreenMask.mountNode);
    fullscreenMask.mountNode.remove();
    fullscreenMask = null;
    destroyTimeout = undefined;
  }, DESTROY_DELAY);
};

export const loadingMask = {
  show,
  hide,
};
