import type { Emitter } from 'mitt';
import mitt from 'mitt';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type PopperEvents = {
  show: {
    group: string;
    popperId: string;
  };
};

const popperEventEmitter: Emitter<PopperEvents> = mitt();

export default popperEventEmitter;
