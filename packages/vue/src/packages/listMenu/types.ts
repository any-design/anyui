export interface AListMenuItemConfigObject {
  label: string;
  value?: string | number;
}

export type AListMenuItemConfig = AListMenuItemConfigObject | string;

export type AListMenuConfig = Record<string, AListMenuItemConfig[]> | AListMenuItemConfig[];

export interface AListMenuDisplayItem extends AListMenuItemConfigObject {
  type: 'item' | 'split';
}
