import emitter from './bus';

export const DEFAULT_THRESHOLD = 0.2;

export interface AImageObserverOptions {
  threshold?: number;
}

export const loadImage = (imageId: string, targetSrc: string) => {
  if (!targetSrc || typeof window === 'undefined' || typeof window.Image !== 'function') {
    emitter.emit('error', { imageId });
    return;
  }

  const image = new window.Image();
  image.onload = () => {
    emitter.emit('loaded', {
      imageId,
      src: targetSrc,
    });
  };
  image.onerror = () => {
    emitter.emit('error', { imageId });
  };
  image.src = targetSrc;
  emitter.emit('load', { imageId });
};

export const getObserver = (options: AImageObserverOptions) => {
  if (typeof window === 'undefined' || typeof window.IntersectionObserver !== 'function') {
    return undefined;
  }

  return new window.IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const div = entry.target as HTMLDivElement;
        const targetSrc = div.dataset.src;

        // not the target
        if (!div.id.startsWith('a-image') || !targetSrc) {
          return;
        }

        // set intersecting flag
        if (!entry.isIntersecting) {
          div.dataset.intersecting = 'false';
          return;
        }

        div.dataset.intersecting = 'true';

        // already loaded
        if (div.style.backgroundImage) {
          return;
        }

        loadImage(div.id, targetSrc!);
      });
    },
    {
      threshold: options.threshold || DEFAULT_THRESHOLD,
    },
  );
};
