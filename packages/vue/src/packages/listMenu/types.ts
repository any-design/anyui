export interface AListMenuItemConfigObject {
  label: string;
  value?: string;
}

export type AListMenuItemConfig = AListMenuItemConfigObject | string;

export type AListMenuConfig = Record<string, AListMenuItemConfig[]> | AListMenuItemConfig[];

export interface AListMenuDisplayItem extends AListMenuItemConfigObject {
  type: 'item' | 'split';
}
