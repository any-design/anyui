export type ACheckboxGroupLabel = string | number | Record<string, unknown>;

export interface ACheckboxGroupItem {
  label: string | number;
  value: string | number;
}

export interface ACheckboxGroupItemConfigObject {
  label: ACheckboxGroupLabel;
  value: string | number;
}

export type ACheckboxGroupItemConfig = ACheckboxGroupItemConfigObject | string | number;
export type ACheckboxGroupItems = ACheckboxGroupItemConfig[];
