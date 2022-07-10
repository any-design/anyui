import { addClass, removeClass } from '../../utils/styleClass';

const LOCK_CLASS_NAME = 'a-scroll-locked';

export const useScrollLock = (node: HTMLElement, locked = true) => {
  if (locked) {
    addClass(node, LOCK_CLASS_NAME);
  } else {
    removeClass(node, LOCK_CLASS_NAME);
  }
};
