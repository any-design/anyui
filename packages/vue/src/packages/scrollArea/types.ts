export type AScrollAreaDirection = 'vertical' | 'horizontal';
export type AScrollAreaScrollBehavior = 'auto' | 'smooth';
export type AScrollFadeAxis = 'vertical' | 'horizontal' | 'both';

export interface AScrollFadeOptions {
  axis?: AScrollFadeAxis;
  size?: string | number;
  topSize?: string | number;
  bottomSize?: string | number;
  startSize?: string | number;
  endSize?: string | number;
  reveal?: string | number;
}

export type AScrollFadeConfig = boolean | AScrollFadeOptions;
