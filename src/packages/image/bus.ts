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

const imageEventEmitter = mitt<ImageEvents>();

export default imageEventEmitter;
