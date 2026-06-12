import { mount, unmount } from 'svelte';

import LoadingMaskHost from './components/LoadingMaskHost.svelte';
import type { LoadingMaskShowOptions } from './types';

// wait for the fade-out transition before unmounting
const LOADING_MASK_DESTROY_DELAY = 250;

interface FullscreenMaskRecord {
  node: HTMLDivElement;
  instance: Record<string, any>;
  state: { visible: boolean; text: string; zIndex: number };
}

let fullscreenMask: FullscreenMaskRecord | null = null;
let destroyTimeout: number | undefined;

const show = (options: LoadingMaskShowOptions = {}) => {
  if (typeof document === 'undefined') return;
  if (destroyTimeout) {
    window.clearTimeout(destroyTimeout);
    destroyTimeout = undefined;
  }
  if (!fullscreenMask) {
    const node = document.createElement('div');
    document.body.appendChild(node);
    const instance = mount(LoadingMaskHost, { target: node }) as Record<string, any>;
    fullscreenMask = { node, instance, state: { visible: false, text: '', zIndex: 2000 } };
  }
  fullscreenMask.state = {
    visible: true,
    text: options.text || '',
    zIndex: typeof options.zIndex === 'number' ? options.zIndex : fullscreenMask.state.zIndex,
  };
  fullscreenMask.instance.setMaskState({ ...fullscreenMask.state });
};

const hide = () => {
  if (!fullscreenMask) return;
  fullscreenMask.state = { ...fullscreenMask.state, visible: false };
  fullscreenMask.instance.setMaskState({ ...fullscreenMask.state });
  destroyTimeout = window.setTimeout(() => {
    if (!fullscreenMask) return;
    const record = fullscreenMask;
    fullscreenMask = null;
    destroyTimeout = undefined;
    unmount(record.instance);
    record.node.remove();
  }, LOADING_MASK_DESTROY_DELAY);
};

export const loadingMask = {
  show,
  hide,
};
