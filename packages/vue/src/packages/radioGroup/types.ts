export type ARadioGroupLabel = string | number | Record<string, unknown>;

export interface ARadioGroupItem {
  label: string | number;
  value: string | number;
}

export interface ARadioGroupItemConfig {
  label: ARadioGroupLabel;
  value: string | number;
}

export type ARadioGroupItems = ARadioGroupItemConfig[];
