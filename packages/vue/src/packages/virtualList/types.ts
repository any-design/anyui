export type VirtualListItem<T> = T & {
  id: string;
  __listIndex: number;
  __itemHeight: number;
  __itemScrollTop: number;
};

export type RawVirtualListItem<T> = T & {
  id: string;
};
