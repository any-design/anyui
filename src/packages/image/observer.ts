import emitter from './bus';

export default new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const div = entry.target as HTMLDivElement;
      if (!div.id.startsWith('a-image') && !div.dataset.src) {
        return;
      }
      const image = new Image();
      image.onload = () => {
        emitter.emit('loaded', {
          imageId: div.id,
        });
      };
      image.onerror = () => {
        emitter.emit('error', { imageId: div.id });
      };
      image.src = div.dataset.src!;
      emitter.emit('load', { imageId: div.id });
    });
  },
  {
    threshold: 0.1,
  },
);
