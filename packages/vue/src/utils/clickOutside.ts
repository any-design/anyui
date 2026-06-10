const areContainsInTree = (source: HTMLElement, targets: HTMLElement[]): boolean => {
  const hasSameNode = targets.some((target) => source === target);
  if (!hasSameNode) {
    if (!source.parentElement) {
      return false;
    }
    return areContainsInTree(source.parentElement, targets);
  }
  return true;
};

// Check if a click happened outside of the element
export const attachClickOutsideListener = (
  targets: HTMLElement | HTMLElement[],
): ((e: MouseEvent) => void) => {
  const actualTargets = Array.isArray(targets) ? targets : [targets];
  const handler = (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    if (areContainsInTree(targetElement, actualTargets)) {
      return;
    }
    actualTargets.forEach((target: HTMLElement) => {
      target.dispatchEvent(new CustomEvent('clickOutside', { bubbles: true }));
    });
    window.removeEventListener('click', handler);
  };
  window.addEventListener('click', handler);
  return handler;
};
