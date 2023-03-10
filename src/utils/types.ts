import { Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export type Timeout = ReturnType<typeof setInterval>;
export type Interval = ReturnType<typeof setInterval>;
export type Booleanish = boolean | 'true' | 'false';
