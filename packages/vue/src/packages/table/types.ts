export type TableColumnAlign = 'left' | 'center' | 'right';

export interface TableColumn {
  key: string;
  title: string;
  width?: number | string;
  align?: TableColumnAlign;
}

export type TableRow = Record<string, unknown>;
