import mitt, { Emitter } from 'mitt';

export interface SetValidEventPayload {
  field?: string;
  message?: string;
  isValid: boolean;
}

export interface ClearEventPayload {
  type: 'all' | 'specific';
  field?: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type FormEvents = {
  setValid: SetValidEventPayload;
  clear: ClearEventPayload;
};

export type FormEventEmitter = Emitter<FormEvents>;

const formEventEmitterFactory = (): FormEventEmitter => mitt();

export default formEventEmitterFactory;
