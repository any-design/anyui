import type { ComputedRef, InjectionKey } from 'vue';

export interface TabRegistration {
  key: ComputedRef<string | number>;
  active: ComputedRef<boolean>;
  tabIndex: ComputedRef<number>;
  tabId: ComputedRef<string>;
  panelId: ComputedRef<string>;
}

export interface TabsContext {
  registerTab: (value: () => string | number | undefined, disabled: () => boolean) => TabRegistration;
  registerPanel: (value: () => string | number | undefined) => TabRegistration;
  select: (value: string | number) => void;
}

export const TABS_CONTEXT: InjectionKey<TabsContext> = Symbol('tabsContext');

export type ATabsType = 'default' | 'line' | 'card';

export type ATabsSize = 'small' | 'default' | 'large';

export type ATabsPosition = 'top' | 'bottom';

export interface ATabsIndicatorPosition {
  width: number;
  left: number;
}
