export interface DropdownMenuItem {
  command: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
  divided?: boolean;
}
