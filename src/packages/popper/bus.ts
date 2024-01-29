import mitt from 'mitt';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type PopperEvents = {
  show: {
    group: string;
    popperId: string;
  };
};

const popperEventEmitter = mitt<PopperEvents>();

export default popperEventEmitter;
