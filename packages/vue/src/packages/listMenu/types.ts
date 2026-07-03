export interface AListMenuItemConfigObject {
  label: string;
  value?: string | number;
  className?: string;
}

export type AListMenuItemConfig = AListMenuItemConfigObject | string;

export type AListMenuConfig = Record<string, AListMenuItemConfig[]> | AListMenuItemConfig[];

export type AListMenuSelectedVariant = 'soft' | 'solid';

export interface AListMenuDisplayItem extends AListMenuItemConfigObject {
  type: 'item' | 'split';
}
