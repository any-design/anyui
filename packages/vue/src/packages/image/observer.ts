import emitter from './bus';

export const DEFAULT_THRESHOLD = 0.2;

export interface AImageObserverOptions {
  threshold?: number;
}

export const loadImage = (imageId: string, targetSrc: string) => {
  const image = new Image();
  image.onload = () => {
    emitter.emit('loaded', {
      imageId,
      src: targetSrc!,
    });
  };
  image.onerror = () => {
    emitter.emit('error', { imageId });
  };
  image.src = targetSrc!;
  emitter.emit('load', { imageId });
};

export const getObserver = (options: AImageObserverOptions) =>
  new IntersectionObserver(
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
