import type { Emitter } from 'mitt';
import mitt from 'mitt';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ImageEvents = {
  load: {
    imageId: string;
  };
  loaded: {
    imageId: string;
    src: string;
  };
  error: {
    imageId: string;
  };
};

const imageEventEmitter: Emitter<ImageEvents> = mitt();

export default imageEventEmitter;
