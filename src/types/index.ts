import { Component } from 'vue';

export type AvailableIconType = 'info' | 'success' | 'warning' | 'error';

export interface AnyUIInstallOptions {
  icons: Record<AvailableIconType, Component>;
}
