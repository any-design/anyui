export const TABS_CONTEXT = Symbol('tabsContext');

export type ATabsType = 'line' | 'card';

export type ATabsSize = 'small' | 'default' | 'large';

export type ATabsPosition = 'top' | 'bottom';

export interface ATabsIndicatorPosition {
  width: number;
  left: number;
}