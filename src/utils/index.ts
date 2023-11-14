import type { ComponentInternalInstance } from 'vue';

export const formatStyleSize = (size: number | string) => {
  if (typeof size === 'string' && /^\d+$/.test(size)) {
    return `${size}px`;
  }
  return typeof size === 'number' ? `${size}px` : size;
};

export const getCertainParent = (
  name: string,
  instance: ComponentInternalInstance | null,
): ComponentInternalInstance | null => {
  if (!instance) {
    return null;
  }
  const { parent } = instance;
  if (!parent) {
    return null;
  }
  return parent.type.name === name ? parent : getCertainParent(name, parent);
};

export const getStyleNumVarInCSS = (varName: string) =>
  parseInt(window.getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`), 10);
