export type ConfirmModalType = 'primary' | 'danger';

export interface ConfirmModalOptions {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  type?: ConfirmModalType;
  width?: number | string;
  maskClosable?: boolean;
  zIndex?: number;
}
