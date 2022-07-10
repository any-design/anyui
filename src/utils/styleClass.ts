export const hasClass = (node: HTMLElement, className: string) => {
  return node.classList.contains(className);
};

export const addClass = (node: HTMLElement, className: string) => {
  if (hasClass(node, className)) {
    return;
  }
  node.classList.add(className);
};

export const removeClass = (node: HTMLElement, className: string) => {
  if (!hasClass(node, className)) {
    return;
  }
  node.classList.remove(className);
};
