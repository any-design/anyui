import mitt, { Emitter } from 'mitt';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ImageEvents = {
  load: {
    imageId: string;
  };
  loaded: {
    imageId: string;
  };
  error: {
    imageId: string;
  };
};

const imageEventEmitter: Emitter<ImageEvents> = mitt();

export default imageEventEmitter;
