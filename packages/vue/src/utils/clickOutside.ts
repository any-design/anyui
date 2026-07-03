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
  eventNames: Array<keyof WindowEventMap> = ['click'],
): (() => void) => {
  const actualTargets = Array.isArray(targets) ? targets : [targets];
  function cleanup() {
    eventNames.forEach((eventName) => {
      window.removeEventListener(eventName, handler);
    });
  }
  function handler(e: Event) {
    const targetElement = e.target as HTMLElement;
    if (areContainsInTree(targetElement, actualTargets)) {
      return;
    }
    actualTargets.forEach((target: HTMLElement) => {
      target.dispatchEvent(new CustomEvent('clickOutside', { bubbles: true }));
    });
    cleanup();
  }
  eventNames.forEach((eventName) => {
    window.addEventListener(eventName, handler);
  });
  return cleanup;
};
