import mitt, { Emitter } from 'mitt';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type FormItemEvents = {
  clear: undefined;
  change: undefined;
  blur: undefined;
};

export type FormItemEventEmitter = Emitter<FormItemEvents>;

const formItemEventEmitterFactory = (): FormItemEventEmitter => mitt();

export default formItemEventEmitterFactory;
