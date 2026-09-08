import type { Snippet } from 'svelte';

export type TabRegistration = {
  value: () => string | number;
  disabled: () => boolean;
};

export type TabsContext = {
  nextTabIndex: () => number;
  nextPanelIndex: () => number;
  getSelected: () => string | number | undefined;
  getFocusValue: () => string | number | undefined;
  tabId: (value: string | number) => string;
  panelId: (value: string | number) => string;
  select: (value: string | number) => void;
  registerTab: (tab: TabRegistration) => () => void;
  registerPanel: (render: Snippet) => () => void;
};
