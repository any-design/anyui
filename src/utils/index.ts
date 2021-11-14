export const formatStyleSize = (size: number | string) => {
  if (typeof size === 'string' && /^\d+$/.test(size)) {
    return `${size}px`;
  }
  return typeof size === 'number' ? `${size}px` : size;
};
